import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rawCloudinaryUrl } from "../../lib/cloudinary";
import VideoPlayer from "./VideoPlayer";
import MaskText from "../mask-text/MaskText";
import "./Films.css";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_ID = "MzLEO98OMQg";
const PRACHI_PREET_ID = "GZdRiO-vgKw";

const DRIVE_FILE_ID = "1fJOeEqzOpnUa9ru8KG9hVQvmvoUonyY8";

const VIDEOS = [
  { id: "GZdRiO-vgKw", label: "Film I", title: "Prachi & Preet", thumbnailUrl: rawCloudinaryUrl("pp-thumbnail") },
  { id: "rxYLqrZryr4", label: "Film II", title: "Harsh & Sayonee", thumbnailUrl: rawCloudinaryUrl("hs-thumbnail") },
  { id: VIDEO_ID, label: "Film III", title: "Rutvik & Aishwarya", thumbnailUrl: rawCloudinaryUrl("ra-thumbnail") },
  { id: "FsVTLyDW93g", label: "Film IV", title: "Ronak & Jessica", thumbnailUrl: rawCloudinaryUrl("rj-thumbnail") },
];

export default function Films() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".films-grid-item").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => el.classList.add("revealed"),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="films-section bg-sand/50">
      <div className="films-inner">
        <div className="films-header">
          <div className="films-label">FEATURED FILMS</div>
          <MaskText
            outerTag="h2"
            tag="span"
            amount={0.5}
            className="films-heading"
            lines={[
              <span className="tracking-tight" key="line1">Some moments pass in
              </span>,
              <span className="tracking-tight" key="line2">seconds, <em> yet stay with us forever.</em></span>,
            ]}
          />
          <p className="films-subtext">
            Each film is crafted to honor the intimacy and grandeur of your celebration
            a timeless narrative woven through light, movement, and emotion.
          </p>
        </div>

        <div className="films-grid">
          {VIDEOS.map((v) => (
            <div key={v.id} className="films-grid-item">
              <div className="films-grid-label">{v.label}</div>
              <VideoPlayer videoId={v.id} title={v.title} thumbnailUrl={v.thumbnailUrl} type={v.type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
