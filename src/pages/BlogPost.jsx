import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, ArrowRight, Play } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { TOOLS_DATA } from '../data/toolsData';

export default function BlogPost({ postId, onNavigate, onLaunchTool }) {
  const post = BLOG_POSTS.find(p => p.id === postId) || BLOG_POSTS[0];
  const relatedToolObj = TOOLS_DATA.find(t => t.id === post.relatedTool) || TOOLS_DATA[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto flex flex-col gap-10 pb-20">
      
      {/* Top Back navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan-400" /> Share
        </button>
      </div>

      {/* Article Header */}
      <div className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {post.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.publishedAt}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author badge */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
          />
          <div>
            <div className="text-sm font-bold text-white">{post.author.name}</div>
            <div className="text-xs text-slate-400">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Formatted Article Content */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        {post.content.split('\n\n').map((paragraph, idx) => {
          const trimmed = paragraph.trim();
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-2xl sm:text-3xl font-black text-white pt-6 border-t border-slate-800/80">
                {trimmed.replace('## ', '')}
              </h2>
            );
          }
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-cyan-300 pt-3">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="p-4 rounded-2xl bg-slate-900/80 border-l-4 border-cyan-400 italic text-slate-200">
                {trimmed.replace('> ', '')}
              </blockquote>
            );
          }
          return <p key={idx}>{trimmed}</p>;
        })}
      </div>

      {/* Related Tool Callout */}
      {relatedToolObj && (
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Try The Featured Tool
            </span>
            <h4 className="text-xl font-bold text-white">{relatedToolObj.name}</h4>
            <p className="text-xs text-slate-400 max-w-md">{relatedToolObj.shortDesc}</p>
          </div>

          <button
            onClick={() => onLaunchTool(relatedToolObj.id)}
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Launch Tool Free
          </button>
        </div>
      )}

    </article>
  );
}
