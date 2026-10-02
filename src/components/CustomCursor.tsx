"use client";

import React, { useEffect, useRef } from "react";
import { detectQualityConfig } from "@/utils/quality";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(-100);
  const targetY = useRef(-100);
  const ringX = useRef(-100);
  const ringY = useRef(-100);
  const rafId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const config = detectQualityConfig();
    // Do NOT initialize cursor on touch, mobile, or low-spec devices
    if (!config.enableMouseParallax || config.isTouch || config.isMobile) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let isRunning = false;

    const animate = () => {
      // Lerp ring towards target
      const ease = 0.22;
      const dx = targetX.current - ringX.current;
      const dy = targetY.current - ringY.current;

      ringX.current += dx * ease;
      ringY.current += dy * ease;

      const scale = isHoveredRef.current ? 1.8 : 1;
      const ringBorder = isHoveredRef.current ? "rgba(245, 158, 11, 0.6)" : "rgba(255, 255, 255, 0.25)";
      const ringBg = isHoveredRef.current ? "rgba(245, 158, 11, 0.08)" : "transparent";

      ring.style.transform = `translate3d(${ringX.current.toFixed(1)}px, ${ringY.current.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = ringBorder;
      ring.style.backgroundColor = ringBg;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        isRunning = false;
        rafId.current = null;
      }
    };

    let checkInteractiveRaf: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;

      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      if (!isRunning) {
        isRunning = true;
        rafId.current = requestAnimationFrame(animate);
      }

      // Throttled interactive element detection (0 React re-renders)
      if (!checkInteractiveRaf) {
        checkInteractiveRaf = requestAnimationFrame(() => {
          const el = e.target as HTMLElement | null;
          const interactive = Boolean(
            el?.closest("a") ||
            el?.closest("button") ||
            el?.closest("input") ||
            el?.closest("textarea") ||
            el?.closest("select") ||
            el?.getAttribute("role") === "button"
          );
          if (isHoveredRef.current !== interactive) {
            isHoveredRef.current = interactive;
            dot.style.opacity = interactive ? "0" : "1";
            if (!isRunning) {
              isRunning = true;
              rafId.current = requestAnimationFrame(animate);
            }
          }
          checkInteractiveRaf = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (checkInteractiveRaf) cancelAnimationFrame(checkInteractiveRaf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Smooth Follower Ring */}
      <div
        ref={ringRef}
        style={{ willChange: "transform" }}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-white/25 pointer-events-none transition-[border-color,background-color] duration-150 ease-out"
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        style={{ willChange: "transform" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none transition-opacity duration-100"
      />
    </div>
  );
}
