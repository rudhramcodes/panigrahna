import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { rawCloudinaryUrl, RAW_VERSION } from "../../lib/cloudinary";

const VIDEO_BASE = "https://res.cloudinary.com/dvsrgdyi7/video/upload";

const IMG_800 = [
  "PS2.jpg",
  "rj.mp4",
  "PS3.jpg",
  "PS5.jpg",
  "uncle-vid.mp4",
  "PS6.jpg",
  "PS7.jpg",
  "PS8.jpg",
  "prachi-dad.mp4",
  "PS9.jpg",
];

const COLUMNS = [
  { indices: [0, 1, 2], yMul: 2, offset: "-45%" },
  { indices: [3, 4, 5], yMul: 3.3, offset: "-95%" },
  { indices: [6, 7], yMul: 1.25, offset: "-45%" },
  { indices: [8, 9], yMul: 3, offset: "-75%" },
];

function Column({ images, y, offset }) {
  return (
    <motion.div
      className="relative h-full w-full min-w-[180px] flex-1 flex flex-col gap-[2vw]"
      style={{ y, top: offset }}
    >
      {images.map((publicId) => (
        <div key={publicId} className="relative flex-1 rounded-[1vw] overflow-hidden">
          {publicId.endsWith(".mp4") ? (
            <video
              src={`${VIDEO_BASE}/${RAW_VERSION}/${publicId}`}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              onLoadedMetadata={(e) => { if (publicId === "rj.mp4") e.target.playbackRate = 0.5; }}
            />
          ) : (
            <img
              src={rawCloudinaryUrl(publicId)}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default function Projects() {
  const galleryRef = useRef(null);
  const [winH, setWinH] = useState(0);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const resize = () => setWinH(window.innerHeight);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, winH * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, winH * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, winH * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, winH * 3]);

  const yVals = [y1, y2, y3, y4];

  return (
    <section className="hidden md:block w-full">
      <div
        ref={galleryRef}
        className="relative w-full overflow-hidden flex flex-wrap lg:flex-nowrap gap-[2vw] p-[2vw] bg-cinnamon-100/50"
        style={{ height: "175vh" }}
      >
        {COLUMNS.map((col, i) => (
          <Column
            key={i}
            images={col.indices.map((idx) => IMG_800[idx])}
            y={yVals[i]}
            offset={col.offset}
          />
        ))}
      </div>
    </section>
  );
}
