import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import { COUPLES } from "../data/couples";
import { rawCloudinaryUrl } from "../lib/cloudinary";

export default function ProjectListing() {
  const heroRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const heroItems = heroRef.current?.children || [];
    const rows = rowRefs.current.filter(Boolean);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      [...heroItems, ...rows].forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
      return;
    }

    const heroAnimation = animate(heroItems, {
      opacity: [0, 1],
      translateY: [22, 0],
      delay: stagger(90),
      duration: 800,
      ease: "outCubic",
    });

    const rowAnimation = animate(rows, {
      opacity: [0, 1],
      translateY: [28, 0],
      delay: stagger(95, { start: 260 }),
      duration: 850,
      ease: "outCubic",
    });

    return () => {
      heroAnimation.cancel?.();
      rowAnimation.cancel?.();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory text-primary">
      <section className="px-5 pb-12 pt-24 sm:px-8 sm:pt-32 md:px-12 lg:px-16">
        <div ref={heroRef} className="mx-auto grid max-w-[1480px] gap-9 lg:min-h-[78vh] lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="relative z-10 opacity-0">
            <span className="block font-serif text-[10px] uppercase tracking-[0.32em] text-taupe/65">
              Panigrahna Projects
            </span>
            <h1 className="mt-5 max-w-[780px] font-serif text-[clamp(3.25rem,12vw,9.4rem)] font-light leading-[0.78] tracking-[-0.05em] text-walnut">
              Where vows become memory.
            </h1>
            <p className="mt-6 max-w-[520px] text-[0.92rem] font-light leading-[1.9] text-taupe/85 sm:text-[1rem]">
              A curated archive of couples, ceremonies, portraits and the
              unrepeatable in-between moments that made every wedding personal.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#couples"
                className="rounded-full bg-walnut px-7 py-3.5 font-sans text-[10px] uppercase tracking-[0.26em] text-ivory shadow-[0_18px_44px_rgba(61,43,26,0.16)] transition-transform duration-500 hover:scale-[1.03]"
              >
                View couples
              </a>
              <span className="font-serif text-sm italic text-taupe/60">
                {String(COUPLES.length).padStart(2, "0")} visual stories
              </span>
            </div>
          </div>

          <div className="relative opacity-0">
            <div className="grid grid-cols-[0.72fr_1fr] items-end gap-3 sm:gap-4">
              <Link to={`/projects/${COUPLES[0].slug}`} className="group mb-10 block overflow-hidden rounded-[26px] bg-sandstone-200 shadow-[0_24px_70px_rgba(61,43,26,0.13)]">
                <img
                  src={rawCloudinaryUrl(COUPLES[0].coverPublicId, COUPLES[0].coverVersion)}
                  alt={COUPLES[0].name}
                  className="aspect-[4/5.6] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                />
              </Link>
              <Link to={`/projects/${COUPLES[1].slug}`} className="group block overflow-hidden rounded-[30px] bg-sandstone-200 shadow-[0_30px_80px_rgba(61,43,26,0.14)]">
                <img
                  src={rawCloudinaryUrl(COUPLES[1].coverPublicId, COUPLES[1].coverVersion)}
                  alt={COUPLES[1].name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                />
              </Link>
            </div>
            <div className="absolute bottom-6 left-1/2 hidden w-[72%] -translate-x-1/2 rounded-[22px] bg-ivory/92 px-6 py-5 text-center shadow-[0_22px_60px_rgba(61,43,26,0.14)] backdrop-blur-sm sm:block">
              <p className="font-serif text-[1.5rem] font-light leading-none text-walnut">
                Weddings, rituals and human connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="couples" className="px-5 py-12 sm:px-8 sm:py-20 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-9 grid gap-5 md:grid-cols-[0.75fr_1fr] md:items-end">
            <h2 className="font-serif text-[clamp(2.6rem,7vw,6.6rem)] font-light leading-[0.82] tracking-[-0.045em] text-walnut">
              Selected stories
            </h2>
            <p className="max-w-[520px] text-[0.9rem] font-light leading-[1.85] text-taupe/80 md:justify-self-end">
              Each couple opens into a complete gallery. Browse the stories
              below, then enter the one that calls to you.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COUPLES.map((couple, index) => {
              return (
                <Link
                  key={couple.slug}
                  ref={(node) => {
                    rowRefs.current[index] = node;
                  }}
                  to={`/projects/${couple.slug}`}
                  className={`group block opacity-0 ${index === 1 ? "lg:mt-14" : ""} ${index === 3 ? "lg:-mt-8" : ""}`}
                >
                  <div className="overflow-hidden rounded-[24px] bg-sandstone-200 shadow-[0_22px_64px_rgba(61,43,26,0.11)]">
                    <img
                      src={rawCloudinaryUrl(couple.coverPublicId, couple.coverVersion)}
                      alt={couple.name}
                      className="aspect-[4/5.35] w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.035]"
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index < 2 ? "high" : "auto"}
                      decoding="async"
                      draggable={false}
                    />
                  </div>

                  <div className="pt-5">
                    <h3 className="font-serif text-[clamp(1.65rem,4vw,2.45rem)] font-light leading-[0.95] tracking-[-0.025em] text-walnut">
                      {couple.name}
                    </h3>
                    <p className="mt-3 text-[0.84rem] font-light leading-[1.8] text-taupe/82">
                      {couple.story}
                    </p>
                    <span className="mt-5 inline-flex rounded-full bg-sand/55 px-4 py-2 font-sans text-[9px] uppercase tracking-[0.24em] text-walnut transition-colors duration-500 group-hover:bg-walnut group-hover:text-ivory">
                      View story
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
