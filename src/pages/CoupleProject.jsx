import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import CldImage from "../components/ui/CldImage";
import Footer from "../components/footer/Footer";

const ALL_COUPLES = [
  { slug: "harsh-and-sayonee", name: "Harsh & Sayonee", publicId: "TKS05225_1_jyeotg.jpg", quote: "A love story written in the stars", location: "Mumbai", date: "Dec 2024" },
  { slug: "rahul-and-jeevani", name: "Rahul & Jeevani", publicId: "DSC04563_1_foxptm.jpg", quote: "Two hearts, one journey", location: "Udaipur", date: "Nov 2024" },
  { slug: "prachi-and-preet", name: "Prachi & Preet", publicId: "DSC06503_1_qx8pds.jpg", quote: "Where tradition meets forever", location: "Surat", date: "Oct 2024" },
  { slug: "ronak-and-jessica", name: "Ronak & Jessica", publicId: "TKS04526_dxtewa.jpg", quote: "Dancing into eternity", location: "Goa", date: "Feb 2025" },
  { slug: "rutvik-and-aishwarya", name: "Rutvik & Aishwarya", publicId: "HRS_6891_1_rpow6s.jpg", angle: -90, quote: "A promise made in heaven", location: "Jaipur", date: "Jan 2025" },
];

const TOTAL_IMAGES = 20;

const ALL_IMAGES = [
  "TKS05225_1_jyeotg.jpg",
  "DSC04563_1_foxptm.jpg",
  "DSC06642_1_lhpqi2.jpg",
  "DSC06503_1_qx8pds.jpg",
  "TKS05269_1_yvjsbn.jpg",
  "DSC06398_1_chgpws.jpg",
  "TKS05350_1_icb4yl.jpg",
  "DSC06501_1_czy9w8.jpg",
  "DSC06360_1_yfjfkb.jpg",
  "TKS05320_1_iljauy.jpg",
  "TKS05296_1_houjrv.jpg",
  "TKS04526_dxtewa.jpg",
  "TKS05280_1_otriau.jpg",
  "HRS_6891_1_rpow6s.jpg",
];

const staggerGrid = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.015, staggerDirection: -1 } },
};

const gridItem = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

function ShimmerBox({ publicId, num }) {
  return (
    <motion.div
      variants={gridItem}
      className="aspect-[3/4] rounded-sm overflow-hidden relative group"
    >
      <CldImage
        publicId={publicId}
        alt=""
        width={500}
        options={{ crop: "fill", gravity: "auto" }}
        wrapperClassName="absolute inset-0 w-full h-full"
        imgClassName="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <span className="absolute bottom-2.5 left-3 font-sans text-white/40 text-xs sm:text-sm font-medium select-none tracking-wider drop-shadow-sm">
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

  const gridPublicIds = useMemo(
    () =>
      Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
        publicId: ALL_IMAGES[i % ALL_IMAGES.length],
        num: i + 1,
      })),
    []
  );

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
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" /> */}

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
            variants={staggerGrid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
          >
            {gridPublicIds.map((item) => (
              <ShimmerBox key={item.num} publicId={item.publicId} num={item.num} />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
