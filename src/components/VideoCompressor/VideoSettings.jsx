import React from 'react';
import { Sliders, Zap, Video, Volume2, VolumeX, Sparkles, Check, ChevronDown, Target, Scale } from 'lucide-react';
import { formatBytes } from '../../utils/formatters';

export default function VideoSettings({ settings, setSettings, videoMeta, isCompressing }) {
  const compressionLevels = [
    { id: 'medium', label: 'Medium — recommended (~50% smaller)', desc: 'Balanced compression with sharp quality' },
    { id: 'high', label: 'High — smaller file (~70% smaller)', desc: 'Optimized for quick sharing & low storage' },
    { id: 'extreme', label: 'Extreme — smallest file (~85% smaller)', desc: 'Maximum compression down to tiny size' },
    { id: 'low', label: 'Low — best quality (~30% smaller)', desc: 'Maximum visual fidelity' },
    { id: 'target_size', label: 'Custom Target Size (MB)', desc: 'Compress video to exact target size in MB' },
    { id: 'custom', label: 'Custom — manual bitrate', desc: 'Manual resolution and bitrate control' }
  ];

  const presets = [
    {
      id: 'discord_8',
      name: 'Discord Free (8 MB)',
      desc: 'Fits within 8MB upload limit',
      targetSizeMB: 7.8
    },
    {
      id: 'discord_25',
      name: 'Discord (25 MB)',
      desc: 'Fits within 25MB upload limit',
      targetSizeMB: 24.0
    },
    {
      id: 'whatsapp_16',
      name: 'WhatsApp (16 MB)',
      desc: 'Optimized for messaging apps',
      targetSizeMB: 15.5
    },
    {
      id: 'tiny_1mb',
      name: 'Tiny Web (1 MB)',
      desc: 'Ultra compact 1MB video',
      targetSizeMB: 1.0
    }
  ];

  const resolutions = [
    { id: 'auto', label: 'Auto Smart' },
    { id: 'original', label: 'Original Res' },
    { id: '720p', label: '720p HD' },
    { id: '480p', label: '480p SD' },
    { id: '360p', label: '360p Mobile' },
    { id: '50%', label: '50% Scale' }
  ];

  // Calculate estimated size for display
  let estimatedBytes = null;
  if (videoMeta?.size && videoMeta?.duration) {
    if (settings.targetSizeMB) {
      estimatedBytes = settings.targetSizeMB * 1024 * 1024;
    } else {
      switch (settings.level) {
        case 'low':
          estimatedBytes = Math.round(videoMeta.size * 0.65);
          break;
        case 'medium':
          estimatedBytes = Math.round(videoMeta.size * 0.45);
          break;
        case 'high':
          estimatedBytes = Math.round(videoMeta.size * 0.25);
          break;
        case 'extreme':
          estimatedBytes = Math.round(videoMeta.size * 0.12);
          break;
        case 'custom':
          estimatedBytes = Math.round(((settings.videoBitrateKbps || 1200) * 1000 * videoMeta.duration) / 8);
          break;
        default:
          estimatedBytes = Math.round(videoMeta.size * 0.45);
      }
    }
  }

  const handleLevelChange = (e) => {
    const levelId = e.target.value;
    if (levelId === 'target_size') {
      const defaultMB = Math.max(0.5, Math.round((videoMeta?.size ? (videoMeta.size / (1024 * 1024)) * 0.5 : 2) * 10) / 10);
      setSettings({
        ...settings,
        level: 'target_size',
        targetSizeMB: defaultMB
      });
    } else if (levelId === 'custom') {
      setSettings({
        ...settings,
        level: 'custom',
        targetSizeMB: null
      });
    } else {
      setSettings({
        ...settings,
        level: levelId,
        targetSizeMB: null,
        targetResolution: 'auto'
      });
    }
  };

  const handleTargetSizeChange = (mb) => {
    const valid = Math.max(0.2, parseFloat(mb) || 0.5);
    setSettings({
      ...settings,
      level: 'target_size',
      targetSizeMB: valid
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-slate-100">Video Compression Controls</h3>
        </div>
        {estimatedBytes && (
          <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30 shadow-sm">
            Target: ~{formatBytes(estimatedBytes)}
          </span>
        )}
      </div>

      {/* Compression Level Dropdown (Requested) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Compression level
          </span>
          {videoMeta && (
            <span className="text-[11px] font-mono text-slate-400">
              Original: {formatBytes(videoMeta.size)}
            </span>
          )}
        </label>
        
        <div className="relative">
          <select
            disabled={isCompressing}
            value={settings.level || 'medium'}
            onChange={handleLevelChange}
            className="w-full bg-slate-900 border-2 border-slate-700 hover:border-cyan-500/50 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-100 appearance-none cursor-pointer outline-none transition-all shadow-md disabled:opacity-50"
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

      {/* Direct Target File Size Slider (When target_size is active) */}
      {settings.level === 'target_size' && (
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              Target Output Size (MB)
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                step="0.1"
                min="0.2"
                max="500"
                value={settings.targetSizeMB || 1.0}
                onChange={(e) => handleTargetSizeChange(e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 text-center rounded-lg px-2 py-1 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
              <span className="text-xs font-mono font-bold text-slate-400">MB</span>
            </div>
          </div>
          <input
            type="range"
            min="0.2"
            max={videoMeta?.size ? Math.max(2, (videoMeta.size / (1024 * 1024)).toFixed(1)) : 25}
            step="0.1"
            value={settings.targetSizeMB || 1.0}
            onChange={(e) => handleTargetSizeChange(e.target.value)}
            className="w-full"
          />
          <p className="text-[11px] text-slate-400">
            Automatically computes the exact optimal video and audio bitrates to hit this exact file size.
          </p>
        </div>
      )}

      {/* Quick Presets (Discord, WhatsApp, etc.) */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          Target App Limits
        </label>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((p) => {
            const isSelected = settings.level === 'target_size' && settings.targetSizeMB === p.targetSizeMB;
            return (
              <button
                key={p.id}
                disabled={isCompressing}
                onClick={() => setSettings({ ...settings, level: 'target_size', targetSizeMB: p.targetSizeMB })}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-100">{p.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Resolution & Bitrate Controls (Only shown for custom or fine-tuning) */}
      {settings.level === 'custom' && (
        <>
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              Target Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {resolutions.map((res) => (
                <button
                  key={res.id}
                  disabled={isCompressing}
                  onClick={() => setSettings({ ...settings, targetResolution: res.id, level: 'custom' })}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                    settings.targetResolution === res.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {res.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Video Bitrate</label>
              <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {settings.videoBitrateKbps || 1200} kbps
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              disabled={isCompressing}
              value={settings.videoBitrateKbps || 1200}
              onChange={(e) => setSettings({ ...settings, videoBitrateKbps: parseInt(e.target.value), level: 'custom', targetSizeMB: null })}
              className="w-full"
            />
          </div>
        </>
      )}

      {/* Audio Options */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2">
          {settings.muteAudio ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <div>
            <span className="text-xs font-bold text-slate-200">Mute Audio</span>
            <p className="text-[10px] text-slate-400">Strip sound track to maximize video savings</p>
          </div>
        </div>
        <button
          disabled={isCompressing}
          onClick={() => setSettings({ ...settings, muteAudio: !settings.muteAudio })}
          className={`w-11 h-6 rounded-full transition-colors relative ${
            settings.muteAudio ? 'bg-cyan-500' : 'bg-slate-800'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
              settings.muteAudio ? 'right-1' : 'left-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
