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
        publicId="TKS05225_1_jyeotg"
        alt="Panigrahna"
        width={1920}
        imgRef={imgRef}
        wrapperClassName="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover object-[center_30%] md:object-[center_30%] will-change-transform"
        fetchpriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/30 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 md:px-12 pb-6 sm:pb-10 lg:hidden pointer-events-none select-none">
        <h1 className="font-serif text-sand font-thin leading-none tracking-tight">
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter self-start"
            style={{ fontSize: "clamp(2.8rem, 10vw, 4rem)" }}
          >
            To,
          </span>
          <span
            className="block font-serif text-sand font-thin leading-none tracking-tighter self-start"
            style={{ fontSize: "clamp(4rem, 14vw, 6rem)", marginTop: "-0.15em" }}
          >
            Eternity.
          </span>
        </h1>
      </div>

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
