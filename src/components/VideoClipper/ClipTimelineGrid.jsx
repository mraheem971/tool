import React from 'react';
import { Play, Download, CheckSquare, Square, Film, Clock, Sparkles } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';

export default function ClipTimelineGrid({
  clips,
  activeClipIndex,
  setActiveClipIndex,
  onToggleClipSelect,
  onToggleSelectAll,
  onExportSingleClip,
  isExporting
}) {
  const selectedCount = clips.filter(c => c.selected).length;
  const isAllSelected = selectedCount === clips.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Grid Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSelectAll}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-all"
          >
            {isAllSelected ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4 text-slate-500" />}
            <span>{isAllSelected ? 'Deselect All' : 'Select All'} ({selectedCount}/{clips.length})</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Click any card to preview with 5s Intro
        </div>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-1">
        {clips.map((clip, index) => {
          const isActive = activeClipIndex === index;
          return (
            <div
              key={clip.id}
              onClick={() => setActiveClipIndex(index)}
              className={`glass-panel rounded-2xl p-3 flex flex-col gap-3 transition-all cursor-pointer border ${
                isActive
                  ? 'border-cyan-400 ring-2 ring-cyan-500/20 shadow-xl shadow-cyan-500/10'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleClipSelect(clip.id);
                    }}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {clip.selected ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    PART {String(clip.partNumber).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{formatDuration(clip.duration)}</span>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 group">
                {clip.thumbnailUrl ? (
                  <img
                    src={clip.thumbnailUrl}
                    alt={`Part ${clip.partNumber}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-slate-900/60">
                    <Film className="w-6 h-6 text-slate-700" />
                    <span className="text-[10px] text-slate-500 font-medium">Part {clip.partNumber}</span>
                  </div>
                )}

                {/* 5s Intro Badge Over Thumbnail */}
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-slate-900/90 text-[9px] font-extrabold text-cyan-300 border border-cyan-500/30 flex items-center gap-1 backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  5s Intro Embedded
                </div>

                {/* Hover Play overlay */}
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Timestamp Details & Individual Export */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                <span className="font-mono text-slate-400 text-[11px]">
                  {formatDuration(clip.startTime)} - {formatDuration(clip.endTime)}
                </span>

                <button
                  disabled={isExporting}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportSingleClip(clip);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-semibold text-[11px] text-slate-300 transition-all"
                  title="Export and download this clip"
                >
                  <Download className="w-3 h-3" />
                  <span>Export</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}