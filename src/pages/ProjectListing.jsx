import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import SEO from "../components/ui/SEO";
import { COUPLES } from "../data/couples";
import { rawCloudinaryUrl } from "../lib/cloudinary";
import { ArrowUpRight } from "lucide-react";

const STORY_COPY = {
  "harsh-and-sayonee": {
    eyebrow: "Quiet devotion",
    title: "A wedding that moved softly, but stayed deeply.",
    body:
      "Harsh and Sayonee's story felt like a room lowering its voice. There were rituals, laughter and family everywhere, but the real beauty lived in the pauses: a hand resting longer than expected, a smile held back, a portrait that already felt like memory.",
  },
  "rahul-and-jeevani": {
    eyebrow: "Warmth over spectacle",
    title: "Four days of tradition, laughter and honest glances.",
    body:
      "Rahul and Jeevani's celebration had scale, but it never lost its heart. Every ceremony carried the warmth of home. In between the music and movement, their eyes kept finding each other, and that became the quiet thread of the entire story.",
  },
  "prachi-and-preet": {
    eyebrow: "Modern romance",
    title: "A graceful story of softness, colour and ease.",
    body:
      "Prachi and Preet brought a calm kind of romance to the frame. Nothing felt forced. The day unfolded through gentle gestures, vivid textures and small moments of closeness that made the photographs feel personal before they felt beautiful.",
  },
  "ronak-and-jessica": {
    eyebrow: "Intimate rhythm",
    title: "Joy, movement and two people fully present.",
    body:
      "Ronak and Jessica's wedding carried an easy rhythm. It was intimate without feeling small, emotional without becoming heavy. Their photographs are full of movement, but the feeling underneath is stillness: two people completely sure of each other.",
  },
  "rutvik-and-aishwarya": {
    eyebrow: "Blessings and light",
    title: "A layered celebration held by family and ritual.",
    body:
      "Rutvik and Aishwarya's story was devotional, luminous and full of belonging. The images move between ceremony and quiet tenderness, preserving not only how the wedding looked, but how it felt to stand inside it.",
  },
};

function ProjectStory({ couple, index }) {
  const copy = STORY_COPY[couple.slug];
  const flipped = index % 2 === 1;

  return (
    <article className="grid min-h-[72vh] items-center gap-10 border-t border-walnut/10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-16 lg:py-28">
      <div className={`${flipped ? "lg:order-2" : ""}`}>
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-taupe">
          {String(index + 1).padStart(2, "0")} / {copy.eyebrow}
        </span>
        <h2 className="mt-6 max-w-[620px] font-serif text-[clamp(2.35rem,6vw,5.6rem)] font-light leading-[0.9] text-walnut">
          {couple.name}
        </h2>
        <p className="mt-7 max-w-[560px] font-serif text-[clamp(1.45rem,3vw,2.55rem)] font-light italic leading-[1.2] text-cinnamon-400">
          {copy.title}
        </p>
        <p className="mt-8 max-w-[560px] text-[0.92rem] font-light leading-[1.9] text-taupe">
          {copy.body}
        </p>
        <Link
          to={`/projects/${couple.slug}`}
          className="group relative mt-9 inline-flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-walnut px-8 text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut/35"
        >
          <span className="relative z-10 h-4 overflow-hidden font-sans text-[10px] font-semibold uppercase tracking-[0.28em]">
            <span className="block transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              Open story
            </span>
            <span className="absolute inset-x-0 top-full flex items-center justify-center gap-1 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:top-0">
              View <ArrowUpRight size={16} strokeWidth={1.5} />
            </span>
          </span>
          <span className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
        </Link>
      </div>

      <Link
        to={`/projects/${couple.slug}`}
        className={`group relative block cursor-pointer overflow-hidden rounded-[1vw] bg-sandstone-200 shadow-[0_22px_55px_rgba(53,28,3,0.12)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut/35 ${flipped ? "lg:order-1" : ""}`}
        aria-label={`Open ${couple.name}`}
      >
        <img
          src={rawCloudinaryUrl(couple.coverPublicId, couple.coverVersion)}
          alt={couple.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:aspect-[5/6] lg:max-h-[720px]"
          loading={index < 2 ? "eager" : "lazy"}
          fetchPriority={index < 2 ? "high" : "auto"}
          decoding="async"
          draggable={false}
        />
      </Link>
    </article>
  );
}

export default function ProjectListing() {
  const stageRef = useRef(null);

  useEffect(() => {
    const items = stageRef.current?.children || [];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      [...items].forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
      return;
    }

    const animation = animate(items, {
      opacity: [0, 1],
      translateY: [28, 0],
      delay: stagger(100),
      duration: 900,
      ease: "outCubic",
    });

    return () => animation.cancel?.();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF4] text-walnut">
      <SEO
        title="Wedding Photography Portfolio - Best Wedding Photographer in Mumbai"
        description="Browse real wedding photography portfolios by Panigrahna. Candid, traditional, and destination wedding photography from Mumbai's best wedding photographer."
      />

      <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-16">
        <img
          src={rawCloudinaryUrl("HS30.5.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0 bg-walnut/35" />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] text-center">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-ivory/78">
            Panigrahna Projects
          </span>
          <h1 className="mx-auto mt-6 max-w-[880px] font-serif text-[clamp(3rem,8vw,7.2rem)] font-light leading-[0.86] text-ivory">
            Wedding stories told close to the feeling.
          </h1>
          <p className="mx-auto mt-7 max-w-[650px] text-[0.95rem] font-light leading-[1.9] text-ivory/78">
            A collection of real couples, raw pauses, family warmth and the
            quiet moments that become the memory of a wedding.
          </p>
        </div>
      </section>

      <section ref={stageRef} className="bg-sand/50">
        {COUPLES.map((couple, index) => (
          <div key={couple.slug} className="opacity-0">
            <ProjectStory couple={couple} index={index} />
          </div>
        ))}
      </section>
    </main>
  );
}
