import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageCompressor from './components/ImageCompressor/ImageCompressor';
import VideoCompressor from './components/VideoCompressor/VideoCompressor';
import VideoClipper from './components/VideoClipper/VideoClipper';
import { Sparkles, Shield, Zap, Scissors, Image as ImageIcon, Video, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('clipper'); // Default to Video Clipper as requested

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Background Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-indigo-600/10 blur-[130px] pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {activeTab === 'clipper' && <VideoClipper />}
        {activeTab === 'image' && <ImageCompressor />}
        {activeTab === 'video' && <VideoCompressor />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#060910] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-200">MediaForge PRO</span>
            <span>• High Performance Media Compression & Video Auto-Clipper</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Shield className="w-3.5 h-3.5" /> 100% Client-Side Safe
            </span>
            <span>•</span>
            <span>Min 30s Clip Duration</span>
            <span>•</span>
            <span>5s Dynamic Intro Bumpers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
