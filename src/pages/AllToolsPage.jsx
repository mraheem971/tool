import React, { useState } from 'react';
import { TOOLS_DATA } from '../data/toolsData';
import { Search, ArrowRight, CheckCircle2, Zap, Shield, Sparkles, Filter, Info, FileText } from 'lucide-react';

export default function AllToolsPage({ onNavigate, onLaunchTool }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Video Tools', 'Image Tools'];

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-12 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Complete In-Browser Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          All Creative &amp; Media Tools
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          High-performance, client-side media utilities powered by HTML5 Canvas, Web Audio, and the MediaStream API. Zero uploads, unlimited usage, and total privacy.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tools, formats, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${tool.accentBg} ${tool.accentBorder} border flex items-center justify-center ${tool.accentText}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {tool.badge}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  {tool.category}
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {tool.tagline}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {tool.highlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onLaunchTool(tool.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Open Tool in Studio</span>
                </button>
                <button
                  onClick={() => onNavigate(`tool-${tool.id}`)}
                  className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Instructions &amp; FAQs</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
          <p className="text-slate-400 text-sm">No tools found matching "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-3 text-xs text-cyan-400 underline font-bold"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Comprehensive Format Matrix */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Format &amp; Feature Compatibility Matrix</h3>
            <p className="text-xs text-slate-400">All tools operate locally in modern Chromium, Gecko (Firefox), and WebKit (Safari) engines.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Tool Name</th>
                <th className="p-3.5">Supported Inputs</th>
                <th className="p-3.5">Export Output Formats</th>
                <th className="p-3.5">Key Advantage</th>
                <th className="p-3.5">Server Transfer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3.5 font-bold text-purple-400">Long-Form Video Auto-Clipper</td>
                <td className="p-3.5 font-mono text-slate-300">MP4, MOV, WebM, MKV (30+ min)</td>
                <td className="p-3.5 font-mono text-cyan-300">Individual MP4/WebM + Batch ZIP</td>
                <td className="p-3.5">5s Title &amp; Part # Bumper + Min 30s clips</td>
                <td className="p-3.5 font-bold text-emerald-400">0 MB (Local)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-cyan-400">Lossless &amp; Efficient Image Compressor</td>
                <td className="p-3.5 font-mono text-slate-300">JPEG, PNG, WebP, AVIF, GIF</td>
                <td className="p-3.5 font-mono text-cyan-300">WebP, JPEG, PNG</td>
                <td className="p-3.5">Split Before/After slider + Up to 90% savings</td>
                <td className="p-3.5 font-bold text-emerald-400">0 MB (Local)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-emerald-400">Adaptive Video Compressor &amp; Resizer</td>
                <td className="p-3.5 font-mono text-slate-300">MP4, MOV, WebM, MKV</td>
                <td className="p-3.5 font-mono text-cyan-300">MP4 / WebM with Audio Sync</td>
                <td className="p-3.5">Target File Size Mode (Discord 25MB cap)</td>
                <td className="p-3.5 font-bold text-emerald-400">0 MB (Local)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
