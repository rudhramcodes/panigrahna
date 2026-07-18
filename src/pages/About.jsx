import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/ui/SEO";
import Footer from "../components/footer/Footer";
import { rawCloudinaryUrl } from "../lib/cloudinary";

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
            <a
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
            </a>
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

function ServicesAndReach() {
  return (
    <section className="bg-ivory px-5 py-10 sm:px-8 sm:py-14 md:px-12 lg:px-16 lg:py-18">
      <div className="mx-auto max-w-[1240px]">
        <div className="border-t border-walnut/15 pt-5">
          <SectionLabel>What We Create</SectionLabel>
          <h2 className="mt-4 max-w-[600px] font-serif text-[clamp(1.8rem,3.6vw,3.2rem)] font-light leading-[0.92] tracking-[-0.03em] text-walnut">
            Films & photographs with a personal memory.
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {services.map((service) => (
            <div
              key={service.title}
              className="inline-flex min-h-8 items-center rounded-full border border-walnut/15 bg-sand/20 px-3.5 text-taupe"
            >
              <span className="text-[8px] font-semibold uppercase tracking-[0.14em]">
                {service.title}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 border-t border-walnut/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.82rem] font-light text-taupe">
            Mumbai & Surat · Available worldwide
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 border-b border-walnut/35 pb-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-walnut transition-colors duration-200 hover:border-cinnamon-400 hover:text-cinnamon-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut"
          >
            Tell us your story
            <ArrowUpRight
              size={13}
              strokeWidth={1.4}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
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
        <ServicesAndReach />
      </main>
      <Footer hideCTA />
    </>
  );
}
