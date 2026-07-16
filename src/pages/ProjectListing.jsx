import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/ui/SEO";
import CldImage from "../components/ui/CldImage";
import Footer from "../components/footer/Footer";
import { COUPLES } from "../data/couples";
import { RAW_VERSION } from "../lib/cloudinary";

const PLACEHOLDER_STORY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function ProjectStory({ couple, number }) {
  return (
    <article className="grid items-center gap-12 border-b border-walnut/15 py-20 sm:py-24 md:grid-cols-12 md:gap-10 lg:gap-16 lg:py-28">
      <div className="md:col-span-5 md:pl-[4%] lg:pl-[8%]">
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-taupe">
          Wedding story / {number}
        </span>
        <h3 className="mt-5 max-w-[520px] font-serif text-[clamp(3.2rem,5.6vw,6rem)] font-light leading-[0.86] tracking-[-0.035em]">
          {couple.name}
        </h3>
        <p className="mt-7 max-w-[430px] text-[0.88rem] font-light leading-[1.8] text-taupe">
          {PLACEHOLDER_STORY}
        </p>
        <Link
          to={`/projects/${couple.slug}`}
          className="group mt-8 inline-flex min-h-12 w-fit cursor-pointer items-center gap-4 rounded-full border border-walnut px-6 text-[9px] font-semibold uppercase tracking-[0.22em] transition-colors duration-200 hover:bg-walnut hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          View story
          <ArrowUpRight
            size={15}
            strokeWidth={1.4}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <Link
        to={`/projects/${couple.slug}`}
        aria-label={`View ${couple.name}`}
        className="relative mx-auto block h-[400px] w-full max-w-[680px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-4 focus-visible:ring-offset-ivory sm:h-[540px] md:col-span-7 md:h-[500px] lg:h-[620px]"
      >
        <div className="absolute right-0 top-0 h-[86%] w-[76%] overflow-hidden rounded-[6px] bg-sandstone-200 sm:w-[70%]">
          <CldImage
            pubslicId={couple.listingImages.primary}
            alt={`${couple.name} wedding portrait`}
            width={1200}
            options={{ version: couple.coverVersion, crop: "fill", gravity: "auto" }}
            wrapperClassName="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.045]"
            imgClassName="h-full w-full object-cover will-change-transform"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="absolute bottom-0 left-0 h-[46%] w-[48%] overflow-hidden rounded-[10px] border-[5px] border-ivory bg-sandstone-200 sm:w-[43%]">
          <CldImage
            publicId={couple.listingImages.secondary}
            alt={`${couple.name} wedding detail`}
            width={700}
            options={{ version: couple.coverVersion, crop: "fill", gravity: "auto" }}
            wrapperClassName="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
            imgClassName={`h-full w-full object-cover ${couple.listingImages.secondary === "RJ18.jpg" && "PP19.jpg" ? "object-bottom" : "object-center"} will-change-transform`}
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>
    </article>
  );
}

export default function ProjectListing() {
  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-ivory text-walnut">
      <SEO
        title="Wedding Photography Portfolio - Best Wedding Photographer in Mumbai"
        description="Browse real wedding photography portfolios by Panigrahna. Candid, traditional, and destination wedding photography from Mumbai's best wedding photographer."
      />

      <section className="px-5 pb-0 pt-36 sm:px-8 sm:pt-44 lg:px-16 lg:pt-52">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
            <h1 className="font-serif text-[clamp(4.6rem,10vw,9.5rem)] font-light leading-[0.76] tracking-[-0.045em] lg:col-span-7">
              Wedding
              <span className="block italic">Stories</span>
            </h1>

            <div className="flex flex-col gap-7 lg:col-span-5 lg:flex-row lg:items-end lg:justify-between lg:pb-2">
              <p className="max-w-[300px] text-[0.9rem] font-light leading-[1.75] text-taupe">
                Honest photographs of people, rituals and everything that
                happens in between.
              </p>
              <a
                href="#projects"
                className="group inline-flex w-fit cursor-pointer items-center gap-3 border-b border-walnut/35 pb-1 text-[9px] font-semibold uppercase tracking-[0.22em] transition-colors duration-200 hover:border-cinnamon-400 hover:text-cinnamon-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut"
              >
                Explore projects
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <div className="mt-14 aspect-[4/3] overflow-hidden rounded-[10px] bg-sandstone-200 sm:mt-16 sm:aspect-[16/9] lg:mt-20 lg:aspect-[16/7]">
            <CldImage
              publicId="049.jpg"
              alt="A joyful wedding celebration photographed by Panigrahna"
              width={1920}
              options={{ version: RAW_VERSION, crop: "fill", gravity: "auto" }}
              wrapperClassName="h-full w-full"
              imgClassName="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 px-5 pt-16 sm:px-8 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 border-t border-walnut/15 pt-6 md:grid-cols-2 lg:grid-cols-12">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-taupe lg:col-span-4">
              Selected projects / {String(COUPLES.length).padStart(2, "0")}
            </span>
            <h2 className="max-w-[700px] font-serif text-[clamp(2.6rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.03em] md:text-right lg:col-span-8 lg:justify-self-end">
              Celebrations we still think about.
            </h2>
          </div>

          <div className="mt-4">
            {COUPLES.map((couple, index) => (
              <ProjectStory
                key={couple.slug}
                couple={couple}
                number={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-16 lg:pb-32">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-[clamp(1.8rem,3vw,3rem)] font-light">
            Have a story for us?
          </p>
          <Link
            to="/contact"
            className="group inline-flex min-h-12 w-fit cursor-pointer items-center gap-4 rounded-full border border-walnut px-6 text-[9px] font-semibold uppercase tracking-[0.22em] transition-colors duration-200 hover:bg-walnut hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Tell us about your wedding
            <ArrowUpRight
              size={15}
              strokeWidth={1.4}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
      </main>
      <Footer hideCTA />
    </>
  );
}
