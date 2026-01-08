-- Tạo bảng comments trong Supabase
-- Chạy query này trong Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feedback_id UUID NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Anonymous',
  email TEXT,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index để query nhanh hơn
CREATE INDEX IF NOT EXISTS idx_comments_feedback_id ON comments(feedback_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Tạo policy: Chỉ service role có thể insert (từ API)
CREATE POLICY "Allow service role to insert comments"
  ON comments
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Tạo policy: Chỉ service role có thể select (từ API)
CREATE POLICY "Allow service role to select comments"
  ON comments
  FOR SELECT
  TO service_role
  USING (true);

