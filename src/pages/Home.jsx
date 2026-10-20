import React from 'react';
import { 
  Scissors, ImageIcon, Video, Sparkles, Shield, Zap, ArrowRight, 
  CheckCircle2, Play, Flame, Layers, Clock, Cpu, FileArchive, 
  Download, Eye, Star, ChevronRight
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { BLOG_POSTS } from '../data/blogData';

export default function Home({ onNavigate, onLaunchTool }) {
  const featuredTools = TOOLS_DATA.slice(0, 3);
  const recentArticles = BLOG_POSTS.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative text-center pt-8 pb-12 px-4 sm:px-6">
        {/* Glow Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-6 shadow-inner animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Media Manipulation Suite • 100% Client-Side Processing</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Compress, Optimize &amp; Clip <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
            Long-Form Videos in Seconds
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
          The ultimate private creator studio. Slice <strong className="text-slate-200">30+ min long videos</strong> into sequential viral shorts with automatic <strong className="text-cyan-400">5-second dynamic Part # &amp; Title intro bumpers</strong>. Compress images and videos with zero server uploads.
        </p>

        {/* Quick Launch Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onLaunchTool('video-clipper')}
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Scissors className="w-5 h-5" />
            Launch Long Video Auto-Clipper
          </button>

          <button
            onClick={() => onLaunchTool('image-compressor')}
            className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all hover:border-slate-500"
          >
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            Image Compressor
          </button>

          <button
            onClick={() => onLaunchTool('video-compressor')}
            className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all hover:border-slate-500"
          >
            <Video className="w-5 h-5 text-purple-400" />
            Video Compressor
          </button>
        </div>

        {/* Key Guarantees Pill Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Private (No Cloud Uploads)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Hardware Accelerated (Canvas 2D + GPU)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Automatic 5-Second Intro Bumpers</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Zero File Size Limits</span>
          </div>
        </div>
      </section>

      {/* 2. THREE FLAGSHIP PILLARS SHOWCASE */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Long Video Clipper */}
        <div className="relative group rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-purple-500/30 hover:border-purple-500/60 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Scissors className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Flagship
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Long-Form Video Auto-Clipper
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Upload 30+ min podcasts, gameplay, or lectures. Auto-split into clips (min 30s) and automatically brand every single clip with a dynamic <strong className="text-cyan-400">5-second Part # &amp; Title intro bumper</strong>.
            </p>

            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Configurable clip duration (min 30s)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>4 intro bumper designer templates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Batch export into single ZIP archive</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => onNavigate('tool-detail', 'video-clipper')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Learn More &amp; FAQs
            </button>
            <button
              onClick={() => onLaunchTool('video-clipper')}
              className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 2: Image Compressor */}
        <div className="relative group rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-cyan-500/30 hover:border-cyan-500/60 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Popular
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              High-Speed Image Compressor
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Lossless and adaptive compression for WebP, JPG, PNG, and AVIF. Reduce file weights by up to 90% while viewing interactive side-by-side comparison slider.
            </p>

            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Split Before/After visual comparison</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>WebP conversion with alpha transparency</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Granular presets &amp; custom sliders</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => onNavigate('tool-detail', 'image-compressor')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Learn More &amp; FAQs
            </button>
            <button
              onClick={() => onLaunchTool('image-compressor')}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 3: Video Compressor */}
        <div className="relative group rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-indigo-500/30 hover:border-indigo-500/60 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Video className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Adaptive
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              Adaptive Video Compressor
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Target exact file sizes for Discord (8MB / 25MB), WhatsApp (16MB), and email attachments without compromising fluid motion or audio fidelity.
            </p>

            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Discord &amp; WhatsApp dedicated presets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Automatic bitrate calculator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Clean Web Audio multiplexing</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => onNavigate('tool-detail', 'video-compressor')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Learn More &amp; FAQs
            </button>
            <button
              onClick={() => onLaunchTool('video-compressor')}
              className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* 3. ALL TOOLS DIRECTORY PREVIEW */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Complete Media Toolkit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Explore All MediaForge Tools
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Every tool is private, 100% client-side, and free of arbitrary cloud limits.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tools')}
            className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All Tools Directory</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS_DATA.map((tool) => (
            <div
              key={tool.id}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 flex flex-col justify-between gap-4 transition-all hover:bg-slate-900/80"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {tool.category}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {tool.rating.split(' ')[0]}
                  </span>
                </div>
                
                <h4 className="text-base font-bold text-slate-100">{tool.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{tool.shortDesc}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onNavigate('tool-detail', tool.id)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-200"
                >
                  Guide &amp; FAQs
                </button>
                <button
                  onClick={() => onLaunchTool(tool.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
                >
                  Launch
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMPARISON: MEDIAFORGE PRO VS TRADITIONAL CLOUD CONVERTERS */}
      <section className="rounded-3xl p-8 sm:p-10 bg-slate-900/40 border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Why Creators Choose Us</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            MediaForge Pro vs. Traditional Cloud Tools
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Feature</th>
                <th className="py-3.5 px-4 text-cyan-400 font-bold bg-cyan-950/20 rounded-t-xl">MediaForge PRO</th>
                <th className="py-3.5 px-4 text-slate-500">Traditional Cloud Converters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-300">File Privacy &amp; Security</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400 bg-cyan-950/10">100% Client-Side (0 bytes sent to server)</td>
                <td className="py-3.5 px-4 text-slate-400">Files uploaded to third-party servers</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-300">File Size Limits</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400 bg-cyan-950/10">Unlimited (Processes up to multi-GB 4K files)</td>
                <td className="py-3.5 px-4 text-slate-400">Strict 50MB – 100MB paywalls</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-300">Long Video Auto-Clipping</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400 bg-cyan-950/10">Built-in (30+ min support + 5s dynamic intros)</td>
                <td className="py-3.5 px-4 text-slate-400">Expensive \$30/month AI credit subscriptions</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-300">Processing Speed</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400 bg-cyan-950/10">Instant local GPU &amp; Web Worker acceleration</td>
                <td className="py-3.5 px-4 text-slate-400">Delayed upload queues &amp; download bottlenecks</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-300">Pricing</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400 bg-cyan-950/10">100% Free Forever &amp; Open Source</td>
                <td className="py-3.5 px-4 text-slate-400">Aggressive ads, watermarks, monthly fees</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. RECENT BLOG & GUIDES PREVIEW */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Creator Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Latest Video &amp; Compression Guides
            </h2>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog-post', post.id)}
              className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div>
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-purple-300 border border-purple-500/30">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <span className="text-[11px] text-slate-500 font-mono">{post.publishedAt} • {post.readTime}</span>
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center gap-2 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 text-center flex flex-col items-center gap-5 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-black text-white max-w-2xl">
          Ready to Clip, Compress &amp; Supercharge Your Media?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          No signups, no credit cards, and zero file uploads. Experience true 100% client-side media freedom right now.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onLaunchTool('video-clipper')}
            className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 transition-all"
          >
            Start Video Auto-Clipper
          </button>
          <button
            onClick={() => onNavigate('tools')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
          >
            Explore All Tools Directory
          </button>
        </div>
      </section>

    </div>
  );
}
