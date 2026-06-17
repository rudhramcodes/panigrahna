import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CldImage from "../ui/CldImage";

export default function MobileCarousel({ items, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    const next = (index + items.length) % items.length;
    setActiveIndex(next);
  }, [items.length]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
  }, [items.length, interval]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const item = items[activeIndex];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#2c241a] select-none">
      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CldImage
            publicId={item.publicId}
            alt={item.text}
            width={600}
            options={item.options || {}}
            wrapperClassName="w-full h-full"
            imgClassName="w-full h-full object-cover pointer-events-none"
            imgProps={{
              decoding: "async",
              draggable: false,
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Couple name */}
          <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center pointer-events-none">
            <span className="font-serif text-[17px] tracking-[0.06em] text-white/90">
              {item.text}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10 pointer-events-none">
        {items.map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 h-[3px] bg-[#c97c2e]"
                : "w-[3px] h-[3px] bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Tap zones */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
        aria-label="Previous couple"
      />
      <button
        onClick={goNext}
        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
        aria-label="Next couple"
      />
    </div>
  );
}
