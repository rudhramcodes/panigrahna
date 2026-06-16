import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COUPLES = [
  "Harsh & Sayonee",
  "Rahul & Jeevani",
  "Prachi & Preet",
  "Ronak & Jessica",
  "Rutvik & Aishwarya",
];

const TOTAL_IMAGES = 25;

/* ── Variants ── */

const headingSlide = {
  enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0, filter: "blur(8px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0, filter: "blur(8px)" }),
};

const staggerGrid = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.015, staggerDirection: -1 } },
};

const gridItem = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

const counterSlide = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

/* ── Shimmer placeholder ── */

const PLACEHOLDER = "https://i.pinimg.com/1200x/6f/c9/2a/6fc92ad248d396f529919db397310370.jpg";

function ShimmerBox({ num }) {
  return (
    <motion.div
      variants={gridItem}
      className="aspect-[3/4] rounded-sm overflow-hidden relative group cursor-pointer"
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={PLACEHOLDER}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div aria-hidden className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-smooth">
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/25 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 delay-75 ease-smooth" />
      </div>
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-sm transition-all duration-300 ease-smooth" />
      <span className="absolute bottom-2.5 left-3 font-sans text-white/40 text-xs sm:text-sm font-medium select-none tracking-wider drop-shadow-sm">
        {String(num).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ── Counter ── */

function AnimatedCounter({ value, total }) {
  return (
    <span className="font-serif text-taupe/50 text-sm sm:text-base italic font-light overflow-hidden inline-flex items-center">
      <span className="relative inline-block w-[2.2ch] h-[1.2em]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            variants={counterSlide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-end"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mx-1 text-taupe/20">/</span>
      {String(total).padStart(2, "0")}
    </span>
  );
}

/* ── Dots ── */

function DotNav({ total, active, onChange }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="relative h-1.5 cursor-pointer group"
          aria-label={`Go to couple ${i + 1}`}
        >
          <motion.span
            layout
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`block h-full rounded-full ${
              i === active
                ? "bg-walnut"
                : "bg-taupe/20 group-hover:bg-taupe/40"
            }`}
            style={{ width: i === active ? 24 : 6 }}
          />
        </button>
      ))}
    </div>
  );
}

/* ── Nav Button ── */

function NavButton({ dir, onClick, label }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      onClick={onClick}
      className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-taupe/15 text-taupe bg-white/50 backdrop-blur-sm hover:bg-walnut hover:text-sand hover:border-walnut transition-colors duration-500 cursor-pointer select-none"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label={label}
    >
      {dir === "prev" && (
        <ChevronLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
      )}
      <span className="font-sans text-xs sm:text-sm font-medium hidden sm:inline">
        {label}
      </span>
      {dir === "next" && (
        <ChevronRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5" />
      )}
    </motion.button>
  );
}

/* ── Main Component ── */

export default function Projects() {
  const [[index, dir], setPage] = useState([0, 0]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const keyRef = useRef(0);

  // Track couple changes for grid re-keying
  const coupleKey = useRef(0);
  useEffect(() => {
    coupleKey.current++;
  }, [index]);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const goNext = useCallback(() => {
    setPage(([i]) => [(i + 1) % COUPLES.length, 1]);
  }, []);

  const goPrev = useCallback(() => {
    setPage(([i]) => [(i - 1 + COUPLES.length) % COUPLES.length, -1]);
  }, []);

  const goTo = useCallback((i) => {
    setPage(([current]) => [i, i > current ? 1 : -1]);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const couple = COUPLES[index];

  return (
    <main className="relative min-h-screen bg-ivory overflow-x-hidden">
      {/* ── Header ── */}
      <header className="pt-28 sm:pt-32 md:pt-36 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1480px]">
          <motion.span
            className="block font-sans text-taupe/40 text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-2"
            initial={{ opacity: 0, y: 12 }}
            animate={pageLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Featured Couples
          </motion.span>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.h1
                key={couple}
                custom={dir}
                variants={headingSlide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-walnut font-light leading-[1.1] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {couple}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ── Gallery Grid ── */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 sm:pb-28">
        <div className="mx-auto max-w-[1480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${index}-${coupleKey.current}`}
              variants={staggerGrid}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4"
            >
              {Array.from({ length: TOTAL_IMAGES }, (_, i) => (
                <ShimmerBox key={i} num={i + 1} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom Navigation ── */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        {/* Subtle top border with blur */}
        <div className="absolute inset-0 border-t border-taupe/8 bg-ivory/80 backdrop-blur-xl" />
        <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <NavButton dir="prev" onClick={goPrev} label="Previous" />

            <div className="flex items-center gap-3 sm:gap-5">
              <AnimatedCounter value={index + 1} total={COUPLES.length} />
              <DotNav total={COUPLES.length} active={index} onChange={goTo} />
            </div>

            <NavButton dir="next" onClick={goNext} label="Next" />
          </div>
        </div>
      </div>
    </main>
  );
}
