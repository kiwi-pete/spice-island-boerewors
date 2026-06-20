import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "si_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  // Fall back to a constant only so local dev without env still "works" (insecure);
  // production must set ADMIN_SESSION_SECRET.
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

/** Create a signed session token of the form `<expiryEpoch>.<hmac>`. */
export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

/** Verify a session token's signature and expiry in constant time. */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;

  const payload = token.slice(0, dot);
  const providedSig = token.slice(dot + 1);
  const expectedSig = sign(payload);

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  return true;
}

/** Constant-time check of a submitted PIN against the configured ADMIN_PIN. */
export function isValidPin(submitted: string): boolean {
  const expected = process.env.ADMIN_PIN || "";
  if (!expected) return false;
  const a = Buffer.from(String(submitted));
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Read the session cookie and return whether the current request is authenticated. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
