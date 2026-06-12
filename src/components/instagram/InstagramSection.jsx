import { useState, useRef } from "react";
import "./InstagramSection.css";

const PROFILE = "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg";

const PROFILE_URL = "https://www.instagram.com/panigrahna.rudhram/";
const POST_1_URL = "https://www.instagram.com/p/DYJjfMljFbX/";
const POST_2_URL = "https://www.instagram.com/p/DXjh2KDkz26/";

const POST_IMAGES = [
  "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg",
  "https://i.pinimg.com/736x/ed/9f/31/ed9f310026539d65cf072a177d7080a8.jpg",
  "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg",
  "https://i.pinimg.com/736x/ed/9f/31/ed9f310026539d65cf072a177d7080a8.jpg",
  "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg",
  "https://i.pinimg.com/736x/ed/9f/31/ed9f310026539d65cf072a177d7080a8.jpg",
  "https://i.pinimg.com/1200x/98/f7/5f/98f75f38c94d26db2dbbf203b4a89c3b.jpg",
  "https://i.pinimg.com/736x/ed/9f/31/ed9f310026539d65cf072a177d7080a8.jpg",
];

const POST_LINKS = [
  POST_1_URL, POST_2_URL, POST_1_URL, POST_2_URL,
  POST_1_URL, POST_2_URL, POST_1_URL, POST_2_URL,
];

const STORIES = Array.from({ length: 7 }, () => ({
  username: "panigrahna.rudhram",
  image: PROFILE,
  seen: false,
}));

const LIKES = [142, 98, 231, 167, 85, 203, 119, 156];

/* -------- Icons -------- */
function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "#e74c3c" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

function SaveIcon({ saved }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
    </svg>
  );
}

function StoryRing({ children, seen }) {
  return (
    <div className={`sr-ring${seen ? " sr-ring--seen" : ""}`}>{children}</div>
  );
}

export default function InstagramSection() {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [seenStories, setSeenStories] = useState({});
  const storiesRef = useRef(null);

  const toggleLike = (i) => setLiked((p) => ({ ...p, [i]: !p[i] }));
  const toggleSave = (i) => setSaved((p) => ({ ...p, [i]: !p[i] }));
  const handleStory = (i) => {
    setSeenStories((p) => ({ ...p, [i]: true }));
    window.open(PROFILE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="ig-section">
      <div className="ig-container">
        {/* -------- header -------- */}
        <div className="ig-header">
          <span className="ig-header-label">Follow Us</span>
          <h2 className="ig-header-title"><em>Instagram</em></h2>
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="ig-header-handle">@{PROFILE_URL.split("/").filter(Boolean).pop()}</a>
        </div>

        {/* -------- stories -------- */}
        <div className="ig-stories" ref={storiesRef}>
          {STORIES.map((s, i) => (
            <button key={i} className="ig-story-btn" onClick={() => handleStory(i)}>
              <StoryRing seen={seenStories[i]}>
                <div className="sr-avatar-wrap">
                  <img src={s.image} alt="" className="sr-avatar" loading="lazy" />
                </div>
              </StoryRing>
              <span className="sr-uname">{s.username}</span>
            </button>
          ))}
        </div>

        {/* -------- profile + posts layout -------- */}
        <div className="ig-layout">
          {/* profile sidebar */}
          <aside className="ig-profile">
            <div className="ig-profile-card">
              <div className="ig-profile-avatar-wrap">
                <img src={PROFILE} alt="panigrahna.rudhram" className="ig-profile-avatar" />
              </div>
              <div className="ig-profile-info">
                <h3 className="ig-profile-name">panigrahna.rudhram</h3>
                <p className="ig-profile-tagline">Wedding Photography &amp; Films</p>
                <p className="ig-profile-bio">
                  Documenting traditions the way they are meant to be.
                </p>
              </div>
              <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="ig-profile-btn">
                Follow
              </a>
              <div className="ig-profile-stats">
                <div className="ig-stat">
                  <span className="ig-stat-num">2.4K</span>
                  <span className="ig-stat-label">posts</span>
                </div>
                <div className="ig-stat">
                  <span className="ig-stat-num">18.5K</span>
                  <span className="ig-stat-label">followers</span>
                </div>
                <div className="ig-stat">
                  <span className="ig-stat-num">846</span>
                  <span className="ig-stat-label">following</span>
                </div>
              </div>
            </div>
          </aside>

          {/* posts grid */}
          <div className="ig-grid">
            {POST_IMAGES.map((img, i) => (
              <a
                key={i}
                href={POST_LINKS[i]}
                target="_blank"
                rel="noopener noreferrer"
                className={`ig-grid-card ${liked[i] ? "ig-grid-card--liked" : ""}`}
              >
                <div className="ig-grid-img-wrap">
                  <img src={img} alt="" className="ig-grid-img" loading="lazy" />
                  {/* hover overlay */}
                  <div className="ig-grid-overlay">
                    <div className="ig-grid-overlay-actions">
                      <span className="ig-overlay-action">
                        <HeartIcon filled={false} />
                        <span>{LIKES[i]}</span>
                      </span>
                      <span className="ig-overlay-action">
                        <CommentIcon />
                        <span>{(LIKES[i] * 0.08).toFixed(0)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* card footer */}
                <div className="ig-grid-footer">
                  <div className="ig-grid-footer-left">
                    <img src={PROFILE} alt="" className="ig-grid-footer-avatar" />
                    <span className="ig-grid-footer-uname">panigrahna.rudhram</span>
                  </div>
                  <button
                    className="ig-grid-save"
                    onClick={(e) => { e.preventDefault(); toggleSave(i); }}
                    aria-label={saved[i] ? "Unsave" : "Save"}
                  >
                    <SaveIcon saved={saved[i]} />
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
