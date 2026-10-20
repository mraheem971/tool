import React from 'react';
import { Shield, Lock, EyeOff, ServerOff, Database, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-16">
      
      {/* Header */}
      <div className="text-center pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Zero-Upload Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          Effective Date: October 20, 2026 • Version 2.0
        </p>
      </div>

      {/* Highlights Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-emerald-950/10 flex flex-col gap-4">
        <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          Executive Privacy Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          MediaForge Pro is architected with a strict <strong>Privacy-by-Design</strong> principle. When you use our Image Compressor, Video Compressor, or Long-Form Video Auto-Clipper, your images, audio streams, and video files <strong>never leave your computer or browser environment</strong>. No server receives, logs, stores, or inspects your media.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <ServerOff className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>0 MB Sent to Remote Servers</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <Database className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>No User Account or Database</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <EyeOff className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>No Tracking or Invasive Cookies</span>
          </div>
        </div>
      </div>

      {/* Policy Content Sections */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 bg-slate-900/40 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            1. Information We Do Not Collect
          </h2>
          <p>
            Unlike traditional cloud media conversion platforms that upload your files to remote cloud buckets (such as AWS S3 or Google Cloud Storage), MediaForge Pro executes all encoding, resizing, rasterization, and segment clipping locally on your device via client-side Web Standards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>We do not collect, view, or store your uploaded video, image, or audio files.</li>
            <li>We do not extract metadata (such as EXIF location data or camera serial numbers) for advertising purposes.</li>
            <li>We do not require you to create an account, register an email address, or provide phone numbers to use our tools.</li>
            <li>We do not log file names, durations, or resolution dimensions on any server.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            2. Local Browser Processing Mechanism
          </h2>
          <p>
            When you select a file or drop it into our interface, the browser reads the file into memory using the HTML5 <code>File</code> and <code>Blob</code> APIs. 
          </p>
          <p>
            Video manipulation, 5-second intro bumper rendering, and image compression are handled in temporary browser volatile memory (RAM) utilizing:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>Canvas 2D Context</strong>: Generates real-time bumper graphics and text overlays directly onto pixels.</li>
            <li><strong>MediaStream Recording API</strong>: Re-encodes frames into target video formats using your device's native GPU encoder.</li>
            <li><strong>Web Audio API</strong>: Decodes and synchronizes audio channels locally.</li>
          </ul>
          <p>
            When you close the browser tab or refresh the page, the allocated memory is automatically released by your browser’s garbage collector.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            3. Cookies and Analytics
          </h2>
          <p>
            MediaForge Pro is strictly cookie-free. We do not use advertising trackers, persistent cross-site cookies, or behavioral surveillance pixels. Any site preferences (such as your chosen overlay template theme or duration selector) remain in local session memory.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            4. Third-Party Libraries and CDNs
          </h2>
          <p>
            Our web application bundles its frontend dependencies (such as React, Lucide Icons, and JSZip) locally. Fonts are served via standard Google Fonts CDN. No user media or file identifiers are ever shared with these content delivery networks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            5. Compliance with Global Privacy Frameworks (GDPR &amp; CCPA)
          </h2>
          <p>
            Because MediaForge Pro does not collect, process, or sell personal data or uploaded media, our operational model inherently satisfies the core tenets of the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>Right to Erasure</strong>: No personal data is stored to erase.</li>
            <li><strong>Data Minimization</strong>: 100% local processing eliminates transmission risks.</li>
            <li><strong>No Sale of Data</strong>: Zero user records or behavioral profiles exist to monetize.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            6. Changes to this Privacy Policy
          </h2>
          <p>
            We may occasionally update this Privacy Policy to reflect enhancements to our client-side tools or browser API capabilities. Any revisions will be reflected with an updated effective date at the top of this document.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            7. Contact Us
          </h2>
          <p>
            If you have questions regarding our privacy architecture or client-side execution, please reach out via our contact page or at <code className="text-cyan-400">privacy@mediaforgepro.com</code>.
          </p>
        </section>

      </div>

    </div>
  );
}
