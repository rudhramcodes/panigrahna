import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MaskText from "../mask-text/MaskText";
import { rawCloudinaryUrl } from "../../lib/cloudinary";

const HEADING_LINES = [
  <span><em className="italic font-light">Documenting</em> the <em className="italic text-[#c8a882]">traditions</em></span>,
  <span>the way they are <em className="italic text-[#c8a882]">meant to be.</em></span>,
];

const BODY_TEXT =
  "Though Panigrahna is a Hindu wedding ritual where the groom takes the bride\u2019s hand as a symbol of their union and a vow to protect her, it is a part of every culture irrespective of the religion in the world. The phrase literally means \u201cHolding Hands,\u201d and the ceremony involves the couple holding hands while prayers are chanted. It is a significant rite in the marriage ceremony, representing the beginning of their life together.";

const NOTE_TEXT =
  "We preserve the emotions, connections, and fleeting moments that make each celebration timeless.";

export default function AboutSection() {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section className="relative overflow-hidden bg-parchment px-5 pb-14 pt-24 text-primary sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.82fr_0.9fr_0.82fr] lg:items-stretch lg:gap-10 xl:gap-14">
        <div className="lg:pt-10">
          <span className="mb-5 block font-serif text-[10px] uppercase tracking-[0.22em] text-taupe/70 sm:mb-6">
            About Panigrahna
          </span>

          <MaskText
            outerTag="h2"
            tag="span"
            className="max-w-[520px] font-serif text-[clamp(2rem,3.3vw,3.85rem)] font-light leading-[1.03] tracking-tight text-walnut"
            amount={0.35}
            staggerDelay={0.08}
            lines={HEADING_LINES}
          />
        </div>

        <div ref={imageRef} className="relative mx-auto aspect-[0.82] w-full max-w-[420px] overflow-hidden rounded-sm bg-sandstone-200 sm:max-w-[460px] lg:max-w-none">
          <motion.img
            src={rawCloudinaryUrl("about-img")}
            alt="Panigrahna wedding ritual"
            style={{ y: imageY }}
            className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-center will-change-transform"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex items-end">
          <div className="grid max-w-[420px] gap-5 lg:mb-10">
            <MaskText
              className="text-[0.84rem] font-light leading-[1.85] text-taupe/90 sm:text-[0.9rem]"
              tag="p"
              amount={0.35}
              lines={[BODY_TEXT]}
            />

            <MaskText
              tag="p"
              className="font-serif text-[clamp(1rem,1.2vw,1.25rem)] font-light italic leading-[1.55] text-cinnamon-500"
              amount={0.35}
              lines={[NOTE_TEXT]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
