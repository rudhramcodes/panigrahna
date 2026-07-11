import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/ui/SEO";
import ImageViewer from "../components/ui/ImageViewer";
import Footer from "../components/footer/Footer";
import { rawCloudinaryUrl } from "../lib/cloudinary";
import { useSmoothScroll } from "../components/smooth-scroll/SmoothScroll";

const ALL_BRIDES = [
  "b1.jpg", "b3.avif", "B04.avif", "B03.jpg", "B04.5.jpg", "B05.jpg", "B12.jpg", "B17.jpg", "b04.avif", "b9.avif", "b10.avif",
  "b11.jpg", "b12.jpg", "b13.jpg", "b17.jpg", "b18.avif", "b19.5.avif", "b20.5.avif",
];

const EASE = [0.76, 0, 0.24, 1];

function buildLayoutFragments(images, ratios) {
  const fragments = [];
  let i = 0;
  while (i < images.length) {
    const r0 = ratios?.[i];
    const r1 = ratios?.[i + 1];
    const bothNonPortrait = r0 !== undefined && r1 !== undefined && r0 >= 1 && r1 >= 1;
    const sameAspect = bothNonPortrait && Math.abs(r0 - r1) < 0.1;
    if (r0 !== undefined && r1 !== undefined && bothNonPortrait && sameAspect) {
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

export default function BridesPage() {
  const navigate = useNavigate();
  const lenisRef = useSmoothScroll();
  const [imageRatios, setImageRatios] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const gridItems = useMemo(
    () =>
      ALL_BRIDES.map((publicId, i) => ({
        src: rawCloudinaryUrl(publicId),
        num: i + 1,
      })),
    []
  );

  useEffect(() => {
    if (gridItems.length === 0) { setImageRatios({}); return; }
    let mounted = true;
    const ratios = {};
    let remaining = gridItems.length;
    const imgs = [];
    const done = () => { if (mounted) setImageRatios(ratios); };
    gridItems.forEach((item, i) => {
      const img = new Image();
      imgs.push(img);
      img.onload = () => { ratios[i] = img.naturalWidth / img.naturalHeight; if (!--remaining) done(); };
      img.onerror = () => { ratios[i] = 1.5; if (!--remaining) done(); };
      img.src = item.src;
    });
    return () => { mounted = false; imgs.forEach((img) => { img.onload = null; img.onerror = null; }); };
  }, [gridItems]);

  const layoutFragments = useMemo(() => imageRatios ? buildLayoutFragments(gridItems, imageRatios) : [], [gridItems, imageRatios]);

  const viewerImages = useMemo(
    () =>
      ALL_BRIDES.map((publicId, i) => ({
        id: `bride-${i}`,
        img: rawCloudinaryUrl(publicId),
      })),
    []
  );

  const goBack = useCallback(() => {
    const lenis = lenisRef?.current;
    navigate("/");
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo("#brides-grooms", { duration: 1.2 });
      } else {
        document.getElementById("brides-grooms")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [navigate, lenisRef]);

  const openViewer = useCallback((index) => {
    setViewerIndex(index);
    setViewerOpen(true);
  }, []);

  return (
    <main className="min-h-screen bg-ivory">
      <SEO
        title="Bridal Wedding Photography — Traditional Bridal Portraits Mumbai"
        description="Browse our bridal wedding photography portfolio. Traditional and candid bridal portraits by Panigrahna — best wedding photographer in Mumbai."
      />
      <section className="pt-28 sm:pt-32 md:pt-36 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1480px]">
          <motion.button
            onClick={goBack}
            className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.3em] text-cinnamon-400 hover:text-walnut transition-colors duration-500 cursor-pointer mb-8"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-x-1" />
            <span>Back</span>
          </motion.button>

          <motion.h1
            className="font-serif text-walnut font-light leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <em className="italic">Brides</em> of Panigrahna
          </motion.h1>
          <motion.p
            className="font-serif text-taupe/60 text-base sm:text-lg italic mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            Celebrating the grace and beauty of every bride
          </motion.p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1480px]">
          {imageRatios ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
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
                    transition={{ duration: 0.6, ease: EASE }}
                    className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    {[img0, img1].map((item) => (
                      <div key={item.num} className="flex-1 min-w-0 group cursor-pointer" onClick={() => openViewer(item.num - 1)}>
                        <div className="overflow-hidden rounded-sm">
                          <ParallaxWrapper>
                            <motion.img
                              src={item.src}
                              alt=""
                              className="w-full h-auto select-none transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
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
                  transition={{ duration: 0.6, ease: EASE }}
                  className={`w-full ${frag.isLandscape ? '' : 'max-w-[1400px]'} mx-auto group cursor-pointer`}
                  onClick={() => openViewer(img0.num - 1)}
                >
                  <div className="overflow-hidden rounded-sm">
                    <ParallaxWrapper>
                      <motion.img
                        src={img0.src}
                        alt=""
                        className="w-full h-auto select-none transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
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
          ) : (
            <div className="flex justify-center py-32">
              <span className="font-sans text-cinnamon-300/50 text-xs uppercase tracking-[0.25em]">
                Loading gallery&hellip;
              </span>
            </div>
          )}
        </div>
      </section>

      <Footer />

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
