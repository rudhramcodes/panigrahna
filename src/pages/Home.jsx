import { useState, useEffect } from "react";
import SEO from "../components/ui/SEO";
import PanigrahnLoader from "../components/loader/Loader";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/About";
import Projects from "../components/projects/Projects";
import Project2 from "../components/projects/project2";
import Films from "../components/films/Films";
import BridesGrooms from "../components/brides-grooms/BridesGrooms";
import ContactForm from "../components/contact-form/ContactForm";
import Footer from "../components/footer/Footer";

const LOADER_KEY = "p_loader_played";

function ContentSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <section id="hero"><Hero /></section>
      <section id="about"><AboutSection /></section>
      <Projects />
      <section id="projects"><Project2 /></section>
      <section id="films"><Films /></section>
      <section id="brides-grooms"><BridesGrooms /></section>
      <section id="contact"><ContactForm /></section>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Best Wedding Photographer in Mumbai"
        description="Book the best wedding photographer in Mumbai. Panigrahna offers candid wedding photography, cinematic wedding films, and full wedding planning for traditional Hindu weddings across India."
        schema={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "Organization"],
          "name": "Panigrahna",
          "description": "Traditional wedding photography and planning services in Mumbai",
          "url": "https://panigrahna.com",
          "image": "https://panigrahna.com/images/og-image.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mumbai",
            "addressCountry": "IN"
          },
          "serviceType": ["Wedding Photography", "Wedding Planning", "Wedding Cinematography", "Event Management"],
          "areaServed": ["Mumbai", "Surat", "Delhi", "Goa", "Jaipur", "Udaipur", "India"]
        }}
      />
      <HomeContent />
    </>
  );
}

function HomeContent() {
  const [loaderDone, setLoaderDone] = useState(
    () => sessionStorage.getItem(LOADER_KEY) === "true"
  );
  const [showContent, setShowContent] = useState(
    () => sessionStorage.getItem(LOADER_KEY) === "true"
  );

  useEffect(() => {
    if (loaderDone && !sessionStorage.getItem(LOADER_KEY)) {
      sessionStorage.setItem(LOADER_KEY, "true");
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loaderDone]);

  return (
    <>
      {!showContent ? (
        <PanigrahnLoader onComplete={() => setLoaderDone(true)} />
      ) : (
        <ContentSection />
      )}
    </>
  );
}

