import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rawCloudinaryUrl, RAW_VERSION } from "../../lib/cloudinary";

const SPRING = { type: "spring", stiffness: 350, damping: 32, mass: 0.85 };

const cardVariants = {
  enter: (dir) => ({ x: dir > 0 ? 360 : -360, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -180 : 180, opacity: 0, scale: 0.94 }),
};

export default function MobileGallery({ items, interval = 5000, onCoupleClick }) {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const timerRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const dragOccurred = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [exposedIndex, setExposedIndex] = useState(activeIndex);

  const paginate = useCallback(
    (dir) => {
      setPage(([prev]) => {
        const next = (prev + dir + items.length) % items.length;
        return [next, dir];
      });
    },
    [items.length]
  );

  const goNext = useCallback(() => paginate(1), [paginate]);
  const goPrev = useCallback(() => paginate(-1), [paginate]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    timerRef.current = setInterval(goNext, interval);
    return () => clearInterval(timerRef.current);
  }, [goNext, interval, isPaused, items.length]);

  useEffect(() => {
    const t = setTimeout(() => setExposedIndex(activeIndex), 50);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 4000);
  }, []);

  const handleDragEnd = useCallback(
    (_, info) => {
      pause();
      dragOccurred.current = true;
      if (info.offset.x < -60) goNext();
      else if (info.offset.x > 60) goPrev();
      setTimeout(() => { dragOccurred.current = false; }, 400);
    },
    [goNext, goPrev, pause]
  );

  const item = items[activeIndex];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#1a1510]">
      <div className="absolute top-0 left-0 right-0 z-30 flex gap-[3px] px-[3px] pt-[3px]">
        {items.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[2px] bg-white/15 rounded-full overflow-hidden"
          >
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width:
                  i < exposedIndex
                    ? "100%"
                    : i === exposedIndex
                      ? "100%"
                      : "0%",
                backgroundColor:
                  i === exposedIndex
                    ? "rgba(201,124,46,0.9)"
                    : i < exposedIndex
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.15)",
                transitionDuration:
                  i === exposedIndex ? `${interval}ms` : "300ms",
                transitionTimingFunction:
                  i === exposedIndex ? "linear" : "ease",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 top-3 bottom-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => pause()}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SPRING}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragStart={() => { dragOccurred.current = true; }}
            onDragEnd={handleDragEnd}
            onClick={() => {
              if (!dragOccurred.current) {
                onCoupleClick?.(activeIndex);
              }
              dragOccurred.current = false;
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div
              className="absolute inset-0 progressive-bg"
              style={{
                backgroundImage: `url(${rawCloudinaryUrl(item.publicId, item.version || RAW_VERSION)})`,
              }}
            >
              <img
                src={rawCloudinaryUrl(item.publicId, item.version || RAW_VERSION)}
                alt={item.text}
                className="w-full h-full object-cover pointer-events-none progressive-load"
                loading="lazy"
                onLoad={(e) => {
                  e.currentTarget.classList.add('loaded');
                  e.currentTarget.parentElement.style.backgroundImage = 'none';
                }}
                onError={(e) => {
                  e.currentTarget.classList.add('loaded');
                  e.currentTarget.parentElement.style.backgroundImage = 'none';
                }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 px-6 pb-9">

              <h3 className="font-serif text-white text-[clamp(1.4rem,5.5vw,1.8rem)] font-light leading-none tracking-tight">
                {item.text}
              </h3>

              {item.quote && (
                <p className="font-serif text-white/45 text-xs italic mt-1.5 leading-relaxed max-w-[260px]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              )}

              {(item.location || item.date) && (
                <div className="flex items-center gap-2 mt-2">
                  {item.location && (
                    <span className="font-sans text-white/25 text-[10px] uppercase tracking-[0.15em]">
                      {item.location}
                    </span>
                  )}
                  {item.date && (
                    <>
                      <span className="text-white/10 text-[8px]">•</span>
                      <span className="font-sans text-white/25 text-[10px] uppercase tracking-[0.15em]">
                        {item.date}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-2 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage([i, i > activeIndex ? 1 : -1]);
                pause();
              }}
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-5 h-[3px] bg-cinnamon-300"
                  : "w-[3px] h-[3px] bg-white/15 hover:bg-white/30"
              }`}
              aria-label={`Go to ${items[i]?.text || i + 1}`}
            />
          ))}
        </div>

        <span className="font-serif text-white/15 text-[11px] italic font-light pointer-events-auto select-none">
          {String(activeIndex + 1).padStart(2, "0")}/
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <button
        onClick={() => { goPrev(); pause(); }}
        className="absolute left-0 top-0 bottom-0 w-1/4 z-20 cursor-pointer"
        aria-label="Previous couple"
      />
      <button
        onClick={() => { goNext(); pause(); }}
        className="absolute right-0 top-0 bottom-0 w-1/4 z-20 cursor-pointer"
        aria-label="Next couple"
      />
    </div>
  );
}
