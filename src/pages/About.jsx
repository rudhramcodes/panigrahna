import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, Camera, Heart, Sparkles } from "lucide-react";
import CldImage from "../components/ui/CldImage";
import Footer from "../components/footer/Footer";

/* ─────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const letterReveal = {
  hidden: { y: "100%", rotate: 3 },
  visible: (i) => ({
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.04,
    },
  }),
};

/* ─────────────────────────────────────────
   Reusable Section Wrapper
   ───────────────────────────────────────── */

function Section({ className = "", children, ...props }) {
  return (
    <section className={`relative w-full overflow-hidden ${className}`} {...props}>
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────
   Animated Counter
   ───────────────────────────────────────── */

function AnimatedCounter({ end, suffix = "", label, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let raf;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-serif font-light text-taupe block leading-none tracking-tighter"
        style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
      >
        {count}{suffix}
      </span>
      {label && (
        <span className="block font-sans text-taupe/80 text-sm sm:text-base font-light mt-2">
          {label}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Split Reveal Text
   ───────────────────────────────────────── */

function SplitReveal({ text, as: Tag = "h2", className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span className="inline-flex flex-wrap" aria-hidden>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-1 px-0.5 -mx-0.5 mr-[0.25em]">
            <motion.span
              custom={i}
              variants={letterReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block"
              style={{ originY: 0.5 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ─────────────────────────────────────────
   Section 1: Hero
   ───────────────────────────────────────── */

function AboutHero() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <Section className="sticky top-0 h-screen z-0 bg-[#FBFBFB]">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-[-7%] w-[60%] sm:w-[55%] md:w-[70%] pointer-events-none select-none flex items-end">
          <video
            src="/images/animated-cam.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>

      <div className="relative z-10 h-screen flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-[1200px] mx-auto w-full">
          <div ref={titleRef} className="max-w-[700px]">
            <motion.span
              className="block font-sans text-cinnamon-300 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              About the Studio
            </motion.span>

            <h1 className="font-serif text-walnut font-light leading-[.9] tracking-tighter"
              style={{ fontSize: "clamp(3.2rem, 10vw, 7rem)" }}
            >
              <SplitReveal text="Crafting" as="span" delay={0.1} />
              <br />
              <SplitReveal text="Timeless" as="span" delay={0.2} />
              <br />
              <span className="italic font-light text-cinnamon-300">
                <SplitReveal text="Love Stories" as="span" delay={0.3} />
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[520px] mt-6 sm:mt-8 lg:mt-10"
          >
            <p className="font-sans text-taupe leading-relaxed font-light"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)" }}
            >
              We are Panigrahna — a wedding film studio built on the belief that
              every love story deserves to be told with intention, artistry, and
              soul. Based in Mumbai and Surat, we craft cinematic narratives that
              transcend time.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-walnut text-sand text-sm font-sans no-underline transition-all duration-500 hover:bg-walnut/90 hover:scale-[1.02]"
              >
                View Our Work
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="#story"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-taupe/30 text-taupe text-sm font-sans no-underline transition-all duration-500 hover:border-taupe/60 hover:text-walnut"
              >
                <Play size={14} />
                Our Story
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 2: Our Story
   ───────────────────────────────────────── */

function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Section id="story" ref={ref} className="relative z-10 bg-[#e8d5bc] py-[clamp(4rem,10vw,10rem)]">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-6 relative"
            style={{ y: imgY }}
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: "4/5" }}
            >
              <CldImage
                publicId="DSC04563_1_foxptm"
                alt="Our Studio"
                width={800}
                wrapperClassName="w-full h-full"
                imgClassName="w-full h-full object-cover"
                options={{ crop: "fill", gravity: "auto" }}
                loading="lazy"
                decoding="async"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-ivory rounded-full shadow-xl flex items-center justify-center"
              style={{ width: "clamp(80px, 10vw, 120px)", height: "clamp(80px, 10vw, 120px)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Heart size={28} className="text-cinnamon-300" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Text */}
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
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-walnut font-light leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              Where Tradition Meets
              <span className="italic text-cinnamon-300"> Cinematic Artistry</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-taupe leading-relaxed font-light mb-4"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
            >
              At Panigrahna, we believe that a wedding film is more than a
              documentation — it is a legacy. Every glance, every laugh, every
              quiet tear holds a story waiting to be told.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-taupe/70 leading-relaxed font-light"
              style={{ fontSize: "clamp(0.8rem, 0.9vw, 0.95rem)" }}
            >
              Founded with a passion for storytelling and a reverence for tradition,
              our team brings together years of cinematic expertise and a deep
              understanding of Indian wedding rituals. We don't just film weddings —
              we immerse ourselves in them, becoming silent storytellers who capture
              the essence of your journey.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "Years of Experience", value: "8+" },
                { label: "Couples Served", value: "150+" },
                { label: "Cities Covered", value: "25+" },
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 3: Philosophy — Full-width Quote
   ───────────────────────────────────────── */

function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <Section ref={ref} className="relative z-10 bg-ivory py-[clamp(5rem,12vw,12rem)]">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-sand)_0%,_transparent_70%)] opacity-30" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1000px] px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Philosophy
          </motion.span>

          <blockquote>
            <p
              className="font-serif text-walnut font-light leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem) " }}
            >
              <span className="italic text-cinnamon-200 font-normal text-[1.2em] leading-none align-middle">"</span>
              We don't just capture moments.
              <br />
              <span className="italic text-cinnamon-300">We preserve legacies.</span>
              <span className="italic text-cinnamon-200 font-normal text-[1.2em] leading-none align-middle">"</span>
            </p>
          </blockquote>

          <motion.p
            className="font-sans text-taupe/70 font-light max-w-[600px] mx-auto mt-6 sm:mt-8"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Every frame is crafted with intention — blending documentary honesty
            with cinematic poetry to create films that feel as timeless as the
            love they celebrate.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 4: Our Approach
   ───────────────────────────────────────── */

const APPROACH_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We begin by understanding your story, your traditions, and what makes your bond unique. This foundation shapes every frame.",
    icon: Sparkles,
    color: "text-cinnamon-300",
  },
  {
    number: "02",
    title: "Immerse",
    description:
      "On the day, we become part of your celebration — blending into the background to capture authentic, unscripted emotions.",
    icon: Camera,
    color: "text-cinnamon-400",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "In post-production, we weave your moments into a cinematic narrative — every cut, color, and sound designed to move.",
    icon: Heart,
    color: "text-ember-300",
  },
];

function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Section ref={ref} className="relative z-10 bg-[#e8d5bc] py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-4"
          >
            Our Approach
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-walnut font-light tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            How We <span className="italic text-cinnamon-300">Work</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {APPROACH_STEPS.map((step, i) => {
            const Icon = step.icon;
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

            return (
              <motion.div
                key={step.number}
                ref={cardRef}
                className="group relative bg-ivory rounded-sm p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-walnut/5"
                initial={{ opacity: 0, y: 40 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number */}
                <span
                  className="block font-serif text-sand font-bold leading-none tracking-tighter select-none"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mt-4 mb-4">
                  <Icon size={28} className={step.color} strokeWidth={1.2} />
                </div>

                <h3
                  className="font-serif text-walnut font-light mb-3"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
                >
                  {step.title}
                </h3>

                <p className="font-sans text-taupe/70 font-light leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cinnamon-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Section 5: By the Numbers
   ───────────────────────────────────────── */

const STATS = [
  { end: 8, suffix: "+", label: "Years of Experience" },
  { end: 150, suffix: "+", label: "Couples Served" },
  { end: 25, suffix: "+", label: "Cities Covered" },
  { end: 500, suffix: "+", label: "Films Delivered" },
];

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section ref={ref} className="relative z-10 bg-walnut py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block font-sans text-cinnamon-200/60 text-xs uppercase tracking-[0.25em] mb-4">
            By the Numbers
          </span>
          <h2
            className="font-serif text-sand font-light tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Our Journey in <span className="italic text-cinnamon-200">Numbers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
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
    <Section ref={ref} className="relative z-10 bg-[#f5ede4] py-[clamp(5rem,10vw,10rem)]">
      <div className="mx-auto max-w-[800px] px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block font-sans text-cinnamon-300 text-xs uppercase tracking-[0.25em] mb-4">
            Let's Create
          </span>

          <h2
            className="font-serif text-walnut font-light leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Ready to Tell
            <br />
            <span className="italic text-cinnamon-300">Your Story?</span>
          </h2>

          <p
            className="font-sans text-taupe/70 font-light max-w-[500px] mx-auto leading-relaxed mb-8 sm:mb-10"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          >
            Every love story is unique. Let us craft a film that captures yours
            with the artistry and emotion it deserves.
          </p>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-walnut text-sand text-sm font-sans no-underline transition-all duration-500 hover:bg-walnut/90 hover:scale-[1.02]"
          >
            View Our Work
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AboutHero />
      <OurStory />
      <Philosophy />
      <Approach />
      <Stats />
      <AboutCTA />
      <Footer />
    </>
  );
}
