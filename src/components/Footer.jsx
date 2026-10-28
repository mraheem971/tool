import React from 'react';

export default function Footer({ currentRoute, onNavigate }) {
  const handleNav = (page, toolId = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page, toolId);
  };

  const getLinkClasses = (pageId) => {
    const isActive = currentRoute?.page === pageId;
    if (isActive) {
      // Matches the exact rounded border box shown in the user's uploaded picture
      return 'text-left text-white font-medium border border-white rounded-[7px] px-3 py-1 bg-white/[0.04] shadow-sm transition-all w-fit cursor-pointer inline-block';
    }
    return 'text-left text-slate-300 hover:text-white px-3 py-1 rounded-[7px] border border-transparent hover:border-slate-800 transition-all font-normal w-fit cursor-pointer inline-block';
  };

  return (
    <footer className="bg-[#050811] text-slate-300 pt-16 pb-12 border-t border-slate-900/80">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Site Map Section - Formatted strictly matching the user reference screenshot */}
        <div className="flex flex-col gap-6">
          {/* Header: Site Map (underlined as in the reference screenshot) */}
          <div className="w-fit">
            <h3 className="text-xl font-bold text-white tracking-wide underline underline-offset-[10px] decoration-white/70 pb-1">
              Site Map
            </h3>
          </div>

          {/* Two Column Grid exactly matching reference image */}
          <div className="grid grid-cols-2 gap-x-12 sm:gap-x-20 gap-y-2.5 text-base sm:text-lg pt-4 font-['Plus_Jakarta_Sans',sans-serif]">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleNav('home')}
                className={getLinkClasses('home')}
              >
                Home
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
            <div className="flex flex-col gap-2.5">
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

        {/* Minimal Clean Copyright Bar */}
        <div className="mt-14 pt-6 border-t border-slate-900/80 flex items-center justify-between text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} MediaForge PRO. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('admin')}
              className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Admin Portal
            </button>
            <span>•</span>
            <span>100% Client-Side Safe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
