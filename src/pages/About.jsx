import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/ui/SEO";
import Footer from "../components/footer/Footer";
import { rawCloudinaryUrl } from "../lib/cloudinary";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1];

const AWARD_IMAGE = "/images/viral-awards.png";
const VIRAL_PORTRAIT = "https://res.cloudinary.com/dvsrgdyi7/image/upload/v1784355013/Viralsir.jpg";

const principles = [
  {
    title: "Observe",
    text: "We stay close enough to feel the moment, and quiet enough to let it remain honest.",
  },
  {
    title: "Trust",
    text: "Couples invite us into deeply personal spaces. That trust shapes how we move, speak, and photograph.",
  },
  {
    title: "Preserve",
    text: "The final story is made for the couple today, and for the families who will return to it years later.",
  },
];

const services = [
  {
    title: "Wedding photography",
    eyebrow: "Still memories",
    text: "Candid frames, rituals, portraits, family emotions, and the quiet in-between moments.",
  },
  {
    title: "Cinematic wedding films",
    eyebrow: "Moving stories",
    text: "Films shaped around voices, atmosphere, laughter, music, and the rhythm of the celebration.",
  },
  {
    title: "Pre-wedding stories",
    eyebrow: "Before the vows",
    text: "A calmer portrait of the couple before the wedding begins, made with intimacy and ease.",
  },
  {
    title: "Destination celebrations",
    eyebrow: "Wherever love gathers",
    text: "Coverage for weddings across India and overseas, with the same quiet, observant presence.",
  },
  { title: "Traditional rituals" },
  { title: "Candid moments" },
  { title: "Bride portraits" },
  { title: "Groom portraits" },
  { title: "Family stories" },
  { title: "Highlight films" },
  { title: "Wedding planning" },
];

function SectionLabel({ children, className = "" }) {
  return (
    <span className={`block text-[9px] font-semibold uppercase tracking-[0.25em] text-cinnamon-300 ${className}`}>
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section className="px-5 pb-14 pt-36 sm:px-8 sm:pt-44 md:px-12 lg:px-16 lg:pt-52">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <SectionLabel>About Panigrahna</SectionLabel>
            <h1 className="mt-5 max-w-[980px] font-serif text-[clamp(4.2rem,9.4vw,9rem)] font-light leading-[0.78] tracking-[-0.045em] text-walnut">
              Stories That Return You
              <span className="block italic text-cinnamon-300">to How It Felt</span>
            </h1>
          </div>

          <div className="flex flex-col gap-7 lg:col-span-5 lg:flex-row lg:items-end lg:justify-between lg:pb-2">
            <p className="max-w-[360px] text-[0.9rem] font-light leading-[1.75] text-taupe">
              A wedding photography and filmmaking studio with its main office in Mumbai and operations in
              Surat, creating quiet, emotional visual stories across India and around the world.
            </p>
            {/* <a
              href="#viral-gohil"
              className="group inline-flex w-fit cursor-pointer items-center gap-3 border-b border-walnut/35 pb-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-walnut transition-colors duration-200 hover:border-cinnamon-400 hover:text-cinnamon-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut"
            >
              Meet Viral
              <ArrowUpRight
                size={15}
                strokeWidth={1.4}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a> */}
          </div>
        </div>

        <div className="mt-14 aspect-[16/9] overflow-hidden rounded-[10px] bg-sandstone-200 sm:mt-16 lg:mt-20">
          <img
            src={rawCloudinaryUrl("about-collage.avif")}
            alt="A wedding celebration photographed by Panigrahna"
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

function StudioStory() {
  return (
    <section className="bg-parchment px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.8fr_0.95fr_0.8fr] lg:gap-12">
        <div className="lg:pt-10">
          <SectionLabel>The Studio</SectionLabel>
          <h2 className="mt-5 max-w-[520px] font-serif text-[clamp(2.5rem,4.8vw,5rem)] font-light leading-[0.92] tracking-[-0.035em] text-walnut">
            Every celebration has a story worth remembering.
          </h2>
        </div>

        <div className="relative mx-auto aspect-[0.82] w-full max-w-[430px] overflow-hidden rounded-sm bg-sandstone-200 lg:max-w-none">
          <img
            src={rawCloudinaryUrl("office.avif")}
            alt="A Panigrahna wedding ritual"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex items-end">
          <div className="max-w-[430px] space-y-5 lg:mb-10">
            <p className="text-[0.9rem] font-light leading-[1.85] text-taupe">
              Panigrahna was created to preserve weddings as they are truly experienced, not only through
              ceremonies and details, but through the emotions living between them.
            </p>
            <p className="text-[0.9rem] font-light leading-[1.85] text-taupe/80">
              We look for the quiet glance, the unplanned laughter, the parent holding back tears, and the
              energy of two families coming together. These are the moments that make a celebration personal.
            </p>
            <p className="font-serif text-[clamp(1.1rem,1.5vw,1.45rem)] font-light italic leading-[1.55] text-cinnamon-500">
              The photograph should not only show what happened. It should bring back the atmosphere of the
              room.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ViralStory() {
  return (
    <section id="viral-gohil" className="bg-ivory px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[520px]">
            <div className="aspect-[4/5] overflow-hidden rounded-[8px] bg-sandstone-200">
              <img
                src={VIRAL_PORTRAIT}
                alt="Viral Gohil"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-sm bg-walnut px-5 py-4 text-sand shadow-2xl shadow-walnut/15">
              <p className="font-serif text-3xl font-light leading-none">32+</p>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-sand/65">
                Years behind the lens
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>The Man Behind the Vision</SectionLabel>
          <h2 className="mt-5 max-w-[760px] font-serif text-[clamp(3.2rem,6vw,6.4rem)] font-light leading-[0.86] tracking-[-0.045em] text-walnut">
            A Life Behind the Lens
          </h2>
          <div className="mt-8 grid gap-6 text-[0.92rem] font-light leading-[1.85] text-taupe md:grid-cols-2">
            <p>
              I am Viral Gohil, a wedding and corporate photographer with more than 32 years of experience
              in the photography industry.
            </p>
            <p>
              For me, photography has never been limited to pressing the shutter. It is about observing
              people, anticipating emotions, and telling a story without interrupting its honesty.
            </p>
            <p>
              Through every change in the craft, I have remained connected to patience, integrity, creativity,
              and respect for every moment.
            </p>
            <p>
              Every family carries its own traditions. Every couple shares a different connection. Every
              celebration moves to its own rhythm. That individuality is what Panigrahna preserves.
            </p>
          </div>
          <p className="mt-8 font-serif text-2xl font-light italic text-cinnamon-300">Viral Gohil</p>
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section className="bg-walnut px-5 py-16 text-sand sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionLabel className="text-cinnamon-200">Recognition</SectionLabel>
          <h2 className="mt-5 max-w-[760px] font-serif text-[clamp(2.8rem,5.6vw,5.8rem)] font-light leading-[0.9] tracking-[-0.04em]">
            Recognition, kept as a milestone.
          </h2>
          <p className="mt-7 max-w-[560px] text-[0.95rem] font-light leading-[1.85] text-sand/65">
            Over the years, Viral Gohil's contribution to photography, visual storytelling, and the business
            of the craft has been recognised by the industry.
          </p>
          <p className="mt-5 max-w-[560px] text-[0.95rem] font-light leading-[1.85] text-sand/55">
            In 2021, he was honoured as a Brand Awardee at the Pahechaan Awards. On this page, the complete
            poster is treated as an archive piece, while the story remains centred on the work and the people
            behind it.
          </p>
        </div>

        <figure className="lg:col-span-5">
          <div className="overflow-hidden rounded-[8px] border border-sand/20 bg-black/20 p-3 shadow-2xl shadow-black/20">
            <img
              src={AWARD_IMAGE}
              alt="Viral Gohil Brand Awardee at Pahechaan Awards 2021"
              className="h-auto w-full rounded-[4px]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="mt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-sand/50">
            Viral Gohil, Brand Awardee at Pahechaan Awards 2021
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="bg-ivory px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-6 border-t border-walnut/15 pt-6 md:grid-cols-2 lg:grid-cols-12">
          <SectionLabel className="lg:col-span-4">Our Approach</SectionLabel>
          <h2 className="max-w-[780px] font-serif text-[clamp(2.6rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.03em] md:text-right lg:col-span-8 lg:justify-self-end">
            We do not arrive to direct your wedding. We arrive to understand it.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {principles.map((principle, index) => (
            <article key={principle.title} className="border-t border-walnut/15 pt-6">
              <span className="font-serif text-sm tracking-[0.2em] text-cinnamon-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-[clamp(1.8rem,2.8vw,2.7rem)] font-light leading-none text-walnut">
                {principle.title}
              </h3>
              <p className="mt-5 text-[0.9rem] font-light leading-[1.8] text-taupe">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// function ServicesAndReach() {
//   return (
//     <section className="bg-ivory px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-24">
//       <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[22px] border border-walnut/10 bg-[radial-gradient(circle_at_14%_4%,rgba(255,250,244,0.98),transparent_38%),radial-gradient(circle_at_92%_16%,rgba(201,124,46,0.22),transparent_32%),linear-gradient(135deg,#fdf3e7_0%,#f0ddd0_52%,#eedfc0_100%)] px-5 py-8 shadow-[0_30px_90px_rgba(61,43,26,0.12)] sm:rounded-[28px] sm:px-8 sm:py-10 lg:px-14 lg:py-14 xl:px-20 xl:py-16">
//         <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cinnamon-200/30 blur-3xl" />
//         <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-rose-beige/80 blur-3xl" />
//         <div className="pointer-events-none absolute inset-3 rounded-[16px] border border-white/45 sm:inset-4 sm:rounded-[21px]" />

//         <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
//           <div className="lg:col-span-7 lg:py-3">
//             <SectionLabel>What We Create</SectionLabel>
//             <h2 className="mt-5 max-w-[780px] font-serif text-[clamp(2.7rem,5.8vw,6.2rem)] font-light leading-[0.86] tracking-[-0.045em] text-walnut">
//               Films and photographs that bring the
//               <span className="block italic text-cinnamon-500">feeling back.</span>
//             </h2>
//             <p className="mt-7 max-w-[590px] text-[0.9rem] font-light leading-[1.85] text-walnut/70 sm:text-[0.98rem]">
//               From quiet rituals to the wildest celebrations, we preserve your wedding as it truly felt—personal,
//               honest, and entirely your own.
//             </p>
//           </div>

//           <div className="rounded-[18px] border border-white/65 bg-ivory/50 p-5 shadow-[0_18px_50px_rgba(61,43,26,0.07)] backdrop-blur-sm sm:p-6 lg:col-span-5">
//             <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-cinnamon-500">
//               Our work
//             </p>
//             <ul className="grid min-[430px]:grid-cols-2 min-[430px]:gap-x-5">
//               {services.map((service, index) => (
//                 <li key={service.title} className="flex items-center gap-3 border-b border-walnut/10 py-3.5">
//                   <span className="font-serif text-[10px] tracking-[0.14em] text-cinnamon-400">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>
//                   <span className="text-[9px] font-semibold uppercase leading-[1.45] tracking-[0.13em] text-walnut/75">
//                     {service.title}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="relative z-10 mt-10 flex flex-col items-start gap-6 border-t border-walnut/15 pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
//           <div>
//             <p className="font-serif text-xl font-light text-walnut sm:text-2xl">
//               Mumbai & Surat
//             </p>
//             <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-walnut/55">
//               Celebrations worldwide
//             </p>
//           </div>

//           <Link
//             to="/contact"
//             className="group relative inline-flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-walnut px-8 text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-4 focus-visible:ring-offset-rose-beige sm:w-auto"
//           >
//             <span className="relative z-10 flex items-center gap-3">
//               <span className="font-sans text-[11px] uppercase tracking-[4px]">Check Availability</span>
//               <span className="relative h-[18px] w-[18px]" aria-hidden="true">
//                 <span className="absolute inset-0 flex items-center justify-center transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[10px] group-hover:translate-x-[10px] group-hover:scale-[0.3] group-hover:opacity-0">
//                   <ArrowUpRight size={18} strokeWidth={1.5} />
//                 </span>
//                 <span className="absolute inset-0 flex -translate-x-[10px] translate-y-[10px] scale-[0.3] items-center justify-center opacity-0 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
//                   <ArrowUpRight size={18} strokeWidth={1.5} />
//                 </span>
//               </span>
//             </span>
//             <span className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative isolate overflow-hidden px-5 py-28 sm:px-8 sm:py-36 md:px-12 lg:px-16 lg:py-44">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <img
          src={rawCloudinaryUrl("about-collage.avif")}
          alt=""
          className="h-full w-full scale-105 object-cover animate-[ken-burns_18s_ease-in-out_infinite_alternate]"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Stronger behind the copy, softer around the photographs. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(28,17,9,0.68)_0%,rgba(38,24,13,0.48)_48%,rgba(61,43,26,0.28)_100%)]" />

      <div className="relative mx-auto max-w-[860px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="block font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-cinnamon-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
        >
          Let's Begin
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-6 max-w-[780px] font-serif text-[clamp(3rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.03em] text-ivory drop-shadow-[0_3px_24px_rgba(0,0,0,0.45)]"
        >
          <span className="block">Every Story Deserves</span>
          <span className="mt-1 block italic text-cinnamon-200">to Be Told Well</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-7 max-w-[520px] font-sans text-[clamp(0.92rem,1vw,1.05rem)] font-normal leading-[1.75] text-ivory/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
        >
          From Mumbai and Surat, we travel wherever your celebration takes us.
          Let's talk about how we'd tell yours.
        </motion.p>

        <motion.div
          className="mt-10 sm:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        >
          <button
            onClick={() => navigate("/contact")}
            className="group relative inline-flex h-14 w-full max-w-[290px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-ivory px-8 text-walnut shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnamon-200 focus-visible:ring-offset-4 focus-visible:ring-offset-walnut sm:w-auto sm:max-w-none"
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em]">
                Check Availability
              </span>
              <div className="relative w-[18px] h-[18px]">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:translate-x-[10px] group-hover:-translate-y-[10px] group-hover:scale-[0.3]">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 -translate-x-[10px] translate-y-[10px] scale-[0.3] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
            </div>
            <div className="absolute inset-0 scale-0 rounded-full bg-walnut/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="mt-8 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/75 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]"
        >
          Mumbai & Surat · Available worldwide
        </motion.p>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <SEO
        title="About Panigrahna - Wedding Photography and Films"
        description="Meet Panigrahna and Viral Gohil, creating wedding photography and cinematic films from Mumbai and Surat for celebrations across India and worldwide."
      />
      <main className="min-h-screen overflow-x-hidden bg-ivory text-walnut">
        <Hero />
        <StudioStory />
        <ViralStory />
        <Recognition />
        <Approach />
        <FinalCTA />
      </main>
      <Footer hideCTA />
    </>
  );
}
