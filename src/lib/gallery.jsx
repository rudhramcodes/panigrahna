import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function buildLayoutFragments(images, ratios) {
  const fragments = [];
  let i = 0;
  while (i < images.length) {
    const r0 = ratios?.[i];
    const r1 = ratios?.[i + 1];
    const bothPortrait = r0 !== undefined && r1 !== undefined && r0 < 1 && r1 < 1;
    const sameAspect = bothPortrait && Math.abs(r0 - r1) < 0.1;
    if (bothPortrait && sameAspect) {
      fragments.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      fragments.push({ type: "single", items: [images[i]], isLandscape: r0 !== undefined && r0 >= 1 });
      i++;
    }
  }
  return fragments;
}

export function buildLandscapeFragments(images, ratios) {
  const fragments = [];
  let i = 0;
  while (i < images.length) {
    const r0 = ratios?.[i];
    const r1 = ratios?.[i + 1];
    const bothNonPortrait = r0 !== undefined && r1 !== undefined && r0 >= 1 && r1 >= 1;
    const sameAspect = bothNonPortrait && Math.abs(r0 - r1) < 0.1;
    if (bothNonPortrait && sameAspect) {
      fragments.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      fragments.push({ type: "single", items: [images[i]], isLandscape: r0 !== undefined && r0 >= 1 });
      i++;
    }
  }
  return fragments;
}

export function ParallaxWrapper({ children, speed = 0.28, fullHeight }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pct = Math.round(speed * 80);
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${fullHeight ? "h-full" : ""}`}>
      <motion.div style={{ y, willChange: "transform" }} className={fullHeight ? "h-full" : ""}>
        {children}
      </motion.div>
    </div>
  );
}

export function loadImageRatios(gridItems, setImageRatios) {
  if (gridItems.length === 0) { setImageRatios({}); return; }
  let mounted = true;
  const ratios = {};
  let remaining = gridItems.length;
  const imgs = [];
  const done = () => { if (mounted) setImageRatios(ratios); };
  gridItems.forEach((item, i) => {
    const img = new Image();
    imgs.push(img);
    img.onload = () => { ratios[i] = img.naturalWidth / img.naturalHeight; if (!--remaining) done(); };
    img.onerror = () => { ratios[i] = 1.5; if (!--remaining) done(); };
    img.src = item.src;
  });
  return () => { mounted = false; imgs.forEach((img) => { img.onload = null; img.onerror = null; }); };
}
