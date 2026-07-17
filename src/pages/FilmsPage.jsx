import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/ui/SEO";
import VideoPlayer from "../components/films/VideoPlayer";
import Footer from "../components/footer/Footer";
import { FEATURED_FILMS, REELS } from "../data/films";

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.12 },
  }),
};

/* ── Featured Films Section ── */
function FeaturedFilms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-ivory pt-36 pb-10 sm:pt-44 sm:pb-12 lg:pt-52 lg:pb-16">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif font-light leading-[1.05] tracking-tight text-walnut"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Stories <span className="italic text-cinnamon-300">We're Proud Of</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[520px] font-sans font-light leading-relaxed text-taupe"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          >
            A look that speaks volumes. A chuckle nobody expects. A feeling that lingers well into the evening hours. Each highlight film is put together to recapture all of these emotions, just like they happened before.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {FEATURED_FILMS.map((film, i) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            >
              <div className="group">
                <div className="overflow-hidden rounded-[8px]">
                  <VideoPlayer
                    videoId={film.id}
                    title={film.title}
                    thumbnailUrl={film.thumbnailUrl}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reels Section ── */
function ReelsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="bg-parchment py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.span
            variants={fadeUp}
            className="block font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-cinnamon-300"
          >
            Reels
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif font-light leading-[1.05] tracking-tight text-walnut"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Moments on the <span className="italic text-cinnamon-300">Move</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[480px] font-sans font-light leading-relaxed text-taupe"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          >
            A smile that comes out of nowhere. A laugh that lights up the place. An expression that speaks volumes. It’s these small moments that make all celebrations come alive.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {REELS.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            >
              <div className="group">
                <div className="overflow-hidden rounded-[8px]">
                  <VideoPlayer
                    videoId={reel.id}
                    title={reel.title}
                    thumbnailUrl={reel.thumbnailUrl}
                    loop
                    autoPlay
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ── */
function FilmsCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[800px] px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            className="mt-4 font-serif font-light leading-[1.05] tracking-tight text-walnut"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Ready for Your
            <br />
            <span className="italic text-cinnamon-300">Cinematic Tale?</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-[480px] font-sans font-light leading-relaxed text-taupe"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          >
            Every love story is unique. Let&rsquo;s craft a film that captures yours
            with the artistry, intimacy, and timelessness it deserves.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 w-fit cursor-pointer items-center gap-4 rounded-full border border-walnut px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-walnut transition-colors duration-200 hover:bg-walnut hover:text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Get in Touch
            <ArrowUpRight
              size={15}
              strokeWidth={1.4}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Page ── */
export default function FilmsPage() {
  return (
    <>
      <SEO
        title="Cinematic Wedding Films - Panigrahna"
        description="Explore cinematic wedding films by Panigrahna. Beautifully crafted highlight films and reels capturing the essence of every celebration."
      />
      <main className="min-h-screen overflow-x-hidden bg-ivory text-walnut">
        <FeaturedFilms />
        <ReelsSection />
        <FilmsCTA />
      </main>
      <Footer hideCTA />
    </>
  );
}
