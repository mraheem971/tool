import React, { useState } from 'react';
import { 
  Mail, MessageSquare, Send, CheckCircle2, AlertCircle, 
  HelpCircle, GitBranch, MessageCircle, Sparkles, Shield, Clock 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate instantaneous client-side acknowledgment
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      topic: 'General Inquiry',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-16 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center pt-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Contact the MediaForge Team
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Have questions, suggestions for new bumper templates, or need help with a custom media workflow? We’d love to hear from you.
        </p>
      </div>

      {/* Main Dual Grid: Form & Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/50 shadow-2xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Message Received!</h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Thank you for reaching out, <strong className="text-slate-200">{formData.name}</strong>. Our engineering and community team will review your inquiry and follow up at <strong className="text-cyan-400">{formData.email}</strong>.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">Send a Message</h3>
                <p className="text-xs text-slate-400">Fill out the form below and we'll respond within 24 hours.</p>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
              </div>

              {/* Topic Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Inquiry Topic</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feature Request">Feature Request (e.g. New Bumper Template)</option>
                  <option value="Bug Report">Bug Report / Browser Compatibility</option>
                  <option value="Partnership & Integration">Partnership &amp; Integration</option>
                  <option value="Feedback">Creator Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you're working on or how we can help..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60 leading-relaxed resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Sidebar (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Contact Cards */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-slate-900/40 flex flex-col gap-4">
            <h3 className="font-bold text-sm text-slate-200">Official Communication Channels</h3>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Support</span>
                <a href="mailto:support@mediaforgepro.com" className="text-xs font-mono font-bold text-cyan-400 hover:underline">
                  support@mediaforgepro.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Open Source Repo</span>
                <a 
                  href="https://github.com/mraheem971/tool.git" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs font-mono font-bold text-purple-400 hover:underline"
                >
                  github.com/mraheem971/tool
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Response Expectation</span>
                <span className="text-xs text-slate-300">Within 24 Hours • Monday to Friday</span>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-start gap-3 text-xs text-slate-400">
            <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Privacy Assured</strong>
              We never sell or disclose contact details. Information submitted here is used solely to respond to your specific inquiry.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
