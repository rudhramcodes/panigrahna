import { useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import CldImage from "../components/ui/CldImage";
import Footer from "../components/footer/Footer";
import { rawCloudinaryUrl } from "../lib/cloudinary";

import harshSayoneeImages from "../data/couples/harsh-and-sayonee.json";
import rahulJeevaniImages from "../data/couples/rahul-and-jeevani.json";
import prachiPreetImages from "../data/couples/prachi-and-preet.json";
import ronakJessicaImages from "../data/couples/ronak-and-jessica.json";
import rutvikAishwaryaImages from "../data/couples/rutvik-and-aishwarya.json";

const COUPLE_IMAGES = {
  "harsh-and-sayonee": harshSayoneeImages,
  "rahul-and-jeevani": rahulJeevaniImages,
  "prachi-and-preet": prachiPreetImages,
  "ronak-and-jessica": ronakJessicaImages,
  "rutvik-and-aishwarya": rutvikAishwaryaImages,
};

const ALL_COUPLES = [
  { slug: "harsh-and-sayonee", name: "Harsh & Sayonee", publicId: "TKS05225_1_jyeotg.jpg", quote: "A love story written in the stars", location: "Mumbai", date: "Dec 2024" },
  { slug: "rahul-and-jeevani", name: "Rahul & Jeevani", publicId: "DSC04563_1_foxptm.jpg", quote: "Two hearts, one journey", location: "Udaipur", date: "Nov 2024" },
  { slug: "prachi-and-preet", name: "Prachi & Preet", publicId: "DSC06503_1_qx8pds.jpg", quote: "Where tradition meets forever", location: "Surat", date: "Oct 2024" },
  { slug: "ronak-and-jessica", name: "Ronak & Jessica", publicId: "TKS04526_dxtewa.jpg", quote: "Dancing into eternity", location: "Goa", date: "Feb 2025" },
  { slug: "rutvik-and-aishwarya", name: "Rutvik & Aishwarya", publicId: "HRS_6891_1_rpow6s.jpg", angle: -90, quote: "A promise made in heaven", location: "Jaipur", date: "Jan 2025" },
];

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

function ParallaxWrapper({ children, speed = 0.15, fullHeight }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${fullHeight ? "h-full" : ""}`}>
      <motion.div style={{ y, willChange: "transform" }} className={fullHeight ? "h-full" : ""}>
        {children}
      </motion.div>
    </div>
  );
}

export default function CoupleProject() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const couple = ALL_COUPLES.find((c) => c.slug === slug);

  if (!couple) {
    navigate("/projects", { replace: true });
    return null;
  }

  const coupleImages = COUPLE_IMAGES[slug] || [];

  const gridItems = useMemo(
    () =>
      coupleImages.map((entry, i) => {
        const publicId = typeof entry === "string" ? entry : entry.id;
        const version = typeof entry === "string" ? undefined : entry.version;
        return { src: rawCloudinaryUrl(publicId, version), num: i + 1 };
      }),
    [coupleImages]
  );

  const layoutFragments = useMemo(() => buildLayoutFragments(gridItems), [gridItems]);

  return (
    <main className="min-h-screen bg-ivory">
      <section className="relative h-[70dvh] sm:h-screen w-full overflow-hidden">
        <CldImage
          publicId={couple.publicId}
          alt={couple.name}
          width={1200}
          options={couple.angle ? { angle: couple.angle } : {}}
          wrapperClassName="w-full h-full"
          imgClassName="w-full h-full object-cover"
          fetchpriority="high"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-16">
          <div className="mx-auto max-w-[1480px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-serif text-white font-light leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {couple.name}
              </h1>
              {couple.quote && (
                <p className="font-serif text-white/60 text-sm sm:text-base italic mt-2 max-w-[400px] leading-relaxed">
                  &ldquo;{couple.quote}&rdquo;
                </p>
              )}
              {(couple.location || couple.date) && (
                <div className="flex items-center gap-2 mt-2.5">
                  {couple.location && (
                    <span className="font-sans text-white/40 text-[11px] uppercase tracking-[0.15em]">
                      {couple.location}
                    </span>
                  )}
                  {couple.date && (
                    <>
                      <span className="text-white/20 text-[9px]">•</span>
                      <span className="font-sans text-white/40 text-[11px] uppercase tracking-[0.15em]">
                        {couple.date}
                      </span>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-10"
          >
            <span className="font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em]">
              Gallery
            </span>
          </motion.div>

          <div className="flex flex-col items-center gap-40 sm:gap-48 md:gap-56 lg:gap-64">
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
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                    >
                      <img src={img0.src} alt="" className="w-full h-auto select-none" loading="lazy" />
                    </motion.div>
                  </ParallaxWrapper>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
