import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2, AlertCircle, Search } from "lucide-react";

/* ─────────────────────────────────────────────
   SELECT DROPDOWN with search
   ───────────────────────────────────────────── */

function SelectDropdown({
  label,
  value,
  options,
  placeholder,
  onChange,
  loading,
  error: apiError,
  disabled,
  focusedField,
  onFocus,
  onBlur,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter((opt) => {
      const s = typeof opt === "string" ? opt : opt.name || String(opt);
      return s.toLowerCase().includes(q);
    });
  }, [search, options]);

  const hasItems = options.length > 0;
  const hasFilteredItems = filtered.length > 0;
  const isFocused = focusedField === label;

  return (
    <div className="relative group mb-8 sm:mb-10" ref={ref}>
      <label
        className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 mb-3 ${
          isFocused ? "text-cinnamon-400" : "text-taupe/60"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => { if (!disabled) { setOpen(!open); setSearch(""); } onFocus?.(); }}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full flex items-center justify-between bg-transparent border-b py-3 font-serif italic text-lg sm:text-xl outline-none transition-all duration-500 text-left ${
            disabled
              ? "border-taupe/10 text-taupe/30 cursor-not-allowed"
              : value
                ? "border-taupe/20 text-walnut cursor-pointer"
                : "border-taupe/20 text-taupe/40 cursor-pointer"
          } ${!disabled && isFocused ? "border-walnut" : ""}`}
        >
          <span className={value ? "text-walnut" : "text-taupe/30"}>
            {loading ? (
              <span className="flex items-center gap-2 italic text-taupe/40">
                <Loader2 size={14} className="animate-spin" />
                Loading…
              </span>
            ) : value ? (
              value
            ) : (
              placeholder
            )}
          </span>
          {!loading && !disabled && (
            <ChevronDown
              size={16}
              className={`text-taupe/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          )}
        </button>

        <motion.div
          className="absolute bottom-0 left-0 h-[1.5px] bg-cinnamon-400 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        <AnimatePresence>
          {open && !disabled && !loading && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 z-50 mt-2 w-full bg-ivory border border-taupe/10 rounded-sm shadow-xl shadow-walnut/10 max-h-72 overflow-y-auto overflow-x-hidden overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              {/* Search - sticky at top */}
              {hasItems && (
                <div className="sticky top-0 bg-ivory border-b border-taupe/10 z-10 rounded-t-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe/40" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder={`Search ${label.toLowerCase()}…`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent pl-9 pr-3 py-2.5 font-sans text-sm text-walnut outline-none placeholder:text-taupe/30"
                  />
                </div>
              )}

              {!hasItems ? (
                <p className="py-6 text-center font-sans text-sm text-taupe/50">No options</p>
              ) : !hasFilteredItems ? (
                <p className="py-6 text-center font-sans text-sm text-taupe/50">No results for "{search}"</p>
              ) : (
                filtered.map((opt) => {
                  const labelStr = typeof opt === "string" ? opt : opt.name || String(opt);
                  const isSelected = labelStr === value;
                  return (
                    <button
                      key={labelStr}
                      type="button"
                      onClick={() => { onChange(labelStr); setOpen(false); setSearch(""); }}
                      className={`w-full text-left px-4 py-2.5 font-serif italic text-base truncate transition-colors duration-200 ${
                        isSelected
                          ? "bg-cinnamon-100/60 text-cinnamon-500"
                          : "text-walnut hover:bg-sand/20"
                      }`}
                    >
                      {labelStr}
                    </button>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {apiError && (
          <p className="mt-1 flex items-center gap-1.5 font-sans text-[11px] tracking-wide text-amber-600">
            <AlertCircle size={12} />
            {apiError}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN LOCATION SELECT
   ───────────────────────────────────────────── */
export default function LocationSelect({ onLocationChange, error }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [focused, setFocused] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [loading, setLoading] = useState({ countries: false, states: false, cities: false });
  const [apiError, setApiError] = useState({ countries: "", states: "", cities: "" });
  const [manualMode, setManualMode] = useState(false);

  /* ── Fetch Countries ── */
  useEffect(() => {
    let cancelled = false;
    setLoading((p) => ({ ...p, countries: true }));
    setApiError((p) => ({ ...p, countries: "" }));

    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.msg || "API error");
        const list = (data.data || [])
          .map((c) => c.country)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setCountries(list);
        /* Auto-select India as default */
        if (list.includes("India") && !selectedCountry) {
          setSelectedCountry("India");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setApiError((p) => ({ ...p, countries: "Could not load countries" }));
          setManualMode(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading((p) => ({ ...p, countries: false }));
      });

    return () => { cancelled = true; };
  }, []);

  /* ── Fetch States ── */
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setSelectedState("");
      setSelectedCity("");
      setCities([]);
      return;
    }

    let cancelled = false;
    setLoading((p) => ({ ...p, states: true }));
    setApiError((p) => ({ ...p, states: "" }));
    setSelectedState("");
    setSelectedCity("");
    setCities([]);

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selectedCountry }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.msg || "API error");
        const list = (data.data?.states || []).map((s) => s.name).filter(Boolean).sort();
        setStates(list);
      })
      .catch(() => {
        if (!cancelled) {
          setApiError((p) => ({ ...p, states: "Could not load states" }));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading((p) => ({ ...p, states: false }));
      });

    return () => { cancelled = true; };
  }, [selectedCountry]);

  /* ── Fetch Cities ── */
  useEffect(() => {
    if (!selectedCountry || !selectedState) {
      setCities([]);
      setSelectedCity("");
      return;
    }

    let cancelled = false;
    setLoading((p) => ({ ...p, cities: true }));
    setApiError((p) => ({ ...p, cities: "" }));
    setSelectedCity("");

    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selectedCountry, state: selectedState }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.msg || "API error");
        const list = (data.data || []).filter(Boolean).sort();
        setCities(list);
      })
      .catch(() => {
        if (!cancelled) {
          setApiError((p) => ({ ...p, cities: "Could not load cities" }));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading((p) => ({ ...p, cities: false }));
      });

    return () => { cancelled = true; };
  }, [selectedCountry, selectedState]);

  /* ── Build location string ── */
  useEffect(() => {
    const parts = [selectedCity, selectedState, selectedCountry].filter(Boolean);
    onLocationChange(parts.join(", "));
  }, [selectedCity, selectedState, selectedCountry, onLocationChange]);

  const hasError = !!error;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
        <SelectDropdown
          label="Country"
          value={selectedCountry}
          options={countries}
          placeholder={loading.countries ? "Loading…" : "Select country"}
          onChange={(v) => { setSelectedCountry(v); }}
          loading={loading.countries}
          error={apiError.countries}
          disabled={manualMode && apiError.countries !== ""}
          focusedField={focused}
          onFocus={() => setFocused("Country")}
          onBlur={() => setFocused(null)}
        />

        <SelectDropdown
          label="State"
          value={selectedState}
          options={states}
          placeholder={!selectedCountry ? "Select country first" : loading.states ? "Loading…" : "Select state"}
          onChange={(v) => { setSelectedState(v); }}
          loading={loading.states}
          error={apiError.states}
          disabled={!selectedCountry}
          focusedField={focused}
          onFocus={() => setFocused("State")}
          onBlur={() => setFocused(null)}
        />

        <SelectDropdown
          label="City"
          value={selectedCity}
          options={cities}
          placeholder={!selectedState ? "Select state first" : loading.cities ? "Loading…" : "Select city"}
          onChange={(v) => { setSelectedCity(v); }}
          loading={loading.cities}
          error={apiError.cities}
          disabled={!selectedState}
          focusedField={focused}
          onFocus={() => setFocused("City")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Error */}
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
