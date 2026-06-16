import { useState, useEffect } from "react";
import PanigrahnLoader from "../components/loader/Loader";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/About";
import Projects from "../components/projects/Projects";
import Project2 from "../components/projects/project2";
import Films from "../components/films/Films";
import InstagramSectionEmbed from "../components/instagram/InstagramSectionEmbed";
import Testimonial from "../components/testimonial/Testimonial";
import Footer from "../components/footer/Footer";

let loaderPlayed = false;

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(loaderPlayed);
  const [showContent, setShowContent] = useState(loaderPlayed);

  useEffect(() => {
    if (loaderDone && !loaderPlayed) {
      loaderPlayed = true;
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loaderDone]);

  return (
    <>
      {!showContent && (
        <PanigrahnLoader onComplete={() => setLoaderDone(true)} />
      )}

      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <AboutSection />
        </section>
          <Projects />
        <section id="projects">
          <Project2 />
        </section>
        <section id="films">
          <Films />
        </section>
        <InstagramSectionEmbed />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
}
