import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20 text-slate-300">
      
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Effective Date: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Our core premise is simple: <strong className="text-white">we do not collect, upload, store, or view your files. Period.</strong>
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col gap-2">
          <HardDrive className="w-6 h-6 text-emerald-400" />
          <h4 className="font-bold text-sm text-white">100% Local Device</h4>
          <p className="text-xs text-slate-400">All media transcoding happens in your local RAM and GPU shaders.</p>
        </div>
        <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col gap-2">
          <Server className="w-6 h-6 text-cyan-400" />
          <h4 className="font-bold text-sm text-white">0 Remote Servers</h4>
          <p className="text-xs text-slate-400">No media data is ever uploaded over the internet or sent to external APIs.</p>
        </div>
        <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex flex-col gap-2">
          <EyeOff className="w-6 h-6 text-purple-400" />
          <h4 className="font-bold text-sm text-white">Zero Tracking Cookies</h4>
          <p className="text-xs text-slate-400">We do not employ programmatic advertising trackers or fingerprinting.</p>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-8 text-sm leading-relaxed">
        
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">1. Information We Do NOT Collect</h2>
          <p>
            Unlike conventional web-based media converters, MediaForge Pro is an exclusively <strong>client-side application</strong>. When you select a video or image file:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
            <li>We do not collect or transmit your video footage, audio streams, or photos.</li>
            <li>We do not record file names, metadata, EXIF geotags, or durations on any server.</li>
            <li>We do not create user accounts, require email registrations, or collect financial data.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">2. Technical Execution (How Your Media is Handled)</h2>
          <p>
            When you import media into MediaForge Pro:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
            <li>The browser generates a local object reference URL (<code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">blob:http://...</code>). This points exclusively to your computer's local memory.</li>
            <li>Video frames and audio buffers are processed by the browser's native <strong className="text-slate-200">HTML5 Canvas</strong>, <strong className="text-slate-200">MediaRecorder API</strong>, and <strong className="text-slate-200">Web Audio Context</strong>.</li>
            <li>The rendered clips or compressed images are constructed locally and delivered straight to your "Downloads" directory via <strong className="text-slate-200">JSZip</strong> and native browser download triggers.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">3. Local Storage</h2>
          <p>
            We may store minimal functional preferences in your browser's <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">localStorage</code> (such as your preferred 5-second intro overlay template, color palette, or audio mute preference). This data never leaves your browser and can be wiped at any time by clearing your browser cache.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">4. GDPR, CCPA &amp; Global Compliance</h2>
          <p>
            Because we do not store, possess, or process your personal files or personal data on remote servers, MediaForge Pro operates in complete harmony with the European Union General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and global data sovereignty mandates.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">5. Changes to This Policy</h2>
          <p>
            If our architectural practices evolve, updates will be reflected on this page with a revised effective date. Our pledge to zero-server processing and absolute privacy will remain perpetual.
          </p>
        </section>

      </div>

    </div>
  );
}
