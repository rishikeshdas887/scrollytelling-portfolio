/**
 * Adaptive Performance & Quality Tier Controller
 * Ensures 60 FPS performance on Linux laptops with integrated graphics & mobile devices.
 */

export type QualityTier = "HIGH" | "MEDIUM" | "LOW";

export interface QualityConfig {
  tier: QualityTier;
  dprCap: number;
  enableMouseParallax: boolean;
  enable3DTilt: boolean;
  enableComplexShadows: boolean;
  blurStrength: "low" | "medium" | "high";
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
}

let cachedConfig: QualityConfig | null = null;

export function detectQualityConfig(): QualityConfig {
  if (cachedConfig) return cachedConfig;

  if (typeof window === "undefined") {
    return {
      tier: "MEDIUM",
      dprCap: 1.25,
      enableMouseParallax: true,
      enable3DTilt: true,
      enableComplexShadows: true,
      blurStrength: "medium",
      isMobile: false,
      isTouch: false,
      prefersReducedMotion: false,
    };
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Check touch / fine pointer
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  const isMobile = window.innerWidth < 768;

  // Check hardware concurrency & device memory if available
  const nav = navigator as unknown as { hardwareConcurrency?: number; deviceMemory?: number };
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;

  let tier: QualityTier = "HIGH";

  if (prefersReducedMotion || isMobile || cores <= 4 || memory <= 4) {
    tier = isMobile || prefersReducedMotion ? "LOW" : "MEDIUM";
  } else if (cores <= 8 && memory <= 8) {
    // Normal Linux laptop with integrated GPU
    tier = "MEDIUM";
  }

  // 1.0 on mobile/low, 1.25 max on desktop - perfectly crisp for 1440x810 source WebPs with 0 memory bus throttling
  const dprCap = tier === "LOW" ? 1.0 : 1.25;
  const enableMouseParallax = !prefersReducedMotion && !isTouch && tier !== "LOW";
  const enable3DTilt = !prefersReducedMotion && tier !== "LOW";

  cachedConfig = {
    tier,
    dprCap,
    enableMouseParallax,
    enable3DTilt,
    enableComplexShadows: tier === "HIGH",
    blurStrength: tier === "LOW" ? "low" : tier === "MEDIUM" ? "medium" : "high",
    isMobile,
    isTouch,
    prefersReducedMotion,
  };

  return cachedConfig;
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    cachedConfig = null;
  }, { passive: true });
}
