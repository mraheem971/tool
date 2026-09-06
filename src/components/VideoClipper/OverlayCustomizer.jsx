import React from 'react';
import { Sparkles, Palette, Type, Layout, Sliders, Check, Eye } from 'lucide-react';
import { OVERLAY_TEMPLATES, OVERLAY_POSITIONS } from '../../utils/canvasOverlay';

export default function OverlayCustomizer({ options, setOptions }) {
  const colorOptions = [
    { label: 'Cyan', color: '#06B6D4' },
    { label: 'Emerald', color: '#10B981' },
    { label: 'Violet', color: '#8B5CF6' },
    { label: 'Pink', color: '#EC4899' },
    { label: 'Amber', color: '#F59E0B' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-slate-100">5-Second Dynamic Intro Overlay</h3>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
          Auto 5s Title & Part #
        </span>
      </div>

      {/* Video Title Input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-cyan-400" />
          Clip Video Title
        </label>
        <input
          type="text"
          value={options.title}
          placeholder="e.g. Masterclass Episode 1"
          onChange={(e) => setOptions({ ...options, title: e.target.value })}
          className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <p className="text-[11px] text-slate-500">
          This title will be prominently displayed alongside "PART [X]" during the first 5 seconds.
        </p>
      </div>

      {/* Subtitle / CTA */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Subtitle / Call-To-Action (CTA)
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={options.showSubtitle !== false}
              onChange={(e) => setOptions({ ...options, showSubtitle: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Enable</span>
          </label>
        </div>
        <input
          type="text"
          disabled={options.showSubtitle === false}
          value={options.subtitle}
          placeholder="e.g. ?? Follow for Part 2"
          onChange={(e) => setOptions({ ...options, subtitle: e.target.value })}
          className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
        />
      </div>

      {/* Template Theme Selector */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          Overlay Template Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OVERLAY_TEMPLATES.map((tpl) => {
            const isSelected = options.template === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => setOptions({ ...options, template: tpl.id })}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-100">{tpl.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{tpl.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Position & Accent Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
        
        {/* Position */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-cyan-400" />
            Position
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {OVERLAY_POSITIONS.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setOptions({ ...options, position: pos.id })}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                  options.position === pos.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Accent Glow Color
          </label>
          <div className="flex items-center gap-2 mt-1">
            {colorOptions.map((c) => {
              const isSelected = options.accentColor === c.color;
              return (
                <button
                  key={c.label}
                  onClick={() => setOptions({ ...options, accentColor: c.color })}
                  className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                    isSelected ? 'scale-125 ring-2 ring-white shadow-lg' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.label}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 font-bold" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
