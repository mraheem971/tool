import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Columns, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { formatBytes } from '../../utils/formatters';

export default function ComparisonSlider({ originalItem, compressedItem }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  if (!originalItem || !compressedItem) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          Interactive Split Comparison
        </span>
        <span>Drag center handle to inspect quality</span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden select-none bg-slate-950/80 border border-slate-800 cursor-ew-resize group shadow-2xl"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* Compressed Image (Full Background) */}
        <img
          src={compressedItem.url}
          alt="Compressed preview"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Original Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={originalItem.url}
            alt="Original preview"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-white to-purple-500 pointer-events-none shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Thumb Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Columns className="w-4 h-4 text-cyan-300 rotate-90" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Original: {formatBytes(originalItem.size)} ({originalItem.width}×{originalItem.height})
          </div>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Optimized: {formatBytes(compressedItem.compressedSize)} ({compressedItem.width}×{compressedItem.height})
            <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-extrabold border border-emerald-500/30">
              -{compressedItem.savingsPercent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
