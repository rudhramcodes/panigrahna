import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ImageViewer from "../ui/ImageViewer";
import MaskText from "../mask-text/MaskText";
import { rawCloudinaryUrl } from "../../lib/cloudinary";

const BRIDES = [
  "B1.jpg", "B2.jpg", "B3.avif", "B04.avif", "B5.jpg",
  "B6.jpg", "B7.jpg", "B8.jpg",
];

const GROOMS = [
  "G1.jpg", "G2.jpg", "G3.avif", "G4.jpg", "G5.jpg",
  "G9.jpg", "G7.jpg", "G8.avif",
];

const EASE = [0.76, 0, 0.24, 1];
const HOME_SHOW = 8;

function ImageTile({ publicId, className, onClick }) {
  return (
    <motion.div
      className={`group cursor-pointer overflow-hidden rounded-sm bg-sand/20 ${className}`}
      onClick={onClick}
    >
      <img
        src={rawCloudinaryUrl(publicId)}
        alt=""
        className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-sm transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
    </motion.div>
  );
}

function BentoGrid({ images, onImageClick }) {
  const [i0, i1, i2, i3, i4, i5, i6, i7] = images;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      <div className="col-span-2 row-span-2 aspect-square md:aspect-auto">
        <ImageTile publicId={i0} className="w-full h-full" onClick={() => onImageClick(0)} />
      </div>
      <div className="aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i1} className="w-full h-full" onClick={() => onImageClick(1)} />
      </div>
      <div className="aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i2} className="w-full h-full" onClick={() => onImageClick(2)} />
      </div>
      <div className="aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i3} className="w-full h-full" onClick={() => onImageClick(3)} />
      </div>
      <div className="aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i4} className="w-full h-full" onClick={() => onImageClick(4)} />
      </div>
      <div className="aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i5} className="w-full h-full" onClick={() => onImageClick(5)} />
      </div>
      <div className="aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i6} className="w-full h-full" onClick={() => onImageClick(6)} />
      </div>
      <div className="col-span-2 aspect-[4/5] md:aspect-auto">
        <ImageTile publicId={i7} className="w-full h-full" onClick={() => onImageClick(7)} />
      </div>
    </div>
  );
}

function CategorySection({ title, images, viewAllPath, onImageClick }) {
  const navigate = useNavigate();
  const showImages = images.slice(0, HOME_SHOW);

  return (
    <div>
      <div className="mb-6 sm:mb-8 md:mb-10">
        <MaskText
          outerTag="h2"
          tag="span"
          amount={0.3}
          className="font-serif text-walnut font-light leading-none tracking-tight"
          outerStyle={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)" }}
          lines={[
            <span key="line">
              <em className="italic">{title.split(" ")[0]}</em>{" "}
              {title.split(" ").slice(1).join(" ")}
            </span>,
          ]}
        />
      </div>

      <BentoGrid images={showImages} onImageClick={onImageClick} />

      <motion.div
        className="mt-8 sm:mt-10 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button
          onClick={() => navigate(viewAllPath)}
          className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-walnut px-8 text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] cursor-pointer"
        >
          <div className="relative z-10 flex items-center gap-3">
            <span className="font-sans text-[11px] uppercase tracking-[4px]">
              View All
            </span>
            <div className="relative w-[18px] h-[18px]">
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:translate-x-[10px] group-hover:-translate-y-[10px] group-hover:scale-[0.3]">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 -translate-x-[10px] translate-y-[10px] scale-[0.3] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
            </div>
          </div>
          <div className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
        </button>
      </motion.div>
    </div>
  );
}

export default function BridesGrooms() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerImages, setViewerImages] = useState([]);

  const allBrideViewerImages = useMemo(
    () =>
      BRIDES.map((publicId, i) => ({
        id: `bride-${i}`,
        img: rawCloudinaryUrl(publicId),
      })),
    []
  );

  const allGroomViewerImages = useMemo(
    () =>
      GROOMS.map((publicId, i) => ({
        id: `groom-${i}`,
        img: rawCloudinaryUrl(publicId),
      })),
    []
  );

  const openBrideViewer = useCallback(
    (index) => {
      setViewerImages(allBrideViewerImages);
      setViewerIndex(index);
      setViewerOpen(true);
    },
    [allBrideViewerImages]
  );

  const openGroomViewer = useCallback(
    (index) => {
      setViewerImages(allGroomViewerImages);
      setViewerIndex(index);
      setViewerOpen(true);
    },
    [allGroomViewerImages]
  );

  return (
    <section className="relative w-full bg-sand/50 overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-24 sm:mb-28 md:mb-36">
          <CategorySection
            title="Brides of Panigrahna"
            images={BRIDES}
            viewAllPath="/brides"
            onImageClick={openBrideViewer}
          />
        </div>

        <div>
          <CategorySection
            title="Grooms of Panigrahna"
            images={GROOMS}
            viewAllPath="/grooms"
            onImageClick={openGroomViewer}
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
