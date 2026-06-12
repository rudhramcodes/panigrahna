import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import styles from "./Testimonial.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "We've been able to increase our project delivery speed by 40% while maintaining the highest quality standards across every client engagement.",
    name: "Lulu Meyers",
    role: "PM, Hourglass",
    company: "Web Design Agency",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop&crop=face",
  },
  {
    id: 2,
    quote:
      "The platform's intuitive interface eliminated onboarding friction entirely. Our team was productive from day one with zero training required.",
    name: "Marcus Chen",
    role: "VP of Design",
    company: "Studio Module",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face",
  },
  {
    id: 3,
    quote:
      "We replaced three separate tools with this one platform. The integration saved us over $2,000 per month in operational overhead costs.",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "Zenith Labs",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face",
  },
  {
    id: 4,
    quote:
      "The analytics dashboard gave us visibility we never had before. We now make data-driven decisions that directly impact our bottom line.",
    name: "James Park",
    role: "Head of Product",
    company: "Elevate Studio",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop&crop=face",
  },
];

function StarRating({ color = "#EAB308", size = 16 }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} color={color} fill={color} />
      ))}
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1];
const transition = { duration: 0.45, ease };

const textVariants = {
  initial: (dir) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
  animate: { opacity: 1, y: 0 },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.04 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const t = TESTIMONIALS[current];

  const go = useCallback((d) => {
    setDir(d);
    setCurrent((prev) => {
      const next = prev + d;
      if (next < 0) return TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) return 0;
      return next;
    });
  }, []);

  return (
    <section className="w-full h-screen bg-[#f5f5f5] p-8 max-sm:p-4 overflow-hidden">
      <div className="grid h-full grid-cols-[58%_42%] max-md:grid-cols-1 max-md:h-auto">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center px-8 lg:px-14 xl:px-20 max-md:px-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              custom={dir}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="flex flex-col gap-5"
            >
              <StarRating color="#EAB308" size={16} />

              <blockquote className={`font-serif ${styles.quote}`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col gap-0.5">
                <span className="text-xl max-sm:text-lg font-semibold text-[#111]">
                  {t.name}
                </span>
                <span className="text-[15px] max-sm:text-[13px] text-[#666]">
                  {t.role}, {t.company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center gap-3 mt-10 max-sm:mt-6">
            <button
              onClick={() => go(-1)}
              className={styles.navBtn}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => go(1)}
              className={styles.navBtn}
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ── Right: image ── */}
        <div className="relative overflow-hidden rounded-lg max-md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="w-full h-full absolute inset-0"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className={styles.overlay}>
            <div className={styles.overlayLeft}>
              <span className={styles.overlayName}>{t.name}</span>
              <span className={styles.overlayMeta}>
                {t.role}, {t.company}
              </span>
            </div>
            <div className={styles.overlayRight}>
              <StarRating color="#fff" size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile image ── */}
      <div className="hidden max-md:block mt-6">
        <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="w-full h-full absolute inset-0"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className={styles.overlay}>
            <div className={styles.overlayLeft}>
              <span className={styles.overlayName}>{t.name}</span>
              <span className={styles.overlayMeta}>
                {t.role}, {t.company}
              </span>
            </div>
            <div className={styles.overlayRight}>
              <StarRating color="#fff" size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
