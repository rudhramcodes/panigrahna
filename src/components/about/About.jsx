import MaskText from "../mask-text/MaskText";
import { rawCloudinaryUrl } from "../../lib/cloudinary";

const HEADING_LINES = [
  <span><em className="font-thin">Documenting</em> the <em className="text-cinnamon-400">traditions</em></span>,
  <span>the way they are <span className="italic text-cinnamon-400">meant to be.</span></span>,
];

const BODY_TEXT =
  "Though Panigrahna is a Hindu wedding ritual where the groom takes the bride\u2019s hand as a symbol of their union and a vow to protect her, it is a part of every culture irrespective of the religion in the world. The phrase literally means \u201cHolding Hands,\u201d and the ceremony involves the couple holding hands while prayers are chanted. It is a significant rite in the marriage ceremony, representing the beginning of their life together.";

const NOTE_TEXT =
  "We preserve the emotions, connections, and fleeting moments that make each celebration timeless.";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-sand/50 px-5 py-16 text-primary sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-9 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[520px] md:max-w-none">
          <div className="aspect-[1.08] overflow-hidden rounded-[1vw] bg-sandstone-200 shadow-[0_22px_55px_rgba(53,28,3,0.12)]">
            <img
              src={rawCloudinaryUrl("about-img")}
              alt="Panigrahna wedding ritual"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="mx-auto max-w-[620px] text-center md:mx-0 md:text-left">
          <span className="mb-3 block font-serif text-[10px] uppercase tracking-[0.2em] text-taupe">
            About Panigrahna
          </span>

          <MaskText
            outerTag="h2"
            tag="span"
            className="font-serif text-[clamp(2.05rem,3.6vw,4.15rem)] font-light leading-[0.98] text-walnut [text-wrap:balance]"
            amount={0.35}
            staggerDelay={0.08}
            lines={HEADING_LINES}
          />

          <div className="mt-6 grid gap-5 pt-6 sm:grid-cols-[1fr_0.72fr] sm:gap-7">
            <MaskText
              className="mx-auto max-w-[410px] text-[0.82rem] font-light leading-[1.85] text-taupe/85 md:mx-0"
              tag="p"
              amount={0.35}
              lines={[BODY_TEXT]}
            />

            <MaskText
              tag="p"
              className="mx-auto max-w-[280px] font-serif text-[clamp(1rem,1.15vw,1.18rem)] font-light italic leading-[1.6] text-cinnamon-500 sm:border-l sm:border-taupe/15 sm:pl-6 md:mx-0"
              amount={0.35}
              lines={[NOTE_TEXT]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
