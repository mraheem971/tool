import React, { useState, useRef } from 'react';
import { UploadCloud, Video, Download, Play, Pause, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Trash2, PlayCircle } from 'lucide-react';
import { getVideoMetadata, compressVideo } from '../../services/videoCompressorEngine';
import { downloadFile } from '../../services/zipExporter';
import { formatBytes, formatDuration } from '../../utils/formatters';
import { generateDemoVideo } from '../../utils/sampleMedia';
import VideoSettings from './VideoSettings';

export default function VideoCompressor() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoMeta, setVideoMeta] = useState(null);
  const [compressedResult, setCompressedResult] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [progress, setProgress] = useState(null);
  const [settings, setSettings] = useState({
    level: 'medium', // Default to medium (~50% smaller)
    preset: null,
    targetResolution: 'auto',
    targetSizeMB: null,
    videoBitrateKbps: null,
    audioBitrateKbps: 128,
    muteAudio: false
  });

  const fileInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('video/')) return;
    try {
      const meta = await getVideoMetadata(file);
      setVideoFile(file);
      setVideoMeta(meta);
      setCompressedResult(null);
      setProgress(null);
    } catch (err) {
      console.error('Failed to load video metadata:', err);
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
      const demo = await generateDemoVideo(60); // 60s sample
      await handleFile(demo);
    } catch (err) {
      console.error('Failed to generate demo:', err);
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  const startCompression = async () => {
    if (!videoFile || isCompressing) return;
    setIsCompressing(true);
    setProgress({ percent: 0, status: 'Initializing hardware encoder...' });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await compressVideo(
        videoFile,
        settings,
        (p) => setProgress(p),
        controller.signal
      );
      setCompressedResult(result);
    } catch (err) {
      if (err.message !== 'Compression cancelled by user') {
        console.error('Compression error:', err);
      }
    } finally {
      setIsCompressing(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsCompressing(false);
    setProgress(null);
  };

  const handleClear = () => {
    if (videoMeta?.url) URL.revokeObjectURL(videoMeta.url);
    if (compressedResult?.url) URL.revokeObjectURL(compressedResult.url);
    setVideoFile(null);
    setVideoMeta(null);
    setCompressedResult(null);
    setProgress(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Video className="w-6 h-6" />
            </span>
            Video Compressor & Optimizer
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Compress videos up to <strong className="text-cyan-400">85%+ smaller</strong> with adaptive bitrate scaling, target size limits (Discord 8MB/25MB, WhatsApp 16MB), and resolution downscaling.
          </p>
        </div>

        {videoFile && (
          <button
            onClick={handleClear}
            disabled={isCompressing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Choose Another Video
          </button>
        )}
      </div>

      {/* Upload Zone or Video Workspace */}
      {!videoFile ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/60 rounded-3xl p-12 text-center bg-slate-900/30 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-2xl flex flex-col items-center justify-center gap-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-xl shadow-cyan-500/10">
            <UploadCloud className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">Drag & Drop a Video file, or Browse</h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports MP4, WebM, MOV, MKV, AVI • Up to any duration • Fast local encoding
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Target Discord 8MB/25MB, WhatsApp 16MB, Tiny 1MB, or 50% - 85% compression
          </div>

          <div className="pt-2">
            <button
              onClick={handleLoadDemo}
              disabled={isGeneratingDemo}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
            >
              {isGeneratingDemo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
              <span>{isGeneratingDemo ? 'Generating Sample Video...' : '? Try Instant 60s Demo Video'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Video View (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Video Player Card */}
            <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-200 truncate max-w-sm">{videoMeta.name}</span>
                  <span className="text-xs text-slate-400 font-mono">
                    {formatBytes(videoMeta.size)} • {videoMeta.width}×{videoMeta.height} • {formatDuration(videoMeta.duration)}
                  </span>
                </div>
                {compressedResult && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    -{compressedResult.savingsPercent}% Saved
                  </span>
                )}
              </div>

              {/* Video Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <video
                  src={compressedResult ? compressedResult.url : videoMeta.url}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Compression Progress Bar */}
              {isCompressing && progress && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-cyan-400 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Compressing Video...
                    </span>
                    <span className="font-mono text-slate-200 font-bold">{progress.percent}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-200"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Current: {formatDuration(progress.currentTime || 0)} / {formatDuration(progress.duration || videoMeta.duration)}</span>
                    <button
                      onClick={handleCancel}
                      className="text-red-400 hover:text-red-300 font-bold underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Result Summary & Download Button */}
              {compressedResult && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Original Size:</span>
                      <p className="font-mono font-bold text-slate-200">{formatBytes(compressedResult.originalSize)}</p>
                    </div>
                    <div>
                      <span className="text-emerald-400">Compressed Size:</span>
                      <p className="font-mono font-bold text-emerald-300">{formatBytes(compressedResult.compressedSize)} ({compressedResult.savingsPercent}% reduction)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadFile(compressedResult.blob, compressedResult.filename)}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Compressed Video ({formatBytes(compressedResult.compressedSize)})
                  </button>
                </div>
              )}

              {/* Trigger Button */}
              {!compressedResult && !isCompressing && (
                <button
                  onClick={startCompression}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Video Compression
                </button>
              )}

            </div>
          </div>

          {/* Settings Sidebar (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <VideoSettings
              settings={settings}
              setSettings={setSettings}
              videoMeta={videoMeta}
              isCompressing={isCompressing}
            />
          </div>

        </div>
      )}
    </div>
  );
}
