import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function DatePicker({
  value,
  onChange,
  label,
  required = false,
  variant = "default",
  mode = "single",
  disablePast = false,
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMinimal = variant === "minimal";
  const isRangeMode = mode === "range";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const disabledDays = (date) => {
    if (disablePast && date < today) return true;
    if (isRangeMode && value?.from && !value?.to && date < value.from) return true;
    return false;
  };

  const displayText = () => {
    if (isRangeMode) {
      if (!value?.from) return "Select dates";
      if (!value?.to) return `From ${format(value.from, "MMM d, yyyy")}`;
      return `${format(value.from, "MMM d")} \u2013 ${format(value.to, "MMM d, yyyy")}`;
    }
    return value ? format(value, "PPP") : "Select date";
  };

  const hasValue = isRangeMode ? !!value?.from : !!value;

  const handleSelect = (selected) => {
    if (!selected) {
      onChange(isRangeMode ? { from: null, to: null } : null);
      return;
    }
    if (isRangeMode) {
      /* First click sets "from". Second click (different date) completes the range. */
      if (
        selected.from &&
        selected.to &&
        selected.from.getTime() !== selected.to.getTime()
      ) {
        onChange({ from: selected.from, to: selected.to });
        setOpen(false);
      } else {
        onChange({ from: selected.from || null, to: null });
      }
    } else {
      onChange(selected);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="group relative">
      <label
        className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 mb-3 ${
          focused || open ? "text-cinnamon-400" : "text-taupe/60"
        }`}
      >
        {label}
        {required && <span className="text-cinnamon-300 ml-1">*</span>}
      </label>

      <button
        type="button"
        onClick={() => { setOpen(!open); setFocused(true); }}
        className={`w-full flex items-center justify-between outline-none transition-all duration-500 cursor-pointer ${
          isMinimal
            ? `bg-transparent border-b py-3 font-serif italic text-lg sm:text-xl ${
                hasValue ? "text-walnut border-taupe/20" : "text-taupe/20 border-taupe/20"
              }`
            : `bg-white border rounded-sm px-3 sm:px-4 py-3 sm:py-3.5 font-sans text-sm sm:text-base ${
                hasValue
                  ? "text-walnut border-taupe/15 hover:border-taupe/30"
                  : "text-taupe/25 border-taupe/15 hover:border-taupe/30"
              } ${open ? "border-cinnamon-300/50 shadow-[0_0_0_3px_rgba(201,124,46,0.08)]" : ""}`
        }`}
      >
        <span className="truncate">{displayText()}</span>
        <CalendarDays
          size={16}
          className={`shrink-0 ml-2 transition-colors duration-300 ${
            hasValue ? "text-taupe/50" : "text-taupe/20"
          } ${open ? "text-cinnamon-400" : ""}`}
        />
      </button>

      {isMinimal && (
        <motion.div
          className="absolute bottom-0 left-0 h-[1.5px] bg-cinnamon-400 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: open || focused ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 bg-ivory border border-taupe/10 rounded-sm shadow-xl shadow-walnut/10 min-w-[300px] max-w-max"
          >
            <style>{`
              .rdp-root {
                --rdp-accent-color: #c97c2e;
                --rdp-accent-background-color: #f7e8d4;
                --rdp-day-height: 42px;
                --rdp-day-width: 42px;
                --rdp-day_button-height: 42px;
                --rdp-day_button-width: 42px;
                --rdp-day_button-border-radius: 9999px;
                --rdp-today-color: #c97c2e;
                --rdp-nav-height: 2.5rem;
                --rdp-nav_button-width: 2rem;
                --rdp-nav_button-height: 2rem;
                --rdp-animation_duration: 0.25s;
                --rdp-animation_timing: cubic-bezier(0.16, 1, 0.3, 1);
              }
              .rdp-root {
                font-family: "Open Sans", sans-serif;
                font-size: 0.875rem;
                color: #3d2b1a;
              }
              .rdp-caption_label {
                font-family: "Berlingske Serif", "Georgia", serif;
                font-size: 0.95rem;
                font-weight: 500;
                color: #3d2b1a;
              }
              .rdp-day_button {
                font-size: 0.8rem;
                font-weight: 400;
                transition: background-color 0.2s ease, transform 0.15s ease;
              }
              .rdp-day_button:hover {
                background-color: #f7e8d4;
                transform: scale(1.06);
              }
              .rdp-day_button:active {
                transform: scale(0.94);
              }
              .rdp-day_button:disabled,
              .rdp-day_button[aria-disabled="true"] {
                opacity: 0.25;
                cursor: not-allowed;
                transform: none;
              }
              .rdp-day_button:disabled:hover {
                background-color: transparent;
              }
              .rdp-selected .rdp-day_button {
                background-color: #c97c2e;
                color: #fff;
                font-weight: 500;
              }
              .rdp-range_start .rdp-day_button,
              .rdp-range_end .rdp-day_button {
                background-color: #c97c2e !important;
                color: #fff !important;
                font-weight: 600;
                border-radius: 9999px;
                box-shadow: 0 2px 6px rgba(201, 124, 46, 0.35);
              }
              .rdp-range_middle {
                background-color: #f7e8d4;
              }
              .rdp-range_middle .rdp-day_button {
                background-color: #f7e8d4;
                color: #3d2b1a;
                font-weight: 450;
                border-radius: 9999px;
              }
              .rdp-range_middle .rdp-day_button:hover {
                background-color: #e8d5bc;
                transform: scale(1.06);
              }
              .rdp-today:not(.rdp-outside):not(.rdp-range_start):not(.rdp-range_end) .rdp-day_button {
                font-weight: 600;
                box-shadow: 0 0 0 1.5px #c97c2e40;
              }
              .rdp-weekday {
                font-size: 0.65rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #7a6a58;
                opacity: 0.5;
                font-weight: 600;
              }
              .rdp-chevron {
                fill: #7a6a58;
              }
              .rdp-button_next,
              .rdp-button_previous {
                border-radius: 9999px;
                transition: background-color 0.2s ease;
              }
              .rdp-button_next:hover,
              .rdp-button_previous:hover {
                background-color: #f7e8d4;
              }
              .rdp-outside {
                opacity: 0.25;
              }
              .rdp-month_caption {
                height: 2.5rem;
                justify-content: center;
              }
              .rdp-nav {
                height: 2.5rem;
              }
            `}</style>

            <div className="p-4">
              <DayPicker
                mode={mode}
                numberOfMonths={1}
                selected={
                  isRangeMode
                    ? { from: value?.from || undefined, to: value?.to || undefined }
                    : value || undefined
                }
                onSelect={handleSelect}
                defaultMonth={isRangeMode ? value?.from || new Date() : value || new Date()}
                disabled={disabledDays}
                weekStartsOn={1}
              />

              {hasValue && (
                <div className="flex items-center justify-between border-t border-taupe/10 pt-3 mt-2">
                  <button
                    type="button"
                    onClick={() => onChange(isRangeMode ? { from: null, to: null } : null)}
                    className="font-sans text-[11px] uppercase tracking-wider text-taupe/40 hover:text-ember-400 transition-colors"
                  >
                    Clear
                  </button>
                  {isRangeMode && value?.from && value?.to && (
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-sans text-[11px] uppercase tracking-wider text-cinnamon-400 hover:text-cinnamon-500 transition-colors"
                    >
                      Done
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
