import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

function useParallax(stiffness = 40, damping = 10) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  const move = (e, el) => {
    const r = el.getBoundingClientRect();
    rawX.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 16);
    rawY.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 16);
  };
  const reset = () => { rawX.set(0); rawY.set(0); };
  return { x, y, move, reset };
}

function useFloat(amp, period, phase) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 30, damping: 12 });
  useEffect(() => {
    let start = performance.now();
    let raf;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      mv.set(Math.sin(t * (2 * Math.PI / period) + phase) * amp);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mv, amp, period, phase]);
  return spring;
}

function Mote({ x, y, size, duration, delay, driftX, driftY }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`, top: `${y}%`, width: size, height: size,
        background: size > 2.5
          ? "radial-gradient(circle, rgba(201,124,46,0.5) 0%, transparent 100%)"
          : "rgba(201,124,46,0.2)",
        boxShadow: size > 2.5 ? "0 0 6px rgba(201,124,46,0.15)" : "none",
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 0.7, 0.3, 0.8, 0],
        x: [0, driftX * 0.3, driftX * 0.6, driftX],
        y: [0, driftY * 0.3, driftY * 0.6, driftY],
        scale: [1, 1.5, 0.7, 1.1, 1],
      }}
      transition={{
        duration, repeat: Infinity, delay,
        ease: [0.25, 0.4, 0.3, 1],
      }}
    />
  );
}

function ApertureBlade({ index, total }) {
  const angle = (index / total) * 360 - 90;
  const w = 240, h = 80, dist = 200;
  return (
    <motion.div
      className="absolute rounded-[50%_50%_50%_50%_/60%_60%_40%_40%]"
      style={{
        width: w, height: h,
        background: "linear-gradient(180deg, rgba(201,124,46,0.05) 0%, rgba(201,124,46,0.01) 100%)",
        left: "50%", top: "50%",
        marginLeft: -w / 2, marginTop: -h / 2,
        transformOrigin: `${w / 2}px ${h / 2 + dist}px`,
        rotate: `${angle}deg`,
        border: "1px solid rgba(201,124,46,0.03)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: `${angle + 360}deg` }}
      transition={{
        opacity: { duration: 2, delay: 0.5 + index * 0.08 },
        rotate: { duration: 80, repeat: Infinity, ease: "linear" },
      }}
    />
  );
}

function DigitGlow({ spread }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: useTransform(spread, (s) =>
          `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,124,46,0.12) 0%, transparent ${s}%)`
        ),
      }}
    />
  );
}

function CornerMark({ position, delay }) {
  const borders = {
    "top-left": "border-l border-t",
    "top-right": "border-r border-t",
    "bottom-left": "border-l border-b",
    "bottom-right": "border-r border-b",
  };
  return (
    <motion.div
      className={`absolute w-12 h-12 ${position} ${borders[position]} border-cinnamon-400/15`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease, delay }}
    />
  );
}

export default function NotFound() {
  const arenaRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const p1 = useParallax(35, 8);
  const p2 = useParallax(25, 6);
  const p3 = useParallax(30, 9);

  const f1 = useFloat(5, 4.5, 0);
  const f2 = useFloat(7, 5.8, 1.5);
  const f3 = useFloat(4, 4, 2.8);

  const beamX = useMotionValue(50);
  const beamY = useMotionValue(50);
  const beamSX = useSpring(beamX, { stiffness: 20, damping: 8 });
  const beamSY = useSpring(beamY, { stiffness: 20, damping: 8 });

  const glowX = useMotionValue(0.5);
  const glowY = useMotionValue(0.5);
  const glowSX = useSpring(glowX, { stiffness: 15, damping: 6 });
  const glowSY = useSpring(glowY, { stiffness: 15, damping: 6 });

  const glowSpread = useTransform(
    [glowSX, glowSY],
    ([gx, gy]) => 45 + (1 - Math.hypot(gx - 0.5, gy - 0.5) * 2) * 25
  );

  const beamGradient = useTransform(
    [beamSX, beamSY],
    ([bx, by]) =>
      `radial-gradient(ellipse 70% 60% at ${bx}% ${by}%, rgba(201,124,46,0.07) 0%, rgba(201,124,46,0.015) 40%, transparent 65%)`
  );

  useEffect(() => {
    if (!ready || !arenaRef.current) return;
    const el = arenaRef.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      beamX.set(px);
      beamY.set(py);
      glowX.set(Math.max(0, Math.min(1, px / 100)));
      glowY.set(Math.max(0, Math.min(1, py / 100)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [ready, beamX, beamY, glowX, glowY]);

  const motes = useMemo(
    () => Array.from({ length: 30 }).map(() => ({
      x: 25 + Math.random() * 50,
      y: 10 + Math.random() * 80,
      size: 1 + Math.random() * 2.5,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 6,
      driftX: (Math.random() - 0.5) * 50,
      driftY: (Math.random() - 0.5) * 40,
    })),
    []
  );

  const digits = [
    { char: "4", p: p1, fy: f1, delay: 0.2 },
    { char: "0", p: p2, fy: f2, delay: 0.5 },
    { char: "4", p: p3, fy: f3, delay: 0.8 },
  ];

  return (
    <div
      ref={arenaRef}
      className="relative min-h-dvh bg-[#16110c] flex flex-col items-center justify-center overflow-hidden px-6 select-none"
    >
      {/* film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* aperture blades */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[80vmin] h-[80vmin]">
          {Array.from({ length: 9 }).map((_, i) => (
            <ApertureBlade key={i} index={i} total={9} />
          ))}
        </div>
      </div>

      {/* light beam */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: beamGradient }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 25%, rgba(8,5,3,0.55) 75%, rgba(8,5,3,0.93) 100%)",
        }}
      />

      {/* motes */}
      {ready && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {motes.map((m, i) => (
            <Mote key={i} {...m} />
          ))}
        </div>
      )}

      {/* viewfinder corners */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos, i) => (
        <CornerMark key={pos} position={pos} delay={0.6 + i * 0.12} />
      ))}

      {/* crosshair */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 size-24"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-1/2 left-4 right-4 h-px bg-cinnamon-400/8" />
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-cinnamon-400/8" />
          <div className="size-2 rounded-full border border-cinnamon-400/12" />
        </div>
      </motion.div>

      {/* main content */}
      <motion.div
        className="relative z-20 text-center max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* digits */}
        <div
          className="flex items-center justify-center gap-3 sm:gap-5 mb-8 sm:mb-10"
          onMouseMove={(e) => {
            digits.forEach((d) => d.p.move(e, e.currentTarget));
          }}
          onMouseLeave={() => digits.forEach((d) => d.p.reset())}
        >
          {digits.map(({ char, p, fy, delay }, i) => (
            <span
              key={char + i}
              className="relative inline-block"
              style={{ perspective: 800 }}
            >
              <motion.span
                className="font-serif text-[clamp(5rem,20vw,14rem)] leading-[0.75] tracking-[-0.06em] font-thin inline-block"
                style={{
                  x: p.x, y: p.y,
                  rotateX: useTransform(p.y, [-8, 8], [2, -2]),
                  rotateY: useTransform(p.x, [-8, 8], [-2, 2]),
                }}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={ready ? {
                  opacity: 1, y: fy, filter: "blur(0px)",
                  textShadow: [
                    "0 0 30px rgba(201,124,46,0.12)",
                    "0 0 60px rgba(201,124,46,0.06)",
                    "0 0 30px rgba(201,124,46,0.12)",
                  ],
                } : {}}
                transition={{
                  opacity: { duration: 1.6, ease, delay },
                  y: { duration: 1.6, ease, delay },
                  filter: { duration: 1.8, ease, delay },
                  textShadow: { duration: 3, repeat: Infinity, ease: [0.25, 0.4, 0.3, 1] },
                }}
              >
                <span className="relative z-10" style={{ color: "#e6d4bd" }}>
                  {char}
                </span>
                <span
                  className="absolute inset-0 z-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(201,124,46,0.06)",
                  }}
                  aria-hidden
                >
                  {char}
                </span>
              </motion.span>
              <DigitGlow spread={glowSpread} />
            </span>
          ))}
        </div>

        {/* divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-cinnamon-400/25 to-transparent max-w-[100px] flex-1"
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease, delay: 1.3 }}
            style={{ originX: 0.5 }}
          />
          <motion.span
            className="size-1.5 rounded-full bg-cinnamon-400/25"
            initial={{ scale: 0, opacity: 0 }}
            animate={ready ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease, delay: 1.8 }}
          />
          <motion.div
            className="h-px bg-gradient-to-r from-cinnamon-400/25 via-cinnamon-400/25 to-transparent max-w-[60px] flex-1"
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease, delay: 1.3 }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* message */}
        <motion.p
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-cinnamon-200/65 mb-2 leading-snug"
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 1.8 }}
        >
          This frame is empty.
        </motion.p>
        <motion.p
          className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-taupe/35 max-w-[280px] mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 2.3 }}
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist here — but something beautiful might.
        </motion.p>

        {/* cta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 2.7 }}
        >
          <Link
            to="/"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-cinnamon-400/18 text-cinnamon-300/75 hover:text-sand px-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-cinnamon-400/35 hover:bg-walnut/70 no-underline backdrop-blur-sm"
          >
            <span className="relative z-10 font-sans text-[10px] uppercase tracking-[4px] mr-2">
              Return Home
            </span>
            <span className="relative z-10">
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
            <div className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
          </Link>
        </motion.div>
      </motion.div>

      {/* brand watermark */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 3.5 }}
      >
        <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-taupe/12">
          Panigrahna
        </p>
      </motion.div>

      {/* exposure counter */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 font-mono text-[9px] text-taupe/8 tracking-widest"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 3.5 }}
      >
        404·NR
      </motion.div>
    </div>
  );
}
