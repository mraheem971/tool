import React, { useState } from 'react';
import { 
  Scissors, ImageIcon, Video, Music, RefreshCw, Maximize2, 
  ArrowLeft, Star, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, 
  Play, Sparkles, HelpCircle, Layers, ArrowRight, BookOpen, Lightbulb
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

const ICON_MAP = {
  Scissors,
  ImageIcon,
  Video,
  Music,
  RefreshCw,
  Maximize2
};

export default function ToolDetail({ toolId, onNavigate, onLaunchTool }) {
  const tool = TOOLS_DATA.find(t => t.id === toolId) || TOOLS_DATA[0];
  const Icon = ICON_MAP[tool.iconName] || Scissors;

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Related tools objects
  const relatedToolsList = TOOLS_DATA.filter(t => tool.relatedTools?.includes(t.id));

  return (
    <div className="flex flex-col gap-14 pb-16">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => onNavigate('tools')}
          className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Tools
        </button>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{tool.name}</span>
      </div>

      {/* 1. HERO HEADER */}
      <section className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {tool.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
              {tool.category} Tool
            </span>
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {tool.rating}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {tool.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            {tool.tagline}
          </p>

          <p className="text-sm text-slate-400 leading-relaxed">
            {tool.shortDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 100% In-Browser Local Execution
            </span>
            <span className="text-slate-600">•</span>
            <span>Zero Data Stored</span>
            <span className="text-slate-600">•</span>
            <span>GPU Accelerated</span>
          </div>
        </div>

        {/* Launch Card */}
        <div className="w-full md:w-auto flex-shrink-0 flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Icon className="w-8 h-8" />
          </div>

          <div className="text-center">
            <div className="text-xs font-bold text-slate-200">Ready to use?</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Free forever • No signup needed</p>
          </div>

          <button
            onClick={() => onLaunchTool(tool.id)}
            className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Launch Interactive Tool
          </button>
        </div>

      </section>

      {/* 2. DESCRIPTION & TECHNICAL SPECIFICATIONS */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>In-Depth Overview &amp; Specifications</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Description &amp; Architecture
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
            <p>
              The <strong className="text-white">{tool.name}</strong> was engineered to solve one of the greatest bottlenecks in modern digital content production: the tedious, bandwidth-heavy round-trip to cloud rendering servers.
            </p>
            <p>
              By leveraging the client browser's hardware-accelerated <strong>HTML5 Canvas 2D engine</strong>, <strong>MediaStream Recording API</strong>, and <strong>Web Audio Context</strong>, MediaForge Pro processes your multi-gigabyte video or image files directly inside your computer's local memory and GPU.
            </p>
            <p>
              Whether you are preparing vertical video shorts for TikTok, downscaling gameplay recordings for Discord chat, or compressing 4K photography for high-speed web delivery, our algorithms prioritize visual sharpness, accurate color grading, and optimal compression ratios.
            </p>
          </div>

          {/* Key Specs Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Key Feature Highlights
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {tool.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP INSTRUCTIONS */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          <span>How To Use</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Step-by-Step Instructions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tool.instructions.map((inst) => (
            <div
              key={inst.step}
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3 relative group hover:border-purple-500/40 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center">
                0{inst.step}
              </div>
              <h4 className="font-bold text-base text-slate-100 group-hover:text-purple-300 transition-colors">
                {inst.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {inst.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. REAL-WORLD EXAMPLES */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Practical Use Cases</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Real-World Examples &amp; Case Studies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tool.examples.map((ex, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400">Example {idx + 1}</span>
                <h4 className="font-bold text-lg text-white">{ex.title}</h4>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">Scenario: </span>
                  {ex.scenario}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300">
                <span className="font-semibold text-emerald-400">Result: </span>
                {ex.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RELEVANT FREQUENTLY ASKED QUESTIONS */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Got Questions?</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Relevant FAQs
        </h2>

        <div className="flex flex-col gap-3 max-w-4xl">
          {tool.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-200">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. RELATED TOOLS */}
      {relatedToolsList.length > 0 && (
        <section className="flex flex-col gap-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Complementary Workflows
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                Related Tools You Might Like
              </h2>
            </div>
            
            <button
              onClick={() => onNavigate('tools')}
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              All Tools <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedToolsList.map((rel) => {
              const RelIcon = ICON_MAP[rel.iconName] || Scissors;
              return (
                <div
                  key={rel.id}
                  onClick={() => onNavigate('tool-detail', rel.id)}
                  className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between gap-3 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <RelIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">{rel.name}</h4>
                      <span className="text-[10px] text-slate-400">{rel.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{rel.shortDesc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Launch CTA */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/30 text-center flex flex-col items-center gap-4">
        <h3 className="text-2xl font-bold text-white">
          Ready to experience {tool.name}?
        </h3>
        <p className="text-xs text-slate-400 max-w-md">
          Open the tool directly inside your browser now. Free, private, and unlimited.
        </p>
        <button
          onClick={() => onLaunchTool(tool.id)}
          className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 transition-all"
        >
          Launch {tool.name} Now
        </button>
      </section>

    </div>
  );
}
