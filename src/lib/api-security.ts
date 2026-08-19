import { createClient } from '@supabase/supabase-js';

/**
 * Shared server-side security helpers for the API routes.
 *
 * These exist because every /api route previously accepted unauthenticated input
 * and passed it straight into an outbound email. Anything that can send mail from
 * the clinic's Gmail account must go through the guards in this file.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

/** Server-side Supabase client. Never reuse a request-scoped client across requests. */
export function serverSupabase(accessToken?: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  });
}

/**
 * Escape a value before interpolating it into an HTML email body.
 * Without this, any caller-supplied field can inject markup (or a phishing link)
 * into mail that appears to come from the clinic.
 */
export function esc(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Trim and hard-cap a free-text field so a caller cannot send a megabyte of mail body. */
export function clean(value: unknown, maxLength = 200): string {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0, maxLength);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && v.length <= 254 && EMAIL_RE.test(v);

/** Indian mobile numbers, tolerant of +91 / spaces / dashes. */
export function isMobile(v: unknown): v is string {
  if (typeof v !== 'string') return false;
  const digits = v.replace(/[\s\-()]/g, '').replace(/^\+?91/, '');
  return /^[6-9]\d{9}$/.test(digits);
}

export type StaffUser = { id: string; email?: string; role: string };

/**
 * Verify that the caller is a signed-in, *approved* member of clinic staff.
 * Returns null when the caller is anonymous, unknown, or pending approval.
 */
export async function requireApprovedStaff(request: Request): Promise<StaffUser | null> {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;

  const supabase = serverSupabase(token);

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData?.user) return null;

  const { data: staff, error: staffError } = await supabase
    .from('staff_roles')
    .select('id, role, is_approved')
    .eq('id', userData.user.id)
    .single();

  if (staffError || !staff || !staff.is_approved) return null;

  return { id: userData.user.id, email: userData.user.email, role: staff.role };
}

/**
 * Minimal in-memory, per-IP rate limiter.
 *
 * Serverless instances are not shared, so this is a speed bump rather than a wall —
 * it stops casual scripted abuse of the public booking form from burning the Gmail
 * daily send quota. Move to Upstash/Vercel KV if abuse becomes deliberate.
 */
const hits = new Map<string, number[]>();

export function rateLimit(request: Request, { limit = 5, windowMs = 60_000 } = {}): boolean {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(key);
    }
  }
  return true;
}
