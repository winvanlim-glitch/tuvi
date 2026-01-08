-- Bảng lưu lịch sử luận giải AI Tử Vi
CREATE TABLE IF NOT EXISTS interpretations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  birth_date DATE,
  birth_time TIME,
  timezone TEXT,
  location TEXT,
  gender TEXT,
  palace_id TEXT NOT NULL,
  usage_purpose TEXT,
  question TEXT,
  session_id UUID,
  chart_data JSONB NOT NULL,
  interpretation TEXT,
  model TEXT,
  prompt_tokens INT,
  completion_tokens INT,
  cost NUMERIC(10,4),
  ai_version TEXT,
  status TEXT DEFAULT 'success',
  error_message TEXT,
  latency_ms INT,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index phục vụ truy vấn phổ biến
CREATE INDEX IF NOT EXISTS idx_interpretations_created_at ON interpretations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interpretations_palace ON interpretations(palace_id);
CREATE INDEX IF NOT EXISTS idx_interpretations_session ON interpretations(session_id);

-- Bật RLS và policy: chỉ service_role được phép insert/select (tương tự feedback/comments)
ALTER TABLE interpretations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role to insert interpretations"
  ON interpretations
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to select interpretations"
  ON interpretations
  FOR SELECT
  TO service_role
  USING (true);

