import React from 'react';
import { Sliders, Maximize2, Zap, FileType, Check, ChevronDown, Sparkles } from 'lucide-react';

export default function ImageSettings({ settings, setSettings, onApplyAll }) {
  const compressionLevels = [
    { id: 'low', label: 'Low — best quality', quality: 0.92, scale: 100 },
    { id: 'medium', label: 'Medium — recommended', quality: 0.80, scale: 100 },
    { id: 'high', label: 'High — smaller file', quality: 0.60, scale: 85 },
    { id: 'extreme', label: 'Extreme — smallest file', quality: 0.40, scale: 65 },
    { id: 'custom', label: 'Custom — manual slider', quality: null, scale: null }
  ];

  const formats = [
    { id: 'image/webp', label: 'WebP', desc: 'Recommended (Best size/quality)' },
    { id: 'image/jpeg', label: 'JPEG', desc: 'Standard Universal' },
    { id: 'image/png', label: 'PNG', desc: 'Lossless & Transparency' },
    { id: 'image/avif', label: 'AVIF', desc: 'Next-Gen Ultra Compact' }
  ];

  const scalePresets = [
    { label: 'Original', value: 100 },
    { label: '75%', value: 75 },
    { label: '50%', value: 50 },
    { label: '25%', value: 25 }
  ];

  const handleLevelChange = (e) => {
    const levelId = e.target.value;
    const selected = compressionLevels.find(l => l.id === levelId);
    if (!selected) return;

    if (selected.id === 'custom') {
      setSettings({ ...settings, level: 'custom' });
    } else {
      setSettings({
        ...settings,
        level: selected.id,
        quality: selected.quality,
        scalePercent: selected.scale
      });
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-slate-100">Compression Settings</h3>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Instant Live Update
        </span>
      </div>

      {/* Compression Level Dropdown (Requested) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Compression level
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {Math.round(settings.quality * 100)}% Quality
          </span>
        </label>
        
        <div className="relative">
          <select
            value={settings.level || 'medium'}
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

      {/* Fine-tune Quality Slider */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Fine-tune Quality</label>
          <span className="text-xs font-bold font-mono text-cyan-400">
            {Math.round(settings.quality * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          value={Math.round(settings.quality * 100)}
          onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) / 100, level: 'custom' })}
          className="w-full"
        />
        <div className="flex justify-between text-[11px] font-medium text-slate-500">
          <span>Extreme (40%)</span>
          <span>High (60%)</span>
          <span>Medium (80%)</span>
          <span>Low (95%)</span>
        </div>
      </div>

      {/* Format Selector */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <FileType className="w-3.5 h-3.5 text-cyan-400" />
          Output Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          {formats.map((fmt) => {
            const isSelected = settings.format === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setSettings({ ...settings, format: fmt.id })}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/5'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">{fmt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{fmt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dimension Resize */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
          Resize Dimensions
        </label>
        <div className="grid grid-cols-4 gap-2">
          {scalePresets.map((sc) => (
            <button
              key={sc.value}
              onClick={() => setSettings({ ...settings, scalePercent: sc.value, level: 'custom' })}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                settings.scalePercent === sc.value
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
