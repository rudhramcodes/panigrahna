import { useState, useRef, useCallback, useEffect } from "react";
import "./VideoPlayer.css";

export default function VideoPlayer({ videoId, title, thumbnailUrl, type = "youtube", loop, autoPlay }) {
  const [playerActive, setPlayerActive] = useState(autoPlay || false);
  const containerRef = useRef(null);

  const handleThumbnailClick = useCallback(() => {
    setPlayerActive(true);
  }, []);

  let embedSrc =
    type === "google-drive"
      ? `https://drive.google.com/file/d/${videoId}/preview`
      : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  if (loop) embedSrc += `&loop=1&playlist=${videoId}`;
  if (autoPlay) embedSrc += "&mute=1";

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
          src={embedSrc}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={title || "Video player"}
        />
      )}
    </div>
  );
}
