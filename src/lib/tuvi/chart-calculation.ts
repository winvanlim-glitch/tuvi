/**
 * Logic tính toán an cung (đặt sao vào 12 cung)
 * Dựa trên ngày, giờ, tháng, năm sinh
 */

import { convertSolarToLunar, LunarDate } from './core';
import { ALL_STARS, STAR_BY_ID } from '@/data/tuvi-stars';

// 12 cung theo thứ tự
export const PALACE_IDS = [
    'menh',        // Mệnh (cung 1)
    'phu_mau',     // Phụ Mẫu (cung 2)
    'phuc_duc',    // Phúc Đức (cung 3)
    'dien_trach',  // Điền Trạch (cung 4)
    'quan_loc',    // Quan Lộc (cung 5)
    'no_boc',      // Nô Bộc (cung 6)
    'tat_ach',     // Tật Ách (cung 7)
    'tai_bach',    // Tài Bạch (cung 8)
    'tu_tuc',      // Tử Tức (cung 9)
    'phu_the',     // Phu Thê (cung 10)
    'huynh_de',    // Huynh Đệ (cung 11)
    'thien_di'     // Thiên Di (cung 12)
] as const;

export type PalaceId = typeof PALACE_IDS[number];

export interface StarPlacement {
    starId: string;
    starName: string;
    type: 'major' | 'minor' | 'auxiliary';
    status?: 'Miếu' | 'Vượng' | 'Đắc Địa' | 'Hãm Địa' | 'Bình';
}

export interface PalaceData {
    main_stars: string[];
    support_stars: string[];
    status: 'Miếu' | 'Vượng' | 'Đắc Địa' | 'Hãm Địa' | 'Bình';
    stars: StarPlacement[];
}

export interface ChartData {
    menh: PalaceData;
    tai_bach: PalaceData;
    quan_loc: PalaceData;
    phu_the: PalaceData;
    phuc_duc: PalaceData;
    thien_di: PalaceData;
    dien_trach: PalaceData;
    tu_tuc: PalaceData;
    phu_mau: PalaceData;
    huynh_de: PalaceData;
    no_boc: PalaceData;
    tat_ach: PalaceData;
    birth_info: {
        hour: string; // Can Chi giờ
        gender: 'Nam' | 'Nữ' | 'Khác';
        element: string; // Ngũ hành
        canChiYear: string;
        canChiMonth: string;
        canChiDay: string;
    };
}

// Can Chi mapping
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/**
 * Tính Can Chi giờ từ giờ sinh (0-23)
 */
function getHourCanChi(hour: number): string {
    // Giờ Tý = 23h-1h, Sửu = 1h-3h, ...
    let chiIndex = Math.floor((hour + 1) / 2) % 12;
    if (hour === 23) chiIndex = 0; // 23h thuộc Tý
    
    // Can giờ dựa trên Can ngày (đơn giản hóa)
    // Trong thực tế cần tính từ Can ngày, ở đây dùng công thức đơn giản
    const canIndex = (chiIndex * 2) % 10;
    
    return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

/**
 * Tính Can Chi tháng từ tháng âm lịch
 */
function getMonthCanChi(month: number, year: number): string {
    // Công thức đơn giản: Can tháng = (Can năm * 2 + tháng - 1) % 10
    const canYearIndex = (year + 6) % 10;
    const canMonthIndex = (canYearIndex * 2 + month - 1) % 10;
    const chiMonthIndex = (month + 1) % 12;
    
    return `${CAN[canMonthIndex]} ${CHI[chiMonthIndex]}`;
}

/**
 * Tính Can Chi ngày (đơn giản hóa)
 */
function getDayCanChi(day: number, month: number, year: number): string {
    // Công thức đơn giản, trong thực tế cần tính chính xác hơn
    const base = year * 365 + month * 30 + day;
    const canIndex = (base + 6) % 10;
    const chiIndex = (base + 8) % 12;
    
    return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

/**
 * Tính cung Mệnh dựa trên tháng và giờ sinh
 * Công thức: Cung Mệnh = (Tháng - Giờ) mod 12 + 1
 */
function calculateMenhPalace(month: number, hour: number): number {
    const hourPalace = Math.floor((hour + 1) / 2) % 12;
    let menhIndex = (month - hourPalace - 1) % 12;
    if (menhIndex < 0) menhIndex += 12;
    return menhIndex;
}

/**
 * An sao chính vào cung Mệnh dựa trên tháng sinh
 */
function getMainStarInMenh(month: number): string[] {
    // Đơn giản hóa: dựa trên tháng để chọn sao chính
    const monthStars: Record<number, string[]> = {
        1: ['tu_vi', 'thien_co'],
        2: ['thien_co', 'thai_am'],
        3: ['thai_duong', 'thien_co'],
        4: ['vu_khuc', 'thien_co'],
        5: ['thien_dong', 'thien_co'],
        6: ['lien_trinh', 'thien_co'],
        7: ['thien_phu', 'thien_co'],
        8: ['thai_am', 'thien_co'],
        9: ['tham_lang', 'thien_co'],
        10: ['cu_mon', 'thien_co'],
        11: ['thien_tuong', 'thien_co'],
        12: ['thien_luong', 'thien_co']
    };
    
    return monthStars[month] || ['tu_vi', 'thien_co'];
}

/**
 * An sao phụ vào các cung
 */
function getSupportStars(palaceIndex: number, month: number, hour: number): string[] {
    const stars: string[] = [];
    
    // Thiên Việt - quý nhân tinh
    if (palaceIndex === 0 || palaceIndex === 4) { // Mệnh hoặc Quan Lộc
        stars.push('thien_viet');
    }
    
    // Thiên Mã - di động tinh
    if (palaceIndex === 11) { // Thiên Di
        stars.push('thien_ma');
    }
    
    // Thiên Phúc - phúc đức
    if (palaceIndex === 2) { // Phúc Đức
        stars.push('thien_phuc');
    }
    
    // Thiên Lộc - tài lộc
    if (palaceIndex === 7) { // Tài Bạch
        stars.push('thien_loi');
    }
    
    return stars;
}

/**
 * Xác định trạng thái sao (Miếu, Vượng, Đắc Địa, Hãm Địa)
 */
function getStarStatus(starId: string, palaceIndex: number, element: string): 'Miếu' | 'Vượng' | 'Đắc Địa' | 'Hãm Địa' | 'Bình' {
    const star = STAR_BY_ID[starId];
    if (!star) return 'Bình';
    
    // Logic đơn giản: sao cùng hành với cung thì Vượng
    // Trong thực tế cần logic phức tạp hơn
    const palaceElements: Record<number, string> = {
        0: element, // Mệnh dùng mệnh
        4: 'Hỏa', // Quan Lộc thường Hỏa
        7: 'Kim', // Tài Bạch thường Kim
    };
    
    const palaceElement = palaceElements[palaceIndex] || 'Bình';
    
    if (star.element === palaceElement) {
        return 'Vượng';
    }
    
    // Một số sao đặc biệt
    if (starId === 'tu_vi' && palaceIndex === 0) return 'Miếu';
    if (starId === 'thien_phu' && palaceIndex === 7) return 'Vượng';
    
    return 'Bình';
}

/**
 * Tính toán toàn bộ lá số Tử Vi
 */
export function calculateChart(
    day: number,
    month: number,
    year: number,
    hour: number,
    minute: number,
    gender: 'Nam' | 'Nữ' | 'Khác'
): ChartData {
    const lunar = convertSolarToLunar(day, month, year);
    const element = getMenhFromYear(year);
    
    // Tính Can Chi
    const canChiYear = `${lunar.canYear} ${lunar.chiYear}`;
    const canChiMonth = getMonthCanChi(lunar.month, year);
    const canChiDay = getDayCanChi(lunar.day, lunar.month, year);
    const canChiHour = getHourCanChi(hour);
    
    // Tính cung Mệnh
    const menhIndex = calculateMenhPalace(lunar.month, hour);
    
    // Tạo dữ liệu cho 12 cung
    const chart: Partial<ChartData> = {
        birth_info: {
            hour: canChiHour,
            gender,
            element,
            canChiYear,
            canChiMonth,
            canChiDay
        }
    };
    
    // Khởi tạo tất cả cung
    PALACE_IDS.forEach((palaceId, index) => {
        const stars: StarPlacement[] = [];
        const mainStars: string[] = [];
        const supportStars: string[] = [];
        
        // An sao chính vào cung Mệnh
        if (index === menhIndex) {
            const mainStarIds = getMainStarInMenh(lunar.month);
            mainStarIds.forEach(starId => {
                const star = STAR_BY_ID[starId];
                if (star) {
                    mainStars.push(star.vietnameseName);
                    stars.push({
                        starId,
                        starName: star.vietnameseName,
                        type: star.type,
                        status: getStarStatus(starId, index, element)
                    });
                }
            });
        }
        
        // An sao phụ
        const supportStarIds = getSupportStars(index, lunar.month, hour);
        supportStarIds.forEach(starId => {
            const star = STAR_BY_ID[starId];
            if (star) {
                supportStars.push(star.vietnameseName);
                stars.push({
                    starId,
                    starName: star.vietnameseName,
                    type: star.type,
                    status: getStarStatus(starId, index, element)
                });
            }
        });
        
        // Xác định trạng thái cung
        let status: 'Miếu' | 'Vượng' | 'Đắc Địa' | 'Hãm Địa' | 'Bình' = 'Bình';
        if (stars.some(s => s.status === 'Miếu')) status = 'Miếu';
        else if (stars.some(s => s.status === 'Vượng')) status = 'Vượng';
        else if (stars.some(s => s.status === 'Đắc Địa')) status = 'Đắc Địa';
        else if (stars.some(s => s.status === 'Hãm Địa')) status = 'Hãm Địa';
        
        (chart as any)[palaceId] = {
            main_stars: mainStars,
            support_stars: supportStars,
            status,
            stars
        };
    });
    
    return chart as ChartData;
}

/**
 * Helper: Tính mệnh từ năm
 */
function getMenhFromYear(year: number): string {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    
    const valCan = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][canIndex];
    const valChi = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2][chiIndex];
    
    let sum = valCan + valChi;
    if (sum > 5) sum -= 5;
    
    const MENH: Record<number, string> = {
        1: 'Kim',
        2: 'Thủy',
        3: 'Hỏa',
        4: 'Thổ',
        5: 'Mộc'
    };
    
    return MENH[sum] || 'Chưa xác định';
}

