import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGE =
  "https://res.cloudinary.com/dvsrgdyi7/image/upload/v1780916141/DSC04563_1_foxptm.jpg";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F6F3EE] text-[#2C2A27] overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-14 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          <div ref={textRef} className="flex flex-col gap-0">
            <h1 className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.85] font-normal z-50">
              <span className="italic font-thin uppercase z-50 text-taupe">Documenting</span> <span className="font-semibold text-taupe">the</span> <span className="uppercase italic font-thin text-cinnamon-200">traditions</span> in the way they Are <span className="text-primary">Meant to be.</span>
            </h1>
           
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[3/4] overflow-hidden z-10">
              <img
                ref={imageRef}
                src={IMAGE}
                alt="Wedding"
                className="w-full h-[120%] object-cover object-center"
              />
            </div>
          </div>

          <div
            ref={descRef}
            className="flex flex-col justify-end max-w-sm ml-auto"
          >
            <p className="text-sm leading-[1.9] text-black/60 font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              suscipit auctor dui, at convallis nisl. Donec in semper nunc. Donec
              suscipit auctor dui, at convallis nisl. Donec in semper nunc. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, at convallis nisl. Donec in semper nunc. Donec suscipit auctor dui, at convallis nisl. Donec in semper nunc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
