import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "../smooth-scroll/SmoothScroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenisRef = useSmoothScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isProjects = pathname.startsWith("/projects");

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`fixed right-6 sm:right-8 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-walnut text-sand shadow-lg cursor-pointer ${
            isProjects
              ? "bottom-24 sm:bottom-28"
              : "bottom-6 sm:bottom-8"
          }`}
        >
          <ArrowUp size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
