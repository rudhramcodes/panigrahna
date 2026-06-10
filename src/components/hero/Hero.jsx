import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloudinaryUrl } from "../../lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = cloudinaryUrl("TKS05225_1_jyeotg", { width: 1920 });

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <img
        ref={imgRef}
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-[center_30%] will-change-transform"
        src={HERO_IMAGE}
        alt="Panigrahna"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent" />

      {/* Mobile: bottom-left */}
      <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 md:px-12 pb-8 sm:pb-10 lg:hidden pointer-events-none select-none">
        <h1 className="font-serif text-sand font-thin leading-none tracking-tight">
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter self-start"
            style={{ fontSize: "clamp(4rem, 10vw, 3.5rem)" }}
          >
            To,
          </span>
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter self-start"
            style={{ fontSize: "clamp(6rem, 10vw, 3.5rem)", marginTop: "-0.15em" }}
          >
            Eternity.
          </span>
        </h1>
      </div>

      {/* Desktop: bottom-left */}
      <div className="hidden lg:flex absolute inset-0 px-16 pointer-events-none select-none">
        <div className="flex flex-col justify-end w-full h-full pb-4">
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter self-start"
            style={{ fontSize: "clamp(6rem, 18vw, 8rem)" }}
          >
            To,
          </span>
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter self-start"
            style={{ fontSize: "clamp(6rem, 18vw, 8rem)", marginTop: "-0.18em" }}
          >
            Eternity.
          </span>
        </div>
      </div>
    </section>
  );
}
