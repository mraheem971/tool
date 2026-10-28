import React, { useState, useEffect } from 'react';
import { Bug, Send, CheckCircle2, AlertTriangle, Monitor, Sparkles, Terminal } from 'lucide-react';
import { addBugReport } from '../services/adminStore';

export default function ReportBug() {
  const [submitted, setSubmitted] = useState(false);
  const [sysInfo, setSysInfo] = useState({
    browser: 'Loading...',
    os: 'Detecting...',
    screen: '...',
    userAgent: ''
  });

  const [formData, setFormData] = useState({
    tool: 'Video Auto-Clipper',
    severity: 'Medium',
    title: '',
    steps: '',
    expected: '',
    actual: '',
    consoleLog: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      let browser = 'Unknown Browser';
      if (ua.includes('Chrome')) browser = 'Google Chrome / Chromium';
      else if (ua.includes('Safari')) browser = 'Apple Safari';
      else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
      else if (ua.includes('Edg')) browser = 'Microsoft Edge';

      let os = 'Unknown OS';
      if (ua.includes('Win')) os = 'Windows';
      else if (ua.includes('Mac')) os = 'macOS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

      setSysInfo({
        browser,
        os,
        screen: `${window.screen.width} × ${window.screen.height}`,
        userAgent: ua
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.steps) return;
    addBugReport({ ...formData, sysInfo });
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20">
      
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
          <Bug className="w-3.5 h-3.5" />
          <span>Quality &amp; Stability Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Report a Bug
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Encountered an issue or glitch during video processing? Help us improve MediaForge Pro by providing technical diagnostic details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Bug Form */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Bug Report Filed!</h3>
              <p className="text-xs text-slate-400 max-w-md">
                Thank you for contributing to the stability of MediaForge Pro. Our core engineers will investigate the diagnostic telemetry.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Affected Tool</label>
                  <select
                    value={formData.tool}
                    onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-red-400"
                  >
                    <option>Video Auto-Clipper (30+ Min)</option>
                    <option>5-Second Intro Bumper Overlay</option>
                    <option>Image Compressor &amp; Comparison Slider</option>
                    <option>Video Compressor &amp; Bitrate Engine</option>
                    <option>ZIP Batch Exporter</option>
                    <option>General UI / Responsive Layout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Severity Level</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-red-400"
                  >
                    <option>Low (Cosmetic / Typo)</option>
                    <option>Medium (Functional Glitch)</option>
                    <option>High (Export Fails on Some Files)</option>
                    <option>Critical (Browser Tab Crashes)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Summary / Issue Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Export freezes at 85% on 4K MKV files"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Steps to Reproduce *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                  placeholder="1. Drop a 45-minute video&#10;2. Select 60s clip duration&#10;3. Click Batch Export All"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-400 resize-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Expected Behavior</label>
                  <input
                    type="text"
                    value={formData.expected}
                    onChange={(e) => setFormData({ ...formData, expected: e.target.value })}
                    placeholder="Should complete ZIP export"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Actual Behavior</label>
                  <input
                    type="text"
                    value={formData.actual}
                    onChange={(e) => setFormData({ ...formData, actual: e.target.value })}
                    placeholder="Progress spinner stays stuck"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Browser Console Logs (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.consoleLog}
                  onChange={(e) => setFormData({ ...formData, consoleLog: e.target.value })}
                  placeholder="Paste error logs from Developer Tools (F12 > Console) if available..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-red-400 resize-none font-mono text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all mt-2"
              >
                <Send className="w-4 h-4" /> Submit Diagnostic Report
              </button>
            </form>
          )}
        </div>

        {/* Auto-detected Environment Telemetry (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" /> Auto-Detected System
            </h4>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Detected Browser</span>
                <p className="text-slate-200 font-mono font-bold">{sysInfo.browser}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Operating System</span>
                <p className="text-slate-200 font-mono font-bold">{sysInfo.os}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Screen Resolution</span>
                <p className="text-slate-200 font-mono font-bold">{sysInfo.screen}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed">
              This telemetry is attached to your bug ticket to help reproduce rendering issues across specific browser hardware.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
