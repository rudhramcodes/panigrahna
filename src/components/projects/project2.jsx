import { useState, useEffect } from 'react';
import { cloudinaryUrl } from "../../lib/cloudinary";
import CircularGallery from "./CircularGallery";
import MobileCarousel from "./MobileCarousel";

const COUPLES = [
  { name: "Harsh & Sayonee", image: "TKS05225_1_jyeotg.jpg" },
  { name: "Rahul & Jeevani", image: "DSC04563_1_foxptm.jpg" },
  { name: "Prachi & Preet", image: "DSC06503_1_qx8pds.jpg" },
  { name: "Ronak & Jessica", image: "TKS05350_1_icb4yl.jpg" },
  { name: "Rutvik & Aishwarya", image: "HRS_6891_1_rpow6s.jpg", angle: -90 },
];

const GALLERY_ITEMS = COUPLES.map((couple) => ({
  image: cloudinaryUrl(couple.image, {
    width: 800,
    crop: "fill",
    gravity: "auto",
    angle: couple.angle,
  }),
  text: couple.name,
}));

export default function Project2() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      className="relative flex flex-col w-full bg-sand/50 overflow-hidden select-none"
      style={{ height: "100dvh", minHeight: "620px" }}
    >
      <div className="shrink-0 px-5 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-3 md:pb-4">
        <span className="block font-serif text-taupe text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-3">
          Our Couples
        </span>
        <h2
          className="font-serif text-walnut font-thin leading-none tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Stories of Love
        </h2>
        <p className="font-sans text-taupe/80 text-sm sm:text-base max-w-xl mt-3 leading-relaxed font-light">
          Every couple has a story worth telling. Through our lens, we capture
          the quiet glances, the laughter, and the love that makes each journey
          unique.
        </p>
      </div>

      <div className="flex-1 relative min-h-0">
        {isMobile ? (
          <MobileCarousel items={GALLERY_ITEMS} />
        ) : (
          <CircularGallery
            items={GALLERY_ITEMS}
            bend={3}
            borderRadius={0.05}
            font="300 22px 'Berlingske Serif'"
            textColor="#3d2b1a"
            scrollSpeed={1.7}
            scrollEase={0.05}
          />
        )}
      </div>
    </section>
  );
}
