import { createClient } from '@supabase/supabase-js';

// Supabase client for server-side operations
// Sử dụng service role key để bypass RLS (Row Level Security)
// Chỉ dùng trong API routes, không expose ra client

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn(
    'Supabase environment variables are not set. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file'
  );
}

export const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Type definitions for feedback table
export interface FeedbackRow {
  id?: string;
  name: string;
  email?: string;
  feedback: string;
  category: string;
  timestamp: string;
  user_agent?: string;
  ip?: string;
  created_at?: string;
}

// Type definitions for comments table
export interface CommentRow {
  id?: string;
  feedback_id: string;
  name: string;
  email?: string;
  comment: string;
  created_at?: string;
}

