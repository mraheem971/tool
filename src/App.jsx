import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Interactive Tool Components
import VideoClipper from './components/VideoClipper/VideoClipper';
import ImageCompressor from './components/ImageCompressor/ImageCompressor';
import VideoCompressor from './components/VideoCompressor/VideoCompressor';

// Pages
import Home from './pages/Home';
import AllTools from './pages/AllTools';
import ToolDetail from './pages/ToolDetail';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import ReportBug from './pages/ReportBug';
import EmbedTool from './pages/EmbedTool';
import HelpCenter from './pages/HelpCenter';

export default function App() {
  // Routing state: { page: string, param: string | null }
  const [route, setRoute] = useState(() => {
    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const parts = hash.split('/');
      if (parts[0] === 'tool') return { page: 'tool', param: parts[1] || 'video-clipper' };
      if (parts[0] === 'tool-detail') return { page: 'tool-detail', param: parts[1] || 'video-clipper' };
      if (['home', 'tools', 'about', 'contact', 'privacy', 'terms', 'disclaimer', 'report-bug', 'embed', 'help'].includes(parts[0])) {
        return { page: parts[0], param: null };
      }
      // If direct tool slug like #clipper, #image, #video
      if (hash === 'clipper' || hash === 'video-clipper') return { page: 'tool', param: 'video-clipper' };
      if (hash === 'image' || hash === 'image-compressor') return { page: 'tool', param: 'image-compressor' };
      if (hash === 'video' || hash === 'video-compressor') return { page: 'tool', param: 'video-compressor' };
    }
    return { page: 'home', param: null };
  });

  // Listen for hash changes & browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setRoute({ page: 'home', param: null });
        return;
      }
      const parts = hash.split('/');
      if (parts[0] === 'tool') setRoute({ page: 'tool', param: parts[1] || 'video-clipper' });
      else if (parts[0] === 'tool-detail') setRoute({ page: 'tool-detail', param: parts[1] || 'video-clipper' });
      else if (['home', 'tools', 'about', 'contact', 'privacy', 'terms', 'disclaimer', 'report-bug', 'embed', 'help'].includes(parts[0])) {
        setRoute({ page: parts[0], param: null });
      } else if (hash === 'clipper') setRoute({ page: 'tool', param: 'video-clipper' });
      else if (hash === 'image') setRoute({ page: 'tool', param: 'image-compressor' });
      else if (hash === 'video') setRoute({ page: 'tool', param: 'video-compressor' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handler
  const navigate = (page, param = null) => {
    let newHash = page;
    if (param) newHash = `${page}/${param}`;
    window.location.hash = newHash;
    setRoute({ page, param });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch tool handler
  const launchTool = (toolId) => {
    navigate('tool', toolId);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar */}
      <Navbar currentRoute={route} onNavigate={navigate} />

      {/* Hero Background Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-indigo-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* 1. Home Page */}
        {route.page === 'home' && (
          <Home onNavigate={navigate} onLaunchTool={launchTool} />
        )}

        {/* 2. All Tools Directory */}
        {route.page === 'tools' && (
          <AllTools onNavigate={navigate} onLaunchTool={launchTool} />
        )}

        {/* 3. Tool Details Page (Each with Description, Instructions, Examples, FAQs, Related Tools) */}
        {route.page === 'tool-detail' && (
          <ToolDetail toolId={route.param || 'video-clipper'} onNavigate={navigate} onLaunchTool={launchTool} />
        )}

        {/* 4. Interactive Live Tool Execution */}
        {route.page === 'tool' && (
          <div className="flex flex-col gap-6">
            {/* Quick switcher tabs between the 3 core live tools */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => launchTool('video-clipper')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    route.param === 'video-clipper'
                      ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Video Auto-Clipper (30+ Min)
                </button>
                <button
                  onClick={() => launchTool('image-compressor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    route.param === 'image-compressor'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Image Compressor
                </button>
                <button
                  onClick={() => launchTool('video-compressor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    route.param === 'video-compressor'
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Video Compressor
                </button>
              </div>

              <button
                onClick={() => navigate('tool-detail', route.param || 'video-clipper')}
                className="hidden sm:inline-flex text-xs font-semibold text-slate-400 hover:text-cyan-400 px-3 py-1.5 transition-colors"
              >
                View Instructions &amp; FAQs &rarr;
              </button>
            </div>

            {/* Render the Active Interactive Tool */}
            {(!route.param || route.param === 'video-clipper') && <VideoClipper />}
            {route.param === 'image-compressor' && <ImageCompressor />}
            {route.param === 'video-compressor' && <VideoCompressor />}
            {['video-audio-extractor', 'image-format-converter', 'aspect-ratio-resizer'].includes(route.param) && (
              <ToolDetail toolId={route.param} onNavigate={navigate} onLaunchTool={launchTool} />
            )}
          </div>
        )}

        {/* 5. About Us */}
        {route.page === 'about' && (
          <AboutUs onNavigate={navigate} onLaunchTool={launchTool} />
        )}

        {/* 6. Contact Us */}
        {route.page === 'contact' && (
          <ContactUs onNavigate={navigate} />
        )}

        {/* 9. Privacy Policy */}
        {route.page === 'privacy' && (
          <PrivacyPolicy />
        )}

        {/* 10. Terms of Service */}
        {route.page === 'terms' && (
          <TermsOfService />
        )}

        {/* 11. Disclaimer */}
        {route.page === 'disclaimer' && (
          <Disclaimer />
        )}

        {/* 12. Report a Bug (matches user picture!) */}
        {route.page === 'report-bug' && (
          <ReportBug />
        )}

        {/* 13. Embed MediaForge (matches user picture!) */}
        {route.page === 'embed' && (
          <EmbedTool />
        )}

        {/* 14. Help Center (matches user picture!) */}
        {route.page === 'help' && (
          <HelpCenter onNavigate={navigate} />
        )}

      </main>

      {/* Footer with exact Site Map section from the user's uploaded picture */}
      <Footer currentRoute={route} onNavigate={navigate} />

    </div>
  );
}
