CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Anonymous',
  email TEXT,
  feedback TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index để query nhanh hơn
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_category ON feedback(category);

-- Tạo index cho email (nếu muốn query theo email)
CREATE INDEX idx_feedback_email ON feedback(email) WHERE email IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Tạo policy: Chỉ service role có thể insert (từ API)
CREATE POLICY "Allow service role to insert feedback"
  ON feedback
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Tạo policy: Chỉ service role có thể select (từ API)
CREATE POLICY "Allow service role to select feedback"
  ON feedback
  FOR SELECT
  TO service_role
  USING (true);