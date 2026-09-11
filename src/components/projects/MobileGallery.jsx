import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ArrowUpRight } from "lucide-react";
import { rawCloudinaryUrl, RAW_VERSION } from "../../lib/cloudinary";

const VIDEO_BASE = "https://res.cloudinary.com/dvsrgdyi7/video/upload";

export default function MobileGallery({ items, onCoupleClick }) {
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const intro = animate(cards, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: stagger(70),
      duration: 650,
      ease: "outCubic",
    });

    return () => intro.cancel?.();
  }, [items.length]);

  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div className="flex h-full items-stretch gap-4 overflow-x-auto px-6 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <button
            key={item.text}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            onClick={() => onCoupleClick?.(index)}
            className="group flex h-full w-[78vw] max-w-[310px] shrink-0 cursor-pointer flex-col text-left opacity-0 transition-transform duration-200 active:scale-[0.98]"
            type="button"
          >
            <span className="relative block min-h-0 flex-1 overflow-hidden rounded-[14px] bg-sandstone-200 shadow-sm ring-1 ring-walnut/5">
              {item.videoId ? (
                <video
                  src={`${VIDEO_BASE}/${item.version || RAW_VERSION}/${item.videoId}`}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                />
              ) : (
                <img
                  src={rawCloudinaryUrl(item.publicId, item.version || RAW_VERSION)}
                  alt={item.text}
                  className="h-full w-full object-cover transition-transform duration-700 group-active:scale-[1.025]"
                  loading="eager"
                  fetchPriority={index < 3 ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                />
              )}

              {/* Story badge */}
              <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-walnut/55 px-2.5 py-0.5 font-sans text-[9px] font-semibold tracking-[0.2em] uppercase text-ivory/95 backdrop-blur-md">
                Story / {String(index + 1).padStart(2, "0")}
              </span>

              {/* Editorial circular view button */}
              <span className="pointer-events-none absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ivory/85 text-walnut shadow-sm backdrop-blur-md transition-all duration-300 group-active:scale-90">
                <ArrowUpRight size={13} strokeWidth={1.6} />
              </span>
            </span>

            {/* Editorial couple caption */}
            <div className="mt-2.5 flex shrink-0 items-baseline justify-between px-0.5">
              <span className="font-serif text-[1.12rem] font-light leading-snug tracking-tight text-walnut">
                {item.text}
              </span>
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-cinnamon-400 transition-colors group-active:text-cinnamon-500">
                <span>View</span>
                <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-active:translate-x-0.5 group-active:-translate-y-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
