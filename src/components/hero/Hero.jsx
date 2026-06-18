import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CldImage from "../ui/CldImage";

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
      <CldImage
        publicId="MILN1258_v94ytv"
        alt="Panigrahna"
        // width={1920}
        imgRef={imgRef}
        wrapperClassName="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover object-[center_30%] md:object-[center_30%] will-change-transform"
        fetchpriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 md:px-12 lg:px-16 pb-6 sm:pb-10 lg:pb-4 pointer-events-none select-none">
        <h1 className="font-serif text-sand font-thin leading-none tracking-tight">
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 10vw, 8rem)" }}
          >
            To,
          </span>
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter"
            style={{ fontSize: "clamp(4rem, 14vw, 8rem)" }}
          >
            Eternity.
          </span>
        </h1>
      </div>
    </section>
  );
}
