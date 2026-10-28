import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, Sparkles, Bug, HelpCircle } from 'lucide-react';
import { addTicket } from '../services/adminStore';

export default function ContactUs({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    addTicket(formData);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-12 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>We'd Love To Hear From You</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Have a question, feedback, feature idea, or need enterprise media workflow integration? Drop us a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Form (8 cols) */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-400 max-w-md">
                Thank you for reaching out, <strong className="text-slate-200">{formData.name}</strong>. Our developer team usually responds within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' }); }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Inquiry Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                >
                  <option>General Inquiry</option>
                  <option>Feature Request / Suggestion</option>
                  <option>Bug Report (or use dedicated Bug Page)</option>
                  <option>Business &amp; Creator Partnership</option>
                  <option>Open Source Contribution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Suggestion for video clipper bumper"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all mt-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Quick Links & Info (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Response Time
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We monitor messages daily. You can expect a direct response within 24–48 hours on business days.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Bug className="w-4 h-4 text-purple-400" /> Encountered a Glitch?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              For technical bugs or browser crashes, please use our automated diagnostic form.
            </p>
            <button
              onClick={() => onNavigate('report-bug')}
              className="text-xs font-bold text-purple-400 hover:underline text-left"
            >
              Go to Report a Bug &rarr;
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" /> Help &amp; FAQs
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Check out our Help Center for quick answers on hardware limits, formats, and troubleshooting.
            </p>
            <button
              onClick={() => onNavigate('help')}
              className="text-xs font-bold text-emerald-400 hover:underline text-left"
            >
              Visit Help Center &rarr;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
