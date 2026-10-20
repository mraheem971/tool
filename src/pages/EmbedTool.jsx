import React, { useState } from 'react';
import { Code2, Copy, Check, ExternalLink, Sparkles, Sliders } from 'lucide-react';

export default function EmbedTool() {
  const [copied, setCopied] = useState(false);
  const [selectedTool, setSelectedTool] = useState('clipper');
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('700px');
  const [theme, setTheme] = useState('dark');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mediaforge-pro.app';
  const embedUrl = `${origin}/#${selectedTool}`;

  const embedSnippet = `<iframe
  src="${embedUrl}"
  width="${width}"
  height="${height}"
  style="border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 20px; overflow: hidden;"
  title="MediaForge PRO - ${selectedTool === 'clipper' ? 'Video Auto-Clipper' : selectedTool === 'image' ? 'Image Compressor' : 'Video Compressor'}"
  allow="accelerometer; camera; microphone; clipboard-write; encrypted-media; gyroscope;"
  loading="lazy"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20">
      
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Creator &amp; Publisher Widgets</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Embed MediaForge PRO
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Embed high-performance, 100% private video clipping and image compression directly onto your blog, educational platform, or internal company intranet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Controls (5 cols) */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-5 shadow-xl">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Widget Customizer
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Tool</label>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="clipper">Long Video Auto-Clipper (5s Intro)</option>
              <option value="image">Image Compressor (Before/After Slider)</option>
              <option value="video">Adaptive Video Compressor (Discord/Web)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Width</label>
              <select
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="100%">100% (Responsive)</option>
                <option value="800px">800px</option>
                <option value="600px">600px</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Height</label>
              <select
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="750px">750px (Recommended)</option>
                <option value="650px">650px</option>
                <option value="900px">900px</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Theme</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'dark' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Dark Cyber
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'light' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Adaptive
              </button>
            </div>
          </div>

          <div className="pt-2 text-xs text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 100% Client-side safe for iframe embedding
          </div>
        </div>

        {/* Code Output & Copy (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">HTML Embed Snippet</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Code!' : 'Copy Snippet'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed select-all">
              {embedSnippet}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-1">Embedding Instructions:</strong>
            Paste this snippet into WordPress (Custom HTML block), Webflow, Notion, Squarespace, Ghost, or any raw HTML template. The widget runs with zero backend dependencies.
          </div>
        </div>

      </div>

    </div>
  );
}
