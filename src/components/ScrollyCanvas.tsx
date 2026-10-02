"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";
import { detectQualityConfig } from "@/utils/quality";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface ScrollyCanvasProps {
  totalFrames?: number;
}

const TOTAL_FRAMES = 240;

export default function ScrollyCanvas({ totalFrames = TOTAL_FRAMES }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(true);
  const frameDisplayRef = useRef<HTMLSpanElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const coverCoordsRef = useRef<{ w: number; h: number; x: number; y: number }>({ w: 0, h: 0, x: 0, y: 0 });
  const isReadyRef = useRef<boolean>(false);
  const isScrubbingRef = useRef<boolean>(false);
  const pendingIndexRef = useRef<number>(0);

  // Initialize mouse parallax for 3D spatial depth
  useMouseParallax({ containerRef });

  const [percentLoaded, setPercentLoaded] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Link scroll progress of the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Generate frame path with responsive resolution
  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, "0");
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return isMobile
      ? `/sequence/mobile/frame_${padded}_delay-0.042s.webp`
      : `/sequence/frame_${padded}_delay-0.042s.webp`;
  }, []);

  // Draw frame with zero-overdraw and cached cover coordinates
  const drawFrame = useCallback(
    (frameIndex: number) => {
      if (!isIntersectingRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = ctxRef.current || canvas.getContext("2d", { alpha: false, desynchronized: true });
      if (!ctx) return;
      ctxRef.current = ctx;

      const { x, y, w, h } = coverCoordsRef.current;
      if (w === 0 || h === 0) return;

      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, x, y, w, h);
        return;
      }

      // Fallback to nearest loaded frame
      let fallbackImg: HTMLImageElement | null = null;
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
          fallbackImg = imagesRef.current[i];
          break;
        }
      }
      if (!fallbackImg) {
        for (let i = frameIndex + 1; i < totalFrames; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i].naturalWidth > 0) {
            fallbackImg = imagesRef.current[i];
            break;
          }
        }
      }
      if (fallbackImg) {
        ctx.drawImage(fallbackImg, x, y, w, h);
      }
    },
    [totalFrames]
  );

  // Resize canvas with Adaptive DPR and precompute cover dimensions (0 per-frame math)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const quality = detectQualityConfig();
    const dpr = Math.min(window.devicePixelRatio || 1, quality.dprCap);
    const rect = canvas.getBoundingClientRect();

    const cWidth = Math.round(rect.width * dpr);
    const cHeight = Math.round(rect.height * dpr);

    canvas.width = cWidth;
    canvas.height = cHeight;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    ctxRef.current = ctx;
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
    }

    // Precalculate cover destination rectangle once
    const iWidth = 1440;
    const iHeight = 810;
    const imgRatio = iWidth / iHeight;
    const canvasRatio = cWidth / cHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = cWidth;
      drawHeight = cWidth / imgRatio;
      offsetX = 0;
      offsetY = (cHeight - drawHeight) * 0.5;
    } else {
      drawHeight = cHeight;
      drawWidth = cHeight * imgRatio;
      offsetX = (cWidth - drawWidth) * 0.5;
      offsetY = 0;
    }

    coverCoordsRef.current = {
      w: drawWidth,
      h: drawHeight,
      x: offsetX,
      y: offsetY,
    };

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload images with batched progress updates
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;
    const priorityBatchSize = 16;

    const loadSingleImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            images[index] = img;
            loaded++;
            // Only update progress state before isReady to eliminate 200+ scroll-time re-renders!
            if (!isReadyRef.current && (loaded === 1 || loaded % 4 === 0 || loaded >= priorityBatchSize)) {
              setPercentLoaded(Math.round((loaded / priorityBatchSize) * 100));
            }
            if (loaded === 1 || index === 0) {
              drawFrame(0);
            }
            if (loaded >= priorityBatchSize && !isReadyRef.current) {
              isReadyRef.current = true;
              setIsReady(true);
            }
          }
          resolve();
        };
        img.onerror = () => {
          if (!isCancelled) {
            loaded++;
          }
          resolve();
        };
      });
    };

    const loadAll = async () => {
      // 1. Load priority frames first for instant interactivity
      const priorityPromises: Promise<void>[] = [];
      for (let i = 0; i < Math.min(priorityBatchSize, totalFrames); i++) {
        priorityPromises.push(loadSingleImage(i));
      }
      await Promise.all(priorityPromises);

      if (isCancelled) return;
      isReadyRef.current = true;
      setIsReady(true);
      drawFrame(0);

      // 2. Stream remaining frames in background chunks of 16
      const chunkSize = 16;
      for (let i = priorityBatchSize; i < totalFrames; i += chunkSize) {
        if (isCancelled) return;
        const chunkPromises: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + chunkSize, totalFrames); j++) {
          chunkPromises.push(loadSingleImage(j));
        }
        await Promise.all(chunkPromises);
      }
    };

    imagesRef.current = images;
    loadAll();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFrameUrl, drawFrame]);

  // Handle window resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Pause rendering when 500vh container is completely offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Coalesced RAF scrubbing loop for 60 FPS locked scrubbing
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isIntersectingRef.current) return;

    const rawIndex = Math.floor(latest * (totalFrames - 1));
    const targetIndex = Math.min(totalFrames - 1, Math.max(0, rawIndex));

    if (targetIndex !== currentFrameRef.current) {
      pendingIndexRef.current = targetIndex;

      // Direct DOM update: ZERO React re-renders!
      if (frameDisplayRef.current) {
        frameDisplayRef.current.textContent = `FRAME: ${String(targetIndex + 1).padStart(3, "0")} / ${totalFrames}`;
      }

      if (!isScrubbingRef.current) {
        isScrubbingRef.current = true;
        requestAnimationFrame(() => {
          currentFrameRef.current = pendingIndexRef.current;
          drawFrame(pendingIndexRef.current);
          isScrubbingRef.current = false;
        });
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#05080e]"
      id="hero-scroll"
    >
      {/* Sticky Fullscreen Spatial Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#05080e] perspective-stage">
        
        {/* LAYER 1: Background Atmosphere & Spatial Geometry */}
        <div className="absolute inset-0 pointer-events-none depth-layer-bg">
          {/* Subtle architectural grid mesh */}
          <div className="absolute inset-0 bg-grid-mesh opacity-40" />

          {/* Soft atmospheric rim lights (controlled radii for GPU efficiency) */}
          <div className="absolute -top-24 -left-24 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-cyan-600/10 blur-[90px]" />
          <div className="absolute -bottom-24 -right-24 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-amber-600/12 blur-[100px]" />

          {/* Elegant geometric depth circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-white/[0.02] pointer-events-none" />
        </div>

        {/* LAYER 2: Main Visual Layer (HTML5 Canvas with subtle 3D perspective tilt) */}
        <div className="relative w-full h-full depth-layer-canvas">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block relative z-0"
          />

          {/* Seamless Radial Vignettes for Edge Blending */}
          <div className="absolute inset-0 pointer-events-none z-[5] canvas-vignette" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#05080e] via-[#05080e]/60 to-transparent pointer-events-none z-[6]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#05080e] via-[#05080e]/70 to-transparent pointer-events-none z-[6]" />
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#05080e] via-[#05080e]/50 to-transparent pointer-events-none z-[6]" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#05080e] via-[#05080e]/50 to-transparent pointer-events-none z-[6]" />
        </div>

        {/* LAYER 3: Interactive Parallax Overlay (Text & Content with 3D Depth) */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* LAYER 4: Foreground Telemetry HUD */}
        <div className="absolute bottom-6 left-8 z-20 hidden md:flex items-center gap-3 font-mono text-[11px] text-slate-500 tracking-wider pointer-events-none select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span ref={frameDisplayRef}>FRAME: 001 / {totalFrames}</span>
          <span className="text-slate-700">|</span>
          <span>60 FPS LOCKED</span>
        </div>

        {/* Minimal Preloader Screen */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#05080e] transition-opacity duration-700">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-amber-500/20 border-t-amber-400 animate-spin" />
                <span className="absolute text-[10px] font-mono tracking-widest text-amber-400 font-bold">
                  {percentLoaded}%
                </span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono">
                Streaming Sequence
              </div>
              <div className="w-40 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300 ease-out"
                  style={{ width: `${percentLoaded}%` }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
