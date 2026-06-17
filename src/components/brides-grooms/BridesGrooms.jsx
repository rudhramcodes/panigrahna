import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CldImage from "../ui/CldImage";
import ImageViewer from "../ui/ImageViewer";
import { cloudinaryUrl } from "../../lib/cloudinary";

const BRIDES = [
  "DSC04563_1_foxptm.jpg",
  "DSC06642_1_lhpqi2.jpg",
  "DSC06503_1_qx8pds.jpg",
  "TKS05269_1_yvjsbn.jpg",
  "DSC06398_1_chgpws.jpg",
  "TKS05350_1_icb4yl.jpg",
  "DSC06501_1_czy9w8.jpg",
  "DSC06360_1_yfjfkb.jpg",
];

const GROOMS = [
  "TKS05225_1_jyeotg.jpg",
  "TKS05320_1_iljauy.jpg",
  "TKS05296_1_houjrv.jpg",
  "HRS_6891_1_rpow6s.jpg",
  "TKS04526_dxtewa.jpg",
  "TKS05280_1_otriau.jpg",
  "DSC06360_1_yfjfkb.jpg",
  "TKS05350_1_icb4yl.jpg",
];

const EASE = [0.76, 0, 0.24, 1];

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.05 },
  }),
};

function GallerySection({ title, images, viewerImages, onImageClick }) {
  return (
    <div>
      <motion.h2
        className="font-serif text-walnut font-light leading-none tracking-tight mb-8 sm:mb-10 md:mb-12"
        style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}
        initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <em className="italic">{title.split(" ")[0]}</em>{" "}
        {title.split(" ").slice(1).join(" ")}
      </motion.h2>

      <div
        className="masonry-grid"
        style={{
          columns: 2,
          columnGap: "0.5rem",
        }}
      >
        <style>{`
          .masonry-grid > * {
            break-inside: avoid;
            margin-bottom: 0.5rem;
          }
          @media (min-width: 640px) {
            .masonry-grid { columns: 3; column-gap: 0.75rem; }
            .masonry-grid > * { margin-bottom: 0.75rem; }
          }
          @media (min-width: 1024px) {
            .masonry-grid { columns: 4; column-gap: 1rem; }
            .masonry-grid > * { margin-bottom: 1rem; }
          }
        `}</style>
        {images.map((publicId, i) => (
          <motion.div
            key={publicId}
            custom={i}
            variants={ITEM_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group cursor-pointer overflow-hidden rounded-sm bg-sand/20 will-change-transform"
            onClick={() => onImageClick(i)}
          >
            <CldImage
              publicId={publicId}
              alt=""
              width={500}
              options={{ crop: "fill", gravity: "auto" }}
              wrapperClassName="w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.02]"
              imgClassName="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-sm transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function BridesGrooms() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerImages, setViewerImages] = useState([]);

  const brideViewerImages = useMemo(
    () =>
      BRIDES.map((publicId, i) => ({
        id: `bride-${i}`,
        img: cloudinaryUrl(publicId, { width: 1200 }),
      })),
    []
  );

  const groomViewerImages = useMemo(
    () =>
      GROOMS.map((publicId, i) => ({
        id: `groom-${i}`,
        img: cloudinaryUrl(publicId, { width: 1200 }),
      })),
    []
  );

  const handleBrideClick = useCallback((i) => {
    setViewerImages(brideViewerImages);
    setViewerIndex(i);
    setViewerOpen(true);
  }, [brideViewerImages]);

  const handleGroomClick = useCallback((i) => {
    setViewerImages(groomViewerImages);
    setViewerIndex(i);
    setViewerOpen(true);
  }, [groomViewerImages]);

  return (
    <section className="relative w-full bg-ivory overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ── Brides ── */}
        <div className="mb-20 sm:mb-24 md:mb-32">
          <GallerySection
            title="Brides of Panigrahna"
            images={BRIDES}
            viewerImages={brideViewerImages}
            onImageClick={handleBrideClick}
          />
        </div>

        {/* ── Grooms ── */}
        <div>
          <GallerySection
            title="Grooms of Panigrahna"
            images={GROOMS}
            viewerImages={groomViewerImages}
            onImageClick={handleGroomClick}
          />
        </div>
      </div>

      {/* Viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <ImageViewer
            images={viewerImages}
            initialIndex={viewerIndex}
            onClose={() => setViewerOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
