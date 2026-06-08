import { motion } from "framer-motion";

const curve = {
  initial: {
    d: "M100 0 L200 0 L200 1000 L100 1000 Q-100 500 100 0",
  },
  enter: {
    d: "M100 0 L200 0 L200 1000 L100 1000 Q100 500 100 0",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    d: "M100 0 L200 0 L200 1000 L100 1000 Q-100 500 100 0",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function Curve() {
  return (
    <svg
      className="absolute top-0 left-[-99px] h-full w-[100px]"
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      fill="var(--color-sandstone-500)"
      stroke="none"
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}
