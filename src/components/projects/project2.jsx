import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTimeline } from 'animejs';
import { rawCloudinaryUrl, RAW_VERSION } from '../../lib/cloudinary';
import { COUPLES } from '../../data/couples';
import CircularGallery from "./CircularGallery";
import MobileGallery from "./MobileGallery";
import MaskText from "../mask-text/MaskText";

export default function Project2() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleCoupleClick = useCallback(
    (coupleIndex) => {
      navigate(`/projects/${COUPLES[coupleIndex].slug}`);
    },
    [navigate]
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const label = el.querySelector('.header-label');
    const desc = el.querySelector('.header-desc');
    const tl = createTimeline({
      defaults: { ease: 'outCubic', duration: 800 },
    })
    if (label) tl.add(label, { opacity: [0, 1], translateY: [16, 0] }, 0);
    if (desc) tl.add(desc, { opacity: [0, 1], translateY: [12, 0] }, 200);
    return () => { if (tl) tl.cancel?.(); };
  }, []);

  const mobileItems = useMemo(
    () =>
      COUPLES.map((c) => ({
        publicId: c.coverPublicId,
        version: c.coverVersion,
        text: c.name,
      })),
    []
  );

  const galleryItems = useMemo(
    () =>
      COUPLES.map((c) => ({
        image: rawCloudinaryUrl(c.coverPublicId, c.coverVersion || RAW_VERSION),
        placeholder: rawCloudinaryUrl(c.coverPublicId, c.coverVersion || RAW_VERSION),
        text: c.name,
      })),
    []
  );

  return (
    <section
      className="relative flex flex-col w-full bg-sand/50 overflow-hidden select-none"
      style={{ height: "100dvh", minHeight: isMobile ? "680px" : "620px" }}
    >
      <div ref={headerRef} className="shrink-0 px-6 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-12 md:pt-24 pb-3 sm:pb-3 md:pb-4 lg:text-center text-left">
        <span className="header-label block font-serif text-taupe text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1.5 sm:mb-3">
          Our Couples
        </span>
        <MaskText
          outerTag="h2"
          tag="span"
          amount={0.5}
          className="font-serif text-walnut font-thin leading-none tracking-tight"
          outerStyle={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
          lines={[<span key="stories">Every Story <span className="italic text-[#c8a882]">Deserves</span> to Be Remembered.</span>]}
        />
        <p className="header-desc font-sans text-taupe/80 text-xs sm:text-base max-w-xl mt-3 leading-relaxed font-light lg:mx-auto">
          Every couple has a story worth telling. Through our lens, we capture
          the quiet glances, the laughter, and the love that makes each journey
          unique.
        </p>
      </div>

      <div className="flex-1 relative min-h-0">
        {isMobile ? (
          <MobileGallery items={mobileItems} onCoupleClick={handleCoupleClick} />
        ) : (
          <CircularGallery
            items={galleryItems}
            bend={2.5}
            borderRadius={0.06}
            font="300 22px Berlingske Serif"
            textColor="#3d2b1a"
            scrollSpeed={2}
            scrollEase={0.05}
            onItemClick={handleCoupleClick}
          />
        )}
      </div>
    </section>
  );
}
