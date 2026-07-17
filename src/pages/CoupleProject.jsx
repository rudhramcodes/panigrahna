import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import { cloudinaryUrl, RAW_VERSION } from "../lib/cloudinary";
import Footer from "../components/footer/Footer";
import SoundtrackPlayer from "../components/ui/SoundtrackPlayer";

import { COUPLES } from "../data/couples";
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
  { slug: "rahul-and-jeevani", name: "Rahul & Jeevani", publicId: "DSC04563_1_foxptm.jpg", quote: "Two hearts, one journey", location: "Udaipur", date: "Nov 2024",
    premise: "Some weddings are remembered for how they looked. This one stayed with us because of how it felt. Over four days of traditions, laughter, family, and quiet moments, Rahul and Jeevni\u2019s celebration unfolded with a warmth that was impossible to miss. This is a glimpse into a wedding that felt honest, personal, and deeply their own.",
    description: "Rahul, a well-known Kannada actor, and Jeevni\u2019s wedding was one of those celebrations that felt effortless, personal, and true to the people at its heart. Held in the presence of their families and closest loved ones, the wedding embraced authentic Kannada traditions and rituals, with blessings from Lord Venkateswara of Tirupati woven into the celebrations.\n\nWhat stood out to us throughout the day was not any single ritual or grand moment, but the way Rahul and Jeevni\u2019s eyes naturally found each other in every meaningful moment. Whether they were surrounded by hundreds of guests or quietly participating in a ceremony, there was always a glance, a smile, or a moment of eye contact that reflected their comfort and connection with one another. Many of our favourite photographs from the wedding came from these simple, unscripted interactions.\n\nTheir celebration was also a reflection of the people and things they love. Family played a central role, and even their beloved dogs, who are very much a part of their lives, found a place in the story. From traditional rituals and emotional blessings to candid moments shared with loved ones, every part of the wedding felt genuine and meaningful. It was a joy to document a celebration that stayed rooted in tradition while remaining completely true to Rahul and Jeevni\u2019s journey together." },
  { slug: "prachi-and-preet", name: "Prachi & Preet", publicId: "DSC06503_1_qx8pds.jpg", quote: "Where tradition meets forever", location: "Surat", date: "Oct 2024" },
  { slug: "ronak-and-jessica", name: "Ronak & Jessica", publicId: "TKS04526_dxtewa.jpg", quote: "Dancing into eternity", location: "Goa", date: "Feb 2025" },
  { slug: "rutvik-and-aishwarya", name: "Rutvik & Aishwarya", publicId: "HRS_6891_1_rpow6s.jpg", angle: -90, quote: "A promise made in heaven", location: "Jaipur", date: "Jan 2025" },
];

function buildLayoutFromRatios(images, ratios) {
  const fragments = [];
  let i = 0;
  while (i < images.length) {
    const r0 = ratios[i];
    const r1 = ratios[i + 1];
    const bothPortrait = r0 < 1 && r1 !== undefined && r1 < 1;
    // only pair if both portrait and aspect ratios are within 10%
    const sameAspect = bothPortrait && Math.abs(r0 - r1) < 0.1;
    if (bothPortrait && sameAspect) {
      fragments.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      fragments.push({ type: "single", items: [images[i]], isLandscape: r0 >= 1 });
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
  const coupleData = COUPLES.find((c) => c.slug === slug);
  const soundtrack = coupleData?.soundtrack;

  const gridItems = useMemo(
    () =>
      coupleImages.map((entry, i) => {
        const publicId = typeof entry === "string" ? entry : entry.id;
        const version = typeof entry === "string" ? undefined : entry.version;
        return { src: cloudinaryUrl(publicId, { width: 1200, version: version || RAW_VERSION }), num: i + 1 };
      }),
    [coupleImages]
  );

  const [imageRatios, setImageRatios] = useState(null);
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

  const layoutFragments = useMemo(
    () => imageRatios ? buildLayoutFromRatios(gridItems, imageRatios) : [],
    [gridItems, imageRatios]
  );

  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <main className="min-h-screen bg-ivory">
      <section className="relative h-[55dvh] sm:h-[80dvh] w-full overflow-hidden">
        <img
          src={cloudinaryUrl(couple.publicId, { width: 2000, version: RAW_VERSION })}
          alt={couple.name}
          className="w-full h-full object-cover"
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

      {couple.premise && (
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-18">
          <div className="mx-auto max-w-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-5">
                The Story
              </span>
              <p
                className="font-serif text-walnut/80 leading-[1.85] mb-5"
                style={{ fontSize: "clamp(1rem, 1.1vw, 1.15rem)" }}
              >
                {couple.premise}
              </p>

              {!storyOpen && couple.description && (
                <motion.button
                  onClick={() => setStoryOpen(true)}
                  className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.3em] text-cinnamon-400 hover:text-walnut transition-colors duration-500 cursor-pointer"
                  whileHover={{ gap: "12px" }}
                  transition={{ duration: 0.3 }}
                >
                  Read more
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
                </motion.button>
              )}

              <AnimatePresence initial={false}>
                {storyOpen && couple.description && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {couple.description.split("\n\n").map((paragraph, i) => (
                      <p
                        key={i}
                        className="font-serif text-walnut/80 leading-[1.85] mb-5 last:mb-0"
                        style={{ fontSize: "clamp(1rem, 1.1vw, 1.15rem)" }}
                      >
                        {paragraph}
                      </p>
                    ))}
                    <motion.button
                      onClick={() => setStoryOpen(false)}
                      className="mt-4 group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.3em] text-cinnamon-400 hover:text-walnut transition-colors duration-500 cursor-pointer"
                      whileHover={{ gap: "12px" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">&larr;</span>
                      Read less
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {soundtrack && (
        <section className="px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1480px]">
            <SoundtrackPlayer soundtrack={soundtrack} />
          </div>
        </section>
      )}

      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 sm:mb-8"
          >
            <span className="font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em]">
              Gallery
            </span>
          </motion.div>

          {imageRatios ? (
            <div className="flex flex-col items-center gap-24 sm:gap-32 md:gap-40 lg:gap-48">
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
                  <div key={`single-${fi}`} className={`w-full ${frag.isLandscape ? '' : 'max-w-[1400px]'} mx-auto`}>
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
    </main>
  );
}
