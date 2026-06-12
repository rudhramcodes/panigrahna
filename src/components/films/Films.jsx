import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "./VideoPlayer";
import "./Films.css";

gsap.registerPlugin(ScrollTrigger);

const THUMBNAIL = "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg";
const VIDEO_ID = "MzLEO98OMQg";

const VIDEOS = [
  { id: VIDEO_ID, label: "Film I", title: "A Heritage Celebration", thumbnailUrl: THUMBNAIL },
  { id: VIDEO_ID, label: "Film II", title: "Rustic Intimacy", thumbnailUrl: THUMBNAIL },
  { id: VIDEO_ID, label: "Film III", title: "Palace of Devotion", thumbnailUrl: THUMBNAIL },
  { id: VIDEO_ID, label: "Film IV", title: "Whispers of Tradition", thumbnailUrl: THUMBNAIL },
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
          <h2 className="films-heading">
            <em>Films</em> that preserve<br />the moments that matter
          </h2>
          <p className="films-subtext">
            Each film is crafted to honor the intimacy and grandeur of your celebration —
            a timeless narrative woven through light, movement, and emotion.
          </p>
        </div>

        <div className="films-grid">
          {VIDEOS.map((v) => (
            <div key={v.id} className="films-grid-item">
              <div className="films-grid-label">{v.label}</div>
              <VideoPlayer videoId={v.id} title={v.title} thumbnailUrl={v.thumbnailUrl} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
