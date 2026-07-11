import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/ui/SEO";
import ImageViewer from "../components/ui/ImageViewer";
import { rawCloudinaryUrl, RAW_VERSION } from "../lib/cloudinary";
import { useSmoothScroll } from "../components/smooth-scroll/SmoothScroll";
import { COUPLES } from "../data/couples";

const headingSlide = {
  enter: (dir) => ({ y: 60, opacity: 0, scale: 0.97, filter: "blur(6px)" }),
  center: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: (dir) => ({ y: -60, opacity: 0, scale: 0.97, filter: "blur(6px)" }),
};

const counterSlide = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

function buildLayoutFragments(images, ratios) {
  const fragments = [];
  let i = 0;
  while (i < images.length) {
    const r0 = ratios?.[i];
    const r1 = ratios?.[i + 1];
    const bothPortrait = r0 !== undefined && r1 !== undefined && r0 < 1 && r1 < 1;
    const sameAspect = bothPortrait && Math.abs(r0 - r1) < 0.1;
    if (r0 !== undefined && r1 !== undefined && bothPortrait && sameAspect) {
      fragments.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      fragments.push({ type: "single", items: [images[i]], isLandscape: r0 !== undefined && r0 >= 1 });
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
  const { slug } = useParams();
  const navigate = useNavigate();
  const index = COUPLES.findIndex((c) => c.slug === slug);
  const activeIndex = index >= 0 ? index : 0;
  const [dir, setDir] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [imageRatios, setImageRatios] = useState(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const coupleKey = useRef(0);
  const lenisRef = useSmoothScroll();

  useEffect(() => {
    coupleKey.current++;
    setStoryOpen(false);
    setViewerOpen(false);
    const lenis = lenisRef?.current;
    if (lenis) lenis.scrollTo(0, { duration: 0.8 });
  }, [activeIndex, lenisRef]);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const goNext = useCallback(() => {
    setDir(1);
    navigate(`/projects/${COUPLES[(activeIndex + 1) % COUPLES.length].slug}`);
  }, [activeIndex, navigate]);

  const goPrev = useCallback(() => {
    setDir(-1);
    navigate(`/projects/${COUPLES[(activeIndex - 1 + COUPLES.length) % COUPLES.length].slug}`);
  }, [activeIndex, navigate]);

  const goTo = useCallback((i) => {
    setDir(i > activeIndex ? 1 : -1);
    navigate(`/projects/${COUPLES[i].slug}`);
  }, [activeIndex, navigate]);

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

  const couple = COUPLES[activeIndex];

  const gridImages = useMemo(
    () =>
      couple.images.map((entry, i) => {
        const publicId = typeof entry === "string" ? entry : entry.id;
        const version = typeof entry === "string" ? undefined : entry.version;
        return { src: rawCloudinaryUrl(publicId, version || RAW_VERSION), num: i + 1 };
      }),
    [activeIndex]
  );

  useEffect(() => {
    if (gridImages.length === 0) { setImageRatios({}); return; }
    let mounted = true;
    const ratios = {};
    let remaining = gridImages.length;
    const imgs = [];
    const done = () => { if (mounted) setImageRatios(ratios); };
    gridImages.forEach((item, i) => {
      const img = new Image();
      imgs.push(img);
      img.onload = () => { ratios[i] = img.naturalWidth / img.naturalHeight; if (!--remaining) done(); };
      img.onerror = () => { ratios[i] = 1.5; if (!--remaining) done(); };
      img.src = item.src;
    });
    return () => { mounted = false; imgs.forEach((img) => { img.onload = null; img.onerror = null; }); };
  }, [gridImages]);

  const layoutFragments = useMemo(() => imageRatios ? buildLayoutFragments(gridImages, imageRatios) : [], [gridImages, imageRatios]);

  const viewerImages = useMemo(
    () =>
      gridImages.map((item) => ({
        id: `${couple.name}-${item.num}`,
        img: item.src,
      })),
    [activeIndex, gridImages, couple.name]
  );

  const handleItemClick = useCallback((i) => {
    setViewerIndex(i);
    setViewerOpen(true);
  }, []);

  /* Preload first images of adjacent couples for instant navigation */
  useEffect(() => {
    const next = COUPLES[(activeIndex + 1) % COUPLES.length];
    const prev = COUPLES[(activeIndex - 1 + COUPLES.length) % COUPLES.length];
    [next, prev].forEach((couple) => {
      couple.images.slice(0, 2).forEach((entry) => {
        const publicId = typeof entry === "string" ? entry : entry.id;
        const version = typeof entry === "string" ? undefined : entry.version;
        const img = new Image();
        img.src = rawCloudinaryUrl(publicId, version || RAW_VERSION);
      });
    });
  }, [activeIndex]);

  if (index < 0) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="relative min-h-screen bg-ivory overflow-x-hidden">
      <SEO
        title={`${couple.name} Wedding — ${couple.story ? couple.story.split('.')[0] : 'Wedding Photography'} | Panigrahna`}
        description={`${couple.name}'s wedding story by Panigrahna. ${couple.story || 'Candid wedding photography from Mumbai\'s best wedding photographer.'}`}
      />
      {/* ── HEADER: Centered couple name ── */}
      <header className="pt-24 sm:pt-32 md:pt-36 pb-2 px-5 sm:px-8 md:px-12 lg:px-16 text-center">
        <div className="mx-auto max-w-[1480px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={couple.name}
              custom={dir}
              variants={headingSlide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-serif text-walnut font-light leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 6.5vw, 5rem)" }}
              >
                {couple.name}
              </h1>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="flex items-center justify-center gap-3 mt-5 mb-4"
              >
                <span className="h-px w-10 bg-taupe/15" />
                <span className="text-taupe/25 text-[9px] tracking-[0.5em] font-sans uppercase">✦</span>
                <span className="h-px w-10 bg-taupe/15" />
              </motion.div>

              {couple.quote && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-taupe/50 text-base sm:text-lg italic font-light"
                >
                  &ldquo;{couple.quote}&rdquo;
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      {/* ── STORY: Premise + Read More ── */}
      {couple.premise && (
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-[680px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              key={`story-${activeIndex}`}
            >
              <p
                className="font-serif text-walnut/70 leading-[1.85] -mt-16"
                style={{ fontSize: "clamp(0.8rem, 1vw, 1.05rem)" }}
              >
                {couple.premise}
              </p>

              {!storyOpen && (
                <motion.button
                  onClick={() => setStoryOpen(true)}
                  className="group mt-6 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.35em] text-cinnamon-400 hover:text-walnut transition-colors duration-500 cursor-pointer"
                  whileHover={{ gap: "14px" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>Read the full story</span>
                  <span className="inline-block text-sm leading-none transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
                </motion.button>
              )}

              <AnimatePresence initial={false}>
                {storyOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-4">
                      {couple.description.split("\n\n").map((paragraph, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="font-serif text-walnut/70 leading-[1.85] text-center"
                          style={{ fontSize: "clamp(0.8rem, 1vw, 1.05rem)" }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => setStoryOpen(false)}
                      className="group mt-6 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.35em] text-cinnamon-400 hover:text-walnut transition-colors duration-500 cursor-pointer"
                      whileHover={{ gap: "14px" }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="inline-block text-sm leading-none transition-transform duration-500 group-hover:-translate-x-1">&larr;</span>
                      <span>Read less</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-[1480px]">
          {imageRatios ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`grid-${activeIndex}-${coupleKey.current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="flex flex-col items-center gap-20 sm:gap-28 md:gap-36 lg:gap-44"
              >
                {layoutFragments.map((frag, fi) => {
                const img0 = frag.items[0];
                const img1 = frag.items[1];

                if (frag.type === "pair") {
                  return (
                    <motion.div
                      key={`pair-${fi}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                      {[img0, img1].map((item) => (
                        <div key={item.num} className="flex-1 min-w-0 group cursor-pointer" onClick={() => handleItemClick(item.num - 1)}>
                          <div className="overflow-hidden rounded-sm">
                            <ParallaxWrapper>
                              <motion.img
                                src={item.src}
                                alt="couple-images"
                                className="w-full h-auto select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                loading="lazy"
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </ParallaxWrapper>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={`single-${fi}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full ${frag.isLandscape ? '' : 'max-w-[1400px]'} mx-auto group cursor-pointer`}
                    onClick={() => handleItemClick(img0.num - 1)}
                  >
                    <div className="overflow-hidden rounded-sm">
                      <ParallaxWrapper>
                        <motion.img
                          src={img0.src}
                          alt="couple-images"
                          className="w-full h-auto select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          loading="lazy"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </ParallaxWrapper>
                    </div>
                  </motion.div>
                );
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex justify-center py-32">
              <span className="font-sans text-cinnamon-300/50 text-xs uppercase tracking-[0.25em]">
                Loading gallery&hellip;
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="absolute inset-0 border-t border-taupe/8 bg-ivory/85 backdrop-blur-xl" />
        <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <NavButton dir="prev" onClick={goPrev} label="Previous" />

            <div className="flex items-center gap-4 sm:gap-6">
              <AnimatedCounter value={activeIndex + 1} total={COUPLES.length} />
              <DotNav total={COUPLES.length} active={activeIndex} onChange={goTo} />
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
