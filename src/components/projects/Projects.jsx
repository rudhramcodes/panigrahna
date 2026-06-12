import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import CldImage from "../ui/CldImage";

const IMG_800 = [
  "TKS05269_1_yvjsbn.jpg",
  "TKS05296_1_houjrv.jpg",
  "TKS05280_1_otriau.jpg",
  "TKS05350_1_icb4yl.jpg",
  "TKS05320_1_iljauy.jpg",
  "DSC06503_1_qx8pds.jpg",
  "DSC06398_1_chgpws.jpg",
  "DSC06360_1_yfjfkb.jpg",
  "DSC06642_1_lhpqi2.jpg",
  "DSC06501_1_czy9w8.jpg",
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
          <CldImage
            publicId={publicId}
            alt=""
            width={800}
            wrapperClassName="w-full h-full"
            imgClassName="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
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
        className="relative w-full overflow-hidden flex flex-wrap lg:flex-nowrap gap-[2vw] p-[2vw] bg-sand/50"
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
