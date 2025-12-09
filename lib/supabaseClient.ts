import { createClient } from '@supabase/supabase-js';

// ──────────────────────────────────────────────────────────
// SUPABASE CLIENT CONFIGURATION
// ──────────────────────────────────────────────────────────
// 
// Database schema reference (to be run manually in Supabase SQL editor):
//
// create table if not exists early_access_signups (
//   id uuid primary key default gen_random_uuid(),
//   email text not null,
//   role text,
//   future_state text,
//   source text,
//   created_at timestamptz default now()
// );
//
// ──────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY');
  
  if (import.meta.env.DEV) {
    console.error(
      `[Supabase] Missing environment variables: ${missing.join(', ')}\n` +
      `Please create a .env.local file with:\n` +
      `VITE_SUPABASE_URL=your_supabase_url\n` +
      `VITE_SUPABASE_ANON_KEY=your_anon_key`
    );
  }
  
  throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
