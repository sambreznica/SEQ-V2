import { supabase } from './supabaseClient';

export type EarlyAccessPayload = {
  email: string;
  role?: string;
  future_state?: string;
  source: string;
};

export async function submitEarlyAccess(payload: EarlyAccessPayload) {
  const { error } = await supabase
    .from("early_access_signups")
    .insert([
      {
        email: payload.email,
        role: payload.role ?? null,
        future_state: payload.future_state ?? null,
        source: payload.source,
      },
    ]);

  if (error) {
    console.error("[EarlyAccess] Supabase insert error:", error);
    throw error;
  }
}
