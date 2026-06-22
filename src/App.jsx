import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import Navbar from "./components/navbar/Navbar";
import BackToTop from "./components/ui/BackToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import BridesPage from "./pages/BridesPage";
import GroomsPage from "./pages/GroomsPage";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!scroll()) {
        const timer = setTimeout(() => {
          scroll();
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash]);

  return null;
}

const App = () => {
  return (
    <>
      <ScrollManager />
      <SmoothScroll>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brides" element={<BridesPage />} />
          <Route path="/grooms" element={<GroomsPage />} />
        </Routes>
        <BackToTop />
      </SmoothScroll>
    </>
  );
};

export default App;
