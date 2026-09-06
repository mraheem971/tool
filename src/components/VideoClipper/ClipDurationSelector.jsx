import React from 'react';
import { Clock, ShieldAlert, Sparkles, Check, ChevronDown, Sliders } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';

export default function ClipDurationSelector({
  clipDuration,
  setClipDuration,
  totalVideoDuration,
  clipQuality,
  setClipQuality
}) {
  const compressionLevels = [
    { id: 'low', label: 'Low — best quality', bitrate: 4500, resolution: '1080p' },
    { id: 'medium', label: 'Medium — recommended', bitrate: 2800, resolution: '720p' },
    { id: 'high', label: 'High — smaller file', bitrate: 1400, resolution: '720p' },
    { id: 'extreme', label: 'Extreme — smallest file', bitrate: 700, resolution: '480p' }
  ];

  const presets = [
    { label: '30 sec', value: 30, desc: 'Min Duration' },
    { label: '45 sec', value: 45, desc: 'Quick Bites' },
    { label: '60 sec', value: 60, desc: 'TikTok / Shorts' },
    { label: '90 sec', value: 90, desc: 'Instagram Reels' },
    { label: '2 min', value: 120, desc: 'Mini Highlights' },
    { label: '3 min', value: 180, desc: 'Extended Clips' },
    { label: '5 min', value: 300, desc: 'Deep Dive Segments' }
  ];

  const estimatedClips = totalVideoDuration && totalVideoDuration > 0
    ? Math.max(1, Math.ceil(totalVideoDuration / clipDuration))
    : null;

  const handleCustomChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      // Enforce minimum 30 seconds
      setClipDuration(Math.max(30, val));
    }
  };

  const handleLevelChange = (e) => {
    const levelId = e.target.value;
    const selected = compressionLevels.find(l => l.id === levelId);
    if (selected && setClipQuality) {
      setClipQuality(selected);
    }
  };

  const currentLevelId = clipQuality?.id || 'medium';

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-slate-100">Clip Duration & Quality</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400">
          <span>Min Duration: 30s</span>
        </div>
      </div>

      {/* Compression Level Dropdown (Requested) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Compression level
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {clipQuality?.resolution || '720p'} • {clipQuality?.bitrate || 2800} kbps
          </span>
        </label>
        
        <div className="relative">
          <select
            value={currentLevelId}
            onChange={handleLevelChange}
            className="w-full bg-slate-900 border-2 border-slate-700 hover:border-cyan-500/50 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-100 appearance-none cursor-pointer outline-none transition-all shadow-md"
          >
            {compressionLevels.map((lvl) => (
              <option key={lvl.id} value={lvl.id} className="bg-slate-900 text-slate-100 py-2">
                {lvl.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Estimated Clips Info Card */}
      {estimatedClips && (
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400">Estimated Total Parts</span>
            <span className="text-sm font-bold text-slate-200">
              Generating <span className="text-cyan-400 font-mono font-extrabold">{estimatedClips} Clips</span> from {formatDuration(totalVideoDuration)} video
            </span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-black text-xs">
            {estimatedClips} Parts
          </div>
        </div>
      )}

      {/* Preset Duration Buttons Grid */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Target Duration Presets (= 30s)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((p) => {
            const isSelected = clipDuration === p.value;
            return (
              <button
                key={p.value}
                onClick={() => setClipDuration(p.value)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-100">{p.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Duration Input */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Custom Clip Duration (Seconds)
          </label>
          <span className="text-xs font-mono font-bold text-cyan-400">
            Current: {clipDuration}s ({formatDuration(clipDuration)})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="30"
            max="3600"
            value={clipDuration}
            onChange={handleCustomChange}
            className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <span className="text-xs font-bold text-slate-400">Seconds</span>
        </div>
        <p className="text-[11px] text-slate-500">
          * Duration must be at least 30 seconds.
        </p>
      </div>
    </div>
  );
}
