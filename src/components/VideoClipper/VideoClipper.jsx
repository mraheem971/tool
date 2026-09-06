import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Scissors, Play, Download, Sparkles, Layers, Archive, RefreshCw, Trash2, Video, FileCheck2, PlayCircle } from 'lucide-react';
import { getVideoMetadata } from '../../services/videoCompressorEngine';
import { generateClipSegments, generateClipThumbnail, renderClip } from '../../services/videoClipperEngine';
import { downloadZip, downloadFile } from '../../services/zipExporter';
import { formatBytes, formatDuration } from '../../utils/formatters';
import { generateDemoVideo } from '../../utils/sampleMedia';
import ClipDurationSelector from './ClipDurationSelector';
import OverlayCustomizer from './OverlayCustomizer';
import ClipTimelineGrid from './ClipTimelineGrid';
import ClipPreviewPlayer from './ClipPreviewPlayer';
import BatchExportModal from './BatchExportModal';

export default function VideoClipper() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoMeta, setVideoMeta] = useState(null);
  const [clipDuration, setClipDuration] = useState(30); // Default 30s (enforcing minimum 30s)
  const [clipQuality, setClipQuality] = useState({
    id: 'medium',
    label: 'Medium — recommended',
    bitrate: 2800,
    resolution: '720p'
  });
  const [clips, setClips] = useState([]);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);

  // 5-Second Intro Overlay Options
  const [overlayOptions, setOverlayOptions] = useState({
    title: '',
    subtitle: '?? Follow for Part 2',
    template: 'viral_tiktok',
    position: 'top',
    animation: 'fade',
    accentColor: '#06B6D4',
    fontSizeMultiplier: 1.0,
    introDuration: 5.0, // Exactly 5 seconds as specified
    showPartCounter: true,
    showSubtitle: true
  });

  // Batch Export State
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportState, setExportState] = useState({
    isRunning: false,
    currentClipIndex: 0,
    totalToExport: 0,
    currentClipProgress: 0,
    exportedClips: [],
    isCompleted: false,
    error: null
  });

  const fileInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Load video file
  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('video/')) return;
    try {
      const meta = await getVideoMetadata(file);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      
      setVideoFile(file);
      setVideoMeta(meta);
      setOverlayOptions(prev => ({
        ...prev,
        title: cleanTitle
      }));
    } catch (err) {
      console.error('Error loading video for clipping:', err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleLoadDemo = async (e) => {
    e.stopPropagation();
    setIsGeneratingDemo(true);
    try {
      const demo = await generateDemoVideo(90); // 90 seconds demo
      await handleFile(demo);
    } catch (err) {
      console.error('Failed to generate demo:', err);
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  // Re-generate clips whenever duration or video changes
  useEffect(() => {
    if (videoMeta?.duration) {
      const segments = generateClipSegments(videoMeta.duration, clipDuration, {
        videoTitle: overlayOptions.title || 'Untitled',
        subtitle: overlayOptions.subtitle
      });
      setClips(segments);
      setActiveClipIndex(0);

      // Generate thumbnails asynchronously for all segments
      segments.forEach(async (seg, idx) => {
        const thumb = await generateClipThumbnail(videoMeta.url, seg, overlayOptions);
        setClips(prev => {
          const updated = [...prev];
          if (updated[idx]) {
            updated[idx] = { ...updated[idx], thumbnailUrl: thumb };
          }
          return updated;
        });
      });
    }
  }, [videoMeta?.duration, videoMeta?.url, clipDuration, overlayOptions.template, overlayOptions.position, overlayOptions.accentColor]);

  // Toggle single clip selection
  const handleToggleClipSelect = (clipId) => {
    setClips(prev => prev.map(c => c.id === clipId ? { ...c, selected: !c.selected } : c));
  };

  // Toggle select all clips
  const handleToggleSelectAll = () => {
    const allSelected = clips.every(c => c.selected);
    setClips(prev => prev.map(c => ({ ...c, selected: !allSelected })));
  };

  // Export a single clip
  const handleExportSingleClip = async (clip) => {
    if (!videoFile) return;
    setExportModalOpen(true);
    setExportState({
      isRunning: true,
      currentClipIndex: 0,
      totalToExport: 1,
      currentClipProgress: 0,
      exportedClips: [],
      isCompleted: false,
      error: null
    });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const rendered = await renderClip(
        videoFile,
        clip,
        overlayOptions,
        (p) => {
          setExportState(prev => ({
            ...prev,
            currentClipProgress: p.percent
          }));
        },
        controller.signal,
        clipQuality
      );

      setExportState(prev => ({
        ...prev,
        isRunning: false,
        isCompleted: true,
        exportedClips: [rendered]
      }));
    } catch (err) {
      console.error('Error exporting clip:', err);
      setExportState(prev => ({ ...prev, isRunning: false, error: err.message }));
    }
  };

  // Export all selected clips in batch
  const handleBatchExport = async () => {
    const selectedClips = clips.filter(c => c.selected);
    if (selectedClips.length === 0 || !videoFile) return;

    setExportModalOpen(true);
    setExportState({
      isRunning: true,
      currentClipIndex: 0,
      totalToExport: selectedClips.length,
      currentClipProgress: 0,
      exportedClips: [],
      isCompleted: false,
      error: null
    });

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const completedList = [];

    try {
      for (let i = 0; i < selectedClips.length; i++) {
        const clip = selectedClips[i];
        setExportState(prev => ({
          ...prev,
          currentClipIndex: i,
          currentClipProgress: 0
        }));

        const rendered = await renderClip(
          videoFile,
          clip,
          overlayOptions,
          (p) => {
            setExportState(prev => ({
              ...prev,
              currentClipProgress: p.percent
            }));
          },
          controller.signal,
          clipQuality
        );

        completedList.push(rendered);
      }

      setExportState(prev => ({
        ...prev,
        isRunning: false,
        isCompleted: true,
        exportedClips: completedList
      }));

    } catch (err) {
      console.error('Batch export error:', err);
      setExportState(prev => ({ ...prev, isRunning: false, error: err.message }));
    }
  };

  const handleCancelExport = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setExportState(prev => ({ ...prev, isRunning: false }));
    setExportModalOpen(false);
  };

  const handleDownloadAllZip = async () => {
    if (exportState.exportedClips.length === 0) return;
    const items = exportState.exportedClips.map(c => ({
      filename: c.filename,
      blob: c.blob
    }));
    await downloadZip(items, `${overlayOptions.title || 'Video'}_Clips_Parts.zip`);
  };

  const handleClear = () => {
    if (videoMeta?.url) URL.revokeObjectURL(videoMeta.url);
    setVideoFile(null);
    setVideoMeta(null);
    setClips([]);
    setActiveClipIndex(0);
  };

  const activeClip = clips[activeClipIndex] || clips[0];
  const selectedClipsCount = clips.filter(c => c.selected).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Scissors className="w-6 h-6" />
            </span>
            Long Video Auto-Clipper & Short Generator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Upload 30+ min videos and automatically generate clips with a <strong className="text-cyan-400">5-second dynamic Part # and Title intro</strong> at the start of every clip.
          </p>
        </div>

        {videoFile && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Choose Another Video
            </button>
            <button
              onClick={handleBatchExport}
              disabled={selectedClipsCount === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 font-bold text-xs text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              Export & Download {selectedClipsCount} Clips (ZIP)
            </button>
          </div>
        )}
      </div>

      {/* Upload Zone */}
      {!videoFile ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 hover:border-purple-500/60 rounded-3xl p-12 text-center bg-slate-900/30 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-2xl flex flex-col items-center justify-center gap-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
          <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all shadow-xl shadow-purple-500/10">
            <UploadCloud className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">Upload 30+ Min or Long-form Video</h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports MP4, MOV, WebM, MKV • Podcasts, streams, gaming, tutorials, meetings
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <span className="flex items-center gap-1 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              Auto 5-Second Part # & Title Bumper
            </span>
            <span className="text-slate-500">•</span>
            <span>Clip Duration: = 30s (Min)</span>
            <span className="text-slate-500">•</span>
            <span>Instant Zero-Upload Processing</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLoadDemo}
              disabled={isGeneratingDemo}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold transition-all"
            >
              {isGeneratingDemo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
              <span>{isGeneratingDemo ? 'Generating Demo Video...' : '? Try Instant 90s Demo Video'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          
          {/* Top Video Overview Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div>
              <span className="text-[11px] font-semibold text-slate-500">Source Video</span>
              <p className="text-xs font-bold text-slate-200 truncate">{videoMeta.name}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500">Duration</span>
              <p className="text-xs font-mono font-bold text-cyan-400">{formatDuration(videoMeta.duration)}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500">Clip Duration Option</span>
              <p className="text-xs font-mono font-bold text-purple-400">{clipDuration}s ({formatDuration(clipDuration)})</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500">Quality Preset</span>
              <p className="text-xs font-bold text-emerald-400">{clipQuality?.label?.split('—')[0] || 'Medium'}</p>
            </div>
          </div>

          {/* Dual Column Configuration & Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Clip Duration & Quality & 5s Overlay Customizer (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ClipDurationSelector
                clipDuration={clipDuration}
                setClipDuration={setClipDuration}
                totalVideoDuration={videoMeta.duration}
                clipQuality={clipQuality}
                setClipQuality={setClipQuality}
              />

              <OverlayCustomizer
                options={overlayOptions}
                setOptions={setOverlayOptions}
              />
            </div>

            {/* Right Column: Live Clip Preview Player with 5s Intro Canvas (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <ClipPreviewPlayer
                videoUrl={videoMeta.url}
                activeClip={activeClip}
                overlayOptions={overlayOptions}
              />

              {/* Quick Action Box */}
              <div className="glass-panel rounded-2xl p-5 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-xs font-bold text-slate-200">Ready to export?</span>
                  <p className="text-[11px] text-slate-400">
                    Export all {selectedClipsCount} selected clips with 5s intro in <strong className="text-cyan-400">{clipQuality?.label}</strong>.
                  </p>
                </div>
                <button
                  onClick={handleBatchExport}
                  disabled={selectedClipsCount === 0}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  <Archive className="w-4 h-4" />
                  Export {selectedClipsCount} Clips
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Full Width: Clips Timeline Grid */}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Generated Clip Parts ({clips.length} Parts Total)
              </h3>
            </div>

            <ClipTimelineGrid
              clips={clips}
              activeClipIndex={activeClipIndex}
              setActiveClipIndex={setActiveClipIndex}
              onToggleClipSelect={handleToggleClipSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onExportSingleClip={handleExportSingleClip}
              isExporting={exportState.isRunning}
            />
          </div>

        </div>
      )}

      {/* Batch Export Progress & Download Modal */}
      <BatchExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        exportState={exportState}
        onCancel={handleCancelExport}
        onDownloadZip={handleDownloadAllZip}
      />
    </div>
  );
}
