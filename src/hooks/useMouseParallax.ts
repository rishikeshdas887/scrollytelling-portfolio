"use client";

import { useEffect, useRef } from "react";
import { detectQualityConfig } from "@/utils/quality";

interface ParallaxOptions {
  containerRef?: React.RefObject<HTMLElement | null>;
  disabled?: boolean;
}

export function useMouseParallax({ containerRef, disabled = false }: ParallaxOptions = {}) {
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isMoving = useRef(false);
  const isVisible = useRef(true);

  useEffect(() => {
    const config = detectQualityConfig();
    if (disabled || !config.enableMouseParallax) return;

    const el = containerRef?.current || document.documentElement;

    // Cache half viewport dimensions (zero DOM reads on pointermove)
    let halfW = window.innerWidth / 2;
    let halfH = window.innerHeight / 2;
    const handleResize = () => {
      halfW = window.innerWidth / 2;
      halfH = window.innerHeight / 2;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Pause parallax loop when container is offscreen
    let observer: IntersectionObserver | null = null;
    if (containerRef?.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible.current = entry.isIntersecting;
          if (!entry.isIntersecting && rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
            isMoving.current = false;
          }
        },
        { threshold: 0 }
      );
      observer.observe(containerRef.current);
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isVisible.current) return;
      targetX.current = (e.clientX - halfW) / halfW;
      targetY.current = (e.clientY - halfH) / halfH;

      if (!isMoving.current) {
        isMoving.current = true;
        animate();
      }
    };

    const animate = () => {
      if (!isVisible.current) {
        isMoving.current = false;
        rafId.current = null;
        return;
      }

      // Linear interpolation (lerp) for buttery smooth motion
      const ease = 0.08;
      const dx = targetX.current - currentX.current;
      const dy = targetY.current - currentY.current;

      currentX.current += dx * ease;
      currentY.current += dy * ease;

      // Update CSS custom properties on the target element directly (0 React renders!)
      el.style.setProperty("--parallax-x", currentX.current.toFixed(3));
      el.style.setProperty("--parallax-y", currentY.current.toFixed(3));

      // Stop loop when settled to preserve CPU cycles on laptops & battery
      if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
        currentX.current = targetX.current;
        currentY.current = targetY.current;
        el.style.setProperty("--parallax-x", currentX.current.toFixed(3));
        el.style.setProperty("--parallax-y", currentY.current.toFixed(3));
        isMoving.current = false;
        rafId.current = null;
        return;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, disabled]);
}
