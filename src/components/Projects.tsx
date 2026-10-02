"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles, Layers, Terminal, X, CheckCircle2 } from "lucide-react";
import { detectQualityConfig } from "@/utils/quality";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  gradient: string;
  accentColor: string;
  demoUrl: string;
  githubUrl: string;
  architectureDetails: string[];
  techStackDetailed: string[];
}

const PROJECTS: Project[] = [
  {
    id: "ai-support-agent",
    title: "AI Customer Support Agent",
    subtitle: "Intent Classification & Response Retrieval Pipeline",
    category: "AI / Machine Learning",
    description:
      "Trained on the TWCS dataset to classify customer intent and retrieve relevant historical support responses, routing queries via confidence thresholds to auto-handle or escalate.",
    metrics: [
      { label: "Golden Eval Set", value: "200 Examples" },
      { label: "Evaluation", value: "LLM-as-a-Judge" },
      { label: "Backend API", value: "FastAPI" },
    ],
    tags: ["Python", "FastAPI", "React.js", "Scikit-learn", "TF-IDF", "NLP", "Pandas", "NumPy"],
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    accentColor: "#f59e0b",
    demoUrl: "https://github.com/rishikeshdas887",
    githubUrl: "https://github.com/rishikeshdas887",
    architectureDetails: [
      "Customer intent classification trained on TWCS (Twitter Customer Support) dataset utilizing TF-IDF feature extraction.",
      "Historical support-response retrieval engine computing similarity scores against indexed resolution knowledge.",
      "Configurable confidence threshold logic automatically resolving routine inquiries vs. escalating complex edge cases.",
      "FastAPI asynchronous backend serving low-latency REST endpoints to a responsive React.js interface.",
      "Rigorous evaluation pipeline benchmarked against a 200-example golden set with human evaluation, baseline comparison, and LLM-as-a-judge failure-mode analysis.",
    ],
    techStackDetailed: ["Python", "FastAPI", "React.js", "Scikit-learn", "TF-IDF Vectorizer", "Pandas", "NumPy", "REST API"],
  },
  {
    id: "judgeforge",
    title: "JudgeForge (Hack The Dog)",
    subtitle: "DOGFOOD 2026 Hackathon Management Platform",
    category: "Full Stack & Systems",
    description:
      "Full-stack hackathon coordination platform managing organizer event creation, participant team formation, and mobile-optimized scoring workflows.",
    metrics: [
      { label: "Deployment", value: "Docker Compose" },
      { label: "Frontend Proxy", value: "Nginx" },
      { label: "Backend Framework", value: "Spring Boot" },
    ],
    tags: ["Java", "Spring Boot", "React.js", "Vite", "Nginx", "Docker Compose", "REST API", "Python", "Git"],
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    accentColor: "#00d4ff",
    demoUrl: "https://github.com/rishikeshdas887",
    githubUrl: "https://github.com/rishikeshdas887",
    architectureDetails: [
      "Engineered for DOGFOOD 2026 hackathon management with organizer event lifecycle and participant team workflows.",
      "Robust Java / Spring Boot REST backend handling submission metadata, judging criteria, and leaderboard calculation.",
      "Responsive React.js / Vite client featuring a dedicated, mobile-optimized interface for judges evaluating on tablet and phone.",
      "Docker Compose multi-service deployment pairing the Spring Boot backend with an Nginx-served static frontend.",
      "JSON-file persistence model coupled with automated Python verification scripts for continuous validation.",
    ],
    techStackDetailed: ["Java 21", "Spring Boot 3", "React.js", "Vite", "Nginx", "Docker Compose", "REST API", "Python", "Git"],
  },
  {
    id: "smart-energy-system",
    title: "Smart Energy Conservation System",
    subtitle: "Occupancy-Triggered Edge Telemetry & Hardware Actuation",
    category: "IoT & Embedded",
    description:
      "Integrated IoT telemetry pipeline coupling ESP32 microcontrollers and PIR occupancy sensors with an MQTT broker and live React telemetry dashboard.",
    metrics: [
      { label: "Microcontroller", value: "ESP32" },
      { label: "Telemetry", value: "MQTT Broker" },
      { label: "Frontend", value: "React Dashboard" },
    ],
    tags: ["ESP32", "Python", "MQTT", "React.js", "Edge AI", "PIR Sensors"],
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    accentColor: "#10b981",
    demoUrl: "https://github.com/rishikeshdas887",
    githubUrl: "https://github.com/rishikeshdas887",
    architectureDetails: [
      "ESP32 microcontroller firmware interfacing with PIR motion sensors to monitor room occupancy in real time.",
      "Lightweight MQTT messaging protocol streaming live sensor telemetry to an edge message broker.",
      "Interactive React.js web dashboard rendering real-time occupancy status, energy analytics, and system state.",
      "Automated relay actuation logic turning off inactive devices upon occupancy timeout to prevent energy waste.",
      "End-to-end embedded-to-web telemetry bridge with bidirectional state synchronization.",
    ],
    techStackDetailed: ["ESP32 Firmware", "Python Scripts", "MQTT Protocol", "React.js", "Edge AI Logic", "PIR Sensors"],
  },
  {
    id: "cab-booking-app",
    title: "Cab Booking Web Application",
    subtitle: "Responsive Ride Booking & Fare Management Interface",
    category: "Full Stack & Web",
    description:
      "Interactive web application providing intuitive ride estimation, destination selection, and booking workflow state management deployed on Vercel.",
    metrics: [
      { label: "Hosting", value: "Vercel Edge" },
      { label: "Architecture", value: "REST API" },
      { label: "Frontend", value: "React.js" },
    ],
    tags: ["React.js", "Node.js", "JavaScript", "REST API", "Vercel"],
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    accentColor: "#a855f7",
    demoUrl: "https://github.com/rishikeshdas887",
    githubUrl: "https://github.com/rishikeshdas887",
    architectureDetails: [
      "Dynamic booking workflow allowing users to set pickup points, select destinations, and choose ride categories.",
      "Node.js and Express REST API calculating fare estimates, trip durations, and driver availability.",
      "State-driven React.js user interface designed for mobile responsiveness and fast touch interactions.",
      "Stateless API endpoints and static frontend assets configured for continuous deployment on Vercel.",
    ],
    techStackDetailed: ["React.js", "Node.js", "JavaScript (ES6+)", "Express REST API", "Vercel"],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "AI / Machine Learning", "Full Stack & Systems", "IoT & Embedded"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category.includes(activeFilter.replace(" & Systems", ""));
  });

  // Zero-layout 3D card tilt via native event offsets
  const handleCardMouseMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const config = detectQualityConfig();
    if (!config.enable3DTilt || config.isTouch) return;

    const card = e.currentTarget;
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    if (w === 0 || h === 0) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const centerX = w / 2;
    const centerY = h / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
  }, []);

  const handleCardMouseLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);

  return (
    <section id="work" className="relative w-full py-32 px-6 md:px-12 lg:px-20 bg-[#05080e] z-20 content-auto">
      {/* Background ambient lighting (controlled fill-rate) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] max-w-[700px] h-[350px] bg-amber-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUTHENTIC PORTFOLIO PROJECTS // RESUME DOCUMENTED</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm md:text-base font-light leading-relaxed">
            Practical engineering implementations spanning NLP customer retrieval, hackathon management systems, and embedded IoT automation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-amber-500 text-black font-bold shadow-sm scale-105"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onPointerMove={handleCardMouseMove}
              onPointerLeave={handleCardMouseLeave}
              className="group relative rounded-3xl p-8 glass-card overflow-hidden flex flex-col justify-between"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out, border-color 0.3s ease, background 0.3s ease",
              }}
            >
              {/* Card Ambient Highlight */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Top Meta */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight mb-2 group-hover:text-amber-300 transition-colors duration-300 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </h3>

                <p className="text-sm font-medium text-slate-400 font-sans mb-4">
                  {project.subtitle}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed font-light mb-8">
                  {project.description}
                </p>

                {/* Metrics Bar */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5 mb-8">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-sm sm:text-base font-bold text-white font-display">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Tags */}
              <div className="relative z-10 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors font-medium py-2 px-1 cursor-pointer"
                  >
                    <span>Architecture Blueprint</span>
                    <Layers className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/25 transition-colors"
                      title="View Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#080d16] border border-white/15 p-6 sm:p-8 md:p-10 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>RESUME IMPLEMENTATION BREAKDOWN</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white font-display mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 mb-6">
                {selectedProject.subtitle}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">
                  Documented Key Metrics
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-lg sm:text-xl font-bold text-amber-400 font-display">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="mb-8">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-4">
                  Documented Technical Specifications
                </h4>
                <ul className="space-y-3">
                  {selectedProject.architectureDetails.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Stack */}
              <div className="mb-8">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStackDetailed.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors border border-white/10"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-mono text-black font-bold transition-all"
                >
                  <span>Repository Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
