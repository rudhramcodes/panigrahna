import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
            All love stories are special and different from one another. Let us create a film worthy of yours through its beauty and uniqueness.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="group relative inline-flex h-12 sm:h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-walnut px-6 sm:px-8 text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span className="font-sans text-[11px] uppercase tracking-[4px]">
                  Let's Begin
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
              <div className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
            </button>
          </div>
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
