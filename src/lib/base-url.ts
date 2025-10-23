export function getBaseUrl() {
  // Prefer explicit public base
  const env = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (env && /^https?:\/\/[^ ]+$/.test(env)) return env.replace(/\/+$/, "");

  // Vercel provides VERCEL_URL without protocol
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  // Fallback for local dev
  return "http://localhost:3000";
}
