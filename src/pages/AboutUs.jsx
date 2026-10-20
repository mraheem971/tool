import React from 'react';
import { ShieldCheck, Zap, Heart, Users, Sparkles, Terminal, Lock, Globe, Award } from 'lucide-react';

export default function AboutUs({ onNavigate, onLaunchTool }) {
  return (
    <div className="flex flex-col gap-16 pb-20 max-w-5xl mx-auto">
      
      {/* Hero */}
      <div className="text-center flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission &amp; Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          About MediaForge PRO
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Pioneering a zero-server, high-performance media manipulation studio built directly into modern web browsers.
        </p>
      </div>

      {/* The Story & Why We Built This */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-6 text-sm text-slate-300 leading-relaxed shadow-xl">
        <h2 className="text-2xl font-black text-white">
          Why We Built MediaForge Pro
        </h2>
        <p>
          For over two decades, working with digital media on the internet required compromise. If you wanted to compress a 4K video, convert images in bulk, or slice a 1-hour podcast into short viral clips, you had two unenviable choices:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
            <strong className="block text-white text-sm mb-1">1. Heavy Desktop Software</strong>
            Complex \$300+ professional video editing suites with steep learning curves, gigabyte installers, and prohibitive licensing fees.
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            <strong className="block text-white text-sm mb-1">2. Cloud "Free" Converters</strong>
            Websites that force you to upload private files to mystery cloud servers, queue your jobs for minutes, inject ads, or watermark your exports.
          </div>
        </div>
        <p>
          We believed there was a better way: <strong>the modern web browser is already a supercomputer</strong>. With hardware-accelerated 2D Canvas rendering, the Web Audio API, and client-side MediaStream Recording, modern browsers can manipulate media at native GPU speeds without sending a single byte over the wire.
        </p>
      </section>

      {/* Core Values / Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Radical Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your videos and photos never touch a cloud bucket. Everything happens inside your device's memory. Safe for confidential business materials, personal archives, and unreleased content.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Zero Upload Friction</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Why wait 20 minutes to upload a 2GB stream just to trim it? MediaForge accesses local file buffers instantly, cutting turnaround times from hours to seconds.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">High Standards for Creators</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            From our enforced minimum 30-second clip duration to dynamic 5-second intro bumpers with customizable themes, every feature is tailored for viral engagement and retention.
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 flex flex-col gap-4 text-xs text-slate-400">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" /> Technology Stack
        </h3>
        <p>
          MediaForge Pro is built with React 19, Vite, Tailwind CSS, Lucide React, JSZip, and native HTML5/W3C Web APIs (CanvasRenderingContext2D, MediaStream Recording, Web Audio AudioContext, and Blob URLs).
        </p>
      </section>

    </div>
  );
}
