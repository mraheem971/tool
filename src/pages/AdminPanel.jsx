import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, CheckCircle2, AlertTriangle, Bug, 
  HelpCircle, MessageSquare, Users, Cpu, Search, Send, Clock, 
  ChevronRight, Filter, Sparkles, RefreshCw, Eye, Check, X, ArrowLeft
} from 'lucide-react';
import { 
  getTickets, replyToTicket, updateTicketStatus, 
  getBugs, updateBugStatus, getUsers, 
  isAdminAuthenticated, setAdminAuthenticated 
} from '../services/adminStore';

export default function AdminPanel({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated);
  const [loginEmail, setLoginEmail] = useState('admin@mediaforge.pro');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Active view tab: 'tickets' | 'bugs' | 'users' | 'faq'
  const [activeTab, setActiveTab] = useState('tickets');

  // Data states
  const [tickets, setTickets] = useState(getTickets);
  const [bugs, setBugs] = useState(getBugs);
  const [users, setUsers] = useState(getUsers);

  // Filters & Selected states
  const [ticketFilter, setTicketFilter] = useState('All');
  const [bugFilter, setBugFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected ticket for replying
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState('');

  // Selected bug for solution
  const [selectedBug, setSelectedBug] = useState(null);
  const [bugSolutionText, setBugSolutionText] = useState('');

  useEffect(() => {
    setTickets(getTickets());
    setBugs(getBugs());
    setUsers(getUsers());
  }, [activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail.trim() === 'admin@mediaforge.pro' && loginPassword.trim() === 'admin123') {
      setIsAuthenticated(true);
      setAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Default: admin@mediaforge.pro / admin123');
    }
  };

  const handleQuickLogin = () => {
    setLoginEmail('admin@mediaforge.pro');
    setLoginPassword('admin123');
    setIsAuthenticated(true);
    setAdminAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthenticated(false);
  };

  // Quick reply templates for common user difficulties
  const QUICK_TEMPLATES = [
    {
      label: '🎬 5-Second Intro Guidance',
      text: 'Hi there! You can customize the 5-second intro overlay theme (Glassmorphism, Cyber Glow, Minimal, Broadcast) and pick custom accent colors from the Overlay Customizer panel on the clipper.'
    },
    {
      label: '⏳ Enforced 30s Clip Minimum',
      text: 'Hello! The minimum clip length is set to 30 seconds to preserve high-retention short-form quality. This ensures your 5-second dynamic title bumper leaves at least 25 seconds of core content for mobile viewers.'
    },
    {
      label: '⚡ Hardware & GPU Acceleration',
      text: 'Hi! To ensure maximum export speed for 4K video clips, please ensure Hardware Acceleration is enabled in your browser settings (chrome://settings/system) and close heavy background tabs.'
    },
    {
      label: '📦 Discord 25MB Bitrate Headroom',
      text: 'Hello! Our Discord 25MB preset automatically targets ~24.2MB to leave safety headroom for Discord file upload limits, guaranteeing your clip is never rejected as "file too powerful".'
    }
  ];

  const handleSendReply = () => {
    if (!selectedTicket || !replyText.trim()) return;
    const updated = replyToTicket(selectedTicket.id, replyText);
    setTickets(updated);
    setSelectedTicket(updated.find(t => t.id === selectedTicket.id));
    setReplyText('');
    setShowSuccessToast(`Solution sent to ${selectedTicket.name}!`);
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  const handleUpdateBug = (newStatus) => {
    if (!selectedBug) return;
    const updated = updateBugStatus(selectedBug.id, newStatus, bugSolutionText);
    setBugs(updated);
    setSelectedBug(updated.find(b => b.id === selectedBug.id));
    setShowSuccessToast(`Bug ${selectedBug.id} marked as ${newStatus}!`);
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    const matchesFilter = ticketFilter === 'All' || t.status === ticketFilter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered bugs
  const filteredBugs = bugs.filter(b => {
    const matchesFilter = bugFilter === 'All' || b.status === bugFilter || b.severity === bugFilter;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // KPI Calculations
  const totalTicketsCount = tickets.length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'Resolved').length;
  const resolveRate = totalTicketsCount > 0 ? Math.round((resolvedTicketsCount / totalTicketsCount) * 100) : 100;
  const openBugsCount = bugs.filter(b => b.status !== 'Resolved').length;

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="rounded-3xl p-8 bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col gap-6">
          
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white mt-2">Admin Control Center</h2>
            <p className="text-xs text-slate-400">
              Handle user accounts, resolve user questions, and solve reported difficulties.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all mt-1"
            >
              <ShieldCheck className="w-4 h-4" /> Sign In to Admin Console
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={handleQuickLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> ⚡ One-Click Quick Sign In (Demo Mode)
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Default access: <code className="text-slate-400">admin@mediaforge.pro</code> / <code className="text-slate-400">admin123</code>
            </p>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/90 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{showSuccessToast}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">MediaForge Admin Center</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Console
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as <strong className="text-slate-200">{loginEmail}</strong> (Super Admin)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            &larr; View Live Site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>User Questions</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalTicketsCount}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {resolveRate}% Resolved
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Reported Difficulties</span>
            <Bug className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{bugs.length}</div>
          <div className="text-[11px] text-amber-400">
            {openBugsCount} active / investigating
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Handled Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{users.length}</div>
          <div className="text-[11px] text-slate-400">
            100% Client-Side Safe
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Engine Health</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">Optimal</div>
          <div className="text-[11px] text-slate-400">
            Canvas 2D / Web Audio Active
          </div>
        </div>

      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
        
        <button
          onClick={() => { setActiveTab('tickets'); setSelectedTicket(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'tickets'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>User Questions &amp; Inquiries</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/80 text-cyan-200">
            {tickets.filter(t => t.status === 'Open').length} Open
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('bugs'); setSelectedBug(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'bugs'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Bug className="w-4 h-4" />
          <span>Difficulties &amp; Bug Reports</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/80 text-purple-200">
            {openBugsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'users'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory &amp; Handlers</span>
        </button>

      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
        
        {/* Filter Pills based on active tab */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {activeTab === 'tickets' && ['All', 'Open', 'In Progress', 'Resolved'].map(filter => (
            <button
              key={filter}
              onClick={() => setTicketFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                ticketFilter === filter ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}

          {activeTab === 'bugs' && ['All', 'Open', 'Investigating', 'Resolved', 'High'].map(filter => (
            <button
              key={filter}
              onClick={() => setBugFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                bugFilter === filter ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}

          {activeTab === 'users' && (
            <span className="text-xs font-semibold text-slate-400 px-2">Registered Browser Clients ({users.length})</span>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, users, IDs..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* TAB 1: USER QUESTIONS & DIFFICULTIES SOLVER */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Ticket List (6 cols or full) */}
          <div className={`${selectedTicket ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col gap-3`}>
            {filteredTickets.map(ticket => {
              const isSelected = selectedTicket?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">{ticket.id}</span>
                      <span className="text-xs font-bold text-slate-200">{ticket.name}</span>
                      <span className="text-[10px] text-slate-500">({ticket.category})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ticket.status === 'Resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : ticket.status === 'In Progress'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-1">{ticket.subject}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{ticket.message}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      {ticket.replies.length > 0 ? `${ticket.replies.length} Reply Sent` : 'Needs Solution'} &rarr;
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-slate-900/30 border border-slate-800 text-slate-400 text-xs">
                No tickets matching current filter.
              </div>
            )}
          </div>

          {/* Solution & Reply Drawer (6 cols) */}
          {selectedTicket && (
            <div className="lg:col-span-6 rounded-3xl p-6 bg-slate-900/90 border border-cyan-500/30 shadow-2xl flex flex-col justify-between gap-6">
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400">{selectedTicket.id}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{selectedTicket.subject}</h3>
                    <p className="text-xs text-slate-400">
                      From: <strong className="text-slate-200">{selectedTicket.name}</strong> ({selectedTicket.email})
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Original User Question */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="block font-semibold text-slate-400 text-[10px] uppercase mb-1">User's Question:</span>
                  {selectedTicket.message}
                </div>

                {/* Previous Admin Replies */}
                {selectedTicket.replies.length > 0 && (
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Previous Solutions Sent:</span>
                    {selectedTicket.replies.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
                        <div className="flex items-center justify-between text-[10px] text-cyan-400 mb-1">
                          <span className="font-bold">{r.sender}</span>
                          <span>{new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        {r.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pre-made Solution Templates */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Quick Solution Templates:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setReplyText(tmpl.text)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-[11px] text-slate-300 transition-colors"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Composer Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Write Solution / Reply to User:</label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type technical solution or click a template above..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updated = updateTicketStatus(selectedTicket.id, selectedTicket.status === 'Resolved' ? 'Open' : 'Resolved');
                      setTickets(updated);
                      setSelectedTicket(updated.find(t => t.id === selectedTicket.id));
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Status: {selectedTicket.status} (Toggle)
                  </button>
                </div>

                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" /> Send Solution to User
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 2: USER DIFFICULTIES & BUG REPORTS SOLVER */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'bugs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className={`${selectedBug ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col gap-3`}>
            {filteredBugs.map(bug => {
              const isSelected = selectedBug?.id === bug.id;
              return (
                <div
                  key={bug.id}
                  onClick={() => setSelectedBug(bug)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-purple-500/60 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-purple-400">{bug.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        bug.severity === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {bug.severity}
                      </span>
                      <span className="text-[11px] text-slate-400">{bug.tool}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      bug.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {bug.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{bug.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{bug.actual}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <span>{bug.sysInfo.browser} • {bug.sysInfo.os}</span>
                    <span className="text-purple-400 font-semibold">Inspect Difficulty &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedBug && (
            <div className="lg:col-span-6 rounded-3xl p-6 bg-slate-900/90 border border-purple-500/30 shadow-2xl flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="font-mono text-xs font-bold text-purple-400">{selectedBug.id}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{selectedBug.title}</h3>
                    <p className="text-xs text-slate-400">Tool: <strong className="text-slate-200">{selectedBug.tool}</strong></p>
                  </div>
                  <button onClick={() => setSelectedBug(null)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Steps to Reproduce:</span>
                    <p className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-300 mt-1">{selectedBug.steps}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Expected:</span>
                      <p className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 mt-1">{selectedBug.expected}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Actual:</span>
                      <p className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-red-300 mt-1">{selectedBug.actual}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Client Telemetry (Auto-detected):</span>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {selectedBug.sysInfo.browser} | {selectedBug.sysInfo.os} | {selectedBug.sysInfo.screen}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Documented Solution / Hotfix:</label>
                    <textarea
                      rows={3}
                      value={bugSolutionText || selectedBug.solution}
                      onChange={(e) => setBugSolutionText(e.target.value)}
                      placeholder="Write workaround or developer solution..."
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-400 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleUpdateBug('Investigating')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
                >
                  Mark Investigating
                </button>
                <button
                  onClick={() => handleUpdateBug('Resolved')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  Deploy Fix &amp; Mark Resolved
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 3: USER DIRECTORY & HANDLERS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'users' && (
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                  <th className="py-4 px-5">User</th>
                  <th className="py-4 px-4">Tier</th>
                  <th className="py-4 px-4">Processed Media</th>
                  <th className="py-4 px-4">Bandwidth / Storage Saved</th>
                  <th className="py-4 px-4">Device &amp; OS</th>
                  <th className="py-4 px-4">Last Active</th>
                  <th className="py-4 px-4">Support Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-cyan-400">{u.tier}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{u.videosProcessed} clips / photos</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{u.storageSaved}</td>
                    <td className="py-3.5 px-4 text-slate-400">{u.browser}</td>
                    <td className="py-3.5 px-4 text-slate-500">{u.lastActive}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        u.status === 'Needs Assistance' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => {
                          setActiveTab('tickets');
                          setSearchQuery(u.email);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-[11px] transition-colors"
                      >
                        Assist User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
