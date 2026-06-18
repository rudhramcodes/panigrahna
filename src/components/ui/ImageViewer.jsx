import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 6;
const ZOOM_STEP = 0.2;

export default function ImageViewer({ images, initialIndex = 0, onClose }) {
  const [[index, dir], setPage] = useState([initialIndex, 0]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imageWrapRef = useRef(null);
  const stateRef = useRef({ zoom: 1, pan: { x: 0, y: 0 } });

  const current = images[index];

  useEffect(() => {
    stateRef.current.zoom = zoom;
    stateRef.current.pan = pan;
  }, [zoom, pan]);

  const goNext = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setPage(([i]) => [(i + 1) % images.length, 1]);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
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

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  const applyZoom = useCallback((factor, cx = 0, cy = 0) => {
    setZoom((prev) => {
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(prev * factor).toFixed(2)));
      if (next !== prev) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mx = cx - rect.width / 2;
          const my = cy - rect.height / 2;
          setPan((p) => ({
            x: mx - (mx - p.x) * (next / prev),
            y: my - (my - p.y) * (next / prev),
          }));
        }
      }
      return next;
    });
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(ZOOM_MAX, +(prev + ZOOM_STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(ZOOM_MIN, +(prev - ZOOM_STEP).toFixed(2));
      if (next === ZOOM_MIN) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1 + ZOOM_STEP : 1 / (1 + ZOOM_STEP);
    applyZoom(factor, cx, cy);
  }, [applyZoom]);

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    const s = stateRef.current;
    if (s.zoom > 1) {
      resetZoom();
    } else {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) { setZoom(3); return; }
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      applyZoom(3, cx, cy);
    }
  }, [applyZoom, resetZoom]);

  const dragRef = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0, dragging: false, moved: false });

  const handlePointerDown = useCallback((e) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      dragging: true,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    const dx = e.clientX - d.lastX;
    const dy = e.clientY - d.lastY;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    if (Math.abs(e.clientX - d.startX) > 5 || Math.abs(e.clientY - d.startY) > 5) {
      d.moved = true;
    }
    const s = stateRef.current;
    if (s.zoom > 1) {
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  }, []);

  const handlePointerUp = useCallback((e) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    d.dragging = false;

    const s = stateRef.current;
    if (s.zoom === 1 && d.moved) {
      const swipeX = e.clientX - d.startX;
      if (swipeX > 50) goPrev();
      else if (swipeX < -50) goNext();
    }
  }, [goNext, goPrev]);

  const touchRef = useRef({ touches: [], lastDist: 0, pinching: false });

  const handleTouchStart = useCallback((e) => {
    const t = touchRef.current;
    t.touches = Array.from(e.touches);
    if (e.touches.length === 2) {
      t.pinching = true;
      t.lastDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    const t = touchRef.current;
    if (e.touches.length === 2 && t.pinching) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / t.lastDist;
      if (Math.abs(factor - 1) > 0.02) {
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mx = cx - rect.left;
          const my = cy - rect.top;
          setZoom((prev) => {
            const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(prev * factor).toFixed(2)));
            if (next !== prev) {
              setPan((p) => ({
                x: mx - (mx - p.x) * (next / prev),
                y: my - (my - p.y) * (next / prev),
              }));
            }
            return next;
          });
        }
        t.lastDist = dist;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchRef.current.pinching = false;
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm select-none"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Close viewer"
      >
        <X size={18} />
      </button>

      <span className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 font-sans text-white/40 text-xs sm:text-sm tracking-wider select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <button
          onClick={(e) => { e.stopPropagation(); zoomOut(); }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-30"
          disabled={zoom <= ZOOM_MIN}
          aria-label="Zoom out"
        >
          <Minus size={14} />
        </button>
        <span className="font-sans text-white/60 text-xs tabular-nums min-w-[3ch] text-center select-none">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); zoomIn(); }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-30"
          disabled={zoom >= ZOOM_MAX}
          aria-label="Zoom in"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 sm:left-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={containerRef}
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: zoom > 1 ? "none" : "pan-x" }}
      >
        <div
          ref={imageWrapRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: zoom === 1 && pan.x === 0 && pan.y === 0
              ? "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.img
              key={current?.id || index}
              custom={dir}
              variants={zoom === 1 ? slideVariants : {}}
              initial={zoom === 1 ? "enter" : undefined}
              animate={zoom === 1 ? "center" : undefined}
              exit={zoom === 1 ? "exit" : undefined}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={current?.img || current}
              alt=""
              className="max-w-full max-h-full object-contain pointer-events-none"
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 sm:right-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}
