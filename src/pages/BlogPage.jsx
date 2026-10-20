import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { 
  BookOpen, Search, ArrowRight, ArrowLeft, Calendar, Clock, 
  User, Tag, Share2, Check, Sparkles, Scissors, Zap 
} from 'lucide-react';

export default function BlogPage({ initialArticleSlug, onNavigate, onLaunchTool }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // If initialArticleSlug was passed, find the active post
  const activePost = initialArticleSlug
    ? BLOG_POSTS.find((p) => p.slug === initialArticleSlug || p.id === initialArticleSlug)
    : null;

  const categories = ['All', 'Video Strategy', 'Optimization Guides', 'Creator Tips', 'Architecture & Privacy'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // If viewing a single post
  if (activePost) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
        
        {/* Back button */}
        <button
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </button>

        {/* Article Header */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
              {activePost.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {activePost.date}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {activePost.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            {activePost.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                {activePost.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">{activePost.author}</p>
                <p className="text-[11px] text-slate-400">{activePost.authorRole}</p>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </header>

        {/* Article Body */}
        <article className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 bg-slate-900/40 text-slate-200 leading-relaxed space-y-6">
          <div className="text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line text-slate-300">
            {activePost.content}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {activePost.tags.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-850 text-slate-300 border border-slate-800 text-xs">
                #{t}
              </span>
            ))}
          </div>
        </article>

        {/* CTA to launch tool */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-cyan-600/20 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Try This Workflow in MediaForge PRO</h3>
            <p className="text-xs text-slate-300 mt-1">Split 30+ min videos with 5s dynamic intros or compress your media instantly.</p>
          </div>
          <button
            onClick={() => onLaunchTool('clipper')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap transition-all"
          >
            <Scissors className="w-4 h-4" />
            <span>Open Auto-Clipper Studio</span>
          </button>
        </div>

      </div>
    );
  }

  // Articles listing view
  return (
    <div className="flex flex-col gap-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering &amp; Strategy Guides</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          MediaForge Insights &amp; Tutorials
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Master in-browser media optimization, viral video clipping with 5s intro bumpers, WebP performance, and client-side architecture.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onNavigate(`blog-${post.slug}`)}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {post.category}
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-xs text-slate-400">{post.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-slate-500" /> {post.author}
              </span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
