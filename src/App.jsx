import { useState } from "react";
import PanigrahnLoader from "./components/loader/Loader";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <SmoothScroll enabled={loaderDone}>
      {!loaderDone && <PanigrahnLoader onComplete={() => setLoaderDone(true)} />}

      <div style={{ opacity: loaderDone ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <Navbar />
        <Hero />
      </div>
    </SmoothScroll>
  );
};

export default App;