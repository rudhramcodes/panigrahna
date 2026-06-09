import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAIN_IMAGE =
  "https://res.cloudinary.com/dvsrgdyi7/image/upload/v1780916141/DSC04563_1_foxptm.jpg";

export default function AboutSection() {
  const sectionRef   = useRef(null);
  const imgRef       = useRef(null);
  const imgWrapRef   = useRef(null);
  const bodyRef      = useRef(null);
  const noteRef      = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo([bodyRef.current, noteRef.current],
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.14 },
          "-=0.5"
        );

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

      const section = sectionRef.current;
      const img     = imgRef.current;

      const handleMouseMove = (e) => {
        const { left, top, width, height } = section.getBoundingClientRect();
        const x = (e.clientX - left) / width  - 0.5;
        const y = (e.clientY - top)  / height - 0.5;
        gsap.to(img, {
          rotationY: x * 4,
          rotationX: -y * 4,
          transformPerspective: 900,
          duration: 0.8,
          ease: "power2.out",
        });
      };
      const handleMouseLeave = () => {
        gsap.to(img, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
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
        .abt-hl em {
          // font-style: italic;
        }
        .abt-hl strong {
          // font-weight: 600;
        }
        .abt-hl .abt-accent {
          // font-style: italic;
        }

        @media (max-width: 1024px) {
          .abt-hl { font-size: clamp(1.8rem, 4vw, 3.2rem); }
        }
        @media (max-width: 767px) {
          .abt-hl { font-size: clamp(1.5rem, 5.5vw, 2.5rem); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ background: "#fdf3e7" }}
      >
        {/* ─── MAIN CONTENT GRID ─── */}
        <div
          className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
          style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-0">

            {/* ── LEFT — EDITORIAL HEADLINE ── */}
            <div
              className="w-full lg:w-[38%] flex-shrink-0 lg:pr-6 xl:pr-8 mb-10 md:mb-0 self-start"
              style={{ position: "sticky", top: "8vh" }}
            >
              <h2 className="abt-hl leading-none tracking-tight text-right text-primary font-normal" aria-label="Documenting the traditions in the way they are meant to be.">
                <em className="uppercase font-thin">Documenting</em> the <em className="text-secondary">traditions</em>{" "}
                <span className="abt-accent">in the <span className="text-secondary italic">way</span> they are <span className="text-secondary italic">meant to be.</span></span>
              </h2>
            </div>

            {/* ── CENTER — IMAGE ── */}
            <div className="w-full md:w-[55%] lg:w-[34%] flex-shrink-0 mb-10 md:mb-0 md:pr-8 lg:pr-0 lg:mx-4 xl:mx-6 abt-img-container">
              <div
                ref={imgWrapRef}
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "2px",
                }}
              >
                <img
                  ref={imgRef}
                  src={MAIN_IMAGE}
                  alt="Heritage Documentation"
                  className="w-full object-cover object-center"
                  style={{ height: "115%", marginTop: "-5%", display: "block", willChange: "transform" }}
                />
              </div>
            </div>

            {/* ── RIGHT — BODY COPY ── */}
            <div
              className="w-full md:w-[45%] lg:w-[28%] flex-shrink-0 flex flex-col justify-end lg:pt-8 lg:pl-6 xl:pl-10"
              style={{ alignSelf: "flex-end" }}
            >

              {/* Traditions label */}
              <span
                className="block mb-5"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#b89878",
                  fontWeight: 300,
                }}
              >
                Our philosophy
              </span>

              <p
                ref={bodyRef}
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  lineHeight: 1.85,
                  color: "#5e4a36",
                  fontWeight: 300,
                  marginBottom: "2rem",
                  opacity: 0,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <p
                ref={noteRef}
                style={{
                  fontFamily: "'Berlingske Serif', Georgia, serif",
                  fontSize: "clamp(1rem, 1.1vw, 1.15rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#7a6a58",
                  lineHeight: 1.7,
                  opacity: 0,
                }}
              >
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </p>

              {/* Mobile year counter */}
              {/* <div
                className="flex lg:hidden items-end gap-3 mt-10"
              >
                <span
                  style={{
                    fontFamily: "'Berlingske Serif', Georgia, serif",
                    fontSize: "clamp(3rem, 12vw, 5rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#3d2b1a",
                    letterSpacing: "-0.04em",
                  }}
                >
                  8+
                </span>
                <span
                  className="pb-2"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#7a6a58",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  Years of<br />tradition
                </span>
              </div> */}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}