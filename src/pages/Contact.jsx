import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import DatePicker from "../components/ui/DatePicker";
import Footer from "../components/footer/Footer";
import { cloudinaryUrl, blurPlaceholder } from "../lib/cloudinary";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const reveal = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

/* ─────────────────────────────────────────────
   REFINED INPUT FIELD
   ───────────────────────────────────────────── */
function CustomField({ label, name, type = "text", required, placeholder, textarea, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative group mb-8 sm:mb-10">
      <label 
        htmlFor={name} 
        className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 mb-3 ${focused ? "text-cinnamon-400" : "text-taupe/60"}`}
      >
        {label} {required && <span className="text-cinnamon-300">*</span>}
      </label>
      <div className="relative">
        <Tag
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          rows={textarea ? 4 : undefined}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent border-b border-taupe/20 py-3 font-serif italic text-lg sm:text-xl text-walnut outline-none transition-all duration-500 placeholder:text-taupe/20 focus:border-walnut resize-none`}
        />
        <motion.div 
          className="absolute bottom-0 left-0 h-[1.5px] bg-cinnamon-400 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({
    coupleName: "",
    email: "",
    phone: "",
    weddingDate: null,
    location: "",
    eventDetails: "",
    guestCount: "",
    moodboard: "",
    referral: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.1 });

  const update = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target?.value ?? e }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        coupleName: "", email: "", phone: "", weddingDate: null,
        location: "", eventDetails: "", guestCount: "", moodboard: "", referral: ""
      });
    }, 8000);
  };

  return (
    <div className="bg-parchment min-h-screen">
      {/* ══════ HERO SECTION ══════ */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 px-6 sm:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.span 
                  variants={fadeUp} 
                  className="font-sans text-[11px] uppercase tracking-[0.5em] text-cinnamon-400 block mb-6"
                >
                  Inquiry & Bookings
                </motion.span>
                <motion.h1 
                  variants={fadeUp}
                  className="font-serif text-[clamp(3.5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-walnut font-thin mb-12"
                >
                  Tell us your <br />
                  <span className="italic text-cinnamon-300 pr-4">visual</span> 
                  story.
                </motion.h1>
              </motion.div>
            </div>
            <div className="lg:col-span-4 flex items-end">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="font-sans text-sm sm:text-base text-taupe leading-relaxed max-w-[320px] mb-4"
              >
                We accept a limited number of commissions each year to ensure every story receives our full creative devotion.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ MAIN CONTENT ══════ */}
      <section className="relative px-6 sm:px-10 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
            
            {/* ── LEFT: INFO & CONTACT ── */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-32 space-y-20">
                
                {/* Contact Links */}
                <div className="space-y-12">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                    <motion.h4 variants={fadeUp} className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-300/60 mb-8">Reach Out</motion.h4>
                    <div className="space-y-6">
                      <motion.a 
                        variants={fadeUp}
                        href="mailto:hello@panigrahna.com" 
                        className="group flex items-center gap-4 text-walnut hover:text-cinnamon-400 transition-colors duration-500"
                      >
                        <div className="w-10 h-10 rounded-full border border-taupe/20 flex items-center justify-center group-hover:border-cinnamon-400/30 transition-colors">
                          <Mail size={16} />
                        </div>
                        <span className="font-serif italic text-xl">hello@panigrahna.com</span>
                      </motion.a>
                      <motion.a 
                        variants={fadeUp}
                        href="tel:+919876543210" 
                        className="group flex items-center gap-4 text-walnut hover:text-cinnamon-400 transition-colors duration-500"
                      >
                        <div className="w-10 h-10 rounded-full border border-taupe/20 flex items-center justify-center group-hover:border-cinnamon-400/30 transition-colors">
                          <Phone size={16} />
                        </div>
                        <span className="font-serif italic text-xl">+91 98765 43210</span>
                      </motion.a>
                    </div>
                  </motion.div>

                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                    <motion.h4 variants={fadeUp} className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-300/60 mb-8">Visit Us</motion.h4>
                    <div className="space-y-8">
                      <motion.div variants={fadeUp} className="flex gap-4">
                        <MapPin size={18} className="text-cinnamon-300 shrink-0 mt-1" />
                        <div>
                          <p className="font-sans text-[11px] uppercase tracking-wider text-taupe mb-2">Mumbai Studio</p>
                          <address className="not-italic font-serif text-lg text-walnut leading-snug">
                            1171-1172, Solitaire Corporate Park,<br />
                            Andheri (E), Mumbai 400093
                          </address>
                        </div>
                      </motion.div>
                      <motion.div variants={fadeUp} className="flex gap-4">
                        <MapPin size={18} className="text-cinnamon-300 shrink-0 mt-1" />
                        <div>
                          <p className="font-sans text-[11px] uppercase tracking-wider text-taupe mb-2">Surat Studio</p>
                          <address className="not-italic font-serif text-lg text-walnut leading-snug">
                            HG1, SNS Platina, Near Vesu,<br />
                            Surat, GJ 395007
                          </address>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                    <motion.h4 variants={fadeUp} className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-300/60 mb-8">Follow</motion.h4>
                    <div className="flex gap-4">
                      {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                        <motion.a 
                          key={social}
                          variants={fadeUp}
                          href="#" 
                          className="font-serif italic text-lg text-walnut hover:text-cinnamon-400 transition-colors underline decoration-taupe/20 underline-offset-4"
                        >
                          {social}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Aesthetic Image */}
                <motion.div 
                  initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block aspect-[4/5] bg-walnut overflow-hidden rounded-sm"
                >
                  <img 
                    src={cloudinaryUrl("DSC06501_1_czy9w8", { width: 800, format: "avif" })} 
                    className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
                    alt="Atmospheric"
                  />
                </motion.div>

              </div>
            </aside>

            {/* ── RIGHT: INQUIRY FORM ── */}
            <main className="lg:col-span-8 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center py-32"
                  >
                    <div className="w-24 h-24 rounded-full border border-cinnamon-300 flex items-center justify-center mb-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                      >
                        <Send className="text-cinnamon-400" size={32} />
                      </motion.div>
                    </div>
                    <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-walnut font-light mb-6">Thank You.</h2>
                    <p className="font-sans text-taupe text-lg max-w-md mx-auto leading-relaxed">
                      Your inquiry has been received with gratitude. <br />
                      We will connect with you within 24–48 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-12 font-sans text-[11px] uppercase tracking-widest text-cinnamon-400 hover:text-walnut transition-colors"
                    >
                      Back to Form
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    ref={formRef}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={stagger}
                    className="bg-white/40 backdrop-blur-sm p-8 sm:p-12 md:p-20 rounded-sm shadow-sm"
                  >
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <motion.div variants={fadeUp} className="md:col-span-2">
                          <CustomField label="Name of the Couple" name="coupleName" required placeholder="Rahul & Jeevani" value={formData.coupleName} onChange={update("coupleName")} />
                        </motion.div>
                        
                        <motion.div variants={fadeUp}>
                          <CustomField label="Email Address" name="email" type="email" required placeholder="hello@example.com" value={formData.email} onChange={update("email")} />
                        </motion.div>
                        
                        <motion.div variants={fadeUp}>
                          <CustomField label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={update("phone")} />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                          <div className="mb-8 sm:mb-10">
                             <DatePicker label="Wedding Date" required value={formData.weddingDate} onChange={update("weddingDate")} variant="minimal" />
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                          <CustomField label="Location" name="location" placeholder="Udaipur, Rajasthan" value={formData.location} onChange={update("location")} />
                        </motion.div>

                        <motion.div variants={fadeUp} className="md:col-span-2">
                          <CustomField label="Event Details" name="eventDetails" textarea placeholder="Share your vision for the celebrations..." value={formData.eventDetails} onChange={update("eventDetails")} />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                          <CustomField label="Guest Count" name="guestCount" placeholder="200–300" value={formData.guestCount} onChange={update("guestCount")} />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                          <CustomField label="How did you hear about us?" name="referral" placeholder="Instagram, Friend, etc." value={formData.referral} onChange={update("referral")} />
                        </motion.div>
                      </div>

                      <motion.div variants={fadeUp} className="pt-10">
                        <button
                          type="submit"
                          className="group relative inline-flex h-14 w-full md:w-52 items-center justify-center overflow-hidden rounded-full bg-walnut text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
                        >
                          <div className="relative z-10 flex items-center gap-3">
                            <span className="font-sans text-[11px] uppercase tracking-[4px]">Send Inquiry</span>
                            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </div>
                          <div className="absolute inset-0 scale-0 rounded-full bg-cinnamon-400/20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
                        </button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

          </div>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
