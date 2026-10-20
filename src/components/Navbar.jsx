import React, { useState } from 'react';
import { 
  Zap, Scissors, ImageIcon, Video, Sparkles, ShieldCheck, 
  Menu, X, ChevronDown, Layers, BookOpen, Users, Mail, ArrowRight 
} from 'lucide-react';

export default function Navbar({ currentRoute, onNavigate, onLaunchTool }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'All Tools', hasDropdown: true },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const toolsList = [
    {
      id: 'clipper',
      label: 'Video Auto-Clipper',
      icon: Scissors,
      desc: '30+ min videos into shorts with 5s dynamic Title & Part # intro',
      badge: '30+ Min'
    },
    {
      id: 'image',
      label: 'Image Compressor',
      icon: ImageIcon,
      desc: 'Lossless & high-efficiency WebP/PNG/JPG optimizer',
      badge: 'Lossless'
    },
    {
      id: 'video',
      label: 'Video Compressor',
      icon: Video,
      desc: 'Discord 25MB bypass & adaptive bitrate resizer',
      badge: 'Discord'
    }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const handleToolDirectLaunch = (toolId) => {
    onLaunchTool(toolId);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => handleNavClick('home')}
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isActive = currentRoute === 'tools' || currentRoute.startsWith('tool-');
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setToolsDropdownOpen(true)}
                    onMouseLeave={() => setToolsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('tools')}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                    </button>

                    {/* Tools Dropdown Menu */}
                    {toolsDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 p-3 rounded-2xl bg-[#0E1322] border border-slate-800 shadow-2xl flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150 z-50">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/80 flex items-center justify-between">
                          <span>Creative Utilities</span>
                          <button
                            onClick={() => handleNavClick('tools')}
                            className="text-cyan-400 hover:underline lowercase font-normal"
                          >
                            view all →
                          </button>
                        </div>
                        {toolsList.map((t) => {
                          const ToolIcon = t.icon;
                          return (
                            <button
                              key={t.id}
                              onClick={() => handleNavClick(`tool-${t.id}`)}
                              className="p-2.5 rounded-xl hover:bg-slate-800/80 text-left flex items-start gap-3 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform mt-0.5">
                                <ToolIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                    {t.label}
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                    {t.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{t.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentRoute === item.id || (item.id === 'blog' && currentRoute.startsWith('blog-'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Safe</span>
            </div>

            <button
              onClick={() => handleToolDirectLaunch('clipper')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Scissors className="w-3.5 h-3.5 text-slate-950" />
              <span>Open Studio</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleToolDirectLaunch('clipper')}
              className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30 sm:hidden"
            >
              Studio
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0A0E1A] px-4 pt-4 pb-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 rounded-xl text-left font-bold text-xs flex items-center justify-between ${
                currentRoute === 'home' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavClick('tools')}
              className={`p-3 rounded-xl text-left font-bold text-xs flex items-center justify-between ${
                currentRoute === 'tools' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>All Tools Directory</span>
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`p-3 rounded-xl text-left font-bold text-xs flex items-center justify-between ${
                currentRoute === 'blog' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>Blog &amp; Tutorials</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`p-3 rounded-xl text-left font-bold text-xs flex items-center justify-between ${
                currentRoute === 'about' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>About Us</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`p-3 rounded-xl text-left font-bold text-xs flex items-center justify-between ${
                currentRoute === 'contact' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>Contact Us</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
              Launch Direct Tool
            </span>
            <div className="grid grid-cols-1 gap-2">
              {toolsList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleToolDirectLaunch(t.id)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-200">{t.label}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    Open
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
