import { useEffect } from "react";

const BASE = import.meta.env.VITE_API_URL;

// ponytail: interval-based ping to prevent Render free-tier spin-down
export function useKeepAlive(intervalMs = 60_000) {
  useEffect(() => {
    if (!BASE) return;
    const id = setInterval(() => {
      fetch(BASE).catch(() => {});
    }, intervalMs);
    return () => clearInterval(id);
  }, []);
}
