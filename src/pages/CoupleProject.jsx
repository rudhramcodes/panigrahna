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

function buildEditorialRows(images) {
  const rows = [];
  let idx = 0;
  let lastType = null;
  const typeHistory = [];

  while (idx < images.length) {
    const remaining = images.length - idx;
    const rowIdx = rows.length;

    let type;
    if (remaining === 1) {
      type = "full";
    } else if (remaining === 2) {
      type = "duo";
    } else {
      const r = ((rowIdx + 1) * 17 + remaining * 7) % 100;
      if (r < 15) type = "full";
      else if (r < 33) type = "single";
      else if (r < 62) type = "duo";
      else type = "trio";

      if (lastType && (lastType === "full" || lastType === "single") && (type === "full" || type === "single")) {
        type = remaining >= 3 ? "trio" : "duo";
      }

      const consecSame = typeHistory.filter((t) => t === type).length;
      if (consecSame >= 2) {
        const alt = ["full", "single", "duo", "trio"].filter(
          (t) => t !== type && (remaining >= { full: 1, single: 1, duo: 2, trio: 3 }[t])
        );
        if (alt.length) type = alt[(rowIdx * 13) % alt.length];
      }

      const needed = { full: 1, duo: 2, trio: 3, single: 1 }[type];
      if (needed > remaining) {
        if (remaining === 1) type = "full";
        else if (remaining === 2) type = "duo";
        else type = "trio";
      }
    }

    const count = { full: 1, duo: 2, trio: 3, single: 1 }[type];
    const align = ["center", "left", "right"][((rowIdx + 1) * 11 + remaining * 3) % 3];

    let gap;
    if (type === "duo" || type === "trio") {
      const g = ((rowIdx + 1) * 13 + remaining * 5) % 12;
      if (g === 0) gap = "xl";
      else if (g <= 2) gap = "lg";
    }

    let maxW;
    if (type === "full" || type === "single") {
      const m = ((rowIdx + 1) * 19 + remaining * 7) % 18;
      if (m === 0) maxW = "wide";
      else if (m <= 2) maxW = "narrow";
    }

    rows.push({
      type,
      align,
      gap,
      maxW,
      items: images.slice(idx, idx + count).map((img, j) => ({ ...img, originalIndex: idx + j })),
    });

    typeHistory.push(type);
    if (typeHistory.length > 4) typeHistory.shift();
    lastType = type;
    idx += count;
  }

  return rows;
}

const gridItem = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

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

function ShimmerBox({ src, num, featured, fill }) {
  return (
    <motion.div
      variants={gridItem}
      className={`rounded-sm overflow-hidden relative group bg-taupe/8 w-full ${fill ? "h-full" : ""}`}
    >
      {fill ? (
        <img
          src={src}
          alt=""
          className="relative z-10 w-full h-full object-cover block pointer-events-none"
          loading="lazy"
        />
      ) : (
        <img
          src={src}
          alt=""
          className="relative z-10 w-full h-auto block min-w-[120px] min-h-[120px]"
          loading="lazy"
        />
      )}
      <span
        className={`absolute bottom-3 left-3 font-sans select-none tracking-wider drop-shadow-sm ${
          featured
            ? "text-white/80 text-sm sm:text-base font-semibold"
            : "text-white/50 text-xs sm:text-sm font-medium"
        }`}
      >
        {featured && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 mr-2 align-middle" />
        )}
        {String(num).padStart(2, "0")}
      </span>
    </motion.div>
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

  const galleryRows = useMemo(() => buildEditorialRows(gridItems), [gridItems]);

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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-20 sm:space-y-28 md:space-y-36 lg:space-y-48"
          >
            {galleryRows.map((row, rowIdx) => (
              <motion.div
                key={rowIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: rowIdx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {row.type === "full" && (
                  <div className="flex justify-center">
                    <div className={`w-full ${
                      row.maxW === "wide" ? "max-w-[1400px]" :
                      row.maxW === "narrow" ? "max-w-[900px]" :
                      "max-w-[1200px]"
                    }`}>
                      <ParallaxWrapper>
                        <ShimmerBox
                          src={row.items[0].src}
                          num={row.items[0].num}
                          featured
                        />
                      </ParallaxWrapper>
                    </div>
                  </div>
                )}

                {row.type === "single" && (
                  <div
                    className={`flex ${
                      row.align === "right"
                        ? "justify-end"
                        : row.align === "left"
                          ? "justify-start"
                          : "justify-center"
                    }`}
                  >
                    <div className={`w-full ${
                      row.maxW === "wide" ? "max-w-[700px]" :
                      row.maxW === "narrow" ? "max-w-[420px]" :
                      "max-w-[560px]"
                    }`}>
                      <ParallaxWrapper>
                        <ShimmerBox
                          src={row.items[0].src}
                          num={row.items[0].num}
                        />
                      </ParallaxWrapper>
                    </div>
                  </div>
                )}

                {(row.type === "duo" || row.type === "trio") && (
                  <div
                    className={`flex flex-wrap items-stretch ${
                      row.gap === "xl" ? "gap-12 sm:gap-16 md:gap-24 lg:gap-32" :
                      row.gap === "lg" ? "gap-10 sm:gap-14 md:gap-20 lg:gap-26" :
                      "gap-8 sm:gap-12 md:gap-16 lg:gap-20"
                    } ${
                      row.align === "right"
                        ? "justify-end"
                        : row.align === "left"
                          ? "justify-start"
                          : "justify-center"
                    }`}
                  >
                    {row.items.map((item) => (
                      <div
                        key={item.num}
                        className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] flex-1 max-w-[600px] aspect-[4/5]"
                      >
                        <ParallaxWrapper fullHeight>
                          <ShimmerBox
                            src={item.src}
                            num={item.num}
                            fill
                          />
                        </ParallaxWrapper>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
