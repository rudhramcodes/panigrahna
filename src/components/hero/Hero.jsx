import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rawCloudinaryUrl } from "../../lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

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
        src={rawCloudinaryUrl("pp20.jpg")}
        alt="Panigrahna"
        className="absolute inset-0 h-full w-full object-cover object-bottom will-change-transform"
        fetchpriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent" />

      <div className="absolute inset-x-0 top-24 px-5 text-center sm:px-8 md:top-auto md:bottom-0 md:px-12 md:pb-10 md:text-left lg:px-16 lg:pb-4 pointer-events-none select-none">
        <h1 className="font-serif text-sand font-thin leading-none tracking-tight">
          <span
            className="block font-serif text-walnut font-thin leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 10vw, 8rem)" }}
          >
            To,
          </span>
          <span
            className="block font-serif text-walnut font-thin leading-none tracking-tighter"
            style={{ fontSize: "clamp(4rem, 14vw, 8rem)" }}
          >
            Eternity.
          </span>
        </h1>
      </div>
    </section>
  );
}
