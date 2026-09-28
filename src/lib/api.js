/* API base URL:
   - Dev: VITE_API_URL is empty → uses Vite proxy (/api → localhost:3000)
   - Prod: VITE_API_URL is set to backend URL (e.g., https://panigrahna-api.onrender.com)
*/
const rawBase = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
const BASE = rawBase.replace(/\/api$/, "");

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = {};
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }

  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong. Please try again.");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
