import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CldImage from "../ui/CldImage";
import ImageViewer from "../ui/ImageViewer";
import MaskText from "../mask-text/MaskText";
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
  "DSC06398_1_chgpws.jpg",
  "DSC06398_1_chgpws.jpg",
];

const GROOMS = [
  "TKS05225_1_jyeotg.jpg",
  "TKS05320_1_iljauy.jpg",
  "TKS05296_1_houjrv.jpg",
  "TKS05225_1_jyeotg.jpg",
  "TKS04526_dxtewa.jpg",
  "TKS05280_1_otriau.jpg",
  "DSC06360_1_yfjfkb.jpg",
  "TKS05350_1_icb4yl.jpg",
  "TKS05225_1_jyeotg.jpg",
  "TKS05225_1_jyeotg.jpg",
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

function GalleryGrid({ title, images, onImageClick }) {
  return (
    <div>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <MaskText
          outerTag="h2"
          tag="span"
            amount={0.3}
          className="font-serif text-walnut font-light leading-none tracking-tight"
          outerStyle={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}
          lines={[
            <span key="line"><em className="italic">{title.split(" ")[0]}</em>{" "}{title.split(" ").slice(1).join(" ")}</span>,
          ]}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {images.map((publicId, i) => (
          <motion.div
            key={publicId}
            custom={i}
            variants={ITEM_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group cursor-pointer overflow-hidden rounded-[1vw] bg-sand/20 relative aspect-[4/5]"
            onClick={() => onImageClick(i)}
          >
            <CldImage
              publicId={publicId}
              alt=""
              width={400}
              options={{ crop: "fill", gravity: "auto" }}
              wrapperClassName="w-full h-full transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
              imgClassName="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-[1vw] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function BridesGrooms() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerType, setViewerType] = useState("bride");

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

  const openViewer = useCallback((type, index) => {
    setViewerType(type);
    setViewerIndex(index);
    setViewerOpen(true);
  }, []);

  const viewerImages = viewerType === "bride" ? brideViewerImages : groomViewerImages;

  return (
    <section className="relative w-full bg-sand/50 overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-20 sm:mb-24 md:mb-32">
          <GalleryGrid
            title="Brides of Panigrahna"
            images={BRIDES}
            onImageClick={(i) => openViewer("bride", i)}
          />
        </div>

        <div>
          <GalleryGrid
            title="Grooms of Panigrahna"
            images={GROOMS}
            onImageClick={(i) => openViewer("groom", i)}
          />
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
    </section>
  );
}
