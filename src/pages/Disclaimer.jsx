import React from 'react';
import { AlertTriangle, Info, ShieldAlert, Cpu } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20 text-slate-300">
      
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold w-fit">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Legal &amp; Operational Notice</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Disclaimer
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Important disclosures regarding local computing load, copyright compliance, and third-party trademarks.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-8 text-sm leading-relaxed">
        
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> 1. Client-Side Computational Load
          </h2>
          <p>
            MediaForge Pro carries out heavy real-time video encoding, canvas compositing, and audio multiplexing entirely within your client web browser. 
          </p>
          <p className="text-xs sm:text-sm text-slate-400">
            Rendering multi-hour 4K (2160p) or 60FPS video streams may cause high temporary CPU and GPU utilization on your device. We recommend closing extraneous browser tabs when exporting large batches of video clips. MediaForge Pro is not liable for temporary device slowdowns or browser tab crashes resulting from hardware RAM constraints.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-400" /> 2. Copyright &amp; Fair Use
          </h2>
          <p>
            You are solely responsible for ensuring you hold the lawful copyright, license, or Fair Use entitlement to any source media you process, clip, or distribute using this platform. MediaForge Pro provides automated clipping and compression utilities as a neutral technological service and does not pre-screen, monitor, or review the content you choose to manipulate.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-400" /> 3. Third-Party Trademarks
          </h2>
          <p>
            All brand names, trademarks, and logos referenced on MediaForge Pro — including but not limited to <em>Discord, TikTok, YouTube, Instagram, WhatsApp, Spotify, Apple, Twitch, WebP, and AVIF</em> — belong exclusively to their respective owners. Their reference on this website is solely for descriptive compatibility purposes (e.g., explaining recommended preset dimensions or file size limits) and does not imply endorsement, sponsorship, or affiliation.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">4. No Data Retention Guarantee</h2>
          <p>
            Because MediaForge Pro does not retain any files on servers, if you navigate away or close your browser tab before saving your exported clips or compressed files, your processed output cannot be recovered by our team. Please ensure you download all necessary files to your local storage before closing the page.
          </p>
        </section>

      </div>

    </div>
  );
}
