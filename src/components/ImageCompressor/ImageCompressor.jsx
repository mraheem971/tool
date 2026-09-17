import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Archive, Trash2, Sparkles, RefreshCw, CheckCircle2, PlayCircle, Plus } from 'lucide-react';
import { processImage } from '../../services/imageProcessor';
import { downloadZip, downloadFile } from '../../services/zipExporter';
import { formatBytes } from '../../utils/formatters';
import { generateDemoImage } from '../../utils/sampleMedia';
import ComparisonSlider from './ComparisonSlider';
import ImageSettings from './ImageSettings';

export default function ImageCompressor() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [settings, setSettings] = useState({
    quality: 0.8,
    format: 'image/webp',
    scalePercent: 100
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (images.length > 0) {
      reprocessAllImages(images.map(img => img.rawFile), settings);
    }
  }, [settings.quality, settings.format, settings.scalePercent]);

  const handleFiles = async (files) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;
    await reprocessAllImages(validFiles, settings);
  };

  const handleLoadDemoImages = async (e) => {
    e.stopPropagation();
    setIsGeneratingDemo(true);
    try {
      const demo1 = await generateDemoImage(1920, 1080, 'Sample 1080p Landscape');
      const demo2 = await generateDemoImage(3840, 2160, 'Sample 4K UltraHD Asset');
      await handleFiles([demo1, demo2]);
    } catch (err) {
      console.error('Failed to generate demo image:', err);
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  const reprocessAllImages = async (fileList, currentSettings) => {
    setIsProcessing(true);
    try {
      const processed = await Promise.all(
        fileList.map(async (file, idx) => {
          const origUrl = URL.createObjectURL(file);
          const result = await processImage(file, currentSettings);
          return {
            id: `img-${Date.now()}-${idx}`,
            rawFile: file,
            original: {
              name: file.name,
              size: file.size,
              url: origUrl,
              width: result.originalWidth,
              height: result.originalHeight
            },
            compressed: result
          };
        })
      );
      setImages(processed);
      if (selectedIndex >= processed.length) {
        setSelectedIndex(0);
      }
    } catch (err) {
      console.error('Image compression error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) return;
    const items = images.map(img => ({
      filename: img.compressed.filename,
      blob: img.compressed.file
    }));
    await downloadZip(items, 'MediaForge_Images_Optimized.zip');
  };

  const handleClear = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.original.url);
      URL.revokeObjectURL(img.compressed.url);
    });
    setImages([]);
    setSelectedIndex(0);
  };

  const totalOriginal = images.reduce((acc, img) => acc + img.original.size, 0);
  const totalCompressed = images.reduce((acc, img) => acc + img.compressed.compressedSize, 0);
  const totalSavings = totalOriginal > 0 ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 1000) / 10 : 0;

  const currentItem = images[selectedIndex];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ImageIcon className="w-6 h-6" />
            </span>
            Smart Image Compressor
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Batch compress, resize, and convert images to WebP, AVIF, JPEG, or PNG with lossless visual fidelity.
          </p>
        </div>

        {images.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Archive className="w-4 h-4" />
              Download All as ZIP ({images.length})
            </button>
          </div>
        )}
      </div>

      {/* Upload Dropzone */}
      {images.length === 0 ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/60 rounded-3xl p-12 text-center bg-slate-900/30 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-2xl flex flex-col items-center justify-center gap-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-xl shadow-cyan-500/10">
            <UploadCloud className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">Drag &amp; Drop Images here, or Browse</h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, WebP, AVIF, GIF, BMP, SVG • Multiple batch uploads supported
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Zero upload delay • 100% processed locally on your device
          </div>

          <div className="pt-2">
            <button
              onClick={handleLoadDemoImages}
              disabled={isGeneratingDemo}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
            >
              {isGeneratingDemo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
              <span>{isGeneratingDemo ? 'Generating Samples...' : 'Try Instant Demo Images (1080p & 4K)'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Workspace (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Global Stats Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-500">Original Total</span>
                <span className="text-base font-bold font-mono text-slate-200">{formatBytes(totalOriginal)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-500">Compressed Total</span>
                <span className="text-base font-bold font-mono text-cyan-400">{formatBytes(totalCompressed)}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-semibold text-slate-500">Total Savings</span>
                <span className="text-base font-extrabold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  -{totalSavings}%
                </span>
              </div>
            </div>

            {/* Split Comparison Slider */}
            {currentItem && (
              <ComparisonSlider
                originalItem={currentItem.original}
                compressedItem={currentItem.compressed}
              />
            )}

            {/* Batch Thumbnail Selector List */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Batch Queue ({images.length} files)
                </h4>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add More Files</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1">
                {images.map((img, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={img.id}
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-500 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950">
                        <img
                          src={img.compressed.url}
                          alt={img.original.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 right-1 bg-emerald-500 text-slate-950 font-extrabold text-[9px] px-1 py-0.5 rounded shadow">
                          -{img.compressed.savingsPercent}%
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200 truncate">{img.original.name}</span>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                          <span>{formatBytes(img.compressed.compressedSize)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadFile(img.compressed.file, img.compressed.filename);
                            }}
                            className="p-1 hover:text-cyan-400"
                            title="Download this image"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Settings Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ImageSettings
              settings={settings}
              setSettings={setSettings}
            />

            {/* Individual Item Download */}
            {currentItem && (
              <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-400">Current Image Export</span>
                <button
                  onClick={() => downloadFile(currentItem.compressed.file, currentItem.compressed.filename)}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Selected Image
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}