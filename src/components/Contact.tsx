"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, Github, Linkedin, FileText, Sparkles, Terminal, ArrowUp } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Web App",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rishikeshdas788@gmail.com");
    setCopied(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#ff6b2b", "#00d4ff", "#f59e0b", "#ffffff"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.7 },
      colors: ["#ff6b2b", "#00d4ff", "#10b981", "#ffffff"],
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#04060b] border-t border-white/10 z-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-radial from-amber-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight mb-4">
            Let&apos;s build something <br />
            <span className="text-gradient-fire">unforgettable.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Available for select freelance engineering, high-impact contract roles, and ambitious AI/web projects.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          {/* Left Column: Quick Connect Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl glass-card relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-2">
                  Direct Inquiries
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-base sm:text-lg font-mono text-white font-medium select-all">
                    rishikeshdas788@gmail.com
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <span className="text-[11px] font-mono text-emerald-400 mt-1.5 block">
                    Copied to clipboard with celebration!
                  </span>
                )}
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-2">
                  Location & Timezone
                </span>
                <p className="text-sm text-slate-300 font-sans">
                  Asansol, West Bengal, India (IST, UTC+5:30)
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Available for Remote & Hybrid Engineering Roles
                </p>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-3">
                  Networks & Profiles
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://github.com/rishikeshdas887"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 border border-white/10 transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rishikesh-das000/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 border border-white/10 transition-all hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="mailto:rishikeshdas788@gmail.com"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 border border-white/10 transition-all hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Response SLA: &lt; 24 Hours</span>
              </div>
              <span className="text-xs font-mono text-slate-500">Asansol, IN</span>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass-card">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Transmission Acknowledged
                </h3>
                <p className="text-sm text-slate-300 max-w-md font-light leading-relaxed">
                  Thank you for reaching out. Your transmission has been queued. I will review your requirements and respond promptly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono text-amber-400 hover:underline pt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@studio.design"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Scope / Engagement
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#090e18] border border-white/10 text-white focus:outline-none focus:border-amber-500/50 text-sm transition-colors"
                  >
                    <option value="Full-Stack Web Development">Full-Stack Web Development (React.js / Next.js / Spring Boot)</option>
                    <option value="AI/ML & NLP Engineering">AI/ML &amp; NLP Engineering (FastAPI / Scikit-learn / Retrieval)</option>
                    <option value="Embedded Systems & Edge IoT">Embedded Systems &amp; Edge IoT (ESP32 / Raspberry Pi / MQTT)</option>
                    <option value="Software Engineering Role">Software Engineering Role / Internship Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Project Brief / Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your product, timeline, and what you want to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-glow flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Transmit Transmission</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>&copy; {new Date().getFullYear()} Rishikesh Das. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Next.js 14 &bull; Framer Motion &bull; HTML5 Canvas</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
