import { useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/ui/SEO";
import ImageViewer from "../components/ui/ImageViewer";
import Footer from "../components/footer/Footer";
import { rawCloudinaryUrl } from "../lib/cloudinary";
import { useSmoothScroll } from "../components/smooth-scroll/SmoothScroll";

const ALL_BRIDES = [
  "b1.jpg", "b2.jpg", "b3.avif", "b04.avif", "b5.jpg",
  "b6.jpg", "b7.jpg", "b8.jpg", "b9.avif", "b10.avif",
  "b11.jpg", "b12.jpg", "b13.jpg", "b14.jpg", "b15.jpg",
  "b16.jpg", "b17.jpg", "b18.avif", "b19.5.avif", "b20.5.avif",
];

const EASE = [0.76, 0, 0.24, 1];

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

export default function BridesPage() {
  const navigate = useNavigate();
  const lenisRef = useSmoothScroll();
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

  const layoutFragments = useMemo(() => buildLayoutFragments(gridItems), [gridItems]);

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
                  className="w-full max-w-[1400px] mx-auto group cursor-pointer"
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
