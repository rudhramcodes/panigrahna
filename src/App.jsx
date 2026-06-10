import { useState } from "react";
import PanigrahnLoader from "./components/loader/Loader";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import AboutSection from "./components/about/About";
import Projects from "./components/projects/Projects";
import Project2 from "./components/projects/project2";
import Films from "./components/films/Films";

const App = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <SmoothScroll enabled={loaderDone}>
      {!loaderDone && <PanigrahnLoader onComplete={() => setLoaderDone(true)} />}

      <div style={{ opacity: loaderDone ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <Navbar />
        <Hero />
        <AboutSection />
        <Projects />
        <Project2 />
        <Films />
      </div>
    </SmoothScroll>
  );
};

export default App;