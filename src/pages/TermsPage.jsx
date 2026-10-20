import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-16">
      
      {/* Header */}
      <div className="text-center pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          Last Revised: October 20, 2026 • Version 2.0
        </p>
      </div>

      {/* Main Content Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 bg-slate-900/40 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the MediaForge Pro web application ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our application and website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            2. Description of Service &amp; Client-Side Operation
          </h2>
          <p>
            MediaForge Pro provides web-based media processing utilities, including image compression, video bitrate reduction, and automated video segmentation with animated intro bumper overlays. 
          </p>
          <p>
            You acknowledge that the Service operates strictly on your local browser hardware. MediaForge Pro does not provide remote cloud rendering or file storage facilities. All processing speeds, quality levels, and batch performance depend on your device’s hardware capabilities (CPU, GPU, and RAM).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            3. Intellectual Property Rights &amp; User Ownership
          </h2>
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-slate-200">
            <strong className="block text-cyan-300 mb-1">You Retain 100% Ownership of Your Content:</strong>
            MediaForge Pro claims no copyright, ownership, or intellectual property rights over any images, video files, audio tracks, titles, or subtitles that you load, compress, or export through the Service.
          </div>
          <p>
            The software, user interface design, logo marks, brand styling, overlay graphic templates, and underlying code are the intellectual property of MediaForge Pro and are protected under copyright and open-source licenses.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            4. Acceptable Use
          </h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Process, modify, or distribute media that infringes on third-party copyrights, trademarks, or proprietary rights without explicit authorization.</li>
            <li>Process unlawful, harmful, defamatory, or abusive content.</li>
            <li>Attempt to reverse-engineer, inject malicious scripts, or disrupt the availability of the web service for other users.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            5. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, statutory, or implied. While we strive to support all common media formats and resolutions, we do not warrant that the application will be error-free, uninterrupted, or fully compatible with every browser build, operating system, or unusual media codec.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            6. Limitation of Liability
          </h2>
          <p>
            In no event shall MediaForge Pro, its creators, contributors, or affiliates be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service, including but not limited to loss of data, corrupted local exports, or browser crashes caused by memory constraints on massive 4K/8K files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            7. Modifications to Service &amp; Terms
          </h2>
          <p>
            We reserve the right to improve, modify, or discontinue any feature or tool within the application at any time without prior notice. Continued use of the application after revisions to these Terms constitutes acceptance of the modified Terms.
          </p>
        </section>

      </div>

    </div>
  );
}
