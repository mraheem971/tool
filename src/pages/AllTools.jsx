import React, { useState } from 'react';
import { 
  Scissors, ImageIcon, Video, Music, RefreshCw, Maximize2, 
  Search, Star, Sparkles, ArrowRight, ShieldCheck, Check
} from 'lucide-react';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';

// Map icon string to component
const ICON_MAP = {
  Scissors,
  ImageIcon,
  Video,
  Music,
  RefreshCw,
  Maximize2
};

export default function AllTools({ onNavigate, onLaunchTool }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10 pb-12">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full Tool Suite • 100% Free &amp; Private</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          All MediaForge Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          High-performance browser tools engineered for video creators, editors, developers, and social media managers. No file size limits and zero cloud uploads.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = ICON_MAP[tool.iconName] || Scissors;

          return (
            <div
              key={tool.id}
              className="group rounded-3xl p-6 bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/70 transition-all flex flex-col justify-between gap-5 shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.badge}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {tool.rating.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-cyan-400/90 mt-0.5">
                    {tool.tagline}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {tool.shortDesc}
                </p>

                {/* Mini Features List */}
                <div className="space-y-1.5 pt-1">
                  {tool.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate('tool-detail', tool.id)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-200 py-1.5 transition-colors"
                >
                  View Details &amp; FAQs
                </button>

                <button
                  onClick={() => onLaunchTool(tool.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Launch Tool <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-sm">No tools found matching "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-3 text-xs font-bold text-cyan-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  );
}
