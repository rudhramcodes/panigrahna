import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://res-console.cloudinary.com/dvsrgdyi7/thumbnails/v1/image/upload/v1780916247/VEtTMDUyMjVfMV9qeWVvdGc=/drilldown";

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
    </section>
  );
}
