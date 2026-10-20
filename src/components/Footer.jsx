import React from 'react';
import { Zap, Shield, Heart, ArrowUp, GitBranch, Mail, Scissors, ImageIcon, Video, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate, onLaunchTool }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-[#060910] pt-16 pb-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col (2 cols wide on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer self-start"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  MediaForge <span className="text-cyan-400">PRO</span>
                </span>
                <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 rounded-md">
                  v2.0
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The high-performance client-side media suite. Compress images and videos, or upload 30+ min long videos to generate shorts with automated 5s dynamic Title &amp; Part # intro bumpers.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Client-Side Safe • Zero Cloud Uploads</span>
            </div>
          </div>

          {/* Col 1: Tools */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200">Creative Tools</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onLaunchTool('clipper')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Scissors className="w-3.5 h-3.5 text-purple-400" />
                  <span>Video Auto-Clipper</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLaunchTool('image')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Image Compressor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLaunchTool('video')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Video Compressor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools')}
                  className="text-cyan-400 hover:underline font-semibold text-left pt-1 block"
                >
                  Explore All Tools →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Resources & Blog */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200">Resources &amp; Blog</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Blog &amp; Tutorials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog-turn-podcast-into-viral-shorts')}
                  className="hover:text-cyan-400 transition-colors text-left line-clamp-1"
                >
                  Podcast to Shorts with 5s Intro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog-lossless-vs-lossy-image-compression')}
                  className="hover:text-cyan-400 transition-colors text-left line-clamp-1"
                >
                  Lossless vs Lossy WebP Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog-bypass-discord-email-video-limits')}
                  className="hover:text-cyan-400 transition-colors text-left line-clamp-1"
                >
                  Bypass Discord 25MB Limits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog-power-of-client-side-browser-processing')}
                  className="hover:text-cyan-400 transition-colors text-left line-clamp-1"
                >
                  In-Browser Client-Side Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Legal */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200">Company &amp; Legal</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Contact Us &amp; Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Disclaimer &amp; Limits
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} MediaForge PRO. 100% In-Browser Media Processing. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/mraheem971/tool.git"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
