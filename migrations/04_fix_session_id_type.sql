-- Fix session_id từ UUID sang TEXT để linh hoạt hơn
-- Migration này xử lý cả 2 trường hợp:
-- 1. Nếu bảng đã tồn tại với session_id là UUID -> ALTER sang TEXT
-- 2. Nếu bảng chưa tồn tại -> Tạo bảng với session_id là TEXT ngay từ đầu

-- Bước 1: Kiểm tra và ALTER nếu bảng đã tồn tại với session_id là UUID
DO $$
BEGIN
    -- Kiểm tra xem bảng có tồn tại không
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'interpretations'
    ) THEN
        -- Kiểm tra xem cột session_id có phải UUID không
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'interpretations' 
            AND column_name = 'session_id' 
            AND data_type = 'uuid'
        ) THEN
            -- ALTER cột từ UUID sang TEXT
            ALTER TABLE interpretations 
                ALTER COLUMN session_id TYPE TEXT USING session_id::TEXT;
            
            RAISE NOTICE '✅ Đã sửa session_id từ UUID sang TEXT';
        ELSE
            RAISE NOTICE 'ℹ️ session_id đã là TEXT hoặc không tồn tại, không cần sửa';
        END IF;
    ELSE
        -- Bảng chưa tồn tại, tạo bảng với session_id là TEXT
        CREATE TABLE interpretations (
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
            session_id TEXT,
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

        -- Bật RLS và policy: chỉ service_role được phép insert/select
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

        RAISE NOTICE '✅ Đã tạo bảng interpretations với session_id là TEXT';
    END IF;
END $$;

