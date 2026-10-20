import React, { useState } from 'react';
import { Sparkles, Search, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';

export default function Blog({ onNavigate }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [search, setSearch] = useState('');

  const allTags = ['All', 'Video Production', 'Web Performance', 'Social Media', 'Security & Privacy'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesTag = selectedTag === 'All' || post.category === selectedTag;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featured = BLOG_POSTS[0];

  return (
    <div className="flex flex-col gap-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering &amp; Creator Guides</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          MediaForge Blog &amp; Tutorials
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          In-depth masterclasses on long-form video chunking, 5-second hooks, modern image quantization, and client-side web media pipelines.
        </p>
      </div>

      {/* Featured Post Banner */}
      {featured && (
        <div
          onClick={() => onNavigate('blog-post', featured.id)}
          className="group cursor-pointer rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-2xl hover:border-purple-500/60 transition-all hover:-translate-y-1"
        >
          <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full overflow-hidden relative">
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs font-bold text-cyan-300 border border-cyan-500/30">
              FEATURED GUIDE
            </span>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-purple-400 font-mono">
                <span>{featured.category}</span>
                <span>•</span>
                <span>{featured.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                {featured.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {featured.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <img
                  src={featured.author.avatar}
                  alt={featured.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="text-xs font-bold text-slate-200">{featured.author.name}</div>
                  <div className="text-[10px] text-slate-500">{featured.publishedAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => onNavigate('blog-post', post.id)}
            className="group cursor-pointer rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-purple-300 border border-purple-500/30">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-slate-400 font-medium">{post.author.name}</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
