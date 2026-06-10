import { useState, useRef, useEffect, useCallback } from "react";
import "./VideoPlayer.css";

const formatTime = (s) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export default function VideoPlayer({ videoId, title }) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const progressRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ready, setReady] = useState(false);

  const hideTimer = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoId) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(`yt-player-${videoId}`, {
        videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            setDuration(playerRef.current.getDuration());
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true);
            } else if (
              e.data === window.YT.PlayerState.PAUSED ||
              e.data === window.YT.PlayerState.ENDED
            ) {
              setPlaying(false);
            }
          },
        },
      });
    };

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, [videoId]);

  useEffect(() => {
    if (!playing || !playerRef.current) return;
    const interval = setInterval(() => {
      const cur = playerRef.current.getCurrentTime();
      const dur = playerRef.current.getDuration();
      setCurrentTime(cur);
      setDuration(dur);
      setProgress(dur ? (cur / dur) * 100 : 0);
    }, 250);
    return () => clearInterval(interval);
  }, [playing]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [playing]);

  const handleSeek = useCallback(
    (e) => {
      if (!playerRef.current || !progressRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const dur = playerRef.current.getDuration();
      playerRef.current.seekTo(pct * dur, true);
      setProgress(pct * 100);
      setCurrentTime(pct * dur);
    },
    []
  );

  const handleVolume = useCallback(
    (e) => {
      if (!playerRef.current) return;
      const val = parseFloat(e.target.value);
      setVolume(val);
      playerRef.current.setVolume(val * 100);
      setMuted(val === 0);
    },
    []
  );

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      setMuted(false);
      setVolume(volume || 0.8);
    } else {
      playerRef.current.mute();
      setMuted(true);
    }
  }, [muted, volume]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  return (
    <div
      ref={containerRef}
      className="vp-container"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <div className="vp-iframe-wrapper">
        <div id={`yt-player-${videoId}`} className="vp-iframe" />
      </div>

      <div className="vp-click-overlay" onClick={togglePlay} />

      {!playing && ready && (
        <button className="vp-big-play" onClick={togglePlay} aria-label="Play">
          <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      <div
        className={`vp-controls ${showControls || !playing ? "vp-controls--visible" : ""}`}
        onMouseEnter={() => clearTimeout(hideTimer.current)}
      >
        <div
          ref={progressRef}
          className="vp-progress"
          onClick={handleSeek}
        >
          <div className="vp-progress-track">
            <div className="vp-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="vp-controls-row">
          <button className="vp-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span className="vp-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="vp-spacer" />

          <div className="vp-volume-group">
            <button className="vp-btn" onClick={toggleMute} aria-label="Toggle mute">
              {muted || volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16.5 12A4.5 4.5 0 0014 8.18v1.7l2.39 2.39c.08-.27.11-.56.11-.87zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.18v7.64c1.73-.85 2.5-2.54 2.5-3.82zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolume}
              className="vp-volume-slider"
              aria-label="Volume"
            />
          </div>

          <button className="vp-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {title && (
        <div className="vp-title" onClick={togglePlay}>
          {title}
        </div>
      )}
    </div>
  );
}
