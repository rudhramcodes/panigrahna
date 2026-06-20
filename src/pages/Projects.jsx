import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

const counterSlide = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

function buildLayoutFragments(images) {
  const fragments = [];
  let i = 0;
  while (i < images.length) {
    const remaining = images.length - i;
    const seed = ((i * 137 + 51) % 10);
    if (remaining >= 2 && seed < 5) {
      fragments.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      fragments.push({ type: "single", items: [images[i]] });
      i++;
    }
  }
  return fragments;
}

function ParallaxWrapper({ children, speed = 0.28, fullHeight }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pct = Math.round(speed * 80);
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${fullHeight ? "h-full" : ""}`}>
      <motion.div style={{ y, willChange: "transform" }} className={fullHeight ? "h-full" : ""}>
        {children}
      </motion.div>
    </div>
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

  const layoutFragments = useMemo(() => buildLayoutFragments(gridImages), [gridImages]);

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

      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${index}-${coupleKey.current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-40 sm:gap-48 md:gap-56 lg:gap-64"
            >
              {layoutFragments.map((frag, fi) => {
                const img0 = frag.items[0];
                const img1 = frag.items[1];

                if (frag.type === "pair") {
                  return (
                    <div key={`pair-${fi}`} className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {[img0, img1].map((item) => (
                        <div key={item.num} className="flex-1 min-w-0">
                          <ParallaxWrapper>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              onClick={() => handleItemClick(item.num - 1)}
                              className="cursor-pointer"
                              whileHover={{ scale: 1.03 }}
                            >
                              <img src={item.src} alt="" className="w-full h-auto select-none" loading="lazy" />
                            </motion.div>
                          </ParallaxWrapper>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={`single-${fi}`} className="w-full max-w-[1400px] mx-auto">
                    <ParallaxWrapper>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => handleItemClick(img0.num - 1)}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.03 }}
                      >
                        <img src={img0.src} alt="" className="w-full h-auto select-none" loading="lazy" />
                      </motion.div>
                    </ParallaxWrapper>
                  </div>
                );
              })}
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
