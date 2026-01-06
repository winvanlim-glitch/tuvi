import { NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { ChartData } from '@/lib/tuvi/chart-calculation';

const ai = new GoogleGenAI({});

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { chartData, palaceId, fullName } = body;

        if (!chartData || !palaceId || !fullName) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const systemPrompt = 'Bạn là chuyên gia Tử Vi đắc đạo với 20 năm kinh nghiệm. Bạn luận giải chính xác, sâu sắc và thực tế.';
        const userPrompt = createPrompt(chartData, palaceId, fullName);
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

        // Create a ReadableStream for streaming response
        // Note: Gemini API may not support true streaming, so we simulate it by chunking the response
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // Generate content
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: fullPrompt,
                    });

                    const fullText = response.text || '';
                    
                    // Simulate streaming by sending chunks
                    // Split into words and send progressively for better UX
                    const words = fullText.split(/(\s+)/);
                    let currentChunk = '';
                    const chunkSize = 5; // Send 5 words at a time
                    
                    for (let i = 0; i < words.length; i++) {
                        currentChunk += words[i];
                        
                        if (i % chunkSize === 0 || i === words.length - 1) {
                            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text: currentChunk })}\n\n`));
                            currentChunk = '';
                            
                            // Small delay to simulate real streaming
                            await new Promise(resolve => setTimeout(resolve, 50));
                        }
                    }

                    // Send completion signal
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                    controller.close();
                } catch (error: any) {
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error: any) {
        console.error('Streaming Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

