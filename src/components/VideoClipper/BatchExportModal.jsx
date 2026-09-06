import React, { useEffect } from 'react';
import { RefreshCw, Download, CheckCircle2, XCircle, Archive, Sparkles, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatDuration, formatBytes } from '../../utils/formatters';
import { downloadFile } from '../../services/zipExporter';

export default function BatchExportModal({
  isOpen,
  onClose,
  exportState,
  onCancel,
  onDownloadZip
}) {
  const { isRunning, currentClipIndex, totalToExport, currentClipProgress, exportedClips, isCompleted, error } = exportState;

  useEffect(() => {
    if (isCompleted && exportedClips.length > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCompleted, exportedClips.length]);

  if (!isOpen) return null;

  const overallPercent = totalToExport > 0
    ? Math.round(((currentClipIndex + (currentClipProgress / 100)) / totalToExport) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-cyan-500/30 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {isCompleted ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <RefreshCw className="w-5 h-5 animate-spin" />}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">
                {isCompleted ? 'Clips Exported Successfully!' : 'Rendering & Embedding 5s Intro...'}
              </h3>
              <p className="text-xs text-slate-400">
                {isCompleted
                  ? `All ${exportedClips.length} clips generated with Title & Part # intro`
                  : `Processing Part ${currentClipIndex + 1} of ${totalToExport}`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Display (While Running) */}
        {isRunning && (
          <div className="flex flex-col gap-5">
            
            {/* Overall Progress */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Overall Batch Progress</span>
                <span className="font-mono text-cyan-400 font-bold">{Math.min(100, overallPercent)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, overallPercent)}%` }}
                />
              </div>
            </div>

            {/* Current Clip Progress */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-400" />
                  Currently Encoding Part {currentClipIndex + 1}
                </span>
                <span className="font-mono text-slate-400 font-bold">{currentClipProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-150"
                  style={{ width: `${currentClipProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-purple-400">
                  <Sparkles className="w-3 h-3" />
                  Embedding 5s dynamic title overlay
                </span>
                <span>Hardware acceleration active</span>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="flex justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500/40 text-xs font-semibold text-slate-400 hover:text-red-400 transition-all"
              >
                Cancel Export
              </button>
            </div>
          </div>
        )}

        {/* Completed View */}
        {isCompleted && (
          <div className="flex flex-col gap-5">
            {/* List of generated clips */}
            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
              {exportedClips.map((c) => (
                <div
                  key={c.clipId}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      PART {String(c.partNumber).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">{c.filename}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400">{formatBytes(c.size)}</span>
                    <button
                      onClick={() => downloadFile(c.blob, c.filename)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all"
                      title="Download clip"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onDownloadZip}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Archive className="w-4 h-4" />
                Download All in ZIP ({exportedClips.length} Clips)
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
