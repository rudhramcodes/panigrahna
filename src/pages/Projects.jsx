import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageViewer from "../components/ui/ImageViewer";
import { rawCloudinaryUrl } from "../lib/cloudinary";

import harshSayoneeImages from "../data/couples/harsh-and-sayonee.json";
import rahulJeevaniImages from "../data/couples/rahul-and-jeevani.json";
import prachiPreetImages from "../data/couples/prachi-and-preet.json";
import ronakJessicaImages from "../data/couples/ronak-and-jessica.json";
import rutvikAishwaryaImages from "../data/couples/rutvik-and-aishwarya.json";

const COUPLES = [
  { name: "Harsh & Sayonee", images: harshSayoneeImages },
  { name: "Rahul & Jeevani", images: rahulJeevaniImages },
  { name: "Prachi & Preet", images: prachiPreetImages },
  { name: "Ronak & Jessica", images: ronakJessicaImages },
  { name: "Rutvik & Aishwarya", images: rutvikAishwaryaImages },
];

const headingSlide = {
  enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0, filter: "blur(8px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0, filter: "blur(8px)" }),
};

const staggerGrid = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
  exit: {},
};

const gridItem = {
  initial: { y: 30, scale: 0.96, opacity: 0 },
  animate: { y: 0, scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: -15, scale: 0.96, opacity: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

const counterSlide = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

function ShimmerBox({ src, num, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const shimmerRef = useRef(null);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <motion.div
      variants={gridItem}
      className="aspect-[3/4] rounded-sm overflow-hidden relative group cursor-pointer bg-taupe/8 will-change-transform"
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
    >
      <div
        ref={shimmerRef}
        className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-taupe/6 via-taupe/14 to-taupe/6 shimmer-slide" />
      </div>

      <img
        src={src}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
        }`}
        loading="lazy"
        onLoad={handleLoad}
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

export default function Projects() {
  const location = useLocation();
  const initialIndex = location.state?.coupleIndex ?? 0;
  const [[index, dir], setPage] = useState([initialIndex, 0]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
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

  const viewerOpenRef = useRef(false);
  useEffect(() => { viewerOpenRef.current = viewerOpen; }, [viewerOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (viewerOpenRef.current) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const couple = COUPLES[index];

  const gridImages = useMemo(
    () =>
      couple.images.map((entry, i) => {
        const publicId = typeof entry === "string" ? entry : entry.id;
        const version = typeof entry === "string" ? undefined : entry.version;
        return { src: rawCloudinaryUrl(publicId, version), num: i + 1 };
      }),
    [index]
  );

  const viewerImages = useMemo(
    () =>
      gridImages.map((item) => ({
        id: `${couple.name}-${item.num}`,
        img: item.src,
      })),
    [index, gridImages]
  );

  const handleItemClick = useCallback((i) => {
    setViewerIndex(i);
    setViewerOpen(true);
  }, []);

  /* Preload first images of adjacent couples for instant navigation */
  useEffect(() => {
    const next = COUPLES[(index + 1) % COUPLES.length];
    const prev = COUPLES[(index - 1 + COUPLES.length) % COUPLES.length];
    [next, prev].forEach((couple) => {
      couple.images.slice(0, 2).forEach((entry) => {
        const publicId = typeof entry === "string" ? entry : entry.id;
        const version = typeof entry === "string" ? undefined : entry.version;
        const img = new Image();
        img.src = rawCloudinaryUrl(publicId, version);
      });
    });
  }, [index]);

  return (
    <main className="relative min-h-screen bg-ivory overflow-x-hidden">
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
                key={couple.name}
                custom={dir}
                variants={headingSlide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-walnut font-light leading-[1.1] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {couple.name}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
      </header>

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
              {gridImages.map((item, i) => (
                <ShimmerBox
                  key={i}
                  src={item.src}
                  num={item.num}
                  onClick={() => handleItemClick(i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-20">
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

      <AnimatePresence>
        {viewerOpen && (
          <ImageViewer
            images={viewerImages}
            initialIndex={viewerIndex}
            onClose={() => setViewerOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
