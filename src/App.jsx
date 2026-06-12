import { useState, useEffect } from "react";
import PanigrahnLoader from "./components/loader/Loader";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import AboutSection from "./components/about/About";
import Projects from "./components/projects/Projects";
import Project2 from "./components/projects/project2";
import Films from "./components/films/Films";
import InstagramSectionEmbed from "./components/instagram/InstagramSectionEmbed";
// old InstagramSection kept as backup — import InstagramSection from "./components/instagram/InstagramSection";

const App = () => {
  const [loaderDone, setLoaderDone] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (loaderDone) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loaderDone]);

  return (
    <SmoothScroll enabled={loaderDone}>
      {!showContent && (
        <PanigrahnLoader onComplete={() => setLoaderDone(true)} />
      )}

      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Navbar />
        <Hero />
        <AboutSection />
        <Projects />
        <Project2 />
        <Films />
        <InstagramSectionEmbed />
      </div>
    </SmoothScroll>
  );
};

export default App;