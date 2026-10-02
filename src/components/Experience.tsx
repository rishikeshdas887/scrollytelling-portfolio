"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ShieldCheck, Terminal, MapPin } from "lucide-react";

interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  location: string;
  type: string;
  desc: string;
  highlights: string[];
}

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score?: string;
  stream?: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "FEB 2026 – APR 2026",
    role: "AI & Embedded Systems Developer Intern",
    org: "Plumule Research LLP",
    location: "Durgapur, West Bengal",
    type: "Industry Internship",
    desc: "Engineered a standalone real-time computer vision object detection system deployed on Raspberry Pi with zero cloud dependency.",
    highlights: [
      "Optimized model pipeline to reduce edge inference latency by 35% on resource-constrained hardware.",
      "Integrated ESP32 microcontrollers via MQTT messaging protocol to trigger automated hardware actuation.",
      "Delivered end-to-end technical demonstrations to project stakeholders and mentors.",
      "Maintained version-controlled codebase and collaborated within an Agile/Scrum team development cycle.",
    ],
  },
];

const EDUCATION_ITEMS: EducationItem[] = [
  {
    period: "AUG 2023 – JUN 2027",
    degree: "B.Tech in Electronics & Communication Engineering (ECE)",
    institution: "NSHM Knowledge Campus",
    location: "Durgapur, West Bengal",
  },
  {
    period: "COMPLETED",
    degree: "Class XII — AISSCE",
    institution: "Science Stream",
    location: "CBSE Board",
    score: "60%",
    stream: "Physics, Chemistry, Mathematics",
  },
  {
    period: "COMPLETED",
    degree: "Class X — AISSE",
    institution: "CBSE Board",
    location: "Secondary School Examination",
    score: "94.4%",
  },
];

const METRICS = [
  { value: "35%", label: "Latency Reduction", desc: "Edge CV inference on Raspberry Pi" },
  { value: "200", label: "Golden Eval Set", desc: "Intent classification & retrieval" },
  { value: "0 Cloud", label: "Edge Dependency", desc: "Local vision & MQTT actuation" },
  { value: "94.4%", label: "Class X AISSE", desc: "Documented academic record" },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#05080e] z-20 content-auto">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-amber-400 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>AUTHENTIC WORK HISTORY &amp; EDUCATION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight">
              Experience &amp; Education
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm md:text-base font-light leading-relaxed">
            Documented internships, engineering degree coursework, and verified academic record from curriculum vitae.
          </p>
        </div>

        {/* Verified Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {METRICS.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card text-center hover:border-amber-500/30 transition-all group"
            >
              <div className="text-3xl sm:text-4xl font-black text-white font-display mb-1 group-hover:text-amber-400 transition-colors">
                {m.value}
              </div>
              <div className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                {m.label}
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                {m.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Work Experience Block */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Professional Work Experience
            </h3>
          </div>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl glass-card relative overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column: Period & Type */}
                  <div className="lg:w-1/4 shrink-0">
                    <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 inline-block mb-2">
                      {exp.period}
                    </span>
                    <div className="text-xs text-slate-400 font-mono">
                      {exp.type}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Right Column: Details & Documented Achievements */}
                  <div className="lg:w-3/4">
                    <h4 className="text-2xl font-bold text-white font-display mb-1">
                      {exp.role}
                    </h4>
                    <div className="text-sm font-mono text-cyan-400 mb-4">
                      {exp.org}
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                      {exp.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
                      {exp.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Block (Phase 6) */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Academic Background &amp; Education
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION_ITEMS.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-amber-400 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {edu.period}
                    </span>
                    {edu.score && (
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {edu.score}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white font-display mb-1.5">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-mono text-cyan-300 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {edu.location}
                  </p>
                </div>
                {edu.stream && (
                  <div className="pt-3 mt-4 border-t border-white/5 text-[11px] font-mono text-slate-500">
                    {edu.stream}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
