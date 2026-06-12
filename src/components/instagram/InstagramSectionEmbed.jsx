import { useEffect, useRef } from "react";
import "./InstagramSectionEmbed.css";

const PROFILE_URL = "https://www.instagram.com/panigrahna.rudhram/";

const POSTS = [
  { id: "DV5H1Cgky2d", url: "https://www.instagram.com/p/DV5H1Cgky2d/" },
  { id: "DVv0g-xk2p_", url: "https://www.instagram.com/p/DVv0g-xk2p_/" },
  { id: "DYJjfMljFbX", url: "https://www.instagram.com/p/DYJjfMljFbX/" },
  { id: "DXjh2KDkz26", url: "https://www.instagram.com/p/DXjh2KDkz26/" },
];

export default function InstagramSectionEmbed() {
  const initRef = useRef(false);

  useEffect(() => {
    /* embed.js replaces blockquotes — call process() after React paints them */
    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        try { window.instgrm.Embeds.process(); } catch {}
      }
    };

    if (!initRef.current) {
      initRef.current = true;

      if (window.instgrm) {
        processEmbeds();
      } else {
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        script.onload = processEmbeds;
        document.body.appendChild(script);
      }
    }

    const timer = setTimeout(processEmbeds, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="ige-section bg-sand/50">
      <div className="ige-container">
        <div className="ige-header">
          <h2 className="ige-header-title">
            <em>Instagram</em>
          </h2>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ige-header-handle"
          >
            @panigrahna.rudhram
          </a>
        </div>

        <div className="ige-grid">
          {POSTS.map((post) => (
            <div key={post.id} className="ige-card">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Loading…
                </a>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
