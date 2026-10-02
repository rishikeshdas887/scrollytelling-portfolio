"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, Code2, Cpu, Sparkles, MapPin } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

function Overlay({ scrollYProgress }: OverlayProps) {
  // --- Section 1: Hero (0% scroll, Center) ---
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -80]);
  const z1 = useTransform(scrollYProgress, [0, 0.22], [0, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

  // --- Section 2: Full Stack Engineering (30% scroll, Left aligned) ---
  const opacity2 = useTransform(scrollYProgress, [0.20, 0.30, 0.44, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.20, 0.35, 0.52], [80, 0, -80]);
  const z2 = useTransform(scrollYProgress, [0.20, 0.35, 0.52], [-40, 20, -40]);

  // --- Section 3: AI/ML & Embedded (60% scroll, Right aligned - replaces Synthesis 2) ---
  const opacity3 = useTransform(scrollYProgress, [0.50, 0.60, 0.74, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.50, 0.65, 0.82], [80, 0, -80]);
  const z3 = useTransform(scrollYProgress, [0.50, 0.65, 0.82], [-40, 20, -40]);

  // --- Section 4: Transition to Projects (85% scroll, Center transition) ---
  const opacity4 = useTransform(scrollYProgress, [0.82, 0.90, 0.98], [0, 1, 0.5]);
  const y4 = useTransform(scrollYProgress, [0.82, 0.92, 1], [60, 0, -30]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none perspective-stage">
      
      {/* SECTION 1: CENTER (0% Scroll) - Real Profile from Resume */}
      <motion.div
        style={{ opacity: opacity1, y: y1, z: z1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 lg:p-16 depth-layer-content"
      >
        <div className="max-w-4xl mx-auto pt-14 sm:pt-0">
          {/* Editorial Role & Location Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4 sm:mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-300 font-mono font-medium">
              Full Stack Web &bull; AI/ML &bull; Software Engineering
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono pl-1 border-l border-white/10">
              <MapPin className="w-3 h-3 text-amber-400/80" />
              Asansol, West Bengal
            </span>
          </div>

          {/* Master Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white font-display mb-3 sm:mb-5">
            Rishikesh Das
          </h1>

          {/* Real Professional Subtitle from Resume */}
          <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
            B.Tech ECE undergraduate building full-stack web platforms, AI/ML retrieval systems, and edge IoT devices.
          </p>

          {/* Core Tech Stack from Resume */}
          <div className="depth-layer-foreground flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-400 mb-10">
            <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08]">React.js / Next.js</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08]">Python / FastAPI</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08]">Java / Spring Boot</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08]">Edge AI & IoT</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08]">Docker & Nginx</span>
          </div>

          {/* Subtle Scroll Cue */}
          <div className="flex flex-col items-center gap-2 text-slate-500 text-xs font-mono">
            <span className="tracking-widest uppercase text-[10px]">Scroll Down to Scrub</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-amber-400/80" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: LEFT ALIGNED (30% Scroll) - Real Full Stack Capabilities */}
      <motion.div
        style={{ opacity: opacity2, y: y2, z: z2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left p-6 sm:p-12 md:p-16 lg:p-24 depth-layer-content"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-mono mb-4">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>FULL STACK ENGINEERING // 01</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] mb-5">
            Full stack web <br />
            <span className="text-gradient-silver">&amp; systems design.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-6 max-w-xl">
            Architecting responsive React.js and Next.js interfaces paired with FastAPI, Node.js, and Spring Boot REST APIs. Practiced in JWT authentication, CRUD operations, and relational database schema design with PostgreSQL and MySQL.
          </p>

          {/* Documented Resume Metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-md depth-layer-foreground">
            <div className="p-4 rounded-2xl glass-panel">
              <div className="text-xl sm:text-2xl font-bold text-white font-display">35%</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Edge Latency Reduction (Plumule)</div>
            </div>
            <div className="p-4 rounded-2xl glass-panel">
              <div className="text-xl sm:text-2xl font-bold text-amber-400 font-display">200</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Golden Evaluation Set (TWCS)</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: RIGHT ALIGNED (60% Scroll) - Real AI/ML & Embedded Systems (Replaces Synthesis 2) */}
      <motion.div
        style={{ opacity: opacity3, y: y3, z: z3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right p-6 sm:p-12 md:p-16 lg:p-24 depth-layer-content"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-amber-300 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>AI/ML & EMBEDDED SYSTEMS // 02</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] mb-5">
            From model evaluation <br />
            <span className="text-gradient-amber">to edge telemetry.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-6 max-w-xl ml-auto">
            Implementing NLP intent classification, TF-IDF historical response retrieval, and LLM-as-a-judge evaluation frameworks alongside real-time hardware telemetry on Raspberry Pi and ESP32 over MQTT with zero cloud dependency.
          </p>

          <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-mono text-slate-300 depth-layer-foreground">
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-200">
              Scikit-learn &amp; NLP
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-200">
              FastAPI &amp; Spring Boot
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-200">
              ESP32 &amp; Raspberry Pi
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-200">
              Docker &amp; Nginx
            </span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: TRANSITION TO WORKS (85% Scroll) */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 depth-layer-content"
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4 text-xs font-mono text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>DOCUMENTED CASE STUDIES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight mb-4">
            Resume Projects &amp; Systems
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed mb-6">
            Explore hackathon management platforms, AI customer retrieval agents, smart energy IoT automation, and web applications built from documented requirements.
          </p>

          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono">
            <span>Scroll down into projects</span>
            <ArrowRight className="w-4 h-4 rotate-90 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default React.memo(Overlay);
