import { useState } from "react";
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

const NAV_ITEMS = [
  { title: "Home", href: "#" },
  { title: "About Us", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Films", href: "#films" },
  { title: "Contact", href: "#contact" },
];

export default function Nav() {
  const [selectedIndicator, setSelectedIndicator] = useState("/");

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 z-50 h-screen w-full bg-sandstone-500 text-white md:w-[450px]"
    >
      <div className="flex h-full flex-col justify-between px-8 py-20 sm:px-12 md:px-16">
        <div
          className="mt-12 flex flex-col gap-3 md:mt-20"
          onMouseLeave={() => setSelectedIndicator("/")}
        >
          <div className="mb-8 border-b border-sandstone-400 pb-4 text-[11px] uppercase tracking-widest text-sandstone-300">
            Navigation
          </div>
          {NAV_ITEMS.map((data, index) => (
            <NavLink
              key={data.title}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}
        </div>

        <div className="flex w-full justify-between gap-10 text-xs text-sandstone-300">
          <a href="#" className="transition-colors hover:text-cinnamon-200">Instagram</a>
          <a href="#" className="transition-colors hover:text-cinnamon-200">LinkedIn</a>
          <a href="#" className="transition-colors hover:text-cinnamon-200">Twitter</a>
        </div>
      </div>

      <Curve />
    </motion.div>
  );
}
