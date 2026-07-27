import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useImageProtection } from "./lib/useImageProtection";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import Navbar from "./components/navbar/Navbar";
import BackToTop from "./components/ui/BackToTop";
import { PageSkeleton } from "./components/ui/SkeletonLoader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectListing = lazy(() => import("./pages/ProjectListing"));
const Contact = lazy(() => import("./pages/Contact"));
const BridesPage = lazy(() => import("./pages/BridesPage"));
const GroomsPage = lazy(() => import("./pages/GroomsPage"));
const FilmsPage = lazy(() => import("./pages/FilmsPage"));

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
  useImageProtection();
  return (
    <>
      <ScrollManager />
      <SmoothScroll>
        <Navbar />
        <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectListing />} />
          <Route path="/projects/:slug" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brides" element={<BridesPage />} />
          <Route path="/grooms" element={<GroomsPage />} />
          <Route path="/films" element={<FilmsPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        </Suspense>
        <BackToTop />
      </SmoothScroll>
    </>
  );
};

export default App;
