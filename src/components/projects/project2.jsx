import { useState, useEffect, useMemo } from 'react';
import { cloudinaryUrl, blurPlaceholder } from '../../lib/cloudinary';
import CircularGallery from "./CircularGallery";
import MobileCarousel from "./MobileCarousel";

const COUPLES = [
  { name: "Harsh & Sayonee", publicId: "TKS05225_1_jyeotg.jpg" },
  { name: "Rahul & Jeevani", publicId: "DSC04563_1_foxptm.jpg" },
  { name: "Prachi & Preet", publicId: "DSC06503_1_qx8pds.jpg" },
  { name: "Ronak & Jessica", publicId: "TKS04526_dxtewa.jpg" },
  { name: "Rutvik & Aishwarya", publicId: "HRS_6891_1_rpow6s.jpg", angle: -90 },
];

export default function Project2() {
  const [isMobile, setIsMobile] = useState(false);

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
        text: c.name,
        options: c.angle ? { angle: c.angle } : {},
      })),
    []
  );

  const galleryItems = useMemo(
    () =>
      COUPLES.map((c) => ({
        image: cloudinaryUrl(c.publicId, {
          width: 600,
          crop: 'fill',
          gravity: 'auto',
          angle: c.angle,
        }),
        placeholder: blurPlaceholder(c.publicId),
        text: c.name,
      })),
    []
  );

  return (
    <section
      className="relative flex flex-col w-full bg-sand/50 overflow-hidden select-none"
      style={{ height: "100dvh", minHeight: "620px" }}
    >
      <div className="shrink-0 px-5 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12 md:pt-24 pb-1 sm:pb-3 md:pb-4">
        <span className="block font-serif text-taupe text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-2 sm:mb-3">
          Our Couples
        </span>
        <h2
          className="font-serif text-walnut font-thin leading-none tracking-tight"
          style={{ fontSize: "clamp(1.6rem, 5vw, 4rem)" }}
        >
          Stories of Love
        </h2>
        <p className="font-sans text-taupe/80 text-sm sm:text-base max-w-xl mt-2 sm:mt-3 leading-relaxed font-light">
          Every couple has a story worth telling. Through our lens, we capture
          the quiet glances, the laughter, and the love that makes each journey
          unique.
        </p>
      </div>

      <div className="flex-1 relative min-h-0">
        {isMobile ? (
          <MobileCarousel items={mobileItems} />
        ) : (
          <CircularGallery
            items={galleryItems}
            bend={2.5}
            borderRadius={0.06}
            font="300 22px 'Berlingske Serif'"
            textColor="#3d2b1a"
            scrollSpeed={1.5}
            scrollEase={0.04}
          />
        )}
      </div>
    </section>
  );
}
