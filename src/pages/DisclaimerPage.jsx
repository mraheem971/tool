import React from 'react';
import { AlertCircle, Cpu, ShieldAlert, FileQuestion, Monitor, Layers } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-16">
      
      {/* Header */}
      <div className="text-center pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Technical Notice</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Disclaimer
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          Technical &amp; Operational Disclosures • Updated October 2026
        </p>
      </div>

      {/* Main Content Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 bg-slate-900/40 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-400" />
            1. Client-Side Browser Memory &amp; Large File Limitations
          </h2>
          <p>
            MediaForge Pro relies on in-memory processing via HTML5 Canvas, Web Audio, and the MediaStream Recording API. When working with <strong>long-form 4K or 8K video files</strong> exceeding several gigabytes, web browsers may impose tab-level memory caps (typically 2 GB to 4 GB per browser process).
          </p>
          <p>
            If your browser tab exceeds available memory while rendering dozens of high-bitrate clips, the browser may terminate or refresh the tab. We recommend ensuring adequate free system RAM and closing extraneous tabs when batch-exporting very long 1080p or 4K videos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            2. Hardware Acceleration &amp; Performance Variance
          </h2>
          <p>
            Encoding speeds, frame render rates, and video compression efficiency depend directly on your computer’s hardware configuration:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>GPU Support</strong>: Devices with dedicated hardware video encoders (NVIDIA NVENC, Intel QuickSync, AMD VCE, or Apple Silicon Media Engine) will encode video clips significantly faster than older machines relying on software CPU rendering.</li>
            <li><strong>Thermal Throttling</strong>: Prolonged batch export of 30+ minute video files on mobile devices or laptops running on battery may trigger thermal throttling, momentarily reducing encoding framerates.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            3. Codec Compatibility Across Browsers
          </h2>
          <p>
            Browser vendors maintain varying native codec support:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>Chromium (Chrome, Brave, Edge)</strong>: Fully supports H.264, VP8, VP9, and AV1 video with AAC and Opus audio containers.</li>
            <li><strong>Firefox</strong>: Excellent support for WebM (VP8/VP9/Opus) and standard MP4/H.264 video.</li>
            <li><strong>Safari</strong>: Native support for MP4 (H.264/AAC); certain legacy MKV or proprietary containers may require conversion prior to browser loading.</li>
          </ul>
          <p>
            If a video file fails to load or preview, it may contain an unsupported proprietary codec (e.g. 10-bit HEVC/H.265 or Apple ProRes).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            4. User Responsibility for Media Rights
          </h2>
          <p>
            MediaForge Pro is a neutral media manipulation utility. Users bear sole responsibility for ensuring they possess the necessary legal rights, licenses, and permissions to edit, compress, split, and publish any audio or video content processed through the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            5. External Links &amp; Third-Party Services
          </h2>
          <p>
            Our website and blog may reference external platforms (such as Discord, YouTube, TikTok, or GitHub). MediaForge Pro is an independent project and is not affiliated, sponsored, or endorsed by Discord Inc., Google LLC, ByteDance Ltd., or Microsoft Corporation.
          </p>
        </section>

      </div>

    </div>
  );
}
