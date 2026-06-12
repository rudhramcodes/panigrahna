import { useEffect, useRef } from "react";
import "./InstagramSectionEmbed.css";

const PROFILE_IMG = "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg";
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
    /* Instagram's embed.js needs to process blockquotes after React paints them */
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
        document.head.appendChild(script);
      }
    }

    /* re-process after DOM is committed (React may have added new blockquotes) */
    const timer = setTimeout(processEmbeds, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="ige-section">
      <div className="ige-container">
        {/* header */}
        <div className="ige-header">
          <span className="ige-header-label">Follow Us</span>
          <h2 className="ige-header-title"><em>Instagram</em></h2>
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="ige-header-handle">
            @panigrahna.rudhram
          </a>
        </div>

        {/* profile card */}
        <div className="ige-profile">
          <div className="ige-profile-left">
            <div className="ige-avatar-wrap">
              <img src={PROFILE_IMG} alt="panigrahna.rudhram" className="ige-avatar" />
            </div>
            <div className="ige-profile-info">
              <h3 className="ige-profile-name">panigrahna.rudhram</h3>
              <p className="ige-profile-tagline">Wedding Photography &amp; Films</p>
              <p className="ige-profile-bio">Documenting traditions the way they are meant to be.</p>
            </div>
          </div>
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="ige-follow-btn">Follow</a>
        </div>

        {/* embed grid */}
        <div className="ige-grid">
          {POSTS.map((post) => (
            <div key={post.id} className="ige-card">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: 0,
                  boxShadow: "none",
                  margin: 0,
                  padding: 0,
                  width: "100%",
                  minWidth: "auto",
                  maxWidth: "100%",
                }}
              >
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  View on Instagram
                </a>
              </blockquote>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="ige-footer">
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="ige-footer-link">
            View more on Instagram &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
