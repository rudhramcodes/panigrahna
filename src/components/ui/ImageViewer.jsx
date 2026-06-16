import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ImageViewer({ images, initialIndex = 0, onClose }) {
  const [[index, dir], setPage] = useState([initialIndex, 0]);

  const current = images[index];

  const goNext = useCallback(() => {
    setPage(([i]) => [(i + 1) % images.length, 1]);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setPage(([i]) => [(i - 1 + images.length) % images.length, -1]);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 200 : -200, opacity: 0, filter: "blur(6px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (d) => ({ x: d > 0 ? -200 : 200, opacity: 0, filter: "blur(6px)" }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Close viewer"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <span className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-10 font-sans text-white/40 text-xs sm:text-sm tracking-wider select-none">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 sm:left-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Image */}
      <motion.div
        className="relative z-[1] w-full h-full flex items-center justify-center px-2 sm:px-8 md:px-16 lg:px-24"
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          const swipe = info.velocity.x;
          const offset = info.offset.x;
          if (Math.abs(swipe) > 50 || Math.abs(offset) > 80) {
            if (swipe > 0 || offset > 80) goPrev();
            else goNext();
          }
        }}
        whileDrag={{ scale: 0.97, opacity: 0.85, transition: { duration: 0.15 } }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={current?.id || index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            src={current?.img || current}
            alt=""
            className="max-w-full max-h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 sm:right-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}
