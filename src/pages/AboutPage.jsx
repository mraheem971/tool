import React from 'react';
import { Shield, Zap, Sparkles, Cpu, Lock, Heart, Users, CheckCircle2, ArrowRight, Scissors, Terminal, Globe } from 'lucide-react';

export default function AboutPage({ onNavigate, onLaunchTool }) {
  return (
    <div className="flex flex-col gap-16 pb-16 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <section className="text-center pt-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Globe className="w-3.5 h-3.5" />
          <span>About MediaForge PRO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
          Empowering Creators with{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Privacy-First Media Tools
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-4 leading-relaxed">
          MediaForge Pro was born out of a simple conviction: modern web browsers are powerful enough to edit and compress high-definition media without sending your private files to cloud servers.
        </p>
      </section>

      {/* Metrics Counter Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 text-center flex flex-col items-center">
          <span className="font-mono text-3xl font-black text-cyan-400">0 MB</span>
          <span className="text-xs text-slate-400 mt-1">Uploaded to External Servers</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 text-center flex flex-col items-center">
          <span className="font-mono text-3xl font-black text-purple-400">100%</span>
          <span className="text-xs text-slate-400 mt-1">In-Browser Client-Side Processing</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 text-center flex flex-col items-center">
          <span className="font-mono text-3xl font-black text-emerald-400">30+ min</span>
          <span className="text-xs text-slate-400 mt-1">Long-Form Video Support</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 text-center flex flex-col items-center">
          <span className="font-mono text-3xl font-black text-amber-400">$0</span>
          <span className="text-xs text-slate-400 mt-1">Zero Paywalls or Watermarks</span>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/40 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Our Origin Story</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
          Why We Built MediaForge PRO
        </h2>
        <div className="text-slate-300 text-sm leading-relaxed space-y-4">
          <p>
            As podcasters, developers, and video creators ourselves, we grew exhausted by the state of online media tools. Every time we needed to compress an image, optimize a gaming clip for Discord, or extract bite-sized shorts from an hour-long podcast, we encountered the same roadblocks:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li><strong>Intrusive Uploads</strong>: Handing unreleased podcast recordings and personal media over to unknown cloud servers.</li>
            <li><strong>Artificial Restrictions</strong>: Being blocked by 50 MB or 10-minute file size limits on "free tiers".</li>
            <li><strong>Aggressive Watermarks</strong>: Discovering huge logos stamped across our videos after waiting 10 minutes in a queue.</li>
            <li><strong>Subscription Fatigue</strong>: Demands for \$25/month just to perform basic bitrate compression or video splitting.</li>
          </ul>
          <p>
            We realized that modern standards like HTML5 Canvas, Web Audio API, and the MediaStream Recording API made centralized cloud rendering obsolete for these tasks. MediaForge Pro was engineered to provide desktop-grade speed and reliability right inside Chrome, Firefox, Edge, and Safari.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Our Foundational Principles</span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">What Sets Us Apart</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-100">Absolute Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your media never touches any external server or third-party database. All processing runs entirely on your device’s local memory.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-100">Hardware Accelerated</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leverages your computer’s GPU to re-encode video frames and apply dynamic 5s title overlays at fluid 60 frames per second.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-100">Open &amp; Accessible</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No mandatory account creation, zero credit card requests, and zero watermarks stamped on your creative content.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Breakdown */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Technology Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">Built On Open Web Standards</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-cyan-300 mb-1">HTML5 2D Canvas</h4>
            <p className="text-slate-400">Real-time compositing of 5-second dynamic bumpers, title typography, and format rasterization.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-purple-300 mb-1">MediaRecorder API</h4>
            <p className="text-slate-400">Hardware-accelerated video transcoding into clean MP4 and WebM containers at custom bitrates.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-emerald-300 mb-1">Web Audio API</h4>
            <p className="text-slate-400">Multi-channel audio processing and track synchronization to ensure zero audio drift or desync.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-amber-300 mb-1">JSZip &amp; Streams</h4>
            <p className="text-slate-400">High-speed client-side archive packaging for instant one-click batch ZIP downloads.</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <div className="text-center flex flex-col items-center gap-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-100">Experience the Privacy Revolution</h3>
        <p className="text-xs text-slate-400 max-w-md">
          Explore our complete suite of in-browser creative tools and take back control of your media.
        </p>
        <button
          onClick={() => onLaunchTool('clipper')}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          Launch Video Auto-Clipper
        </button>
      </div>

    </div>
  );
}
