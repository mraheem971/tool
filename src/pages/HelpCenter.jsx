import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Cpu, Video, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

const HELP_TOPICS = [
  {
    category: 'Video Auto-Clipper & 5s Intros',
    questions: [
      {
        q: 'Can I upload videos longer than 30 minutes or 1 hour?',
        a: 'Yes! MediaForge Pro is specially built to handle long-form 30+ minute, 1-hour, or even 2-hour podcasts, lectures, and gaming streams. Because processing occurs directly in your browser using local blob references, you never wait for lengthy file uploads.'
      },
      {
        q: 'Why is there a minimum 30-second duration for clips?',
        a: 'The minimum clip duration is enforced at 30 seconds to guarantee substantial, high-retention video shorts. It prevents micro-fragmentation and ensures the 5-second intro bumper leaves at least 25 seconds of core content for mobile viewers.'
      },
      {
        q: 'How do I customize the Part # and title on the 5-second intro?',
        a: 'In the Overlay Customizer panel on the clipper page, you can type your overarching video title, add an optional subtitle, pick between 4 themes (Glassmorphism, Cyber Glow, Minimal, Broadcast), select an accent color, and adjust position.'
      }
    ]
  },
  {
    category: 'Hardware & Browser Performance',
    questions: [
      {
        q: 'Why did my export freeze or slow down near the end?',
        a: 'When encoding high-bitrate video, your computer allocates memory for canvas frame buffers. To prevent slowdowns, close unnecessary tabs (such as games or video streams) during batch export, or choose the 720p preset for faster turnaround.'
      },
      {
        q: 'Which browsers offer the best performance?',
        a: 'Google Chrome, Microsoft Edge, and modern Chromium-based browsers offer the highest MediaRecorder API hardware acceleration. Apple Safari (16+) and Mozilla Firefox are also supported.'
      }
    ]
  },
  {
    category: 'Image & Video Compression',
    questions: [
      {
        q: 'How does the side-by-side comparison slider work?',
        a: 'The comparison slider renders the original image on the left and the compressed result on the right. You can drag the vertical divider across the image to verify that edge sharpness and color fidelity are preserved before downloading.'
      },
      {
        q: 'How do I compress videos to fit under Discord 25MB?',
        a: 'In the Video Compressor, simply click the "Discord 25MB" preset. Our adaptive bitrate algorithm automatically computes the optimal bitrate based on your video length to ensure the final file fits safely below Discord\'s upload limit.'
      }
    ]
  }
];

export default function HelpCenter({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState('0-0');

  const filteredTopics = HELP_TOPICS.map(topic => ({
    ...topic,
    questions: topic.questions.filter(
      item => item.q.toLowerCase().includes(search.toLowerCase()) ||
              item.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(topic => topic.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20">
      
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base &amp; Troubleshooting</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Help MediaForge PRO
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Everything you need to know about local browser video processing, 5-second intro overlays, and troubleshooting compression.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto w-full">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search help topics, error messages, presets..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 shadow-xl"
        />
      </div>

      {/* Help Topics */}
      <div className="flex flex-col gap-8">
        {filteredTopics.map((topic, catIdx) => (
          <div key={catIdx} className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> {topic.category}
            </h3>

            <div className="flex flex-col gap-2.5">
              {topic.questions.map((qItem, qIdx) => {
                const key = `${catIdx}-${qIdx}`;
                const isOpen = openItem === key;

                return (
                  <div
                    key={qIdx}
                    className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? '' : key)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="font-bold text-xs sm:text-sm text-slate-200">
                        {qItem.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 leading-relaxed">
                        {qItem.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800 text-slate-400 text-xs">
            No matching answers found for "{search}".
          </div>
        )}
      </div>

      {/* Still Need Help Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-bold text-white">Couldn't find what you were looking for?</h4>
          <p className="text-xs text-slate-400 mt-1">Our development team is on standby to help answer questions or debug files.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
          >
            Contact Support
          </button>
          <button
            onClick={() => onNavigate('report-bug')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
          >
            File Bug Ticket
          </button>
        </div>
      </div>

    </div>
  );
}
