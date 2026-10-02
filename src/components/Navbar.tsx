"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import AudioToggle from "./AudioToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 40;
      if (scrolledRef.current !== isPast) {
        scrolledRef.current = isPast;
        setScrolled(isPast);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 md:px-12 py-3.5 ${
        scrolled
          ? "bg-[#05080e]/85 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#hero-scroll"
          className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-display font-black text-black text-xs shadow-sm">
            RD
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Rishikesh Das
            </span>
            <span className="hidden sm:inline font-mono text-[9px] text-slate-400 tracking-wider">
              CREATIVE ENGINEER
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <a
            href="#hero-scroll"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            01 // Overview
          </a>
          <a
            href="#capabilities"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            02 // Stack
          </a>
          <a
            href="#work"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            03 // Works
          </a>
          <a
            href="#experience"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            04 // Journey
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            05 // Connect
          </a>
        </nav>

        {/* Right Status & Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <AudioToggle />
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR HIRE</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold tracking-wide transition-all duration-200 active:scale-95"
          >
            <span>Let&apos;s Build</span>
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
