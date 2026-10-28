import React, { useState } from 'react';
import { 
  Zap, Scissors, ImageIcon, Video, Layers, BookOpen, 
  Menu, X, ShieldCheck, ChevronDown, Sparkles, HelpCircle 
} from 'lucide-react';

export default function Navbar({ currentRoute, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page, param = null) => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page, param);
  };

  const isToolActive = (toolId) => {
    return currentRoute.page === 'tool' && currentRoute.param === toolId;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => handleNav('home')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  MediaForge <span className="text-cyan-400">PRO</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Smart Media Studio &amp; Long-form Clipper</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            
            {/* Home */}
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentRoute.page === 'home'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            {/* All Tools Directory */}
            <button
              onClick={() => handleNav('tools')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentRoute.page === 'tools'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              All Tools
            </button>

            {/* Divider */}
            <span className="h-5 w-[1px] bg-slate-800 mx-1" />

            {/* Direct Tool 1: Video Clipper */}
            <button
              onClick={() => handleNav('tool', 'video-clipper')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isToolActive('video-clipper')
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-purple-400" />
              <span>Video Clipper</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30">30+ Min</span>
            </button>

            {/* Direct Tool 2: Image Compressor */}
            <button
              onClick={() => handleNav('tool', 'image-compressor')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isToolActive('image-compressor')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Image Compressor</span>
            </button>

            {/* Direct Tool 3: Video Compressor */}
            <button
              onClick={() => handleNav('tool', 'video-compressor')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isToolActive('video-compressor')
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-indigo-400" />
              <span>Video Compressor</span>
            </button>

            {/* Divider */}
            <span className="h-5 w-[1px] bg-slate-800 mx-1" />

            {/* About */}
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                currentRoute.page === 'about'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNav('contact')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                currentRoute.page === 'contact'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Contact
            </button>

          </nav>

          {/* Privacy Badge (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold">100% Client-Side Safe</span>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#080C14] px-4 pt-3 pb-6 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-2">
            Main Navigation
          </div>

          <button
            onClick={() => handleNav('home')}
            className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              currentRoute.page === 'home' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('tools')}
            className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              currentRoute.page === 'tools' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Tools Directory
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-3">
            Interactive Tools
          </div>

          <button
            onClick={() => handleNav('tool', 'video-clipper')}
            className={`flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              isToolActive('video-clipper') ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Scissors className="w-4 h-4 text-purple-400" />
            <span>Long Video Auto-Clipper (5s Intro)</span>
          </button>

          <button
            onClick={() => handleNav('tool', 'image-compressor')}
            className={`flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              isToolActive('image-compressor') ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>High-Speed Image Compressor</span>
          </button>

          <button
            onClick={() => handleNav('tool', 'video-compressor')}
            className={`flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              isToolActive('video-compressor') ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4 text-indigo-400" />
            <span>Adaptive Video Compressor</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-3">
            Company &amp; Legal
          </div>

          <button
            onClick={() => handleNav('about')}
            className="text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            About Us
          </button>

          <button
            onClick={() => handleNav('contact')}
            className="text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Contact Us
          </button>

          <button
            onClick={() => handleNav('report-bug')}
            className="text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-slate-800"
          >
            Report a Bug
          </button>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 px-3 border-t border-slate-800">
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300">Privacy</button>
            <button onClick={() => handleNav('terms')} className="hover:text-slate-300">Terms</button>
            <button onClick={() => handleNav('disclaimer')} className="hover:text-slate-300">Disclaimer</button>
          </div>

        </div>
      )}

    </header>
  );
}
