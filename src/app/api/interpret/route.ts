import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { ChartData } from '@/lib/tuvi/chart-calculation';
import { supabase, InterpretationRow } from '@/lib/supabase';

// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

/**
 * Tạo prompt cho AI dựa trên chart data
 */
function createPrompt(chartData: ChartData, palaceId: string, fullName: string): string {
    const palaceNames: Record<string, string> = {
        'menh': 'Mệnh (Bản chất, tính cách gốc)',
        'tai_bach': 'Tài Bạch (Tài chính, tiền bạc)',
        'quan_loc': 'Quan Lộc (Sự nghiệp, công danh)',
        'phu_the': 'Phu Thê (Hôn nhân, tình duyên)',
        'phuc_duc': 'Phúc Đức (May mắn, phúc phần)',
        'thien_di': 'Thiên Di (Xuất hành, quan hệ xã hội)',
        'dien_trach': 'Điền Trạch (Nhà cửa, đất đai)',
        'tu_tuc': 'Tử Tức (Con cái)',
        'phu_mau': 'Phụ Mẫu (Cha mẹ)',
        'huynh_de': 'Huynh Đệ (Anh chị em)',
        'no_boc': 'Nô Bộc (Bạn bè, đồng nghiệp)',
        'tat_ach': 'Tật Ách (Sức khỏe, bệnh tật)'
    };

    const palaceName = palaceNames[palaceId] || palaceId;
    const palaceData = chartData[palaceId as keyof ChartData] as any;
    
    const mainStars = palaceData?.main_stars?.join(', ') || 'Không có';
    const supportStars = palaceData?.support_stars?.join(', ') || 'Không có';
    const status = palaceData?.status || 'Bình';

    return `Bạn là chuyên gia Tử Vi 20 năm kinh nghiệm.
Dựa vào dữ liệu lá số Tử Vi sau, hãy luận giải chi tiết về cung ${palaceName} cho ${fullName}.

THÔNG TIN LÁ SỐ:
- Mệnh: ${chartData.birth_info.element}
- Giới tính: ${chartData.birth_info.gender}
- Can Chi năm: ${chartData.birth_info.canChiYear}
- Can Chi giờ: ${chartData.birth_info.hour}

CUNG ${palaceName.toUpperCase()}:
- Sao chính: ${mainStars}
- Sao phụ: ${supportStars}
- Trạng thái: ${status}

YÊU CẦU LUẬN GIẢI:
1. Phân tích tính cách và đặc điểm nổi bật (nếu là cung Mệnh)
2. Tình hình sự nghiệp & tiền bạc (nếu là Tài Bạch hoặc Quan Lộc)
3. Điểm mạnh và điểm yếu cụ thể
4. Lời khuyên thực tế, có thể áp dụng ngay
5. Dự đoán xu hướng phát triển

VĂN PHONG:
- Chắc chắn, tự tin, không mơ hồ
- Cá nhân hóa, gọi tên ${fullName}
- Dài và sâu, ít nhất 200-300 từ
- Thực tế, có thể áp dụng được
- Tích cực nhưng không che giấu điểm yếu

Hãy viết luận giải ngay bây giờ:`;
}

/**
 * POST /api/interpret
 * Nhận chart data và trả về AI interpretation
 */
export async function POST(request: NextRequest) {
    const startTime = Date.now();
    let interpretationId: string | undefined;
    let body: any = {};
    
    try {
        body = await request.json();
        const { 
            chartData, 
            palaceId, 
            fullName,
            birthDate,
            birthTime,
            timezone,
            location,
            usagePurpose,
            question,
            sessionId
        } = body;

        if (!chartData || !palaceId || !fullName) {
            return NextResponse.json(
                { error: 'Missing required fields: chartData, palaceId, fullName' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key not configured' },
                { status: 500 }
            );
        }

        const systemPrompt = 'Bạn là chuyên gia Tử Vi đắc đạo với 20 năm kinh nghiệm. Bạn luận giải chính xác, sâu sắc và thực tế.';
        const userPrompt = createPrompt(chartData, palaceId, fullName);
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

        // Sử dụng gemini-2.5-flash (free tier, theo documentation)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });

        const interpretation = response.text || 'Không thể tạo luận giải.';
        const latencyMs = Date.now() - startTime;

        // Extract thông tin từ request headers
        const ip = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   undefined;
        const userAgent = request.headers.get('user-agent') || undefined;

        // Lưu vào database
        if (!supabase) {
            console.warn('⚠️ Supabase client is not configured. Skipping database save.');
            console.warn('Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
        } else {
            const interpretationRow: InterpretationRow = {
                full_name: fullName.trim(),
                birth_date: birthDate || null,
                birth_time: birthTime || null,
                timezone: timezone || null,
                location: location || null,
                gender: chartData.birth_info?.gender || null,
                palace_id: palaceId,
                usage_purpose: usagePurpose || null,
                question: question || null,
                session_id: sessionId || null,
                chart_data: chartData,
                interpretation: interpretation,
                model: 'gemini-2.5-flash',
                ai_version: '1.0',
                status: 'success',
                latency_ms: latencyMs,
                ip: ip,
                user_agent: userAgent,
            };

            console.log('💾 Attempting to save interpretation to database...');
            console.log('📝 Data:', {
                full_name: interpretationRow.full_name,
                palace_id: interpretationRow.palace_id,
                interpretation_length: interpretation.length,
            });

            const { data, error } = await supabase
                .from('interpretations')
                .insert([interpretationRow])
                .select()
                .single();

            if (error) {
                console.error('❌ Failed to save interpretation to database:', error);
                console.error('Error details:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                });
                // Không fail request nếu lưu DB thất bại, chỉ log
            } else {
                console.log('✅ Successfully saved interpretation to database!');
                console.log('📊 Record ID:', data?.id);
                interpretationId = data.id;
            }
        }

        return NextResponse.json({
            interpretation,
            palaceId,
            timestamp: new Date().toISOString(),
            id: interpretationId,
        });

    } catch (error: any) {
        const latencyMs = Date.now() - startTime;
        console.error('AI Interpretation Error:', error);

        // Lưu lỗi vào database nếu có đủ thông tin
        if (supabase && body.fullName && body.palaceId && body.chartData) {
            const ip = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       undefined;
            const userAgent = request.headers.get('user-agent') || undefined;

            const errorRow: InterpretationRow = {
                full_name: body.fullName.trim(),
                birth_date: body.birthDate || null,
                birth_time: body.birthTime || null,
                timezone: body.timezone || null,
                location: body.location || null,
                gender: body.chartData?.birth_info?.gender || null,
                palace_id: body.palaceId,
                usage_purpose: body.usagePurpose || null,
                question: body.question || null,
                session_id: body.sessionId || null,
                chart_data: body.chartData,
                model: 'gemini-2.5-flash',
                status: 'error',
                error_message: error.message,
                latency_ms: latencyMs,
                ip: ip,
                user_agent: userAgent,
            };

            supabase
                .from('interpretations')
                .insert([errorRow])
                .catch(err => console.error('Failed to save error to database:', err));
        }

        return NextResponse.json(
            { 
                error: 'Failed to generate interpretation',
                message: error.message 
            },
            { status: 500 }
        );
    }
}

