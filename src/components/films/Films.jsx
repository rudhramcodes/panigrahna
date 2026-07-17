import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { rawCloudinaryUrl } from "../../lib/cloudinary";
import VideoPlayer from "./VideoPlayer";
import MaskText from "../mask-text/MaskText";

const EASE = [0.76, 0, 0.24, 1];

const VIDEOS = [
  { id: "rxYLqrZryr4", title: "Harsh & Sayonee", thumbnailUrl: rawCloudinaryUrl("hs-thumbnail") },
  { id: "XN7-idfiri4", title: "Rutvik & Aishwarya", thumbnailUrl: rawCloudinaryUrl("ra-thumbnail-2") },
  { id: "FsVTLyDW93g", title: "Ronak & Jessica", thumbnailUrl: rawCloudinaryUrl("rj-thumbnail") },
  { id: "GZdRiO-vgKw", title: "Prachi & Preet", thumbnailUrl: rawCloudinaryUrl("pp-thumbnail") },
];

export default function Films() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-sand/50 overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <MaskText
            outerTag="h2"
            tag="span"
            amount={0.5}
            className="font-serif text-walnut font-thin leading-[1.1] tracking-tighter"
            outerStyle={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
            lines={[
              <span key="l1">Some <span className="text-[#c8a882]">moments</span> pass in seconds,</span>,
              <span key="l2"><em className="italic">yet stay with us <span className="italic text-[#c8a882]">forever.</span></em></span>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-sans text-taupe/80 text-xs sm:text-base max-w-xl mt-3 leading-relaxed font-light mx-auto"
          >
            Each highlight film is crafted to recapture the laughter, the glances, and the emotions that make your celebration unforgettable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              <div className="group">
                <span className="mb-1.5 block font-sans text-[10px] uppercase tracking-[0.15em] text-taupe/50">
                  {v.label}
                </span>
                <div className="overflow-hidden rounded-sm">
                  <VideoPlayer videoId={v.id} title={v.title} thumbnailUrl={v.thumbnailUrl} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 sm:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <button
            onClick={() => navigate("/films")}
            className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-walnut px-8 text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="font-sans text-[11px] uppercase tracking-[4px]">
                View All
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
        </motion.div>
      </div>
    </section>
  );
}
