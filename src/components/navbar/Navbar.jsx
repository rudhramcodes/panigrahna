import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import { useSmoothScroll } from "../smooth-scroll/SmoothScroll";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [heroInView, setHeroInView] = useState(false);
  const lenisRef = useSmoothScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHeroInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [location.pathname]);

  const lineColor = isActive || heroInView ? "bg-white" : "bg-black";

  useEffect(() => {
    const lenis = lenisRef?.current;
    if (!lenis) return;
    isActive ? lenis.stop() : lenis.start();
  }, [isActive, lenisRef]);

  const closeNav = useCallback(() => {
    if (isActive) setIsActive(false);
  }, [isActive]);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    const lenis = lenisRef?.current;

    if (location.pathname !== "/") {
      navigate("/");
      setIsActive(false);
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsActive(false);
  }, [lenisRef, navigate, location.pathname]);

  return (
    <>
      <header className="fixed left-0 top-0 z-[60] flex w-full items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-5">
        <a
          href="/"
          onClick={handleLogoClick}
          className="relative z-10 transition-opacity duration-300 hover:opacity-70"
          aria-label="Panigrahna — Home"
        >
          <img src="/images/logo.svg" alt="Panigrahna" className="h-8 w-auto md:h-12" />
        </a>

        <button
          onClick={() => setIsActive(!isActive)}
          className="relative z-[70] flex h-[55px] w-[50px] items-center justify-center transition-transform duration-300 cursor-pointer hover:scale-105 sm:h-20 sm:w-20"
          aria-label={isActive ? "Close menu" : "Open menu"}
          aria-expanded={isActive}
        >
          <span className="relative flex h-full w-full items-center justify-center">
            <span
              className={`absolute h-[1.2px] ${lineColor} transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isActive ? "w-0" : "w-[50%]"
              }`}
            />
            <span
              className={`absolute h-[1.2px] w-[50%] ${lineColor} transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isActive ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute h-[1.2px] ${lineColor} transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isActive ? "-rotate-45 w-[50%]" : "w-[50%] translate-y-[6px]"
              }`}
            />
          </span>
        </button>
      </header>

      <AnimatePresence mode="wait">
        {isActive && <Nav onClose={closeNav} />}
      </AnimatePresence>
    </>
  );
}
