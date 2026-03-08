'use client';

import React, { useState, useMemo } from 'react';

type PromptCategory = 'tuvi' | 'tarot' | 'general';
type PromptType = 'tuvi-basic' | 'tuvi-career' | 'tuvi-love' | 'tuvi-year' | 'tuvi-health' | 'tuvi-comprehensive' | 'tarot-daily' | 'tarot-question' | 'general-tips' | 'model-comparison';

interface PromptTemplate {
    id: PromptType;
    title: string;
    description: string;
    prompt: string;
    model?: string;
    tags: string[];
    category: PromptCategory;
}

const promptTemplates: PromptTemplate[] = [
    // Tử Vi Templates
    {
        id: 'tuvi-comprehensive',
        category: 'tuvi',
        title: 'Luận Giải Toàn Diện (12 Cung)',
        description: 'Phân tích đầy đủ 12 cung Tử Vi',
        prompt: `Bạn là một ông thầy Tử Vi cao tuổi, có trình độ cao, có nửa đời người chuyên luận đoán lá số vận mệnh con người. Với kiến thức sâu rộng và kinh nghiệm thực tế qua hàng ngàn lá số, hãy luận giải toàn diện cho {TEN}.

THÔNG TIN BẢN MỆNH:
- Tên: {TEN}
- Giới tính: {GIOI_TINH}
- Năm sinh: {NAM_SINH} ({CAN_CHI_NAM})
- Mệnh: {MENH}
- Tuổi: {TUOI}

DỮ LIỆU 12 CUNG:
1. Bản mệnh (Mệnh): {CUNG_MENH}
2. Phu Thê: {CUNG_PHU_THE}
3. Tài sản & Nghề nghiệp (Tài Bạch): {CUNG_TAI_BACK}
4. Phụ Mẫu: {CUNG_PHU_MAU}
5. Thiên Di: {CUNG_THIEN_DI}
6. Tật Ách: {CUNG_TAT_AC}
7. Nô Bộc: {CUNG_NO_BOC}
8. Quan Lộc: {CUNG_QUAN_LOC}
9. Điền Trạch: {CUNG_DIEN_TRACH}
10. Tử Tức: {CUNG_TU_TUC}
11. Huynh Đệ: {CUNG_HUYNH_DE}
12. Phúc Đức: {CUNG_PHUC_DUC}

YÊU CẦU LUẬN GIẢI:

1. BẢN MỆNH: vóc dáng trưởng thành, tính cách, tư chất, tài năng, chỉ số IQ, học vấn, khả năng giao tiếp, sức khoẻ

2. CUNG PHU THÊ: đời sống hôn nhân, vợ/chồng là người thế nào, ảnh hưởng ra sao, gia thế, tình cảm, hạnh phúc hay khổ đau, mức độ đào hoa, điểm cần lưu ý

3. TÀI SẢN VÀ NGHỀ NGHIỆP: Đánh giá tài chính, độ giàu có, ngành nghề phù hợp, cách kiếm tiền hoặc kinh doanh

4. PHỤ MẪU: Cha mẹ ra sao, học vấn, kinh tế, cách cư xử với mọi người

5. CUNG THIÊN DI: biểu hiện khi ra ngoài, xã hội đánh giá thế nào, khả năng giao tiếp, độ thích nghi, các tài năng chính, thử thách thường gặp, mức độ đào hoa

6. CUNG TẬT ÁCH: bệnh tật dễ mắc, tai ương, lưu ý về sức khoẻ

7. CUNG NÔ BỘC: bạn bè, quan hệ xã hội, hợp làm ăn không, nên kết giao với ai, quan hệ với cấp trên, kiểu sếp phù hợp

8. CUNG QUAN LỘC: con đường công danh sự nghiệp có thuận lợi hay trắc trở? người này có xu hướng làm chủ hay làm thuê? Có phù hợp với chính trị, chức quyền hay công việc ổn định không? Nếu kinh doanh, nên làm riêng hay hợp tác? những giai đoạn thuận lợi trong sự nghiệp?

9. CUNG ĐIỀN TRẠCH: Khả năng sở hữu nhà đất thế nào? tài vận bất động sản tốt hay xấu? nên đầu tư vào đất đai, nhà cửa không? người này có xu hướng thích sống ổn định hay di chuyển nhiều?

10. CUNG TỬ TỨC: Có dễ sinh con không? Có hiếm muộn không? dự báo số lượng con cái, con trai hay con gái nhiều hơn? Con cái có giỏi giang, hiếu thảo ko? mối quan hệ giữa người này với con cái thế nào? những vấn đề đặc biệt có không?

11. CUNG HUYNH ĐỆ: nhà mấy anh chị em? có được nhờ hay anh chị em không? hay ngược lại? khả năng kết hợp làm ăn kinh doanh với anh chị em ruột được không?

12. CUNG PHÚC ĐỨC: trong họ thường có bà cô tổ, ông tổ cậu nào chết trẻ linh thiêng hay phù hộ không? gia tiên có linh thiêng không? phúc phần của gia tộc ảnh hưởng như thế nào?

VĂN PHONG: Như một vị thầy Tử Vi cao tuổi uyên bác - điềm tĩnh, sâu sắc, dùng kinh nghiệm thực tế qua hàng ngàn lá số để phân tích. Độ dài: 1500-2000 từ.`,
        model: 'gemini-2.5-flash',
        tags: ['toàn diện', '12 cung', 'chi tiết']
    },
    {
        id: 'tuvi-basic',
        category: 'tuvi',
        title: 'Luận Giải Cơ Bản',
        description: 'Phân tích tổng quan một cung',
        prompt: `Bạn là chuyên gia Tử Vi 20 năm kinh nghiệm.
Dựa vào dữ liệu lá số Tử Vi sau, hãy luận giải chi tiết về cung {CUNG} cho {TEN}.

THÔNG TIN LÁ SỐ:
- Mệnh: {MENH}
- Giới tính: {GIOI_TINH}
- Can Chi năm: {CAN_CHI_NAM}
- Can Chi tháng: {CAN_CHI_THANG}
- Can Chi ngày: {CAN_CHI_NGAY}
- Can Chi giờ: {CAN_CHI_GIO}

CUNG {CUNG}:
- Sao chính: {SAO_CHINH}
- Sao phụ: {SAO_PHU}
- Trạng thái: {TRANG_THAI}

YÊU CẦU:
1. Phân tích chi tiết từng sao chính
2. Đánh giá tổng thể cung
3. Điểm mạnh và điểm yếu
4. Lời khuyên thực tế
5. Dự đoán xu hướng tương lai

VĂN PHONG: Tự tin, cá nhân hóa, 300-400 từ, thực tế.`,
        model: 'gemini-2.5-flash',
        tags: ['cơ bản', 'tổng quan']
    },
    {
        id: 'tuvi-career',
        category: 'tuvi',
        title: 'Phân Tích Sự Nghiệp',
        description: 'Tập trung công việc, sự nghiệp',
        prompt: `Bạn là chuyên gia Tử Vi 20 năm kinh nghiệm.
Dựa vào lá số Tử Vi, hãy phân tích chi tiết về sự nghiệp và công danh cho {TEN}.

THÔNG TIN:
- Giới tính: {GIOI_TINH}
- Năm sinh: {NAM_SINH} ({CAN_CHI_NAM})
- Cung Quan Lộc: {QUAN_LOC}
- Cung Tài Bạch: {TAI_BACH}

PHÂN TÍCH:
1. Nghề nghiệp phù hợp, ngành nghề lý tưởng
2. Xu hướng thăng tiến, thời điểm tốt
3. Tiềm năng tài chính, thu nhập
4. Điểm mạnh và thách thức trong sự nghiệp
5. Lời khuyên cải thiện vận trình công danh

TRẢ LỜI: Tự tin, thực tế, 400-500 từ. Gọi tên người được luận giải.`,
        model: 'gemini-2.5-flash',
        tags: ['sự nghiệp', 'công danh']
    },
    {
        id: 'tuvi-love',
        category: 'tuvi',
        title: 'Phân Tích Tình Duyên',
        description: 'Tập trung hôn nhân, tình yêu',
        prompt: `Bạn là chuyên gia Tử Vi 20 năm kinh nghiệm.
Dựa vào lá số Tử Vi, hãy phân tích chi tiết về tình duyên và hôn nhân cho {TEN}.

THÔNG TIN:
- Giới tính: {GIOI_TINH}
- Năm sinh: {NAM_SINH} ({CAN_CHI_NAM})
- Cung Phu Thê: {PHU_THE}
- Cung Phúc Đức: {PHUC_DUC}

PHÂN TÍCH:
1. Tính cách trong tình yêu, cách thể hiện tình cảm
2. Đối tượng lý tưởng, tiêu chuẩn chọn bạn đời
3. Thời điểm gặp duyên, kết hôn phù hợp
4. Thách thức trong quan hệ tình cảm
5. Lời khuyên cải thiện vận tình

TRẢ LỜI: Tự tin, thực tế, nhạy cảm, 400-500 từ.`,
        model: 'gemini-2.5-flash',
        tags: ['tình duyên', 'hôn nhân']
    },
    {
        id: 'tuvi-year',
        category: 'tuvi',
        title: 'Dự Đoán Năm',
        description: 'Luận giải vận trình trong năm',
        prompt: `Bạn là chuyên gia Tử Vi 20 năm kinh nghiệm.
Dựa vào lá số Tử Vi, hãy dự đoán vận trình năm {NAM} cho {TEN}.

THÔNG TIN:
- Giới tính: {GIOI_TINH}
- Tuổi: {TUOI}
- Mệnh: {MENH}
- Năm sinh: {CAN_CHI_NAM}

YÊU CẦU PHÂN TÍCH:
1. Tổng quan vận trình năm {NAM}
2. May mắn, cơ hội nổi bật
3. Thách thức, khó khăn cần lưu ý
4. Tài lộc, sự nghiệp năm nay
5. Tình duyên, quan hệ xã hội
6. Sức khỏe cần chú ý
7. Thời điểm tốt/xấu trong năm
8. Lời khuyên cải vận

TRẢ LỜI: Tự tin, chi tiết, 500-600 từ, thực tế.`,
        model: 'gemini-2.5-flash',
        tags: ['dự đoán', 'năm']
    },
    {
        id: 'tuvi-health',
        category: 'tuvi',
        title: 'Phân Tích Sức Khỏe',
        description: 'Phân tích sức khỏe, bệnh cần lưu ý',
        prompt: `Bạn là chuyên gia Tử Vi 20 năm kinh nghiệm.
Dựa vào lá số Tử Vi, hãy phân tích về sức khỏe cho {TEN}.

THÔNG TIN:
- Giới tính: {GIOI_TINH}
- Năm sinh: {NAM_SINH}
- Mệnh: {MENH}
- Cung Tật Ách: {TAT_AC}
- Cung Thân: {CAN}

PHÂN TÍCH:
1. Tổng trạng sức khỏe, sức đề kháng
2. Các bộ phận, cơ quan cần chú ý
3. Bệnh mãn tính tiềm ẩn (nếu có)
4. Năm tháng cần đặc biệt chú ý sức khỏe
5. Lời khuyên phòng ngừa, chăm sóc sức khỏe
6. Phương pháp tăng cường sức khỏe theo Tử Vi

TRẢ LỜI: Nghiêm túc, thực tế, 300-400 từ.`,
        model: 'gemini-2.5-flash',
        tags: ['sức khỏe', 'bệnh tật']
    },
    // Tarot Templates
    {
        id: 'tarot-daily',
        category: 'tarot',
        title: 'Bài Tarot Hàng Ngày',
        description: 'Rút 1 lá bài Tarot nhận chỉ dẫn',
        prompt: `Bạn là chuyên gia Tarot với 10 năm kinh nghiệm.
Hãy luận giải lá bài Tarot sau cho ngày hôm nay của {TEN}:

LÁ BÀI: {TEN_BAI}
HÌNH ẢNH: {MO_TA_BAI}

YÊU CẦU:
1. Ý nghĩa chính của lá bài trong ngày
2. Thông điệp từ lá bài cho hôm nay
3. Lời khuyên cụ thể để áp dụng trong ngày
4. Cảnh báo nếu có

TRẢ LỜI: Ngắn gọn, súc tích, 150-200 từ, thực tế.`,
        model: 'gemini-2.5-flash',
        tags: ['tarot', 'hàng ngày']
    },
    {
        id: 'tarot-question',
        category: 'tarot',
        title: 'Tarot Trả Lời Câu Hỏi',
        description: 'Luận giải Tarot cho câu hỏi cụ thể',
        prompt: `Bạn là chuyên gia Tarot với 10 năm kinh nghiệm.
Hãy luận giải các lá bài Tarot sau cho câu hỏi: "{CAU_HOI}"

NGƯỜI HỎI: {TEN}
GIỚI TÍNH: {GIOI_TINH}

CÁC LÁ BÀI:
1. {BAI_1}
2. {BAI_2}
3. {BAI_3}

PHÂN TÍCH:
1. Tình hình hiện tại liên quan đến câu hỏi
2. Thách thức, rào cản đang gặp
3. Yếu tố tích cực, cơ hội
4. Lời khuyên cho tương lai
5. Kết quả có thể mong đợi

TRẢ LỜI: Chi tiết, 300-400 từ, thực tế.`,
        model: 'gemini-2.5-flash',
        tags: ['tarot', 'câu hỏi']
    },
    // General AI Tips
    {
        id: 'general-tips',
        category: 'general',
        title: 'Mẹo Viết Prompt Hiệu Quả',
        description: 'Các nguyên tắc và mẹo viết prompt',
        prompt: `## NGUYÊN TẮC VIẾT PROMPT HIỆU QUẢ

### 1. CUNG CẤP ĐỦ NGỮ CẢNH
- Thông tin cá nhân: tên, giới tính, ngày sinh
- Mục đích: bạn muốn hỏi về vấn đề gì
- Hoàn cảnh hiện tại (nếu liên quan)

### 2. XÁC ĐỊNH RÕ YÊU CẦU
- Phạm vi: tổng quan hay chi tiết
- Khía cạnh: sự nghiệp, tình cảm, sức khỏe
- Thời điểm: năm nay, 5 năm tới, trọn đời

### 3. CHỌN VĂN PHONG PHÙ HỢP
- Tự tin, chắc chắn (không "có thể", "có lẽ")
- Thực tế, có thể áp dụng
- Tích cực nhưng không che giấu nhược điểm
- Cá nhân hóa, gọi tên người được luận

### 4. CẤU TRÚC RÕ RÀNG
- Sử dụng gạch đầu dòng, tiêu đề
- Đánh số các yêu cầu
- Phân tách các phần thông tin

### 5. ĐIỀU CHỈNH THEO KẾT QUẢ
- Nếu quá ngắn → yêu cầu chi tiết hơn
- Nếu quá chung → thêm thông tin cụ thể
- Nếu không thực tế → yêu cầu lời khuyên cụ thể hơn

### VÍ DỤ PROMPT TỐT:
"Bạn là chuyên gia Tử Vi. Luận giải cung Quan Lộc cho anh Minh, sinh năm 1995, nam. Cung Quan Lộc có sao Thái Dương Miếu, Vũ Khúc Đắc Địa. Phân tích chi tiết về sự nghiệp, cơ hội thăng tiến, và lời khuyên cải thiện trong năm 2026."

### VÍ DỤ PROMPT KÉM:
"Luận giải tử vi cho tôi" (THIẾU thông tin)`,
        model: 'all',
        tags: ['mẹo', 'hướng dẫn']
    },
    {
        id: 'model-comparison',
        category: 'general',
        title: 'So Sánh Các Model AI',
        description: 'Đặc điểm các model phổ biến',
        prompt: `## SO SÁNH CÁC MODEL AI CHO LUẬN GIẢI TỬ VI

### GEMINI 2.5 FLASH (Khuyên dùng)
- **Đặc điểm**: Nhanh, rẻ, thông minh
- **Tốc độ**: ~206 tokens/giây
- **Giá**: ~$0.15/1M input, $0.60/1M output
- **Phù hợp**: Prompt dài, chi tiết
- **Ưu điểm**: Context window 1M tokens, xử lý tốt tiếng Việt

### GPT-4O
- **Đặc điểm**: Cân bằng giữa speed và quality
- **Giá**: ~$2.50/1M input, $10/1M output
- **Phù hợp**: Prompt phức tạp, phân tích sâu
- **Ưu điểm**: Reasoning mạnh, output nhất quán

### CLAUDE 3.5 SONNET
- **Đặc điểm**: Viết hay, sáng tạo
- **Giá**: ~$3/1M input, $15/1M output
- **Phù hợp**: Luận giải văn chương, thơ văn
- **Ưu điểm**: Writing style xuất sắc, rất nhân văn

## KHUYẾN NGHỊ:
- **App/Tích hợp**: Gemini 2.5 Flash (rẻ + nhanh)
- **Nghiên cứu sâu**: GPT-4O hoặc Claude
- **Content marketing**: Claude (viết hay)
- **Câu hỏi nhanh**: GPT-4O Mini`,
        model: 'all',
        tags: ['so sánh', 'model', 'AI']
    }
];

// Helper functions
const canChi = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

function getCanChi(year: number): string {
    const canIndex = (year - 4) % 10;
    const chiIndex = (year - 4) % 12;
    return `${canChi[canIndex]} ${chi[chiIndex]}`;
}

function getAge(birthYear: number): number {
    return new Date().getFullYear() - birthYear;
}

function getMenh(year: number): string {
    const canIndex = (year - 4) % 10;
    const menhMap: Record<number, string> = {
        0: 'Kim (Giáp)',
        1: 'Kim (Ất)',
        2: 'Hỏa (Bính)',
        3: 'Hỏa (Đinh)',
        4: 'Thổ (Mậu)',
        5: 'Thổ (Kỷ)',
        6: 'Mộc (Canh)',
        7: 'Mộc (Tân)',
        8: 'Thủy (Nhâm)',
        9: 'Thủy (Quý)',
    };
    return menhMap[canIndex] || 'Chưa xác định';
}

const PromptGuideContent: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<PromptCategory>('tuvi');
    const [copiedId, setCopiedId] = useState<PromptType | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<PromptType>('tuvi-comprehensive');
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        ten: '',
        gioiTinh: 'nam',
        namSinh: '1995',
        cauHoi: '',
        tenBai: '',
    });

    const filteredPrompts = promptTemplates.filter(p => p.category === activeCategory);

    const generatedPrompt = useMemo(() => {
        const template = promptTemplates.find(p => p.id === selectedPrompt);
        if (!template) return '';

        let prompt = template.prompt;
        const year = parseInt(formData.namSinh) || 1995;
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        const canChi = getCanChi(year);
        const menh = getMenh(year);

        // Replace placeholders
        prompt = prompt
            .replace(/{TEN}/g, formData.ten || '[TÊN CỦA BẠN]')
            .replace(/{GIOI_TINH}/g, formData.gioiTinh === 'nam' ? 'Nam' : 'Nữ')
            .replace(/{NAM_SINH}/g, formData.namSinh)
            .replace(/{CAN_CHI_NAM}/g, canChi)
            .replace(/{TUOI}/g, age.toString())
            .replace(/{MENH}/g, menh)
            .replace(/{NAM}/g, currentYear.toString())
            .replace(/{CAU_HOI}/g, formData.cauHoi || '[CÂU HỎI CỦA BẠN]')
            .replace(/{TEN_BAI}/g, formData.tenBai || '[TÊN BÀI TAROT]')
            .replace(/{MO_TA_BAI}/g, '[MÔ TẢ HÌNH ẢNH BÀI]')
            .replace(/{BAI_1}/g, '[TÊN BÀI 1 - VỊ TRÍ]')
            .replace(/{BAI_2}/g, '[TÊN BÀI 2 - VỊ TRÍ]')
            .replace(/{BAI_3}/g, '[TÊN BÀI 3 - VỊ TRÍ]')
            // Tử Vi specific (need actual chart data - using placeholders for now)
            .replace(/{CUNG}/g, '[TÊN CUNG]')
            .replace(/{SAO_CHINH}/g, '[DANH SÁCH SAO CHÍNH]')
            .replace(/{SAO_PHU}/g, '[DANH SÁCH SAO PHỤ]')
            .replace(/{TRANG_THAI}/g, '[MIẾU/VƯỢNG/ĐẮC ĐỊA/HÃM ĐỊA]')
            .replace(/{QUAN_LOC}/g, '[SAO TRONG CUNG QUAN LỘC]')
            .replace(/{TAI_BACH}/g, '[SAO TRONG CUNG TÀI BẠCH]')
            .replace(/{PHU_THE}/g, '[SAO TRONG CUNG PHU THÊ]')
            .replace(/{PHUC_DUC}/g, '[SAO TRONG CUNG PHÚC ĐỨC]')
            .replace(/{TAT_AC}/g, '[SAO TRONG CUNG TẬT ÁCH]')
            .replace(/{CAN}/g, '[SAO TRONG CUNG THÂN]')
            // Optional fields
            .replace(/{CAN_CHI_THANG}/g, '[CAN CHI THÁNG]')
            .replace(/{CAN_CHI_NGAY}/g, '[CAN CHI NGÀY]')
            .replace(/{CAN_CHI_GIO}/g, '[CAN CHI GIỜ]')
            // 12 Cung placeholders
            .replace(/{CUNG_MENH}/g, '[SAO TRONG CUNG BẢN MỆNH]')
            .replace(/{CUNG_PHU_THE}/g, '[SAO TRONG CUNG PHU THÊ]')
            .replace(/{CUNG_TAI_BACK}/g, '[SAO TRONG CUNG TÀI BẠCH]')
            .replace(/{CUNG_PHU_MAU}/g, '[SAO TRONG CUNG PHỤ MẪU]')
            .replace(/{CUNG_THIEN_DI}/g, '[SAO TRONG CUNG THIÊN DI]')
            .replace(/{CUNG_TAT_AC}/g, '[SAO TRONG CUNG TẬT ÁCH]')
            .replace(/{CUNG_NO_BOC}/g, '[SAO TRONG CUNG NÔ BỘC]')
            .replace(/{CUNG_QUAN_LOC}/g, '[SAO TRONG CUNG QUAN LỘC]')
            .replace(/{CUNG_DIEN_TRACH}/g, '[SAO TRONG CUNG ĐIỀN TRẠCH]')
            .replace(/{CUNG_TU_TUC}/g, '[SAO TRONG CUNG TỬ TỨC]')
            .replace(/{CUNG_HUYNH_DE}/g, '[SAO TRONG CUNG HUYNH ĐỆ]')
            .replace(/{CUNG_PHUC_DUC}/g, '[SAO TRONG CUNG PHÚC ĐỨC]');

        return prompt;
    }, [selectedPrompt, formData]);

    const handleCopy = async (prompt: string, id: PromptType) => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCategoryChange = (category: PromptCategory) => {
        setActiveCategory(category);
        const firstPrompt = promptTemplates.find(p => p.category === category);
        if (firstPrompt) setSelectedPrompt(firstPrompt.id);
    };

    return (
        <div className="min-h-screen bg-background-dark">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 text-primary mb-4">
                        <span className="material-symbols-outlined text-3xl">psychology</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tạo Prompt AI</h1>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Nhập thông tin của bạn, chọn loại prompt và nhận ngay prompt hoàn chỉnh để sử dụng với AI.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-2 mb-6">
                    <button
                        onClick={() => handleCategoryChange('tuvi')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeCategory === 'tuvi'
                                ? 'bg-primary text-background-dark'
                                : 'bg-surface-dark text-text-secondary hover:text-white'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">auto_awesome</span>
                            Tử Vi
                        </span>
                    </button>
                    <button
                        onClick={() => handleCategoryChange('tarot')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeCategory === 'tarot'
                                ? 'bg-primary text-background-dark'
                                : 'bg-surface-dark text-text-secondary hover:text-white'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">style</span>
                            Tarot
                        </span>
                    </button>
                    <button
                        onClick={() => handleCategoryChange('general')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeCategory === 'general'
                                ? 'bg-primary text-background-dark'
                                : 'bg-surface-dark text-text-secondary hover:text-white'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">tips_and_updates</span>
                            Mẹo & So Sánh
                        </span>
                    </button>
                </div>

                {/* Form Section */}
                {activeCategory !== 'general' && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="w-full p-4 bg-surface-dark rounded-xl border border-white/5 flex items-center justify-between hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
                                    <span className="material-symbols-outlined">edit</span>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-white">Thông tin của bạn</h3>
                                    <p className="text-sm text-text-secondary">
                                        {formData.ten ? `${formData.ten}, ${formData.namSinh}, ${formData.gioiTinh === 'nam' ? 'Nam' : 'Nữ'}` : 'Nhập để tạo prompt cá nhân hóa'}
                                    </p>
                                </div>
                            </div>
                            <span className={`material-symbols-outlined text-text-secondary transition-transform ${showForm ? 'rotate(180deg)' : ''}`}>
                                expand_more
                            </span>
                        </button>

                        {showForm && (
                            <div className="mt-4 p-4 bg-surface-dark rounded-xl border border-white/5 animate-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-text-secondary mb-2">Tên của bạn</label>
                                        <input
                                            type="text"
                                            value={formData.ten}
                                            onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
                                            placeholder="Ví dụ: Minh"
                                            className="w-full px-4 py-2.5 bg-background-dark rounded-lg border border-white/10 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-text-secondary mb-2">Giới tính</label>
                                        <select
                                            value={formData.gioiTinh}
                                            onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-background-dark rounded-lg border border-white/10 text-white focus:outline-none focus:border-primary"
                                        >
                                            <option value="nam">Nam</option>
                                            <option value="nu">Nữ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-text-secondary mb-2">Năm sinh</label>
                                        <input
                                            type="number"
                                            value={formData.namSinh}
                                            onChange={(e) => setFormData({ ...formData, namSinh: e.target.value })}
                                            placeholder="1995"
                                            min="1900"
                                            max="2025"
                                            className="w-full px-4 py-2.5 bg-background-dark rounded-lg border border-white/10 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    {selectedPrompt === 'tarot-question' && (
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm text-text-secondary mb-2">Câu hỏi của bạn</label>
                                            <input
                                                type="text"
                                                value={formData.cauHoi}
                                                onChange={(e) => setFormData({ ...formData, cauHoi: e.target.value })}
                                                placeholder="Ví dụ: Tôi nên làm gì trong công việc?"
                                                className="w-full px-4 py-2.5 bg-background-dark rounded-lg border border-white/10 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    )}
                                    {selectedPrompt === 'tarot-daily' && (
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm text-text-secondary mb-2">Tên lá bài Tarot (nếu có)</label>
                                            <input
                                                type="text"
                                                value={formData.tenBai}
                                                onChange={(e) => setFormData({ ...formData, tenBai: e.target.value })}
                                                placeholder="Ví dụ: The Fool, The Magician..."
                                                className="w-full px-4 py-2.5 bg-background-dark rounded-lg border border-white/10 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Info Display */}
                                {formData.namSinh && (
                                    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <p className="text-sm text-blue-300">
                                            <span className="font-medium">Thông tin được điền:</span> Can Chi = {getCanChi(parseInt(formData.namSinh) || 1995)}, Mệnh = {getMenh(parseInt(formData.namSinh) || 1995)}, Tuổi = {getAge(parseInt(formData.namSinh) || 1995)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Prompt Type Selection */}
                <div className="mb-6">
                    <label className="block text-sm text-text-secondary mb-2">Chọn loại prompt</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {filteredPrompts.map((prompt) => (
                            <button
                                key={prompt.id}
                                onClick={() => setSelectedPrompt(prompt.id)}
                                className={`p-3 rounded-lg text-left transition-all ${
                                    selectedPrompt === prompt.id
                                        ? 'bg-primary text-background-dark'
                                        : 'bg-surface-dark text-text-secondary hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <p className="font-medium text-sm">{prompt.title}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generated Prompt Preview */}
                <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">preview</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Prompt của bạn</h3>
                                <p className="text-xs text-text-secondary">Đã được điền thông tin tự động</p>
                            </div>
                        </div>
                        {promptTemplates.find(p => p.id === selectedPrompt)?.model && (
                            <span className="px-2 py-1 text-xs bg-blue-500/15 text-blue-400 rounded">
                                {promptTemplates.find(p => p.id === selectedPrompt)?.model}
                            </span>
                        )}
                    </div>

                    <div className="p-4">
                        <pre className="bg-background-dark p-4 rounded-lg text-sm text-text-secondary overflow-x-auto whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                            {generatedPrompt}
                        </pre>
                    </div>

                    <div className="p-4 border-t border-white/5">
                        <button
                            onClick={() => handleCopy(generatedPrompt, selectedPrompt)}
                            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                                copiedId === selectedPrompt
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-primary text-background-dark hover:bg-primary/90'
                            }`}
                        >
                            {copiedId === selectedPrompt ? (
                                <>
                                    <span className="material-symbols-outlined">check</span>
                                    Đã Copy!
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">content_copy</span>
                                    Copy Prompt Hoàn Chỉnh
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Tips for Tử Vi */}
                {activeCategory === 'tuvi' && (
                    <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-yellow-400">info</span>
                            <div>
                                <h4 className="font-medium text-yellow-400 mb-1">Lưu ý cho Tử Vi</h4>
                                <p className="text-sm text-text-secondary">
                                    Các thông tin về sao trong cung (Cung Quan Lộc, Phu Thê...) cần được điền thủ công từ lá số Tử Vi của bạn.
                                    Bạn có thể lấy thông tin này từ <a href="/tu-vi" className="text-primary hover:underline">trang lập lá số Tử Vi</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptGuideContent;
