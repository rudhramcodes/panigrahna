import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { formatAudioTime } from "../../lib/audio";

export default function SoundtrackPlayer({ soundtrack }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setError("");
      await audio.play();
    } catch {
      setError("Playback unavailable");
    }
  };

  const seek = (event) => {
    const time = Number(event.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const reset = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setPlaying(false);
  };

  return (
    <div className="mx-auto mt-6 flex w-full max-w-[620px] flex-wrap items-center gap-3 rounded-2xl border border-walnut/15 bg-parchment/75 p-2.5 text-left shadow-[0_10px_30px_rgba(61,43,26,0.05)] sm:flex-nowrap sm:rounded-full sm:pr-4">
      <audio
        ref={audioRef}
        src={soundtrack.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onEnded={reset}
        onError={() => setError("Audio unavailable")}
      />

      <button
        type="button"
        onClick={togglePlayback}
        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-walnut text-ivory transition-colors duration-300 hover:bg-cinnamon-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-parchment"
        aria-label={playing ? `Pause ${soundtrack.title}` : `Play ${soundtrack.title}`}
      >
        {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" className="translate-x-px" />}
      </button>

      <div className="min-w-0 flex-1 px-1 sm:max-w-[170px]">
        <p className="truncate font-serif text-[1rem] font-medium leading-tight text-walnut">
          {soundtrack.title}
        </p>
        <p className="mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.2em] text-taupe" aria-live="polite">
          {error || soundtrack.label}
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
  );
}
