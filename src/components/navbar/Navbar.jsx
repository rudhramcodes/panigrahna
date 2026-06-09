import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-[60] flex w-full items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-5">
        <a
          href="#"
          className="relative z-10 transition-opacity duration-300 hover:opacity-70"
          aria-label="Panigrahna — Home"
        >
          <img src="/images/logo.svg" alt="Panigrahna" className="h-8 w-auto md:h-10" />
        </a>

        <button
          onClick={() => setIsActive(!isActive)}
          className="relative z-[70] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cinnamon-400 transition-transform duration-300 cursor-pointer hover:scale-105 sm:h-20 sm:w-20"
          aria-label={isActive ? "Close menu" : "Open menu"}
          aria-expanded={isActive}
        >
          <span className="relative flex h-full w-full items-center justify-center">
            <span
              className={`absolute h-px bg-white transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isActive ? "w-0" : "w-[35%]"
              }`}
            />
            <span
              className={`absolute h-px w-[35%] bg-white transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isActive ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute h-px bg-white transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isActive ? "-rotate-45 w-[35%]" : "w-[35%] translate-y-[6px]"
              }`}
            />
          </span>
        </button>
      </header>

      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  );
}
