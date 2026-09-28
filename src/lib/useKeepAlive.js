import { useEffect } from "react";

const BASE = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "").replace(/\/api$/, "");

// Ping to wake up & prevent Render free-tier spin-down
export function useKeepAlive(intervalMs = 60_000) {
  useEffect(() => {
    if (!BASE) return;
    const ping = () => {
      fetch(`${BASE}/api/health`).catch(() => {});
    };

    // Ping immediately on mount so sleeping backend wakes up before user submits form
    ping();

    const id = setInterval(ping, intervalMs);
    return () => clearInterval(id);
  }, []);
}
