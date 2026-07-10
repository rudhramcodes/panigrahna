import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { rawCloudinaryUrl, RAW_VERSION } from "../../lib/cloudinary";

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
      <div className="flex h-full items-stretch gap-5 overflow-x-auto px-6 pb-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <button
            key={item.text}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            onClick={() => onCoupleClick?.(index)}
            className="group flex h-full w-[78vw] max-w-[320px] shrink-0 flex-col text-left opacity-0"
            type="button"
          >
            <span className="relative block min-h-0 flex-1 overflow-hidden rounded-[18px] bg-sand/50 ">
              <img
                src={rawCloudinaryUrl(item.publicId, item.version || RAW_VERSION)}
                alt={item.text}
                className="h-full w-full object-cover transition-transform duration-700 group-active:scale-[1.025]"
                loading="eager"
                fetchPriority={index < 3 ? "high" : "auto"}
                decoding="async"
                draggable={false}
              />
            </span>

            <span className="mt-3 shrink-0 font-serif text-[1.08rem] font-light leading-tight text-walnut">
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
