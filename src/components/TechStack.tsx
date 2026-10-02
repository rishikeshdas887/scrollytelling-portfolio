"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Cpu, Brain, Terminal } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  skills: { name: string; level: string; desc: string }[];
  accent: string;
  bgGlow: string;
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & Web Architecture",
    icon: <Code2 className="w-5 h-5 text-amber-400" />,
    subtitle: "Component-based architecture & responsive interfaces",
    skills: [
      { name: "React.js & Next.js", level: "Primary", desc: "Component lifecycle, hooks, App Router, responsive interfaces" },
      { name: "Vite & Modern Tooling", level: "Proficient", desc: "Fast build workflows, optimized bundling, HMR" },
      { name: "Tailwind CSS & HTML5/CSS3", level: "Advanced", desc: "Responsive design, flexbox/grid, custom design tokens" },
      { name: "JavaScript (ES6+) & TypeScript", level: "Advanced", desc: "Async/await, DOM APIs, strict typing, modular code" },
    ],
    accent: "border-amber-500/30 text-amber-400",
    bgGlow: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Backend & Relational Databases",
    icon: <Server className="w-5 h-5 text-cyan-400" />,
    subtitle: "Robust REST API design & database schema modeling",
    skills: [
      { name: "FastAPI (Python)", level: "Primary", desc: "Pydantic validation, asynchronous endpoints, OpenAPI documentation" },
      { name: "Spring Boot (Java) & Node.js", level: "Proficient", desc: "Enterprise MVC patterns, Express.js middleware, CRUD operations" },
      { name: "PostgreSQL & MySQL", level: "Advanced", desc: "Relational schema design, SQL querying, indexing, constraints" },
      { name: "JWT Auth & JPA/Hibernate ORM", level: "Proficient", desc: "Stateless authentication, token validation, entity mappings" },
    ],
    accent: "border-cyan-500/30 text-cyan-400",
    bgGlow: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    title: "AI, Machine Learning & NLP",
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    subtitle: "Information retrieval, intent classification & evaluation",
    skills: [
      { name: "NLP & Intent Classification", level: "Applied", desc: "TF-IDF vectorization, feature extraction, text preprocessing" },
      { name: "Information Retrieval & Scikit-learn", level: "Applied", desc: "Similarity scoring, automated triage vs. escalation thresholds" },
      { name: "LLM-as-a-Judge & Model Evaluation", level: "Evaluated", desc: "200-example golden sets, baseline comparisons, failure analysis" },
      { name: "Pandas, NumPy & Computer Vision", level: "Proficient", desc: "Data wrangling, edge object detection on Raspberry Pi" },
    ],
    accent: "border-purple-500/30 text-purple-400",
    bgGlow: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    title: "Embedded, IoT & DevOps Tools",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    subtitle: "Hardware telemetry & containerized deployment",
    skills: [
      { name: "Raspberry Pi & ESP32", level: "Hands-on", desc: "Real-time edge CV inference, PIR sensor integration, hardware actuation" },
      { name: "MQTT Protocol Telemetry", level: "Applied", desc: "Lightweight pub/sub telemetry, broker sync with web dashboards" },
      { name: "Docker & Docker Compose", level: "Practical", desc: "Containerized multi-service orchestration, Nginx reverse proxying" },
      { name: "Git, Linux CLI & Vercel", level: "Daily Workflow", desc: "Version control, Ubuntu command line, cloud deployment, Agile/Scrum" },
    ],
    accent: "border-emerald-500/30 text-emerald-400",
    bgGlow: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
];

export default function TechStack() {
  return (
    <section id="capabilities" className="relative w-full py-28 px-6 md:px-12 lg:px-20 bg-[#05080e] z-20 content-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-400 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>AUTHENTIC TECHNICAL SKILLS // RESUME VERIFIED</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
            Technical Proficiencies
          </h2>
          <p className="text-slate-400 text-base font-light leading-relaxed">
            Technologies and frameworks applied across practical engineering projects, academic coursework, and industry internship.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.bgGlow} opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 mt-6">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/5">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-light">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
