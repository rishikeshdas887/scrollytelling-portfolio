"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playHoverChime = () => {
    if (!isPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Ignore audio context errors
    }
  };

  const toggleSound = () => {
    initAudio();
    if (!isPlaying) {
      setIsPlaying(true);
      // Play activation chime
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-mono ${
        isPlaying
          ? "bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-glow"
          : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
      }`}
      title={isPlaying ? "Mute interactive audio" : "Enable interactive audio"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
            <span className="w-0.5 h-2 bg-amber-400 animate-pulse delay-75" />
            <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse delay-150" />
          </div>
          <span className="text-[11px] font-bold">AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          <span className="text-[11px]">AUDIO</span>
        </>
      )}
    </button>
  );
}
