import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "../smooth-scroll/SmoothScroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenisRef = useSmoothScroll();

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

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-walnut text-sand shadow-lg hover:scale-105 cursor-pointer transition-all duration-[400ms] ease-out ${
        visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
}
