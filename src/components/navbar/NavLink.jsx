import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const slide = {
  initial: { x: 80 },
  enter: (i) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

export default function NavLink({ data, isActive, setSelectedIndicator, onClose }) {
  const { title, href, index } = data;
  const location = useLocation();

  const handleClick = (e) => {
    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      if (location.pathname !== "/") {
        onClose?.();
        return;
      }
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClose?.();
  };

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="absolute left-[-30px] h-2.5 w-2.5 rounded-full bg-white"
      />
      <Link
        to={href}
        onClick={handleClick}
        className="font-serif text-4xl font-light text-white no-underline transition-colors duration-300 hover:text-neutral-400 sm:text-5xl md:text-6xl"
      >
        {title}
      </Link>
    </motion.div>
  );
}
