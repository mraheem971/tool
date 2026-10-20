import React, { useState } from 'react';
import { TOOLS_DATA } from '../data/toolsData';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, 
  HelpCircle, Lightbulb, Zap, Shield, Sparkles, BookOpen, Layers, 
  Play, Download, Sliders, ExternalLink 
} from 'lucide-react';

// Tool components
import VideoClipper from '../components/VideoClipper/VideoClipper';
import ImageCompressor from '../components/ImageCompressor/ImageCompressor';
import VideoCompressor from '../components/VideoCompressor/VideoCompressor';

export default function ToolDetailPage({ toolId, onNavigate, onLaunchTool }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const tool = TOOLS_DATA.find((t) => t.id === toolId) || TOOLS_DATA[0];
  const Icon = tool.icon;

  const relatedTools = TOOLS_DATA.filter((t) => tool.relatedToolIds.includes(t.id));

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-12 pb-16">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <button
          onClick={() => onNavigate('tools')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {tool.category}
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            100% Client-Side Safe
          </span>
        </div>
      </div>

      {/* Tool Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/50">
        <div className="flex items-start sm:items-center gap-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${tool.accentBg} ${tool.accentBorder} border flex items-center justify-center ${tool.accentText} flex-shrink-0 shadow-lg`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{tool.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {tool.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">{tool.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('tool-workspace');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Scroll to Live Tool</span>
          </button>
        </div>
      </div>

      {/* Embedded Live Tool Studio */}
      <section id="tool-workspace" className="scroll-mt-24 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Live Studio</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Direct In-Browser Hardware Execution
          </span>
        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-4 sm:p-6 shadow-2xl">
          {tool.id === 'clipper' && <VideoClipper />}
          {tool.id === 'image' && <ImageCompressor />}
          {tool.id === 'video' && <VideoCompressor />}
        </div>
      </section>

      {/* Description Section */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Comprehensive Description &amp; Architecture</span>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {tool.description}
        </div>

        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Technical Highlights</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Step-by-Step Guide</span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">How to Use {tool.name}</h2>
          <p className="text-xs text-slate-400 mt-1">Follow these straightforward steps to achieve the highest quality results.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tool.instructions.map((inst) => (
            <div
              key={inst.step}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between gap-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-black px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                  Step {inst.step}
                </span>
                <Lightbulb className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-200 mb-1">{inst.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{inst.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Examples & Use Cases */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col gap-6">
        <div>
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Case Studies &amp; Benchmarks</span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">Real-World Examples</h2>
          <p className="text-xs text-slate-400 mt-1">See how creators, engineers, and digital agencies utilize this tool.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tool.examples.map((ex, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between gap-4"
            >
              <div>
                <h4 className="font-bold text-sm text-cyan-300 mb-2">{ex.title}</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold uppercase text-[10px] block">Scenario:</span>
                    <p className="text-slate-300 leading-relaxed">{ex.scenario}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold uppercase text-[10px] block">Result:</span>
                    <p className="text-slate-400 leading-relaxed">{ex.result}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono font-bold text-cyan-300">
                  {ex.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relevant FAQs */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">Got Questions? We Have Answers.</h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about processing, formats, and privacy.</p>
        </div>

        <div className="flex flex-col gap-3">
          {tool.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-sm text-slate-200 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="pt-8 border-t border-slate-800 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Complementary Utilities</span>
            <h2 className="text-xl font-bold text-slate-100">Related Tools in MediaForge PRO</h2>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="text-xs text-cyan-400 hover:underline font-bold"
          >
            View all tools
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {relatedTools.map((rel) => {
            const RelIcon = rel.icon;
            return (
              <div
                key={rel.id}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 bg-slate-900/40 flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${rel.accentBg} ${rel.accentBorder} border flex items-center justify-center ${rel.accentText}`}>
                    <RelIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">{rel.name}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{rel.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate(`tool-${rel.id}`)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
                    title="View Details"
                  >
                    Guide
                  </button>
                  <button
                    onClick={() => onLaunchTool(rel.id)}
                    className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <span>Use</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
