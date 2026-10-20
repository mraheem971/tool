import React from 'react';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20 text-slate-300">
      
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold w-fit">
          <FileText className="w-3.5 h-3.5" />
          <span>Last Updated: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Clear, creator-friendly terms governing your use of the MediaForge Pro suite.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-8 text-sm leading-relaxed">
        
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using MediaForge Pro ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">2. Permitted Use &amp; Commercial Rights</h2>
          <p>
            MediaForge Pro is free to use for both <strong>personal</strong> and <strong>commercial</strong> media production. You are free to process videos and images for YouTube channels, TikTok/Reels accounts, podcasts, commercial client projects, eCommerce catalogs, and marketing campaigns without paying royalties or fees.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">3. Ownership of Your Media</h2>
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs sm:text-sm">
            <strong>Your Content Remains 100% Yours:</strong> MediaForge Pro claims zero ownership, license, copyright, or moral rights over any media you input, trim, compress, or export. All rights remain exclusively with you or the lawful copyright holder.
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">4. User Responsibilities &amp; Hardware Requirements</h2>
          <p>
            Because MediaForge executes 100% in your local web browser, processing speed and stability depend directly on your device's hardware (CPU, RAM, GPU, and browser codec support).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
            <li>You agree not to use the Service with media that infringes on third-party intellectual property or violates applicable local laws.</li>
            <li>You are responsible for saving your exported files to your computer storage. MediaForge does not store backups of your generated clips.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for absolute stability, we do not warrant that video rendering will be uninterrupted, error-free, or compatible with obsolete browser versions.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">6. Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed in accordance with standard international open-source software practices and applicable jurisdictional laws.
          </p>
        </section>

      </div>

    </div>
  );
}
