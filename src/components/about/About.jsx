import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskText from "../mask-text/MaskText";
import CldImage from "../ui/CldImage";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINES = [
  <span><em className="uppercase font-thin">Documenting</em> the <em className="text-secondary">traditions</em></span>,
  <span>in the <span className="text-secondary italic handwritten-underline"><span style={{position: "relative", zIndex: 1}}>way</span></span> they are <span className="text-secondary italic">meant to be.</span></span>,
];

const BODY_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const NOTE_TEXT =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.";

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
          font-family: 'Berlingske Serif', Georgia, serif;
          font-size: clamp(2.2rem, 4.5vw, 4.5rem);
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
          background: #C8A882;
          opacity: 0.22;
          border-radius: 4px 1px 6px 2px;
          z-index: 0;
          transform: rotate(-0.6deg) skewX(0.3deg);
          clip-path: polygon(0% 0%, 100% 3%, 100% 100%, 0% 97%);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-sand/50"
      >
        <div
          className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16"
          style={{ paddingTop: "clamp(3rem, 8vw, 8rem)", paddingBottom: "clamp(3rem, 8vw, 8rem)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6 xl:gap-8">

            <div
              className="w-full flex-shrink-0 self-start lg:w-[38%] mb-6 md:mb-0"
              style={{ position: "sticky", top: "8vh" }}
            >
              <MaskText
                outerTag="h2"
                tag="span"
                className="abt-hl leading-none tracking-tight sm:w-full sm:text-right text-primary font-normal"
                amount={0.5}
                staggerDelay={0.1}
                lines={HEADING_LINES}
              />
            </div>

            <div className="w-full flex-shrink-0 mb-6 md:mb-0 md:w-[55%] lg:w-[34%]">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "2px",
                }}
              >
                <CldImage
                  publicId="DSC04563_1_foxptm"
                  alt="Heritage Documentation"
                  width={700}
                  imgRef={imgRef}
                  wrapperClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover object-center"
                  options={{ crop: "fill", gravity: "auto" }}
                  style={{ height: "115%", marginTop: "-5%", display: "block", transform: "scale(1.15)" }}
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
                  color: "#5e4a36",
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
                  color: "#7a6a58",
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
