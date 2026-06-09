import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * PanigrahnLoader — A cinematic website loader for Panigrahn brand.
 *
 * Animation Sequence:
 * 1. OUTLINE DRAWING  — The logo's SVG path strokes are drawn on screen
 *    via stroke-dashoffset animation (GSAP).
 * 2. FILL             — After the outline is complete, the fill floods in
 *    with a masked reveal effect.
 * 3. PARTICLE BURST   — A small shimmer of particles erupts from the logo.
 * 4. FADE-OUT         — The loader fades and unmounts, handing control to
 *    the page.
 */

// ─── Colour constants ────────────────────────────────────────────────────────
const BRAND = "#B3752F";          // Brand amber
const BRAND_LIGHT = "#D4943A";    // Highlight tint
const BRAND_GLOW = "rgba(179,117,47,0.35)";
const BG = "#F5F2ED";             // Warm cream background

// ─── The Panigrahn SVG path (verbatim from the uploaded logo) ────────────────
const LOGO_PATH =
  "M771.04,207.58c-106.38,108.93-220.14,209.67-317.63,327.33-301.92,364.39-188.78,896.35,263.92,975.88,0,0-455.14,394.36-2.83,897.54,0,0,60.78,56.54,107.43,91.88,46.64,35.34,86.22-19.78,39.58-74.91-368.36-435.33,177.32-723.24,378.8-1037.48,189.41-295.41,84.42-617.29,53.72-661.5-26.14-37.63-38.61-17.71-42.21,10.8-11.05,87.2-133.92,578.35-561.33,583.57,0,0-212.03,28.26-234.64-192.23C406.95,817.88,1252.04,469.09,922.99,10.4c0,0-14.13-21.91-31.81-2.11-17.67,19.78-7.77,84.8-120.14,199.29Z";

// Clip / detail paths from the original SVG
const CLIP_PATH_1 =
  "M1122.59,2155.67c-36.72,7.89-64.06,18.77-89.22,44.7-5.25,5.41-4.85,5.11-9.14,11.55-13.85,20.75-6.3,13.69-26.85,41.1-19.34,25.78-19.45,88.61-13.02,117.23l26.54,62.22c19.84,28.28,41.9,48.44,73.32,59.49,13.91,4.89,19.58,9.33,31.12,13.43,19.13,6.82,65.77,8.14,83.49,2.17,16.45-5.55,76.88-42.28,83.1-49.65,36.3-43.11,66.65-103.75,52-162.2-5.74-22.92-13.73-43.28-27.66-60.95l-40.99-47.84c-24.05-26.45-97.34-41-142.7-31.24Z";

const CLIP_PATH_2 =
  "M1115.86,1766.24c-43.37,13.68-81.06,28.87-107.97,67.2-23.7,33.75-45.7,82.74-31.04,140.91,9.68,38.42,33.25,88.3,63.48,110.8,37.48,27.89,95.59,34.31,145.61,23.32,90.23-19.83,159.14-117.48,137.7-203.28-4.54-18.15-16.42-45.75-25.47-60.05-12.09-19.09-23.43-32.45-40.39-48.36-25.71-24.12-96.95-44.72-141.93-30.55Z";

// ─── Particle component ───────────────────────────────────────────────────────
function Particle({ x, y, size, delay, duration, angle }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: BRAND_LIGHT,
        opacity: 0,
        animation: `particleFly ${duration}s ${delay}s ease-out forwards`,
        "--angle": `${angle}deg`,
        "--dist": `${60 + Math.random() * 80}px`,
      }}
    />
  );
}

// ─── Generate particles around logo centre ────────────────────────────────────
function makeParticles(count = 16) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: "50%",
    y: "50%",
    size: `${2 + Math.random() * 3}px`,
    delay: 0.02 * i,
    duration: 0.6 + Math.random() * 0.4,
    angle: (360 / count) * i + Math.random() * 15,
  }));
}

// ─── Main Loader Component ────────────────────────────────────────────────────
export default function PanigrahnLoader({ onComplete }) {
  const outlineRef = useRef(null);
  const fillRef = useRef(null);
  const detailRef1 = useRef(null);
  const detailRef2 = useRef(null);
  const wrapperRef = useRef(null);
  const glowRef = useRef(null);
  const [phase, setPhase] = useState("outline"); // outline | fill | done
  const [particles] = useState(() => makeParticles(20));
  const [showParticles, setShowParticles] = useState(false);

  // ── PHASE 1: Draw outline ─────────────────────────────────────────────────
  useEffect(() => {
    const outline = outlineRef.current;
    const fill = fillRef.current;
    const detail1 = detailRef1.current;
    const detail2 = detailRef2.current;
    const glow = glowRef.current;

    if (!outline || !fill || !detail1 || !detail2 || !glow) return;

    // ── Measure path lengths ─────────────────────────────────────────────────
    const len = outline.getTotalLength();
    const len1 = detail1.getTotalLength();
    const len2 = detail2.getTotalLength();

    // ── Setup: hide paths via dasharray/dashoffset ───────────────────────────
    gsap.set([outline, detail1, detail2], {
      strokeDasharray: (i) => {
        const l = [len, len1, len2][i];
        return `${l} ${l}`;
      },
      strokeDashoffset: (i) => [len, len1, len2][i],
      opacity: 1,
    });

    // ── Draw timeline ───────────────────────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("fill");
      },
    });

    // Main path draw
    tl.to(outline, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut",
    });

    // Detail paths draw (staggered a bit)
    tl.to(
      [detail1, detail2],
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.2,
      },
      "-=0.8"
    );

    // Subtle glow pulse during draw
    tl.to(
      glow,
      {
        opacity: 0.6,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2,
      },
      0.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  // ── PHASE 2: Fill animation via CSS clip ─────────────────────────────────
  useEffect(() => {
    if (phase !== "fill") return;

    const fill = fillRef.current;
    const outline = outlineRef.current;
    const detail1 = detailRef1.current;
    const detail2 = detailRef2.current;
    const wrapper = wrapperRef.current;
    const glow = glowRef.current;

    if (!fill || !outline || !detail1 || !detail2 || !wrapper || !glow) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger particles
        setShowParticles(true);

        // Fade out loader after particles
        gsap.to(wrapper, {
          opacity: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setPhase("done");
            onComplete?.();
          },
        });
      },
    });

    // Flood fill: scale clipPath from 0 → 1 on Y axis (bottom-up reveal)
    tl.fromTo(
      fill,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.inOut",
      }
    );

    // Fade out outline strokes as fill arrives
    tl.to(
      [outline, detail1, detail2],
      {
        opacity: 0,
        duration: 0.4,
        ease: "power1.in",
      },
      "-=0.4"
    );

    // Glow flare at fill completion
    tl.fromTo(
      glow,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1.6,
        duration: 0.35,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <>
      {/* ── Global keyframe styles ── */}
      <style>{`
        @keyframes particleFly {
          0%   { opacity: 1; transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--dist)); }
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.012); }
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      {/* ── Loader backdrop ── */}
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          inset: 0,
          background: BG,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        {/* Rich grain texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/grain.jpeg)",
            backgroundSize: "256px",
            backgroundRepeat: "repeat",
            opacity: 0.45,
            pointerEvents: "none",
          }}
        />

        {/* Radial ambient glow */}
        <div
          style={{
            position: "absolute",
            width: "60vmin",
            height: "60vmin",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BRAND_GLOW} 0%, transparent 70%)`,
            animation: "subtlePulse 2s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── Logo container ── */}
        <div
          style={{
            position: "relative",
            width: "clamp(140px, 28vmin, 280px)",
            animation: "breathe 3s ease-in-out infinite",
          }}
        >
          {/* Glow layer (behind SVG) */}
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              inset: "-20%",
              background: `radial-gradient(ellipse, ${BRAND_GLOW} 0%, transparent 65%)`,
              opacity: 0,
              pointerEvents: "none",
              filter: "blur(12px)",
            }}
          />

          {/* ── Main SVG ── */}
          <svg
            viewBox="0 0 1772.93 2928.11"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", display: "block", overflow: "visible" }}
          >
            <defs>
              {/* Gradient for filled logo */}
              <linearGradient id="brandGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#8B5520" />
                <stop offset="45%" stopColor={BRAND} />
                <stop offset="100%" stopColor={BRAND_LIGHT} />
              </linearGradient>

              {/* Shimmer overlay gradient */}
              <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,220,150,0)" />
                <stop offset="50%" stopColor="rgba(255,220,150,0.15)" />
                <stop offset="100%" stopColor="rgba(255,220,150,0)" />
              </linearGradient>
            </defs>

            {/* ── LAYER 1: Outline stroke (animated) ── */}
            <path
              ref={outlineRef}
              d={LOGO_PATH}
              fill="none"
              stroke={BRAND}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />

            {/* ── LAYER 2: Fill (revealed via clip) ── */}
            <path
              ref={fillRef}
              d={LOGO_PATH}
              fill="url(#brandGrad)"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            />

            {/* Shimmer overlay on fill */}
            <path
              d={LOGO_PATH}
              fill="url(#shimmer)"
              style={{
                clipPath: phase === "fill" ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                transition: "clip-path 0.5s ease 1.2s",
                pointerEvents: "none",
              }}
            />

            {/* ── Detail path 1 (outline) ── */}
            <path
              ref={detailRef1}
              d={CLIP_PATH_1}
              fill="none"
              stroke={BRAND}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />

            {/* ── Detail path 1 (fill) ── */}
            <path
              d={CLIP_PATH_1}
              fill="#FEC145"
              style={{
                clipPath: phase === "fill" ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                transition: "clip-path 1.1s ease 0s",
              }}
            />

            {/* ── Detail path 2 (outline) ── */}
            <path
              ref={detailRef2}
              d={CLIP_PATH_2}
              fill="none"
              stroke={BRAND}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />

            {/* ── Detail path 2 (fill) ── */}
            <path
              d={CLIP_PATH_2}
              fill="#EE2934"
              style={{
                clipPath: phase === "fill" ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                transition: "clip-path 1.1s ease 0.2s",
              }}
            />
          </svg>

          {/* ── Particle burst (fires when fill completes) ── */}
          {showParticles && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
            >
              {particles.map((p) => (
                <Particle key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
