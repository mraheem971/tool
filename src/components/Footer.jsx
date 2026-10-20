import React from 'react';
import { Shield, Zap } from 'lucide-react';

export default function Footer({ currentRoute, onNavigate }) {
  const handleNav = (page, toolId = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page, toolId);
  };

  const getLinkClasses = (pageId) => {
    const isActive = currentRoute?.page === pageId;
    if (isActive) {
      // Matches the exact rounded border box shown in the user's uploaded picture
      return 'text-left text-white font-semibold border border-white rounded-[7px] px-2.5 py-1 bg-white/5 shadow-sm transition-all w-fit';
    }
    return 'text-left text-slate-300 hover:text-white px-2.5 py-1 rounded-[7px] border border-transparent hover:border-slate-700 transition-all font-medium w-fit';
  };

  return (
    <footer className="border-t border-slate-900 bg-[#060910] text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid including Site Map matching user screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Mission */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 cursor-pointer w-fit" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                MediaForge <span className="text-cyan-400">PRO</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              High-performance client-side media manipulation platform. Compress images and videos, split 30+ min long-form streams into viral shorts with 5-second dynamic Title &amp; Part # intro bumpers — 100% in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                <Shield className="w-3.5 h-3.5" /> 100% Client-Side Safe
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                Zero Server Uploads
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                Enforced ≥ 30s Clips
              </span>
            </div>
          </div>

          {/* Site Map Section - Formatted strictly matching the user reference picture */}
          <div className="md:col-span-6">
            {/* Header: Site Map (underlined as in the reference screenshot) */}
            <h3 className="text-base font-semibold text-white tracking-wide underline underline-offset-8 decoration-white/70 mb-5">
              Site Map
            </h3>

            {/* Two Column Grid exactly matching reference image */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => handleNav('home')}
                  className={getLinkClasses('home')}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav('blog')}
                  className={getLinkClasses('blog')}
                >
                  Blog
                </button>
                <button
                  onClick={() => handleNav('tools')}
                  className={getLinkClasses('tools')}
                >
                  More Tools
                </button>
                <button
                  onClick={() => handleNav('help')}
                  className={getLinkClasses('help')}
                >
                  Help MediaForge
                </button>
                <button
                  onClick={() => handleNav('embed')}
                  className={getLinkClasses('embed')}
                >
                  Embed MediaForge
                </button>
                <button
                  onClick={() => handleNav('about')}
                  className={getLinkClasses('about')}
                >
                  About Us
                </button>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => handleNav('contact')}
                  className={getLinkClasses('contact')}
                >
                  Contact Us
                </button>
                <button
                  onClick={() => handleNav('privacy')}
                  className={getLinkClasses('privacy')}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNav('report-bug')}
                  className={getLinkClasses('report-bug')}
                >
                  Report a Bug
                </button>
                <button
                  onClick={() => handleNav('terms')}
                  className={getLinkClasses('terms')}
                >
                  Terms
                </button>
                <button
                  onClick={() => handleNav('disclaimer')}
                  className={getLinkClasses('disclaimer')}
                >
                  Disclaimer
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} MediaForge PRO.</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="hidden sm:inline">Built for Creators &amp; Developers</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300 transition-colors">Privacy</button>
            <button onClick={() => handleNav('terms')} className="hover:text-slate-300 transition-colors">Terms</button>
            <button onClick={() => handleNav('disclaimer')} className="hover:text-slate-300 transition-colors">Disclaimer</button>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-300 transition-colors">Support</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
