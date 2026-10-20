import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AllToolsPage from './pages/AllToolsPage';
import ToolDetailPage from './pages/ToolDetailPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';

export default function App() {
  // Parse initial route from URL hash (e.g. #tools -> tools)
  const getRouteFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) return 'home';
    if (hash === 'clipper') return 'tool-clipper';
    if (hash === 'image') return 'tool-image';
    if (hash === 'video') return 'tool-video';
    return hash;
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash());

  // Listen for browser back / forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRouteFromHash();
      setCurrentRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Programmatic navigation handler
  const handleNavigate = (route) => {
    window.location.hash = `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch tool shortcut
  const handleLaunchTool = (toolId) => {
    handleNavigate(`tool-${toolId}`);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar */}
      <Navbar 
        currentRoute={currentRoute} 
        onNavigate={handleNavigate} 
        onLaunchTool={handleLaunchTool} 
      />

      {/* Hero Ambient Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-indigo-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {currentRoute === 'home' && (
          <HomePage onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute === 'tools' && (
          <AllToolsPage onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute === 'tool-clipper' && (
          <ToolDetailPage toolId="clipper" onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute === 'tool-image' && (
          <ToolDetailPage toolId="image" onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute === 'tool-video' && (
          <ToolDetailPage toolId="video" onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute === 'blog' && (
          <BlogPage onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute.startsWith('blog-') && (
          <BlogPage 
            initialArticleSlug={currentRoute.replace('blog-', '')} 
            onNavigate={handleNavigate} 
            onLaunchTool={handleLaunchTool} 
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />
        )}

        {currentRoute === 'contact' && (
          <ContactPage />
        )}

        {currentRoute === 'privacy' && (
          <PrivacyPolicyPage />
        )}

        {currentRoute === 'terms' && (
          <TermsPage />
        )}

        {currentRoute === 'disclaimer' && (
          <DisclaimerPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onLaunchTool={handleLaunchTool} />

    </div>
  );
}
