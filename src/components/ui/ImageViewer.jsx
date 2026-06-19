import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
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
  const isGesturing = useRef(false);
  const gestureTransform = useRef({ zoom: 1, pan: { x: 0, y: 0 } });
  const suppressTransition = useRef(false);

  const current = images[index];

  useEffect(() => {
    stateRef.current.zoom = zoom;
    stateRef.current.pan = pan;
    gestureTransform.current = { zoom, pan };
  }, [zoom, pan]);

  const syncTransform = useCallback((z, px, py, animate) => {
    const el = imageWrapRef.current;
    if (!el) return;
    el.style.transition = animate
      ? "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";
    el.style.transform = `translate(${px}px, ${py}px) scale(${z})`;
  }, []);

  useLayoutEffect(() => {
    if (isGesturing.current) return;
    syncTransform(zoom, pan.x, pan.y, !suppressTransition.current);
    suppressTransition.current = false;
  }, [zoom, pan, syncTransform]);

  const constrainPan = useCallback((z, px, py) => {
    if (z <= 1) return { x: 0, y: 0 };
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: px, y: py };
    const maxX = ((z - 1) * rect.width) / 2;
    const maxY = ((z - 1) * rect.height) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, px)),
      y: Math.min(maxY, Math.max(-maxY, py)),
    };
  }, []);

  const commitTransform = useCallback(
    (z, px, py) => {
      const finalZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      const finalPan =
        finalZoom > 1 ? constrainPan(finalZoom, px, py) : { x: 0, y: 0 };

      syncTransform(finalZoom, finalPan.x, finalPan.y, true);
      setZoom(finalZoom);
      setPan(finalPan);
      stateRef.current = { zoom: finalZoom, pan: finalPan };
      gestureTransform.current = { zoom: finalZoom, pan: finalPan };
      isGesturing.current = false;
    },
    [constrainPan, syncTransform],
  );

  const goNext = useCallback(() => {
    suppressTransition.current = true;
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setPage(([i]) => [(i + 1) % images.length, 1]);
  }, [images.length]);

  const goPrev = useCallback(() => {
    suppressTransition.current = true;
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
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const applyZoom = useCallback(
    (factor, cx = 0, cy = 0) => {
      const prev = stateRef.current.zoom;
      const next = Math.min(
        ZOOM_MAX,
        Math.max(ZOOM_MIN, +(prev * factor).toFixed(2)),
      );
      if (next === prev) return;

      let newPan = stateRef.current.pan;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && (cx || cy)) {
        const mx = cx - rect.width / 2;
        const my = cy - rect.height / 2;
        newPan = {
          x: mx - (mx - newPan.x) * (next / prev),
          y: my - (my - newPan.y) * (next / prev),
        };
      }

      syncTransform(next, newPan.x, newPan.y, true);
      setZoom(next);
      setPan(newPan);
      stateRef.current = { zoom: next, pan: newPan };
      gestureTransform.current = { zoom: next, pan: newPan };
    },
    [syncTransform],
  );

  const zoomIn = useCallback(() => {
    const prev = stateRef.current.zoom;
    const next = Math.min(ZOOM_MAX, +(prev + ZOOM_STEP).toFixed(2));
    const newPan = stateRef.current.pan;
    syncTransform(next, newPan.x, newPan.y, true);
    setZoom(next);
    stateRef.current.zoom = next;
    gestureTransform.current.zoom = next;
  }, [syncTransform]);

  const zoomOut = useCallback(() => {
    const prev = stateRef.current.zoom;
    const next = Math.max(ZOOM_MIN, +(prev - ZOOM_STEP).toFixed(2));
    const newPan = next === ZOOM_MIN ? { x: 0, y: 0 } : stateRef.current.pan;
    syncTransform(next, newPan.x, newPan.y, true);
    setZoom(next);
    setPan(newPan);
    stateRef.current = { zoom: next, pan: newPan };
    gestureTransform.current = { zoom: next, pan: newPan };
  }, [syncTransform]);

  const resetZoom = useCallback(() => {
    syncTransform(1, 0, 0, true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    stateRef.current = { zoom: 1, pan: { x: 0, y: 0 } };
    gestureTransform.current = { zoom: 1, pan: { x: 0, y: 0 } };
  }, [syncTransform]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1 + ZOOM_STEP : 1 / (1 + ZOOM_STEP);
      applyZoom(factor, cx, cy);
    },
    [applyZoom],
  );

  const handleDoubleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const s = stateRef.current;
      if (s.zoom > 1) {
        resetZoom();
      } else {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) {
          applyZoom(3, 0, 0);
          return;
        }
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        applyZoom(3, cx, cy);
      }
    },
    [applyZoom, resetZoom],
  );

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    dragging: false,
    moved: false,
  });

  const handlePointerDown = useCallback((e) => {
    if (e.pointerType === "touch") return;
    isGesturing.current = true;
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

  const handlePointerMove = useCallback(
    (e) => {
      const d = dragRef.current;
      if (!d.dragging || e.pointerType === "touch") return;
      const dx = e.clientX - d.lastX;
      const dy = e.clientY - d.lastY;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      if (
        Math.abs(e.clientX - d.startX) > 5 ||
        Math.abs(e.clientY - d.startY) > 5
      ) {
        d.moved = true;
      }
      const s = stateRef.current;
      if (s.zoom > 1) {
        const newPan = { x: s.pan.x + dx, y: s.pan.y + dy };
        syncTransform(s.zoom, newPan.x, newPan.y, false);
        stateRef.current.pan = newPan;
        gestureTransform.current.pan = newPan;
      }
    },
    [syncTransform],
  );

  const handlePointerUp = useCallback(
    (e) => {
      const d = dragRef.current;
      if (!d.dragging || e.pointerType === "touch") return;
      d.dragging = false;

      const s = stateRef.current;
      if (s.zoom === 1 && d.moved) {
        const swipeX = e.clientX - d.startX;
        if (swipeX > 50) goPrev();
        else if (swipeX < -50) goNext();
      } else if (s.zoom > 1) {
        commitTransform(s.zoom, s.pan.x, s.pan.y);
      } else {
        isGesturing.current = false;
      }
    },
    [goNext, goPrev, commitTransform],
  );

  const touchRef = useRef({
    startX: 0,
    startY: 0,
    startZoom: 1,
    startPan: { x: 0, y: 0 },
    moved: false,
    touches: [],
    lastDist: 0,
    pinching: false,
  });

  const handleTouchStart = useCallback((e) => {
    const t = touchRef.current;
    isGesturing.current = true;
    if (e.touches.length === 1) {
      t.startX = e.touches[0].clientX;
      t.startY = e.touches[0].clientY;
      t.startZoom = stateRef.current.zoom;
      t.startPan = { ...stateRef.current.pan };
      t.moved = false;
      t.pinching = false;
    } else if (e.touches.length === 2) {
      t.pinching = true;
      t.lastDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      gestureTransform.current = { ...stateRef.current };
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const t = touchRef.current;

      if (e.touches.length === 1 && !t.pinching && t.startX !== undefined) {
        const dx = e.touches[0].clientX - t.startX;
        const dy = e.touches[0].clientY - t.startY;
        if (!t.moved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) t.moved = true;
        if (!t.moved) return;

        if (t.startZoom > 1) {
          const newPan = { x: t.startPan.x + dx, y: t.startPan.y + dy };
          syncTransform(stateRef.current.zoom, newPan.x, newPan.y, false);
          stateRef.current.pan = newPan;
          gestureTransform.current.pan = newPan;
        } else {
          syncTransform(1, dx, 0, false);
        }
      }

      if (e.touches.length === 2 && t.pinching) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        const factor = dist / t.lastDist;
        if (Math.abs(factor - 1) > 0.02) {
          const g = gestureTransform.current;
          const prevZoom = g.zoom;
          const next = Math.min(
            ZOOM_MAX,
            Math.max(ZOOM_MIN, +(prevZoom * factor).toFixed(2)),
          );
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const mx =
              (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
            const my =
              (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
            const ox = mx - rect.width / 2;
            const oy = my - rect.height / 2;
            g.zoom = next;
            g.pan = {
              x: ox - (ox - g.pan.x) * (next / prevZoom),
              y: oy - (oy - g.pan.y) * (next / prevZoom),
            };
            syncTransform(g.zoom, g.pan.x, g.pan.y, false);
          }
          t.lastDist = dist;
        }
      }
    },
    [syncTransform],
  );

  const handleTouchEnd = useCallback(
    (e) => {
      const t = touchRef.current;

      if (t.moved && !t.pinching) {
        const dx = e.changedTouches[0].clientX - t.startX;

        if (t.startZoom === 1) {
          if (Math.abs(dx) > 50) {
            syncTransform(1, 0, 0, false);
            dx > 0 ? goPrev() : goNext();
          } else {
            syncTransform(1, 0, 0, true);
          }
        } else {
          const g = gestureTransform.current;
          commitTransform(g.zoom, g.pan.x, g.pan.y);
        }
      }

      if (t.pinching) {
        const g = gestureTransform.current;
        let finalZoom = Math.round(g.zoom * 2) / 2;
        finalZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, finalZoom));
        commitTransform(finalZoom, g.pan.x, g.pan.y);
      }

      if (!t.pinching && (!t.moved || t.startZoom === 1)) {
        isGesturing.current = false;
      }
      touchRef.current = {
        startX: 0,
        startY: 0,
        startZoom: 1,
        startPan: { x: 0, y: 0 },
        moved: false,
        touches: [],
        lastDist: 0,
        pinching: false,
      };
    },
    [goNext, goPrev, commitTransform],
  );

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
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Close viewer"
      >
        <X size={18} />
      </button>

      <span className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 font-sans text-white/40 text-xs sm:text-sm tracking-wider select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
      </span>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/15 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-30"
          disabled={zoom >= ZOOM_MAX}
          aria-label="Zoom in"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
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
        style={{ touchAction: "none" }}
      >
        <div
          ref={imageWrapRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.img
              key={current?.id || index}
              custom={dir}
              variants={zoom === 1 ? slideVariants : {}}
              initial={zoom === 1 ? "enter" : undefined}
              animate={zoom === 1 ? "center" : undefined}
              exit={zoom === 1 ? "exit" : undefined}
              transition={
                zoom === 1
                  ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  : undefined
              }
              src={current?.img || current}
              alt=""
              className="max-w-full max-h-full object-contain pointer-events-none"
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-3 sm:right-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}
