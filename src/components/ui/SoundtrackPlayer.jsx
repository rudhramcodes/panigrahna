import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { formatAudioTime } from "../../lib/audio";

export default function SoundtrackPlayer({ soundtrack, coupleName }) {
  const audioRef = useRef(null);
  const inPageRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  // Play audio safely and handle browser autoplay policies
  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setError("");
      await audio.play();
      setPlaying(true);
    } catch {
      // Browser blocked autoplay due to lack of prior user interaction on direct page load
      setPlaying(false);

      const triggerPlayOnInteraction = () => {
        if (!audioRef.current) return;
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
            setError("");
          })
          .catch(() => {});
        removeListeners();
      };

      const removeListeners = () => {
        window.removeEventListener("pointerdown", triggerPlayOnInteraction);
        window.removeEventListener("touchstart", triggerPlayOnInteraction);
        window.removeEventListener("click", triggerPlayOnInteraction);
        window.removeEventListener("scroll", triggerPlayOnInteraction);
        window.removeEventListener("keydown", triggerPlayOnInteraction);
      };

      window.addEventListener("pointerdown", triggerPlayOnInteraction, { once: true, passive: true });
      window.addEventListener("touchstart", triggerPlayOnInteraction, { once: true, passive: true });
      window.addEventListener("click", triggerPlayOnInteraction, { once: true, passive: true });
      window.addEventListener("scroll", triggerPlayOnInteraction, { once: true, passive: true });
      window.addEventListener("keydown", triggerPlayOnInteraction, { once: true, passive: true });
    }
  }, []);

  // Reset and autoplay whenever the soundtrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !soundtrack?.src) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    attemptPlay();

    return () => {
      audio.pause();
    };
  }, [soundtrack?.src, attemptPlay]);

  // Track scroll position to reveal minimized floating player when in-page player is out of view
  useEffect(() => {
    const el = inPageRef.current;
    if (!el) return;

    const checkPosition = () => {
      const rect = el.getBoundingClientRect();
      setIsScrolledPast(rect.bottom < 80);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        setIsScrolledPast(!entry.isIntersecting && rect.bottom < 80);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    window.addEventListener("scroll", checkPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      setError("");
      await audio.play();
      setPlaying(true);
    } catch {
      setError("Playback unavailable");
    }
  };

  const seek = (event) => {
    const time = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  if (!soundtrack?.src) return null;

  return (
    <>
      {/* Hidden/Core Audio Element */}
      <audio
        ref={audioRef}
        src={soundtrack.src}
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onDurationChange={(event) =>
          setDuration(
            Number.isFinite(event.currentTarget.duration)
              ? event.currentTarget.duration
              : 0
          )
        }
        onError={() => setError("Audio unavailable")}
      />

      {/* ── IN-PAGE STORY PLAYER ── */}
      <div
        ref={inPageRef}
        className="mx-auto mt-6 flex w-full max-w-[620px] flex-wrap items-center gap-3 rounded-2xl border border-walnut/15 bg-parchment/75 p-2.5 text-left shadow-[0_10px_30px_rgba(44,30,18,0.05)] sm:flex-nowrap sm:rounded-full sm:pr-4"
      >
        <button
          type="button"
          onClick={togglePlayback}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-cinnamon-400 text-white transition-colors duration-300 hover:bg-cinnamon-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnamon-400 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment"
          aria-label={playing ? `Pause ${soundtrack.title}` : `Play ${soundtrack.title}`}
        >
          {playing ? (
            <Pause size={17} fill="currentColor" />
          ) : (
            <Play size={17} fill="currentColor" className="translate-x-px" />
          )}
        </button>

        <div className="min-w-0 flex-1 px-1 sm:max-w-[170px]">
          <p className="truncate font-serif text-[1rem] font-medium leading-tight text-walnut">
            {soundtrack.title}
          </p>
          <p
            className="mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.2em] text-taupe"
            aria-live="polite"
          >
            {error || soundtrack.label || (coupleName ? `${coupleName} Soundtrack` : "Soundtrack")}
          </p>
        </div>

        <div className="order-last flex w-full items-center gap-3 px-1 sm:order-none sm:w-auto sm:min-w-0 sm:flex-1 sm:px-0">
          <span className="w-8 text-right text-[9px] tabular-nums text-taupe">
            {formatAudioTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={seek}
            className="h-1 min-w-0 flex-1 cursor-pointer accent-walnut"
            aria-label={`Seek ${soundtrack.title}`}
          />
          <span className="w-8 text-[9px] tabular-nums text-taupe">
            {formatAudioTime(duration)}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-taupe transition-colors duration-300 hover:bg-sand/50 hover:text-walnut focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut"
          aria-label={muted ? "Unmute soundtrack" : "Mute soundtrack"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {/* ── FLOATING MINIMIZED SIDE PLAYER (VISIBLE ON SCROLL) ── */}
      <AnimatePresence>
        {isScrolledPast && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-4 sm:left-8 bottom-24 sm:bottom-28 z-40"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={togglePlayback}
              onKeyDown={(e) => e.key === "Enter" && togglePlayback()}
              className="group relative flex items-center gap-3 rounded-full border border-walnut/15 bg-parchment/92 py-1.5 pl-1.5 pr-3.5 shadow-[0_14px_40px_rgba(44,30,18,0.18)] backdrop-blur-xl transition-all duration-300 hover:bg-parchment hover:shadow-[0_18px_48px_rgba(44,30,18,0.22)] active:scale-[0.97] cursor-pointer select-none ring-1 ring-white/40"
              aria-label={playing ? `Pause ${soundtrack.title}` : `Play ${soundtrack.title}`}
            >
              {/* Micro Progress Bar along bottom */}
              <div className="pointer-events-none absolute inset-x-3.5 bottom-0 h-[2px] overflow-hidden rounded-full bg-walnut/10">
                <div
                  className="h-full bg-cinnamon-400 transition-all duration-200"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>

              {/* Mini Vinyl Record Disc Container */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                {/* Rotating Vinyl Disc Only */}
                <div
                  className={`absolute inset-0 rounded-full bg-walnut shadow-md transition-transform duration-300 ${
                    playing ? "animate-[spin_6s_linear_infinite]" : ""
                  }`}
                >
                  {/* Vinyl concentric groove lines */}
                  <div className="pointer-events-none absolute inset-[3px] rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute inset-[6px] rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute inset-[9px] rounded-full border border-white/5" />

                  {/* Center accent ring on spinning vinyl */}
                  <div className="pointer-events-none absolute inset-[12px] rounded-full bg-cinnamon-400/90 ring-1 ring-walnut" />
                </div>

                {/* Stationary Center Spindle & Play/Pause Icon (Never Rotates) */}
                <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-walnut/90 text-ivory shadow-sm ring-1 ring-white/20">
                  {playing ? (
                    <Pause size={10} fill="currentColor" />
                  ) : (
                    <Play size={10} fill="currentColor" className="translate-x-px" />
                  )}
                </div>
              </div>

              {/* Track Title & Equalizer status */}
              <div className="min-w-0 pr-1">
                <p className="truncate font-serif text-[13px] font-medium leading-snug text-walnut max-w-[120px] sm:max-w-[160px]">
                  {soundtrack.title}
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  {playing ? (
                    <>
                      {/* Animated Sound Equalizer Bars */}
                      <div className="flex items-end gap-[2px] h-3">
                        <motion.span
                          animate={{ height: [3, 11, 4, 12, 3] }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                          className="w-[2px] rounded-full bg-cinnamon-400"
                        />
                        <motion.span
                          animate={{ height: [7, 3, 11, 5, 7] }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.1 }}
                          className="w-[2px] rounded-full bg-cinnamon-400"
                        />
                        <motion.span
                          animate={{ height: [4, 12, 3, 8, 4] }}
                          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.2 }}
                          className="w-[2px] rounded-full bg-cinnamon-400"
                        />
                      </div>
                      <span className="font-sans text-[8.5px] font-semibold uppercase tracking-[0.16em] text-taupe">
                        Playing
                      </span>
                    </>
                  ) : (
                    <span className="font-sans text-[8.5px] font-semibold uppercase tracking-[0.16em] text-taupe/80">
                      Tap to play
                    </span>
                  )}
                </div>
              </div>

              {/* Mute button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-taupe transition-colors hover:bg-sand/40 hover:text-walnut"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
