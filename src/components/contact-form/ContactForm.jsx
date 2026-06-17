import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import DatePicker from "../ui/DatePicker";
import PhoneInput from "../ui/PhoneInput";
import LocationSelect from "../ui/LocationSelect";

/* ── ANIMATION VARIANTS ── */
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

/* ── VALIDATION HELPERS ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIGITS_ONLY = /^\d+$/;

function validateForm(data) {
  const errs = {};

  if (!data.coupleName.trim()) errs.coupleName = "Required";
  if (!data.email.trim()) errs.email = "Required";
  else if (!EMAIL_RE.test(data.email)) errs.email = "Enter a valid email address";
  if (data.phone && data.phone.replace(/\s/g, "").length < 10)
    errs.phone = "Enter a full 10-digit number";
  if (!data.eventDateRange?.from) errs.eventDateRange = "Required";
  if (!data.location.trim()) errs.location = "Required";
  if (data.guestCount && !DIGITS_ONLY.test(data.guestCount))
    errs.guestCount = "Numbers only";

  return errs;
}

/* ── FIELD COMPONENT ── */
function CustomField({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
  value,
  onChange,
  error,
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  const hasError = !!error;

  return (
    <div className="relative group mb-8 sm:mb-10">
      <label
        htmlFor={name}
        className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 mb-3 ${
          focused ? "text-cinnamon-400" : hasError ? "text-ember-400" : "text-taupe/60"
        }`}
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
          className={`w-full bg-transparent border-b py-3 font-serif italic text-lg sm:text-xl text-walnut outline-none transition-all duration-500 placeholder:text-taupe/20 resize-none ${
            hasError ? "border-ember-300/60" : "border-taupe/20 focus:border-walnut"
          }`}
        />
        {name === "guestCount" && (
          <input
            type="hidden"
            inputMode="numeric"
            pattern="[0-9]*"
            readOnly
            aria-hidden="true"
          />
        )}
        <motion.div
          className="absolute bottom-0 left-0 h-[1.5px] bg-cinnamon-400 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-2 font-sans text-[11px] tracking-wide text-ember-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    coupleName: "",
    email: "",
    phone: "",
    eventDateRange: { from: null, to: null },
    eventLocation: "",
    location: "",
    eventDetails: "",
    guestCount: "",
    moodboard: "",
    referral: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.1 });

  const update = (field) => (e) => {
    const val = e.target?.value ?? e;

    if (field === "guestCount" && val !== "") {
      if (!/^\d+$/.test(val)) return;
    }

    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLocationChange = useCallback(
    (val) => {
      setFormData((prev) => ({ ...prev, location: val }));
      if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
    },
    [errors.location]
  );

  const handlePhoneChange = (val) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handleDateRangeChange = (range) => {
    setFormData((prev) => ({ ...prev, eventDateRange: range }));
    if (errors.eventDateRange) setErrors((prev) => ({ ...prev, eventDateRange: "" }));
  };

  const handleBlur = (field) => () => {
    if (field === "email" && formData.email && !EMAIL_RE.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        coupleName: "",
        email: "",
        phone: "",
        eventDateRange: { from: null, to: null },
        eventLocation: "",
        location: "",
        eventDetails: "",
        guestCount: "",
        moodboard: "",
        referral: "",
      });
      setErrors({});
      setCountryCode("+91");
    }, 8000);
  };

  return (
    <section className="relative py-[clamp(5rem,10vw,10rem)] px-6 sm:px-10 bg-parchment overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] rounded-full bg-cinnamon-200/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-cinnamon-100/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="font-sans text-[11px] uppercase tracking-[0.5em] text-cinnamon-400 block mb-6"
          >
            Inquiry & Bookings
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] tracking-tighter text-walnut font-thin"
          >
            Let&rsquo;s create something{" "}
            <span className="italic text-cinnamon-300">beautiful</span>.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-32 space-y-20">
              <div className="space-y-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <motion.h4
                    variants={fadeUp}
                    className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-300/60 mb-8"
                  >
                    Reach Out
                  </motion.h4>
                  <div className="space-y-6">
                    <motion.a
                      variants={fadeUp}
                      href="mailto:hello@panigrahna.com"
                      className="group flex items-center gap-4 text-walnut hover:text-cinnamon-400 transition-colors duration-500"
                    >
                      <div className="w-10 h-10 rounded-full border border-taupe/20 flex items-center justify-center group-hover:border-cinnamon-400/30 transition-colors">
                        <Mail size={16} />
                      </div>
                      <span className="font-serif italic text-xl">
                        hello@panigrahna.com
                      </span>
                    </motion.a>
                    <motion.a
                      variants={fadeUp}
                      href="tel:+919876543210"
                      className="group flex items-center gap-4 text-walnut hover:text-cinnamon-400 transition-colors duration-500"
                    >
                      <div className="w-10 h-10 rounded-full border border-taupe/20 flex items-center justify-center group-hover:border-cinnamon-400/30 transition-colors">
                        <Phone size={16} />
                      </div>
                      <span className="font-serif italic text-xl">
                        +91 98765 43210
                      </span>
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <motion.h4
                    variants={fadeUp}
                    className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-300/60 mb-8"
                  >
                    Visit Us
                  </motion.h4>
                  <div className="space-y-8">
                    <motion.div variants={fadeUp} className="flex gap-4">
                      <MapPin size={18} className="text-cinnamon-300 shrink-0 mt-1" />
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-wider text-taupe mb-2">
                          Mumbai Studio
                        </p>
                        <address className="not-italic font-serif text-lg text-walnut leading-snug">
                          1171-1172, Solitaire Corporate Park,
                          <br />
                          Andheri (E), Mumbai 400093
                        </address>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeUp} className="flex gap-4">
                      <MapPin size={18} className="text-cinnamon-300 shrink-0 mt-1" />
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-wider text-taupe mb-2">
                          Surat Studio
                        </p>
                        <address className="not-italic font-serif text-lg text-walnut leading-snug">
                          HG1, SNS Platina, Near Vesu,
                          <br />
                          Surat, GJ 395007
                        </address>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <motion.h4
                    variants={fadeUp}
                    className="font-sans text-[10px] font-bold uppercase tracking-[4px] text-cinnamon-300/60 mb-8"
                  >
                    Follow
                  </motion.h4>
                  <div className="flex gap-4">
                    {["Instagram", "Facebook", "Pinterest"].map((social) => (
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

              <motion.div
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block aspect-[4/5] bg-walnut overflow-hidden rounded-sm"
              >
                <img
                  src="https://i.pinimg.com/1200x/26/f1/51/26f15116730ed7a348f067e4ed9fb9b2.jpg"
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
                  alt="Atmospheric"
                />
              </motion.div>
            </div>
          </aside>

          {/* ── RIGHT: FORM ── */}
          <main className="lg:col-span-8 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 lg:py-32 bg-white/40 backdrop-blur-sm rounded-sm px-8"
                >
                  <div className="w-24 h-24 rounded-full border border-cinnamon-300 flex items-center justify-center mb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        delay: 0.2,
                      }}
                    >
                      <Send className="text-cinnamon-400" size={32} />
                    </motion.div>
                  </div>
                  <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-walnut font-light mb-6">
                    Thank You.
                  </h2>
                  <p className="font-sans text-taupe text-lg max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received with gratitude. <br />
                    We will connect with you within 24–48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-12 font-sans text-[11px] uppercase tracking-widest text-cinnamon-400 hover:text-walnut transition-colors cursor-pointer"
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
                        <CustomField
                          label="Name of the Couple"
                          name="coupleName"
                          required
                          placeholder="Rahul & Jeevani"
                          value={formData.coupleName}
                          onChange={update("coupleName")}
                          error={errors.coupleName}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <CustomField
                          label="Email Address"
                          name="email"
                          type="email"
                          required
                          placeholder="hello@example.com"
                          value={formData.email}
                          onChange={update("email")}
                          onBlur={handleBlur("email")}
                          error={errors.email}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <PhoneInput
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          countryCode={countryCode}
                          onCountryCodeChange={setCountryCode}
                          error={errors.phone}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp} className="md:col-span-1">
                        <div className="mb-4 sm:mb-6">
                          <DatePicker
                            label="Date of Events"
                            mode="range"
                            required
                            disablePast
                            value={formData.eventDateRange}
                            onChange={handleDateRangeChange}
                            variant="minimal"
                          />
                          <AnimatePresence>
                            {errors.eventDateRange && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.25 }}
                                className="mt-2 font-sans text-[11px] tracking-wide text-ember-400"
                              >
                                {errors.eventDateRange}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp} className="md:col-span-2">
                        <CustomField
                          label="Event Location"
                          name="eventLocation"
                          placeholder="Venue name, resort, or property"
                          value={formData.eventLocation}
                          onChange={update("eventLocation")}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp} className="md:col-span-2">
                        <LocationSelect
                          onLocationChange={handleLocationChange}
                          error={errors.location}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp} className="md:col-span-2">
                        <CustomField
                          label="Event Details"
                          name="eventDetails"
                          textarea
                          placeholder="Share your vision for the celebrations..."
                          value={formData.eventDetails}
                          onChange={update("eventDetails")}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <CustomField
                          label="Guest Count"
                          name="guestCount"
                          placeholder="200"
                          value={formData.guestCount}
                          onChange={update("guestCount")}
                          error={errors.guestCount}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <CustomField
                          label="How did you hear about us?"
                          name="referral"
                          placeholder="Instagram, Friend, etc."
                          value={formData.referral}
                          onChange={update("referral")}
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={fadeUp} className="pt-10">
                      <button
                        type="submit"
                        className="group relative inline-flex h-14 w-full md:w-52 items-center justify-center overflow-hidden rounded-full bg-walnut text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] cursor-pointer"
                      >
                        <div className="relative z-10 flex items-center gap-3">
                          <span className="font-sans text-[11px] uppercase tracking-[4px]">
                            Send Inquiry
                          </span>
                          <ArrowUpRight
                            size={18}
                            className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
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
  );
}
