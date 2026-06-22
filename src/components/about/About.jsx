import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskText from "../mask-text/MaskText";
import CldImage from "../ui/CldImage";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINES = [
  <span><em className="uppercase font-thin">Documenting</em> the <em className="text-gold-200">traditions</em></span>,
  <span> the <span className="text-gold-200 italic handwritten-underline"><span style={{position: "relative", zIndex: 1}}>way</span></span> they are <span className="text-gold-200 italic">meant to be.</span></span>,
];

const BODY_TEXT =
  "Though Panigrahna is a Hindu wedding ritual where the groom takes the bride\u2019s hand as a symbol of their union and a vow to protect her, it is a part of every culture irrespective of the religion in the world. The phrase literally means \u201cHolding Hands,\u201d and the ceremony involves the couple holding hands while prayers are chanted. It is a significant rite in the marriage ceremony, representing the beginning of their life together.";

const NOTE_TEXT =
  "At Panigrahna, we go beyond documenting weddings. We preserve the emotions, connections, and fleeting moments that make each celebration unique, creating timeless memories that can be cherished for years to come.";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .abt-hl {
          width: 100%;
          font-family: 'Berlingske Serif', Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 4.5rem);
        }
        @media (max-width: 1024px) {
          .abt-hl { font-size: clamp(1.8rem, 4vw, 3.2rem); }
        }
        @media (max-width: 767px) {
          .abt-hl { font-size: clamp(1.5rem, 5.5vw, 2.5rem); }
        }
        .handwritten-underline {
          position: relative;
          display: inline;
        }
        .handwritten-underline::before {
          content: '';
          position: absolute;
          inset: 0.06em -0.14em 0.02em -0.06em;
          background: #e8b87a;
          opacity: 0.3;
          border-radius: 4px 1px 6px 2px;
          z-index: 0;
          transform: rotate(-0.6deg) skewX(0.3deg);
          clip-path: polygon(0% 0%, 100% 3%, 100% 100%, 0% 97%);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-walnut"
        style={{
          backgroundImage: "url(/images/about-bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div
          className="relative z-10 mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16"
          style={{ paddingTop: "clamp(5rem, 10vw, 10rem)", paddingBottom: "clamp(5rem, 10vw, 10rem)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6 xl:gap-8">

            <div
              className="w-full flex-shrink-0 self-start lg:w-[38%] mb-6 md:mb-0"
              style={{ position: "sticky", top: "8vh" }}
            >
              <MaskText
                outerTag="h2"
                tag="span"
                className="abt-hl leading-none tracking-tight sm:w-full sm:text-right text-white font-normal"
                amount={0.5}
                staggerDelay={0.1}
                lines={HEADING_LINES}
              />
            </div>

            <div className="w-full flex-shrink-0 my-6 md:mb-0 md:w-[55%] lg:w-[34%]">
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "2px",
                }}
              >
                <CldImage
                  publicId="about-img"
                  alt="Heritage Documentation"
                  imgRef={imgRef}
                  wrapperClassName="w-full"
                  imgClassName="w-full h-full object-center block"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div
              className="flex w-full min-w-0 flex-shrink-0 flex-col justify-end lg:w-[28%] md:w-[45%] lg:pt-8"
              style={{ alignSelf: "flex-end" }}
            >
              <MaskText
                className="mb-4 sm:w-[80%]"
                tag="p"
                amount={0.5}
                lines={[BODY_TEXT]}
                outerStyle={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)",
                  lineHeight: 1.85,
                  color: "#f5e8d8",
                  fontWeight: 300,
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              />

              <MaskText
                tag="p"
                className="sm:w-[80%]"
                amount={0.5}
                lines={[NOTE_TEXT]}
                outerStyle={{
                  fontFamily: "'Berlingske Serif', Georgia, serif",
                  fontSize: "clamp(0.85rem, 1vw, 1rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#e8b87a",
                  lineHeight: 1.7,
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
