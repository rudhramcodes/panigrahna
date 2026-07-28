import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NavLink from "./NavLink";
import Curve from "./Curve";

const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: {
    x: "0",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const backdropVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
};

const NAV_ITEMS = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Films", href: "/films" },
  { title: "Contact", href: "/contact" },
];

export default function Nav({ onClose }) {
  const { pathname } = useLocation();

  const currentHref = useMemo(() => {
    const match = NAV_ITEMS.find((item) => {
      if (item.href.startsWith("/#")) return pathname === "/";
      return item.href === pathname;
    });
    return match ? match.href : "/";
  }, [pathname]);

  const [selectedIndicator, setSelectedIndicator] = useState(currentHref);

  useEffect(() => {
    setSelectedIndicator(currentHref);
  }, [currentHref]);

  return (
    <>
      {/* Backdrop - click outside to close */}
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm cursor-pointer"
      />

      {/* Menu Panel */}
      <motion.div
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed right-0 top-0 z-50 h-screen w-full bg-cinnamon-400 text-white md:w-[450px]"
      >
        <div className="flex h-full flex-col justify-between pl-14 pr-8 py-16 sm:px-12 md:px-16">
          <div
            className="mt-6 flex flex-col gap-4 sm:gap-3 md:mt-20"
            onMouseLeave={() => setSelectedIndicator(currentHref)}
          >
            <div className="mb-6 sm:mb-8 border-b border-white/20 pb-3 sm:pb-4 font-serif text-[11px] uppercase tracking-widest text-white/60">
              Navigation
            </div>
            {NAV_ITEMS.map((data, index) => (
              <NavLink
                key={data.title}
                data={{ ...data, index }}
                isActive={selectedIndicator === data.href}
                setSelectedIndicator={setSelectedIndicator}
                onClose={onClose}
              />
            ))}
          </div>

          <div className="flex w-full justify-between gap-6 sm:gap-10 font-serif text-xs text-white/60">
            <a href="#" className="transition-colors hover:text-white">Instagram</a>
            <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
            <a href="#" className="transition-colors hover:text-white">Twitter</a>
          </div>
        </div>

        <Curve />
      </motion.div>
    </>
  );
}
