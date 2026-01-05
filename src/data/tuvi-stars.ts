// Tu Vi Star Definitions and Calculations
// This file contains information about major and minor stars in Tu Vi astrology

export interface StarDefinition {
    id: string;
    name: string;
    vietnameseName: string;
    type: 'major' | 'minor' | 'auxiliary';
    element?: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
    meaning: string;
    positive: string[];
    negative: string[];
}

// Major Stars (14 Main Stars)
export const MAJOR_STARS: StarDefinition[] = [
    {
        id: 'tu_vi',
        name: 'Tử Vi',
        vietnameseName: 'Tử Vi',
        type: 'major',
        element: 'Thổ',
        meaning: 'Đế vương sao, biểu trưng cho quyền lực và địa vị cao',
        positive: ['Lãnh đạo tốt', 'Có uy quyền', 'Được người khác tôn trọng'],
        negative: ['Dễ kiêu ngạo', 'Độc đoán', 'Xa cách người khác']
    },
    {
        id: 'thien_phu',
        name: 'Thiên Phủ',
        vietnameseName: 'Thiên Phủ',
        type: 'major',
        element: 'Thổ',
        meaning: 'Tài chính sao, quản lý tài sản và của cải',
        positive: ['Giỏi quản lý tài chính', 'Tích lũy được của cải', 'Sống thực tế'],
        negative: ['Quá trọng vật chất', 'Keo kiệt', 'Thiếu lý tưởng cao']
    },
    {
        id: 'thien_co',
        name: 'Thiên Cơ',
        vietnameseName: 'Thiên Cơ',
        type: 'major',
        element: 'Mộc',
        meaning: 'Trí tuệ sao, thông minh và nhanh nhạy',
        positive: ['Thông minh', 'Linh hoạt', 'Học hỏi nhanh'],
        negative: ['Thiếu kiên nhẫn', 'Hay thay đổi', 'Lo lắng quá nhiều']
    },
    {
        id: 'thai_am',
        name: 'Thái Âm',
        vietnameseName: 'Thái Âm',
        type: 'major',
        element: 'Thủy',
        meaning: 'Mặt trăng, biểu trưng cho sự dịu dàng và nội tâm',
        positive: ['Tinh tế', 'Nhạy cảm', 'Quan tâm người khác'],
        negative: ['Dễ bị tổn thương', 'Hay suy nghĩ tiêu cực', 'Thiếu quyết đoán']
    },
    {
        id: 'tham_lang',
        name: 'Tham Lang',
        vietnameseName: 'Tham Lang',
        type: 'major',
        element: 'Thủy',
        meaning: 'Dục vọng sao, đại diện cho tham vọng và ham muốn',
        positive: ['Năng động', 'Tham vọng lớn', 'Đa tài đa năng'],
        negative: ['Ham muốn quá mức', 'Không kiềm chế', 'Dễ sa ngã']
    },
    {
        id: 'cu_mon',
        name: 'Cự Môn',
        vietnameseName: 'Cự Môn',
        type: 'major',
        element: 'Thủy',
        meaning: 'Cánh cổng lớn, biểu trưng cho khẩu thiệt và tranh luận',
        positive: ['Hùng biện', 'Tư duy phản biện tốt', 'Không e sợ tranh luận'],
        negative: ['Hay cãi cọ', 'Khó tính', 'Dễ tạo kẻ thù']
    },
    {
        id: 'thien_tuong',
        name: 'Thiên Tướng',
        vietnameseName: 'Thiên Tướng',
        type: 'major',
        element: 'Thủy',
        meaning: 'Tướng quân, biểu trưng cho sự trợ giúp và hỗ trợ',
        positive: ['Tận tụy', 'Giúp đỡ người khác', 'Có trách nhiệm'],
        negative: ['Thiếu chủ kiến', 'Phụ thuộc', 'Ít sáng tạo']
    },
    {
        id: 'thien_luong',
        name: 'Thiên Lương',
        vietnameseName: 'Thiên Lương',
        type: 'major',
        element: 'Thổ',
        meaning: 'Cột trụ trời, biểu trưng cho sự che chở và bảo vệ',
        positive: ['Chính trực', 'Bảo vệ người yếu', 'Có đạo đức cao'],
        negative: ['Cứng nhắc', 'Bảo thủ', 'Quá nghiêm khắc']
    },
    {
        id: 'that_sat',
        name: 'Thất Sát',
        vietnameseName: 'Thất Sát',
        type: 'major',
        element: 'Kim',
        meaning: 'Bảy sát tinh, biểu trưng cho quyền lực và sự cứng rắn',
        positive: ['Dũng cảm', 'Quyết đoán', 'Uy lực'],
        negative: ['Bạo lực', 'Thiếu kiên nhẫn', 'Dễ xung đột']
    },
    {
        id: 'pha_quan',
        name: 'Phá Quân',
        vietnameseName: 'Phá Quân',
        type: 'major',
        element: 'Thủy',
        meaning: 'Phá hoại sao, biểu trưng cho thay đổi và đột phá',
        positive: ['Dám phá bỏ cũ', 'Cải cách', 'Đổi mới'],
        negative: ['Phá hoại', 'Không ổn định', 'Thiếu kiên nhẫn']
    }
];

// Lucky Hours Calculation (Giờ Hoàng Đạo)
export const LUCKY_HOURS: Record<string, string[]> = {
    'Kim': ['Tý (23h-01h)', 'Sửu (01h-03h)', 'Thân (15h-17h)', 'Dậu (17h-19h)'],
    'Mộc': ['Dần (03h-05h)', 'Mão (05h-07h)', 'Tỵ (09h-11h)', 'Ngọ (11h-13h)'],
    'Thủy': ['Tý (23h-01h)', 'Sửu (01h-03h)', 'Thân (15h-17h)', 'Dậu (17h-19h)'],
    'Hỏa': ['Dần (03h-05h)', 'Mão (05h-07h)', 'Tỵ (09h-11h)', 'Ngọ (11h-13h)'],
    'Thổ': ['Thìn (07h-09h)', 'Tuất (19h-21h)', 'Sửu (01h-03h)', 'Mùi (13h-15h)']
};

export function getLuckyHours(menh: string): string {
    const hours = LUCKY_HOURS[menh] || [];
    return hours.slice(0, 2).join(', ');
}

// Element Interactions (Ngũ Hành Tương Sinh / Tương Khắc)
export const ELEMENT_INTERACTIONS = {
    supports: {
        'Kim': 'Thủy',  // Kim sinh Thủy
        'Thủy': 'Mộc',  // Thủy sinh Mộc
        'Mộc': 'Hỏa',   // Mộc sinh Hỏa
        'Hỏa': 'Thổ',   // Hỏa sinh Thổ
        'Thổ': 'Kim'    // Thổ sinh Kim
    },
    controls: {
        'Kim': 'Mộc',   // Kim khắc Mộc
        'Mộc': 'Thổ',   // Mộc khắc Thổ
        'Thổ': 'Thủy',  // Thổ khắc Thủy
        'Thủy': 'Hỏa',  // Thủy khắc Hỏa
        'Hỏa': 'Kim'    // Hỏa khắc Kim
    }
};
