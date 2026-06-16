import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function DatePicker({ value, onChange, label, required = false, variant = "default" }) {
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

  return (
    <div ref={ref} className="group relative">
      <label className={`block font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 mb-3 ${focused || open ? "text-cinnamon-400" : "text-taupe/60"}`}>
        {label}
        {required && <span className="text-cinnamon-300 ml-1">*</span>}
      </label>

      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setFocused(true);
        }}
        className={`w-full flex items-center justify-between outline-none transition-all duration-500 cursor-pointer ${
          isMinimal 
            ? `bg-transparent border-b border-taupe/20 py-3 font-serif italic text-lg sm:text-xl ${value ? "text-walnut" : "text-taupe/20"}`
            : `bg-white border rounded-sm px-3 sm:px-4 py-3 sm:py-3.5 font-sans text-sm sm:text-base ${
                value
                  ? "text-walnut border-taupe/15 hover:border-taupe/30"
                  : "text-taupe/25 border-taupe/15 hover:border-taupe/30"
              } ${open ? "border-cinnamon-300/50 shadow-[0_0_0_3px_rgba(201,124,46,0.08)]" : ""}`
        }`}
      >
        <span>{value ? format(value, "PPP") : "Select date"}</span>
        <CalendarDays size={16} className={`transition-colors duration-300 ${value ? "text-taupe/50" : "text-taupe/20"} ${open ? "text-cinnamon-400" : ""}`} />
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
            className="absolute z-50 mt-2 bg-ivory border border-taupe/10 rounded-sm shadow-xl shadow-walnut/10 w-full min-w-[300px] sm:min-w-[340px]"
          >
            <style>{`
              .rdp-root {
                --rdp-accent-color: #c97c2e;
                --rdp-accent-background-color: #f7e8d4;
                --rdp-day-height: 40px;
                --rdp-day-width: 40px;
                --rdp-day_button-height: 38px;
                --rdp-day_button-width: 38px;
                --rdp-day_button-border-radius: 2px;
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
                font-weight: 400;
                color: #3d2b1a;
              }
              .rdp-day_button:hover {
                background-color: #f7e8d4;
                border-color: #c97c2e;
              }
              .rdp-selected .rdp-day_button {
                background-color: #c97c2e;
                color: #fff;
                font-weight: 500;
              }
              .rdp-selected .rdp-day_button:hover {
                background-color: #ae6f31;
              }
              .rdp-today:not(.rdp-outside) {
                font-weight: 600;
              }
              .rdp-weekday {
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #7a6a58;
                opacity: 0.6;
              }
              .rdp-chevron {
                fill: #7a6a58;
              }
              .rdp-button_next:hover,
              .rdp-button_previous:hover {
                background-color: #f7e8d4;
                border-radius: 2px;
              }
              .rdp-outside {
                opacity: 0.35;
              }
              .rdp-month_caption {
                height: 2.5rem;
              }
              .rdp-nav {
                height: 2.5rem;
              }
            `}</style>
            <div className="p-3 sm:p-4">
              <DayPicker
                mode="single"
                selected={value}
                onSelect={(date) => {
                  onChange(date);
                  setOpen(false);
                }}
                defaultMonth={value || new Date()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
