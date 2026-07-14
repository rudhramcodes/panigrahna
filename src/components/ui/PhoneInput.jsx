import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check } from "lucide-react";

/* ─────────────────────────────────────────────
   COUNTRY CODES (common)
   ───────────────────────────────────────────── */
const COUNTRY_CODES = [
  { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", country: "Albania", flag: "🇦🇱" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+357", country: "Cyprus", flag: "🇨🇾" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+995", country: "Georgia", flag: "🇬🇪" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "Iraq", flag: "🇮🇶" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+960", country: "Maldives", flag: "🇲🇻" },
  { code: "+356", country: "Malta", flag: "🇲🇹" },
  { code: "+230", country: "Mauritius", flag: "🇲🇺" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+967", country: "Yemen", flag: "🇾🇪" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
];

/* ─────────────────────────────────────────────
   FORMAT PHONE NUMBER  →  XXXXX XXXXX
   ───────────────────────────────────────────── */
function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/* ─────────────────────────────────────────────
   PHONE INPUT COMPONENT
   ───────────────────────────────────────────── */
export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  error,
  focused,
  onFocus,
  onBlur,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const selected = useMemo(
    () => COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0],
    [countryCode]
  );

  const filtered = useMemo(
    () =>
      search.trim()
        ? COUNTRY_CODES.filter(
            (c) =>
              c.country.toLowerCase().includes(search.toLowerCase()) ||
              c.code.includes(search)
          )
        : COUNTRY_CODES,
    [search]
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const handleInputChange = (e) => {
    const raw = e.target.value;
    // Allow only digits and spaces, but we manage formatting ourselves
    const formatted = formatPhone(raw);
    onChange(formatted);
  };

  const handleKeyDown = (e) => {
    // Prevent non-digit input
    if (e.key.length === 1 && !/\d/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  const hasError = !!error;

  return (
    <div className="relative group mb-8 sm:mb-10">
      <label
        className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 mb-3 ${
          focused ? "text-cinnamon-400" : "text-taupe/60"
        }`}
      >
        Phone Number
      </label>

      <div className="relative flex items-stretch">
        {/* ── Country Code Selector ── */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => { setOpen(!open); setSearch(""); }}
            className={`h-full flex items-center gap-1.5 px-3 border-b transition-all duration-500 font-sans text-sm tracking-wide ${
              hasError
                ? "border-ember-300/60 text-ember-400"
                : focused
                  ? "border-cinnamon-400 text-cinnamon-400"
                  : "border-taupe/20 text-taupe/70"
            }`}
          >
            <span className="text-base leading-none">{selected.flag}</span>
            <span className="text-xs font-medium">{selected.code}</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 z-50 mt-2 w-72 bg-ivory border border-taupe/10 rounded-sm shadow-xl shadow-walnut/10 max-h-72 overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
              >
                {/* Search - sticky at top */}
                <div className="sticky top-0 bg-ivory border-b border-taupe/10 z-10 rounded-t-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe/40" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search country…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent pl-9 pr-3 py-2.5 font-sans text-sm text-walnut outline-none placeholder:text-taupe/30"
                  />
                </div>

                {filtered.length === 0 ? (
                  <p className="py-6 text-center font-sans text-sm text-taupe/50">No results</p>
                ) : (
                  filtered.map((c) => {
                    const isSelected = c.code === countryCode;
                    return (
                      <button
                        key={`${c.code}-${c.country}`}
                        type="button"
                        onClick={() => {
                          onCountryCodeChange(c.code);
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200 font-sans text-sm ${
                          isSelected
                            ? "bg-cinnamon-100/60 text-cinnamon-500"
                            : "text-walnut hover:bg-sand/20"
                        }`}
                      >
                        <span className="text-base">{c.flag}</span>
                        <span className="flex-1">{c.country}</span>
                        <span className="text-taupe/50 text-xs">{c.code}</span>
                        {isSelected && <Check size={14} className="text-cinnamon-400 shrink-0" />}
                      </button>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Phone Number Input ── */}
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="98765 43210"
            autoComplete="tel-national"
            className={`w-full bg-transparent border-b py-3 pl-3 font-serif italic text-lg sm:text-xl text-walnut outline-none transition-all duration-500 placeholder:text-taupe/20 resize-none ${
              hasError ? "border-ember-300/60" : "border-taupe/20 focus:border-walnut"
            }`}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[1.5px] bg-cinnamon-400 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: focused ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* ── Error Message ── */}
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
