import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "./VideoPlayer";
import MaskText from "../mask-text/MaskText";
import "./Films.css";

gsap.registerPlugin(ScrollTrigger);

const THUMBNAIL = "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg";
const VIDEO_ID = "MzLEO98OMQg";

const DRIVE_FILE_ID = "1fJOeEqzOpnUa9ru8KG9hVQvmvoUonyY8";
const DRIVE_THUMBNAIL = "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg";

const VIDEOS = [
  { id: VIDEO_ID, label: "Film I", title: "A Heritage Celebration", thumbnailUrl: THUMBNAIL },
  { id: VIDEO_ID, label: "Film II", title: "Rustic Intimacy", thumbnailUrl: THUMBNAIL },
  { id: VIDEO_ID, label: "Film III", title: "Palace of Devotion", thumbnailUrl: THUMBNAIL },
  { id: DRIVE_FILE_ID, label: "Film IV", title: "An Eternal Union", thumbnailUrl: DRIVE_THUMBNAIL, type: "google-drive" },
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
          <div className="films-label">Selected Works</div>
          <MaskText
            outerTag="h2"
            tag="span"
            amount={0.5}
            className="films-heading"
            lines={[
              <span key="line1"><em>Films</em> that preserve</span>,
              <span key="line2">the moments that matter</span>,
            ]}
          />
          <p className="films-subtext">
            Each film is crafted to honor the intimacy and grandeur of your celebration —
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
