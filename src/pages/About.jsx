import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Eye, Feather, BookOpen, Target } from "lucide-react";
import SEO from "../components/ui/SEO";
import { rawCloudinaryUrl } from "../lib/cloudinary";
import Footer from "../components/footer/Footer";

/* ─────────────────────────────────────────
   Shared Animation Variants
   ───────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

/* ─────────────────────────────────────────
   Section Wrapper
   ───────────────────────────────────────── */

function Section({ className = "", children, ...props }) {
  return (
    <section className={`relative w-full overflow-hidden ${className}`} {...props}>
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────
   Section 1: Hero
   ───────────────────────────────────────── */

function AboutHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <Section ref={ref} className="h-screen">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src={rawCloudinaryUrl("001.jpg")}
          alt="Panigrahna Studio"
          className="w-full h-full object-cover object-[center_30%]"
          fetchpriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/50 via-walnut/20 to-walnut/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/30 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-16 pb-16 sm:pb-20 lg:pb-24"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h1
            className="font-serif text-sand font-light leading-[.9] tracking-tighter"
            style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            Inside 
            <br />
            the {" "}
            <span className="italic font-light">Studio</span>
          </motion.h1>

          <motion.p
            className="font-sans text-sand/60 font-light max-w-[500px] mt-4 sm:mt-6 leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            Step inside panigrahna, where creativity is inspired by tradition and every film begins with a story waiting to be beautifully told.
          </motion.p>
        </div>
      </motion.div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 2: The Studio
   ───────────────────────────────────────── */

function TheStudio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Section ref={ref} className="bg-ivory py-[clamp(4rem,10vw,10rem)]">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div className="lg:col-span-6 relative" style={{ y: imgY }}>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={rawCloudinaryUrl("001.jpg")}
                alt="The Studio"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Floating stat badge */}
            {/* <motion.div
              className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 bg-walnut rounded-full flex flex-col items-center justify-center text-sand shadow-2xl"
              style={{ width: "clamp(90px, 10vw, 130px)", height: "clamp(90px, 10vw, 130px)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6, ease }}
            >
              <span className="font-serif text-xl sm:text-2xl font-light leading-none tracking-tighter">8+</span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-sand/60 mt-1 text-center leading-tight px-2">
                Years
              </span>
            </motion.div> */}
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-6"
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-4"
            >
              The Studio
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-walnut font-light leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              The Art of{" "}
              <span className="italic text-cinnamon-300">Meaningful Storytelling</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-taupe leading-relaxed font-light mb-4"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
            >
              Every frame we create begins with a simple intention to preserve what matters most. Beyond the celebrations, the décor, and the traditions are the emotions that define each wedding.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-taupe/70 leading-relaxed font-light"
              style={{ fontSize: "clamp(0.8rem, 0.9vw, 0.95rem)" }}
            >
              Those are the moments we choose to remember. With an understated cinematic style and a deep respect for every family's story, we create films that feel as genuine decades later as they do today.
            </motion.p>

            {/* <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "Couples Served", value: "150+" },
                { label: "Cities Covered", value: "25+" },
                { label: "Films Delivered", value: "500+" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <span className="block font-serif text-xl sm:text-2xl font-light text-walnut leading-none tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="block font-sans text-[11px] uppercase tracking-[0.1em] text-taupe/60 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 3: Philosophy
   ───────────────────────────────────────── */

function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <Section ref={ref} className="bg-walnut py-[clamp(5rem,12vw,12rem)]">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          {/* Decorative */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="block w-8 h-[1px] bg-cinnamon-300/40" />
            <Heart size={14} className="text-cinnamon-300/60" strokeWidth={1.5} />
            <span className="block w-8 h-[1px] bg-cinnamon-300/40" />
          </motion.div>

          <motion.span
            className="block font-sans text-cinnamon-300/70 text-xs uppercase tracking-[0.25em] mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our Philosophy
          </motion.span>

          <blockquote>
            <p
              className="font-serif text-sand font-light leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 3.5rem)" }}
            >
              <span className="italic text-cinnamon-200/50 font-normal text-[1.2em] leading-none align-middle">"</span>
              Beyond every celebration
              <br />
              <span className="italic text-cinnamon-200">is a story worth keeping.</span>
              <span className="italic text-cinnamon-200/50 font-normal text-[1.2em] leading-none align-middle">"</span>
            </p>
          </blockquote>

          <motion.p
            className="font-sans text-sand/50 font-light max-w-[600px] mx-auto mt-6 sm:mt-8 leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Our work is shaped by people rather than perfection. Every film reflects the individuality, emotion, and quiet beauty that make each journey entirely its own.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 4: Core Values
   ───────────────────────────────────────── */

// const VALUES = [
//   {
//     icon: Eye,
//     title: "Authentic Eye",
//     description:
//       "We capture real moments as they unfold - unscripted, unfiltered, and deeply human. No forced poses, just honest emotion.",
//     color: "text-cinnamon-300",
//   },
//   {
//     icon: Heart,
//     title: "Heartfelt Approach",
//     description:
//       "Every couple we work with becomes family. We invest ourselves fully in your story, earning the trust to document your most intimate moments.",
//     color: "text-ember-300",
//   },
//   {
//     icon: Feather,
//     title: "Gentle Presence",
//     description:
//       "We move through your celebration like quiet observers - unseen yet ever-present, ensuring nothing is staged and everything is felt.",
//     color: "text-cinnamon-300",
//   },
//   {
//     icon: Target,
//     title: "Uncompromising Craft",
//     description:
//       "From cinematic composition to nuanced colour grading, every frame is refined until it carries the emotional weight it deserves.",
//     color: "text-ember-300",
//   },
// ];

// function CoreValues() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.15 });

//   return (
//     <Section ref={ref} className="bg-sand/40 py-[clamp(4rem,8vw,8rem)]">
//       <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
//         <motion.div
//           className="text-center mb-12 sm:mb-16"
//           variants={stagger}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//         >
//           <motion.span
//             variants={fadeUp}
//             className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-4"
//           >
//             What We Stand For
//           </motion.span>
//           <motion.h2
//             variants={fadeUp}
//             className="font-serif text-walnut font-light tracking-tight"
//             style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
//           >
//             Our <span className="italic text-cinnamon-300">Values</span>
//           </motion.h2>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
//           {VALUES.map((val, i) => {
//             const Icon = val.icon;
//             const cardRef = useRef(null);
//             const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

//             return (
//               <motion.div
//                 key={val.title}
//                 ref={cardRef}
//                 className="group bg-ivory p-8 sm:p-10 lg:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-walnut/5"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={cardInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: i * 0.1, duration: 0.7, ease }}
//               >
//                 <Icon size={24} className={`${val.color} mb-5`} strokeWidth={1.2} />

//                 <h3
//                   className="font-serif text-walnut font-light mb-3"
//                   style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
//                 >
//                   {val.title}
//                 </h3>

//                 <p className="font-sans text-taupe/70 font-light leading-relaxed text-sm sm:text-base max-w-[420px]">
//                   {val.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </Section>
//   );
// }

/* ─────────────────────────────────────────
   Section 5: Our Journey (Timeline)
   ───────────────────────────────────────── */

const MILESTONES = [
  { year: "2016", title: "The Beginning", description: "Panigrahna was founded with a single camera and an unwavering belief in the power of story." },
  { year: "2018", title: "First Milestone", description: "We documented our 50th wedding - a moment that affirmed our path and deepened our craft." },
  { year: "2020", title: "Finding New Language", description: "Amid global stillness, we reimagined intimacy in storytelling, emerging with a refined cinematic voice." },
  { year: "2022", title: "Across India", description: "Our team grew, spanning Mumbai to Surat and beyond - covering 25+ cities and counting." },
  { year: "2024", title: "500 Films Strong", description: "Five hundred love stories. Five hundred distinct narratives. And the same devotion that started it all." },
  { year: "2025", title: "The Next Chapter", description: "New horizons, new stories. Every wedding remains a privilege - a story we are honoured to tell." },
];

function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <Section ref={ref} className="bg-ivory py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-4"
          >
            Our Journey
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-walnut font-light tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            The Road <span className="italic text-cinnamon-300">We've Walked</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[30px] sm:left-1/2 top-0 bottom-0 w-[1px] bg-sand/80 -translate-x-1/2" />

          {MILESTONES.map((milestone, i) => {
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, amount: 0.3 });
            const isLeft = i % 2 === 0;

            return (
              <div
                key={milestone.year}
                ref={itemRef}
                className="relative flex items-start mb-12 sm:mb-16 last:mb-0"
              >
                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-2 w-full items-start">
                  {/* Content alternating left/right */}
                  <div className={`${isLeft ? "pr-12 text-right" : "pl-12 col-start-2"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={itemInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, ease, delay: 0.1 }}
                    >
                      <span className="font-serif text-cinnamon-300 text-sm tracking-[0.2em] uppercase">
                        {milestone.year}
                      </span>
                      <h3
                        className="font-serif text-walnut font-light mt-1 mb-2"
                        style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
                      >
                        {milestone.title}
                      </h3>
                      <p className="font-sans text-taupe/70 font-light leading-relaxed text-sm">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Dot on the line */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-ivory border-2 border-cinnamon-300"
                      initial={{ scale: 0 }}
                      animate={itemInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, ease, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden w-full pl-14">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={itemInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-serif text-cinnamon-300 text-xs tracking-[0.2em] uppercase">
                        {milestone.year}
                      </span>
                    </div>
                    <h3
                      className="font-serif text-walnut font-light mb-1"
                      style={{ fontSize: "clamp(1.1rem, 4vw, 1.4rem)" }}
                    >
                      {milestone.title}
                    </h3>
                    <p className="font-sans text-taupe/70 font-light leading-relaxed text-sm">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 6: CTA
   ───────────────────────────────────────── */

function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section ref={ref} className="bg-sand/50 py-[clamp(5rem,10vw,10rem)]">
      <div className="mx-auto max-w-[800px] px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-4">
            Let's Create
          </span>

          <h2
            className="font-serif text-walnut font-light leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Your Story
            <br />
            <span className="italic text-cinnamon-300">Awaits</span>
          </h2>

          <p
            className="font-sans text-taupe/70 font-light max-w-[500px] mx-auto leading-relaxed mb-8 sm:mb-10"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          >
            Every love story is unique. Let's craft a film that captures yours 
            with the artistry, intimacy, and timelessness it deserves.
          </p>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-walnut text-sand text-sm font-sans no-underline transition-all duration-500 hover:bg-walnut/90 hover:scale-[1.02]"
          >
            Get in Touch
            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Main About Page
   ───────────────────────────────────────── */

export default function About() {
  return (
    <>
      <SEO
        title="About - Best Wedding Photographer in Mumbai"
        description="Meet Panigrahna - Mumbai's traditional wedding photography and planning company. We capture candid stories, cinematic films, and timeless rituals across India."
      />
      <AboutHero />
      <TheStudio />
      <Philosophy />
      {/* <CoreValues /> */}
      <Journey />
      {/* <AboutCTA /> */}
      <Footer />
    </>
  );
}
