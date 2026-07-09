import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MaskText({
  lines,
  className = "",
  outerTag: OuterTag = "div",
  outerStyle,
  tag: Tag = "p",
  amount = 0.75,
  staggerDelay = 0.075,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount, once: true });

  const MotionTag = motion(Tag);

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: staggerDelay * i,
      },
    }),
  };

  return (
    <OuterTag ref={ref} className={className} style={outerStyle}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden [&.revealed]:overflow-visible">
          <MotionTag
            custom={i}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : ""}
            onAnimationComplete={() => {
              const el = ref.current?.children?.[i];
              if (el) el.classList.add("revealed");
            }}
            style={{ display: "block", margin: 0 }}
          >
            {line}
          </MotionTag>
        </div>
      ))}
    </OuterTag>
  );
}
