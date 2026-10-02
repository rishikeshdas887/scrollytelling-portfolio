"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "hero-scroll", label: "01 // INTRO" },
  { id: "capabilities", label: "02 // STACK" },
  { id: "work", label: "03 // WORKS" },
  { id: "experience", label: "04 // JOURNEY" },
  { id: "contact", label: "05 // CONNECT" },
];

export default function ScrollHUD() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState("hero-scroll");
  const activeSectionRef = useRef("hero-scroll");

  // Zero-cost IntersectionObserver with state deduplication
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && activeSectionRef.current !== entry.target.id) {
            activeSectionRef.current = entry.target.id;
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Page navigation HUD"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-5 pointer-events-auto select-none"
    >
      {/* Vertical Rail with Smooth Spring Progress */}
      <div className="relative flex flex-col items-center">
        <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-amber-400 via-orange-400 to-cyan-400"
          />
        </div>
      </div>

      {/* Chapter Indicator Dots & Labels */}
      <div className="flex flex-col items-end gap-3.5">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-3 py-1 cursor-pointer focus:outline-none"
            >
              <span
                className={`text-[10px] font-mono tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  isActive ? "text-amber-400 font-bold opacity-100" : "text-slate-500"
                }`}
              >
                {sec.label}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400 scale-125 shadow-sm"
                    : "bg-white/20 group-hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
