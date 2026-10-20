import React, { useState } from 'react';
import { 
  Scissors, ImageIcon, Video, Sparkles, ShieldCheck, ArrowRight, 
  Layers, BookOpen, HelpCircle, ChevronRight, CheckCircle2
} from 'lucide-react';
import VideoClipper from '../components/VideoClipper/VideoClipper';
import ImageCompressor from '../components/ImageCompressor/ImageCompressor';
import VideoCompressor from '../components/VideoCompressor/VideoCompressor';

export default function Home({ onNavigate, onLaunchTool }) {
  // Active tool tab on home: 'clipper' | 'image' | 'video'
  const [activeTool, setActiveTool] = useState('clipper');

  return (
    <div className="flex flex-col gap-10 pb-16">
      
      {/* 1. CLEAN TOP STUDIO TOOL SELECTOR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto p-1">
          <button
            onClick={() => setActiveTool('clipper')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTool === 'clipper'
                ? 'bg-gradient-to-r from-purple-500/25 to-indigo-500/25 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Scissors className="w-4 h-4 text-purple-400" />
            <span>Video Auto-Clipper</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
              30+ Min • 5s Intro
            </span>
          </button>

          <button
            onClick={() => setActiveTool('image')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTool === 'image'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Image Compressor</span>
          </button>

          <button
            onClick={() => setActiveTool('video')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTool === 'video'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Video className="w-4 h-4 text-indigo-400" />
            <span>Video Compressor</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 px-3">
          <button
            onClick={() => onNavigate('tool-detail', activeTool === 'clipper' ? 'video-clipper' : activeTool === 'image' ? 'image-compressor' : 'video-compressor')}
            className="hover:text-cyan-400 font-semibold transition-colors"
          >
            View Instructions &amp; FAQs &rarr;
          </button>
        </div>
      </div>

      {/* 2. LIVE INTERACTIVE TOOL (No clutter, 100% functional) */}
      <div className="min-h-[500px]">
        {activeTool === 'clipper' && <VideoClipper />}
        {activeTool === 'image' && <ImageCompressor />}
        {activeTool === 'video' && <VideoCompressor />}
      </div>

      {/* 3. QUICK NAVIGATION CARDS (Only show if user clicks or wants to explore) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-900">
        <button
          onClick={() => onNavigate('tools')}
          className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 text-left flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">More Tools</h4>
              <p className="text-[11px] text-slate-500">Audio extractor, resizer &amp; format converters</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
        </button>

        <button
          onClick={() => onNavigate('help')}
          className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/40 text-left flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-purple-300 transition-colors">Help MediaForge</h4>
              <p className="text-[11px] text-slate-500">FAQs &amp; 30+ min clipping guide</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
        </button>

        <button
          onClick={() => onNavigate('blog')}
          className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/40 text-left flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">Creator Blog</h4>
              <p className="text-[11px] text-slate-500">5-second hook secrets &amp; tutorials</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
        </button>
      </div>

    </div>
  );
}
