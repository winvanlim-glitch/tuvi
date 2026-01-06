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
    },
    {
        id: 'vu_khuc',
        name: 'Vũ Khúc',
        vietnameseName: 'Vũ Khúc',
        type: 'major',
        element: 'Kim',
        meaning: 'Tài tinh, biểu trưng cho tài chính và nghệ thuật',
        positive: ['Tài năng nghệ thuật', 'Giỏi quản lý tài chính', 'Có duyên với tiền bạc'],
        negative: ['Dễ hao tài', 'Quá trọng vật chất', 'Thiếu tình cảm']
    },
    {
        id: 'thien_dong',
        name: 'Thiên Đồng',
        vietnameseName: 'Thiên Đồng',
        type: 'major',
        element: 'Thủy',
        meaning: 'Phúc tinh, biểu trưng cho may mắn và phúc đức',
        positive: ['May mắn', 'Được quý nhân giúp đỡ', 'Cuộc sống an nhàn'],
        negative: ['Thiếu quyết đoán', 'Dễ ỷ lại', 'Lười biếng']
    },
    {
        id: 'thai_duong',
        name: 'Thái Dương',
        vietnameseName: 'Thái Dương',
        type: 'major',
        element: 'Hỏa',
        meaning: 'Mặt trời, biểu trưng cho ánh sáng và quyền lực',
        positive: ['Sáng suốt', 'Có uy quyền', 'Được mọi người kính trọng'],
        negative: ['Dễ kiêu ngạo', 'Áp đặt ý kiến', 'Thiếu linh hoạt']
    },
    {
        id: 'lien_trinh',
        name: 'Liêm Trinh',
        vietnameseName: 'Liêm Trinh',
        type: 'major',
        element: 'Hỏa',
        meaning: 'Tinh tinh, biểu trưng cho sự trong sạch và chính trực',
        positive: ['Chính trực', 'Trong sạch', 'Có nguyên tắc'],
        negative: ['Cứng nhắc', 'Thiếu linh hoạt', 'Dễ cô độc']
    }
];

// Minor Stars (Phụ Tinh)
export const MINOR_STARS: StarDefinition[] = [
    {
        id: 'thien_viet',
        name: 'Thiên Việt',
        vietnameseName: 'Thiên Việt',
        type: 'minor',
        element: 'Hỏa',
        meaning: 'Quý nhân tinh, biểu trưng cho sự giúp đỡ và may mắn',
        positive: ['Được quý nhân giúp đỡ', 'Gặp may mắn', 'Vượt qua khó khăn'],
        negative: ['Dễ ỷ lại', 'Thiếu tự lực']
    },
    {
        id: 'thien_ma',
        name: 'Thiên Mã',
        vietnameseName: 'Thiên Mã',
        type: 'minor',
        element: 'Hỏa',
        meaning: 'Di động tinh, biểu trưng cho sự di chuyển và thay đổi',
        positive: ['Năng động', 'Thích nghi tốt', 'Gặp cơ hội khi đi xa'],
        negative: ['Thiếu ổn định', 'Dễ thay đổi']
    },
    {
        id: 'thien_khong',
        name: 'Thiên Không',
        vietnameseName: 'Thiên Không',
        type: 'minor',
        element: 'Thủy',
        meaning: 'Hư không tinh, biểu trưng cho sự trống rỗng và mất mát',
        positive: ['Buông bỏ được', 'Tự do tinh thần'],
        negative: ['Dễ mất mát', 'Thiếu ổn định', 'Hao tài']
    },
    {
        id: 'thien_khoc',
        name: 'Thiên Khốc',
        vietnameseName: 'Thiên Khốc',
        type: 'minor',
        element: 'Thủy',
        meaning: 'Khóc lóc tinh, biểu trưng cho buồn phiền và khó khăn',
        positive: ['Nhạy cảm', 'Thấu hiểu người khác'],
        negative: ['Dễ buồn phiền', 'Gặp khó khăn', 'Tinh thần không ổn định']
    },
    {
        id: 'thien_hinh',
        name: 'Thiên Hình',
        vietnameseName: 'Thiên Hình',
        type: 'minor',
        element: 'Hỏa',
        meaning: 'Hình phạt tinh, biểu trưng cho sự trừng phạt và rắc rối',
        positive: ['Có kỷ luật', 'Biết sửa sai'],
        negative: ['Dễ gặp rắc rối', 'Bị trừng phạt', 'Xung đột pháp luật']
    },
    {
        id: 'thien_duong',
        name: 'Thiên Dương',
        vietnameseName: 'Thiên Dương',
        type: 'minor',
        element: 'Hỏa',
        meaning: 'Dương khí tinh, biểu trưng cho sức mạnh và năng lượng',
        positive: ['Năng động', 'Mạnh mẽ', 'Có sức khỏe tốt'],
        negative: ['Dễ nóng nảy', 'Thiếu kiên nhẫn']
    },
    {
        id: 'thien_phu',
        name: 'Thiên Phủ',
        vietnameseName: 'Thiên Phủ',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Phủ đệ tinh, biểu trưng cho sự che chở và bảo vệ',
        positive: ['Được bảo vệ', 'Có nơi nương tựa', 'An toàn'],
        negative: ['Thiếu tự lập', 'Dễ ỷ lại']
    },
    {
        id: 'thien_huu',
        name: 'Thiên Hữu',
        vietnameseName: 'Thiên Hữu',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Bạn bè tinh, biểu trưng cho mối quan hệ và sự giúp đỡ',
        positive: ['Có nhiều bạn bè', 'Được giúp đỡ', 'Quan hệ tốt'],
        negative: ['Dễ bị lợi dụng', 'Thiếu chọn lọc']
    },
    {
        id: 'thien_quan',
        name: 'Thiên Quan',
        vietnameseName: 'Thiên Quan',
        type: 'minor',
        element: 'Kim',
        meaning: 'Quan chức tinh, biểu trưng cho địa vị và quyền lực',
        positive: ['Có địa vị', 'Được tôn trọng', 'Quyền lực'],
        negative: ['Dễ kiêu ngạo', 'Áp đặt']
    },
    {
        id: 'thien_phuc',
        name: 'Thiên Phúc',
        vietnameseName: 'Thiên Phúc',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Phúc đức tinh, biểu trưng cho may mắn và phước lành',
        positive: ['May mắn', 'Phúc đức', 'Gặp lành'],
        negative: ['Dễ ỷ lại', 'Thiếu nỗ lực']
    },
    {
        id: 'thien_duc',
        name: 'Thiên Đức',
        vietnameseName: 'Thiên Đức',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Đức độ tinh, biểu trưng cho đạo đức và nhân cách',
        positive: ['Có đạo đức', 'Được kính trọng', 'Nhân cách tốt'],
        negative: ['Dễ bị lợi dụng', 'Quá tốt bụng']
    },
    {
        id: 'thien_y',
        name: 'Thiên Y',
        vietnameseName: 'Thiên Y',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Y tế tinh, biểu trưng cho sức khỏe và y học',
        positive: ['Sức khỏe tốt', 'Có duyên với y học', 'Chữa bệnh giỏi'],
        negative: ['Dễ ốm đau', 'Lo lắng về sức khỏe']
    },
    {
        id: 'thien_loi',
        name: 'Thiên Lộc',
        vietnameseName: 'Thiên Lộc',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Lộc tinh, biểu trưng cho tài lộc và thu nhập',
        positive: ['Tài lộc tốt', 'Thu nhập ổn định', 'Có của ăn của để'],
        negative: ['Dễ hao tài', 'Chi tiêu không kiểm soát']
    },
    {
        id: 'thien_quy',
        name: 'Thiên Quý',
        vietnameseName: 'Thiên Quý',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Quý nhân tinh, biểu trưng cho sự giúp đỡ và may mắn',
        positive: ['Được quý nhân giúp', 'Gặp may mắn', 'Vượt qua khó khăn'],
        negative: ['Dễ ỷ lại', 'Thiếu tự lực']
    },
    {
        id: 'thien_tu',
        name: 'Thiên Tử',
        vietnameseName: 'Thiên Tử',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Con cái tinh, biểu trưng cho con cái và hậu duệ',
        positive: ['Con cái tốt', 'Có hậu duệ tốt', 'Gia đình hạnh phúc'],
        negative: ['Lo lắng về con cái', 'Khó có con']
    },
    {
        id: 'thien_hu',
        name: 'Thiên Hư',
        vietnameseName: 'Thiên Hư',
        type: 'minor',
        element: 'Thủy',
        meaning: 'Hư không tinh, biểu trưng cho sự trống rỗng và mất mát',
        positive: ['Buông bỏ được', 'Tự do'],
        negative: ['Dễ mất mát', 'Thiếu ổn định']
    },
    {
        id: 'thien_sat',
        name: 'Thiên Sát',
        vietnameseName: 'Thiên Sát',
        type: 'minor',
        element: 'Kim',
        meaning: 'Sát tinh, biểu trưng cho sự nguy hiểm và xung đột',
        positive: ['Dũng cảm', 'Quyết đoán'],
        negative: ['Dễ gặp nguy hiểm', 'Xung đột', 'Tai nạn']
    },
    {
        id: 'thien_huong',
        name: 'Thiên Hương',
        vietnameseName: 'Thiên Hương',
        type: 'minor',
        element: 'Mộc',
        meaning: 'Hương thơm tinh, biểu trưng cho danh tiếng và uy tín',
        positive: ['Có danh tiếng', 'Được yêu mến', 'Uy tín tốt'],
        negative: ['Dễ bị đố kỵ', 'Danh tiếng không tốt']
    },
    {
        id: 'thien_giac',
        name: 'Thiên Giác',
        vietnameseName: 'Thiên Giác',
        type: 'minor',
        element: 'Mộc',
        meaning: 'Giác ngộ tinh, biểu trưng cho trí tuệ và hiểu biết',
        positive: ['Thông minh', 'Hiểu biết sâu', 'Có trí tuệ'],
        negative: ['Dễ tự phụ', 'Thiếu khiêm tốn']
    },
    {
        id: 'thien_quan_phu',
        name: 'Thiên Quan Phủ',
        vietnameseName: 'Thiên Quan Phủ',
        type: 'minor',
        element: 'Thổ',
        meaning: 'Quan phủ tinh, biểu trưng cho địa vị và quyền lực',
        positive: ['Có địa vị', 'Quyền lực', 'Được tôn trọng'],
        negative: ['Dễ kiêu ngạo', 'Áp đặt']
    }
];

// All stars combined
export const ALL_STARS = [...MAJOR_STARS, ...MINOR_STARS];

// Star lookup by ID
export const STAR_BY_ID: Record<string, StarDefinition> = {};
ALL_STARS.forEach(star => {
    STAR_BY_ID[star.id] = star;
});

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
