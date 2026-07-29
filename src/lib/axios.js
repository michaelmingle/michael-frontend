import axios from "axios";

const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:8030";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? `${apiOrigin}/api`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

function hasCsrfCookie() {
  return document.cookie.split("; ").some((c) => c.startsWith("XSRF-TOKEN="));
}

// Sanctum's SPA flow requires a CSRF cookie before any state-changing request.
// Fetched lazily, once, right before the first mutation needs it.
let csrfPromise = null;
export function ensureCsrfCookie() {
  if (hasCsrfCookie()) return Promise.resolve();
  if (!csrfPromise) {
    csrfPromise = axios
      .get(`${apiOrigin}/sanctum/csrf-cookie`, { withCredentials: true })
      .finally(() => {
        csrfPromise = null;
      });
  }
  return csrfPromise;
}

api.interceptors.request.use(async (config) => {
  if (config.method && config.method.toLowerCase() !== "get") {
    await ensureCsrfCookie();
  }
  return config;
});
