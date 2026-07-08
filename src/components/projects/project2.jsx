import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { rawCloudinaryUrl, RAW_VERSION } from '../../lib/cloudinary';
import CircularGallery from "./CircularGallery";
import MobileGallery from "./MobileGallery";
import MaskText from "../mask-text/MaskText";

const COUPLES = [
  { name: "Harsh & Sayonee", publicId: "hs38.5.jpg", version: "v1781762717", quote: "A love story written in the stars", location: "Mumbai", date: "Dec 2024" },
  { name: "Rahul & Jeevani", publicId: "021.jpg", version: "v1781762717", quote: "Two hearts, one journey", location: "Udaipur", date: "Nov 2024" },
  { name: "Prachi & Preet", publicId: "pp2.jpg", version: "v1782208255", quote: "Where tradition meets forever", location: "Surat", date: "Oct 2024" },
  { name: "Ronak & Jessica", publicId: "rj72.jpg", version: "v1781762717", quote: "Dancing into eternity", location: "Goa", date: "Feb 2025" },
  { name: "Rutvik & Aishwarya", publicId: "ra.jpg", version: "v1781762717", quote: "A promise made in heaven", location: "Jaipur", date: "Jan 2025" },
];

export default function Project2() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const handleCoupleClick = useCallback(
    (coupleIndex) => {
      navigate("/projects", { state: { coupleIndex } });
    },
    [navigate]
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mobileItems = useMemo(
    () =>
      COUPLES.map((c) => ({
        publicId: c.publicId,
        version: c.version,
        text: c.name,
        quote: c.quote,
        location: c.location,
        date: c.date,
        options: c.angle ? { angle: c.angle } : {},
      })),
    []
  );

  const galleryItems = useMemo(
    () =>
      COUPLES.map((c) => ({
        image: rawCloudinaryUrl(c.publicId, c.version || RAW_VERSION),
        placeholder: rawCloudinaryUrl(c.publicId, c.version || RAW_VERSION),
        text: c.name,
      })),
    []
  );

  return (
    <section
      className="relative flex flex-col w-full bg-sand/50 overflow-hidden select-none"
      style={{ height: "100dvh", minHeight: "620px" }}
    >
      <div className="shrink-0 px-5 sm:px-8 md:px-12 lg:px-16 pt-6 sm:pt-12 md:pt-24 pb-4 sm:pb-3 md:pb-4 lg:text-center text-left">
        <span className="block font-serif text-taupe text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1.5 sm:mb-3">
          Our Couples
        </span>
        <MaskText
          outerTag="h2"
          tag="span"
          amount={0.5}
          className="font-serif text-walnut font-thin leading-none tracking-tight"
          outerStyle={{ fontSize: "clamp(1.4rem, 5vw, 4rem)" }}
          lines={[<span key="stories">Stories of Love</span>]}
        />
        <p className="font-sans text-taupe/80 text-sm sm:text-base max-w-xl mt-2 sm:mt-3 leading-relaxed font-light lg:mx-auto hidden sm:block">
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
            font="300 22px 'Berlingske Serif'"
            textColor="#3d2b1a"
            scrollSpeed={1.5}
            scrollEase={0.04}
            onItemClick={handleCoupleClick}
          />
        )}
      </div>
    </section>
  );
}
