import React from 'react';
import { Scissors, ImageIcon, Video, Sparkles, Shield, Zap, ArrowRight, CheckCircle2, Lock, Cpu, Clock, Layers, Star, Download, ChevronRight } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { BLOG_POSTS } from '../data/blogData';

export default function HomePage({ onNavigate, onLaunchTool }) {
  return (
    <div className="flex flex-col gap-20 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center flex flex-col items-center max-w-4xl mx-auto">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold mb-6 shadow-lg shadow-cyan-500/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>v2.0 Next-Gen Client-Side Media Suite</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 font-mono">100% Private in Browser</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-100 mb-6">
          High-Speed Media Tools{' '}
          <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Without Cloud Limits.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
          Compress images and videos, or upload <strong className="text-slate-200">30+ min long videos</strong> to automatically generate viral clips &mdash; with an automated <strong className="text-cyan-400">5-second dynamic Part # and Title intro bumper</strong> on every clip. Zero uploads, zero subscription fees.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onLaunchTool('clipper')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Scissors className="w-4 h-4 text-slate-950" />
            <span>Launch Video Auto-Clipper</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => onNavigate('tools')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-bold text-sm transition-all"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore All 3 Tools</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2 p-2">
            <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Min 30s Clip Duration</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>5s Dynamic Intro Bumpers</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Cpu className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>GPU Hardware Accelerated</span>
          </div>
        </div>
      </section>

      {/* Featured Tools Showcase */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Core Application Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
              Powerful In-Browser Creative Tools
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All Tools &amp; Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS_DATA.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${tool.accentBg} ${tool.accentBorder} border flex items-center justify-center ${tool.accentText} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {tool.tagline}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6">
                    {tool.highlights.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onLaunchTool(tool.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 hover:from-cyan-500 hover:via-indigo-500 hover:to-purple-500 text-cyan-300 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate(`tool-${tool.id}`)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
                    title="View Guide, Instructions & FAQs"
                  >
                    Guide
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Workflow */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>Client-Side Engine Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            How MediaForge Pro Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Lightning-fast browser execution without transferring a single byte over the wire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black text-sm flex items-center justify-center">
              01
            </div>
            <h4 className="font-bold text-sm text-slate-200">Load Media Locally</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drag and drop any image or long video (30+ min supported). File is loaded into your browser’s secure local memory instantly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono font-black text-sm flex items-center justify-center">
              02
            </div>
            <h4 className="font-bold text-sm text-slate-200">Configure &amp; Overlay</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select clip duration (min 30s option), quality preset, or customize the 5-second dynamic Part # and Title intro bumper templates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono font-black text-sm flex items-center justify-center">
              03
            </div>
            <h4 className="font-bold text-sm text-slate-200">Hardware Acceleration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              HTML5 Canvas and MediaStream APIs use your local GPU to re-encode video and render overlays at peak 60fps throughput.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black text-sm flex items-center justify-center">
              04
            </div>
            <h4 className="font-bold text-sm text-slate-200">Batch ZIP Download</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect before-and-after fidelity, download individual clips, or export all segments into a single organized ZIP package.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix: Us vs Cloud Converters */}
      <section className="flex flex-col gap-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Clear Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
            MediaForge Pro vs Traditional Cloud Tools
          </h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-5">Feature / Metric</th>
                <th className="p-4 sm:p-5 text-cyan-400 font-black">MediaForge PRO</th>
                <th className="p-4 sm:p-5 text-slate-400">Traditional Cloud Converters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-slate-200">Data Privacy &amp; Security</td>
                <td className="p-4 sm:p-5 text-emerald-400 font-bold flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  100% Client-Side. Never leaves your PC.
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Uploaded to third-party cloud servers</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-slate-200">Upload Bandwidth &amp; Wait Time</td>
                <td className="p-4 sm:p-5 text-cyan-400 font-bold">
                  Zero upload delay (Instant local processing)
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Minutes or hours spent uploading gigabytes</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-slate-200">Long-Form Video Auto-Clipper</td>
                <td className="p-4 sm:p-5 text-purple-400 font-bold">
                  Splits 30+ min videos with 5s dynamic Title &amp; Part # intro
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Manual cutting or expensive monthly SaaS</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-slate-200">Enforced Minimum Duration Option</td>
                <td className="p-4 sm:p-5 text-slate-200 font-bold">
                  Enforces ≥ 30s clips for optimal Shorts retention
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Arbitrary or missing duration controls</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-slate-200">Cost &amp; Watermarks</td>
                <td className="p-4 sm:p-5 text-emerald-400 font-bold">
                  100% Free, No Watermark, No Login
                </td>
                <td className="p-4 sm:p-5 text-slate-400">$15 - $30/month or ugly watermarks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Blog Highlights */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">
              Educational Guides &amp; Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
              Latest from the MediaForge Blog
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate(`blog-${post.id}`)}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {post.category}
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span>By {post.author}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-cyan-600/20 via-indigo-600/20 to-purple-600/20 border border-cyan-500/30 text-center flex flex-col items-center gap-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Zap className="w-7 h-7" />
        </div>
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-100">
            Ready to Process Media at Lightning Speed?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            No signup, no server uploads, and no monthly fees. Start clipping 30+ min videos or compressing your files right now in your browser.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onLaunchTool('clipper')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            Start Video Auto-Clipper
          </button>
          <button
            onClick={() => onLaunchTool('image')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all"
          >
            Compress Images
          </button>
          <button
            onClick={() => onLaunchTool('video')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all"
          >
            Compress Videos
          </button>
        </div>
      </section>

    </div>
  );
}
