import { useState, useRef, useCallback } from "react";
import "./VideoPlayer.css";

export default function VideoPlayer({ videoId, title, thumbnailUrl }) {
  const [playerActive, setPlayerActive] = useState(false);
  const containerRef = useRef(null);

  const handleThumbnailClick = useCallback(() => {
    setPlayerActive(true);
  }, []);

  return (
    <div ref={containerRef} className="vp-container">
      {!playerActive ? (
        <>
          <div
            className="vp-thumbnail"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          >
            <div className="vp-thumb-overlay" />
            <button
              className="vp-big-play"
              onClick={handleThumbnailClick}
              aria-label="Play video"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            {title && (
              <div className="vp-title" onClick={handleThumbnailClick}>
                {title}
              </div>
            )}
          </div>
        </>
      ) : (
        <iframe
          className="vp-iframe"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          title={title || "Video player"}
        />
      )}
    </div>
  );
}
