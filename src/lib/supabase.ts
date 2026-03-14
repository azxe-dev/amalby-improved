import { createClient } from '@supabase/supabase-js';

// Provide dummy values during Vercel's static build phase if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing. Form submissions will fail in production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
