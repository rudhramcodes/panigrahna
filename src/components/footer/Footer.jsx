import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import "./Footer.css";

/* ─────────────────────────────────────────────
   MAGNETIC WRAPPER (Awwwards Style)
   ───────────────────────────────────────────── */

const Magnetic = ({ children, strength = 0.25 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CUSTOM BRAND ICONS
   ───────────────────────────────────────────── */

const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Pinterest = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12a4 4 0 0 1 8 0c0 4-4 6-4 10" />
    <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z" />
    <line x1="12" y1="8" x2="12" y2="22" />
  </svg>
);

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0.85, 1], [0, -60]);

  return (
    <footer className="relative z-10 bg-walnut overflow-hidden">
      {/* ══════ PRE-FOOTER CTA (Awwwards Level) ══════ */}
      <motion.section
        className="relative z-20 bg-[#f5ede4] pt-[clamp(5rem,8vw,8rem)] pb-[clamp(3rem,5vw,5rem)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <motion.h2
            className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-light leading-[1] tracking-tighter text-walnut mb-12"
            variants={fadeUp}
            custom={0}
          >
            Let&rsquo;s Create Something
            <br />
            <span className="italic font-light text-cinnamon-300">Meaningful Together.</span>
          </motion.h2>

          {/* <motion.p
            className="font-sans text-[clamp(0.9rem,1.1vw,1.1rem)] font-light leading-[1.6] text-taupe mb-16 mx-auto max-w-[540px]"
            variants={fadeUp}
            custom={1}
          >
            Crafting timeless visual stories for modern brands and couples.
          </motion.p> */}

          <motion.div className="flex justify-center" variants={fadeUp} custom={2}>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="group relative flex h-[clamp(140px,12vw,180px)] w-[clamp(140px,12vw,180px)] items-center justify-center rounded-full bg-walnut text-sand no-underline transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05] shadow-2xl shadow-black/40 ring-2 ring-cinnamon-200/20"
              >
                {/* Rolling Text Animation */}
                <div className="relative z-10 overflow-hidden h-[44px] flex items-start justify-center">
                  <div className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[44px]">
                    <span className="font-serif tracking-tight text-[15px] uppercase tracking-[3px] text-sand h-[44px] flex items-center justify-center">Start Project</span>
                    <span className="font-serif italic text-[18px] text-cinnamon-200 h-[44px] flex items-center justify-center">Connect</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[34px] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[22px] group-hover:opacity-100">
                  <ArrowUpRight size={20} className="text-cinnamon-200" />
                </div>

                {/* Liquid Background Fill Effect */}
                <div className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════ MAIN FOOTER: CLEAN AWWWARDS STYLE ══════ */}
      <div className="relative pt-[clamp(4rem,8vw,8rem)] pb-12 px-6 sm:px-10 md:px-16">
        <div className="relative z-10 mx-auto max-w-[1600px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-20 border-b border-white/5 pb-24">
            
            {/* ── Column 1: Huge Brand Visual (5 cols) ── */}
            <motion.div 
              className="lg:col-span-5 flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <div className="max-w-[400px]">
                <motion.div variants={fadeUp} className="mb-10">
                  <img src="/images/logo.svg" alt="Logo" className="h-10 w-auto brightness-0 invert opacity-40" />
                </motion.div>
                <motion.h3 variants={fadeUp} className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] text-sand/90 font-thin tracking-tighter mb-12">
                  Capturing the <span className="italic text-cinnamon-200">extraordinary</span> in every shared glance.
                </motion.h3>
                <motion.div variants={fadeUp} className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-cinnamon-200 hover:text-cinnamon-200 transition-all duration-500">
                    <Instagram />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-cinnamon-200 hover:text-cinnamon-200 transition-all duration-500">
                    <Facebook />
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-cinnamon-200 hover:text-cinnamon-200 transition-all duration-500">
                    <Pinterest />
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Column 2: Navigation Links (2 cols) ── */}
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h4 variants={fadeUp} className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-200/50 mb-10">Menu</motion.h4>
              <ul className="flex flex-col gap-5">
                {["Home", "About", "Works", "Films", "Contact"].map((item, i) => (
                  <motion.li key={item} variants={fadeUp} custom={i}>
                    <a href={`#${item.toLowerCase()}`} className="group relative overflow-hidden inline-block font-serif text-2xl text-white/50 hover:text-sand transition-colors">
                      <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                      <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full italic font-light text-cinnamon-200">{item}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ── Column 3: Addresses (5 cols) ── */}
            <motion.div 
              className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-200/50 mb-10">Mumbai Studio</h4>
                <address className="not-italic font-sans text-sm leading-[1.8] text-white/40 max-w-[240px]">
                  1171-1172, Solitaire Corporate Park,<br />
                  Andheri (E), Mumbai 400093
                </address>
                <a href="tel:+919876543210" className="inline-block mt-4 font-serif text-white/60 hover:text-cinnamon-200 transition-colors">+91 98765 43210</a>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-200/50 mb-10">Surat Studio</h4>
                <address className="not-italic font-sans text-sm leading-[1.8] text-white/40 max-w-[240px]">
                  HG1, SNS Platina, Near <br />
                  Someshwara Enclave, Vesu,<br />
                  Surat, GJ 395007
                </address>
                <a href="mailto:hello@panigrahna.com" className="inline-block mt-4 font-serif text-white/60 hover:text-cinnamon-200 transition-colors">hello@panigrahna.com</a>
              </motion.div>
            </motion.div>

          </div>

          {/* ── Bottom Section: Minimal & Sharp ── */}
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
              <span className="font-sans text-[9px] font-bold uppercase tracking-[3px] text-white/20">© 2026 Panigrahna</span>
              <div className="flex gap-10">
                <a href="#" className="font-sans text-[9px] font-bold uppercase tracking-[3px] text-white/20 hover:text-white/40 transition-colors">Privacy</a>
                <a href="#" className="font-sans text-[9px] font-bold uppercase tracking-[3px] text-white/20 hover:text-white/40 transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
