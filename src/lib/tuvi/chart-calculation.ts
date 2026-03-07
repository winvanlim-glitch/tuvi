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
        hour: string;
        gender: 'Nam' | 'Nữ' | 'Khác';
        element: string;
        canChiYear: string;
        canChiMonth: string;
        canChiDay: string;
    };
    /** Vị trí Tứ Hóa: chỉ số cung (0–11) của Liêm Trinh, Phá Quân, Thái Dương, Vũ Khúc */
    tu_hoa: {
        lien_trinh: number;
        pha_quan: number;
        thai_duong: number;
        vu_khuc: number;
    };
}

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const CHI_ELEMENTS: Record<string, string> = {
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
    'Thìn': 'Thổ', 'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
    'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy'
};

function getHourCanChi(hour: number): string {
    let chiIndex = Math.floor((hour + 1) / 2) % 12;
    if (hour === 23) chiIndex = 0;
    const canIndex = (chiIndex * 2) % 10;
    return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

function getMonthCanChi(month: number, year: number): string {
    const canYearIndex = (year + 6) % 10;
    const canMonthIndex = (canYearIndex * 2 + month - 1) % 10;
    const chiMonthIndex = (month + 1) % 12;
    return `${CAN[canMonthIndex]} ${CHI[chiMonthIndex]}`;
}

function getDayCanChi(lunarDay: number, lunarMonth: number, year: number, canYear: string): string {
    const canYearIndex = CAN.indexOf(canYear);
    const canDayIndex = (canYearIndex * 6 + lunarMonth * 9 + lunarDay) % 10;
    const baseYear = 1984;
    const yearDiff = year - baseYear;
    const totalDays = yearDiff * 365 + Math.floor(yearDiff / 4) + (lunarMonth - 1) * 30 + lunarDay;
    const chiDayIndex = totalDays % 12;
    return `${CAN[canDayIndex]} ${CHI[chiDayIndex]}`;
}

function calculateMenhPalace(month: number, hour: number): number {
    const hourPalace = Math.floor((hour + 1) / 2) % 12;
    let menhIndex = (month - hourPalace - 1) % 12;
    if (menhIndex < 0) menhIndex += 12;
    return menhIndex;
}

function calculateTuHoa(menhIndex: number, canYear: string): { lien_trinh: number; pha_quan: number; thai_duong: number; vu_khuc: number } {
    const canIndex = CAN.indexOf(canYear);
    let lien_trinh: number, pha_quan: number, thai_duong: number, vu_khuc: number;
    
    if (canIndex === 0 || canIndex === 1 || canIndex === 8 || canIndex === 9) {
        lien_trinh = (menhIndex + 2) % 12;
        pha_quan = (menhIndex + 8) % 12;
        thai_duong = (menhIndex + 10) % 12;
        vu_khuc = (menhIndex + 4) % 12;
    } else if (canIndex === 2 || canIndex === 3) {
        thai_duong = (menhIndex + 2) % 12;
        vu_khuc = (menhIndex + 8) % 12;
        lien_trinh = (menhIndex + 10) % 12;
        pha_quan = (menhIndex + 4) % 12;
    } else if (canIndex === 4 || canIndex === 5) {
        lien_trinh = (menhIndex + 2) % 12;
        vu_khuc = (menhIndex + 8) % 12;
        pha_quan = (menhIndex + 10) % 12;
        thai_duong = (menhIndex + 4) % 12;
    } else {
        pha_quan = (menhIndex + 2) % 12;
        thai_duong = (menhIndex + 8) % 12;
        vu_khuc = (menhIndex + 10) % 12;
        lien_trinh = (menhIndex + 4) % 12;
    }
    
    return { lien_trinh, pha_quan, thai_duong, vu_khuc };
}

function getMainStarInMenh(month: number): string[] {
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

function getSupportStars(palaceIndex: number, month: number, hour: number, menhIndex: number): string[] {
    const stars: string[] = [];
    
    if (palaceIndex === menhIndex || palaceIndex === 4) stars.push('thien_viet');
    if (palaceIndex === 11) stars.push('thien_ma');
    if (palaceIndex === 2) stars.push('thien_phuc');
    if (palaceIndex === 7) stars.push('thien_loi');
    if (palaceIndex === 2 || palaceIndex === menhIndex) stars.push('thien_duc');
    if (palaceIndex === 6) stars.push('thien_y');
    if (palaceIndex === 4 || palaceIndex === menhIndex) stars.push('thien_quy');
    if (palaceIndex === 8) stars.push('thien_tu');
    if (palaceIndex === 10) stars.push('thien_huu');
    if (palaceIndex === 4) stars.push('thien_quan');
    if (palaceIndex === 6) stars.push('thien_khong');
    if (palaceIndex === 0) stars.push('thien_khoc');
    if (palaceIndex === 6) stars.push('thien_hinh');
    if (palaceIndex === 5) stars.push('thien_sat');
    
    return stars;
}

function getStarStatus(starId: string, palaceIndex: number, chiMonth: string, canYear: string): 'Miếu' | 'Vượng' | 'Đắc Địa' | 'Hãm Địa' | 'Bình' {
    const star = STAR_BY_ID[starId];
    if (!star || !star.element) return 'Bình';
    
    const palaceElement = CHI_ELEMENTS[chiMonth] || 'Bình';
    
    if (star.element === palaceElement) return 'Vượng';
    
    const starPalaceRules: Record<string, number[]> = {
        'tu_vi': [0], 'thien_phu': [7], 'thai_am': [11], 'tham_lang': [3],
        'cu_mon': [9], 'thien_tuong': [4], 'thien_luong': [6], 'that_sat': [5],
        'pha_quan': [1], 'vu_khuc': [2], 'thien_dong': [8], 'thai_duong': [10], 'lien_trinh': [3],
    };
    
    if (starPalaceRules[starId]?.includes(palaceIndex)) return 'Miếu';
    
    const elements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    const controlMap: Record<string, string> = {
        'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim'
    };
    
    if (controlMap[star.element] === palaceElement) return 'Hãm Địa';
    
    const produceMap: Record<string, string> = {
        'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim'
    };
    
    if (produceMap[star.element] === palaceElement) return 'Đắc Địa';
    
    return 'Bình';
}

export function calculateChart(
    day: number, month: number, year: number,
    hour: number, minute: number, gender: 'Nam' | 'Nữ' | 'Khác'
): ChartData {
    const lunar = convertSolarToLunar(day, month, year);
    const element = getMenhFromYear(year);
    
    const canChiYear = `${lunar.canYear} ${lunar.chiYear}`;
    const canChiMonth = getMonthCanChi(lunar.month, year);
    const canChiDay = getDayCanChi(lunar.day, lunar.month, year, lunar.canYear);
    const canChiHour = getHourCanChi(hour);
    
    const menhIndex = calculateMenhPalace(lunar.month, hour);
    const tuHoa = calculateTuHoa(menhIndex, lunar.canYear);
    
    const chart: Partial<ChartData> = {
        birth_info: {
            hour: canChiHour, gender, element, canChiYear, canChiMonth, canChiDay
        },
        tu_hoa: tuHoa
    };
    
    const chiMonth = canChiMonth.split(' ')[1];
    
    PALACE_IDS.forEach((palaceId, index) => {
        const stars: StarPlacement[] = [];
        const mainStars: string[] = [];
        const supportStars: string[] = [];
        
        if (index === menhIndex) {
            const mainStarIds = getMainStarInMenh(lunar.month);
            mainStarIds.forEach(starId => {
                const star = STAR_BY_ID[starId];
                if (star) {
                    mainStars.push(star.vietnameseName);
                    stars.push({
                        starId, starName: star.vietnameseName, type: star.type,
                        status: getStarStatus(starId, index, chiMonth, lunar.canYear)
                    });
                }
            });
        }
        
        const tuHoaStars = [
            { id: 'lien_trinh', index: tuHoa.lien_trinh },
            { id: 'pha_quan', index: tuHoa.pha_quan },
            { id: 'thai_duong', index: tuHoa.thai_duong },
            { id: 'vu_khuc', index: tuHoa.vu_khuc }
        ];
        
        tuHoaStars.forEach(({ id, index: thIndex }) => {
            if (index === thIndex) {
                const star = STAR_BY_ID[id];
                if (star && !stars.find(s => s.starId === id)) {
                    stars.push({
                        starId: id, starName: star.vietnameseName, type: star.type,
                        status: getStarStatus(id, index, chiMonth, lunar.canYear)
                    });
                }
            }
        });
        
        const supportStarIds = getSupportStars(index, lunar.month, hour, menhIndex);
        supportStarIds.forEach(starId => {
            const star = STAR_BY_ID[starId];
            if (star && !stars.find(s => s.starId === starId)) {
                supportStars.push(star.vietnameseName);
                stars.push({
                    starId, starName: star.vietnameseName, type: star.type,
                    status: getStarStatus(starId, index, chiMonth, lunar.canYear)
                });
            }
        });
        
        let status: 'Miếu' | 'Vượng' | 'Đắc Địa' | 'Hãm Địa' | 'Bình' = 'Bình';
        if (stars.some(s => s.status === 'Miếu')) status = 'Miếu';
        else if (stars.some(s => s.status === 'Vượng')) status = 'Vượng';
        else if (stars.some(s => s.status === 'Đắc Địa')) status = 'Đắc Địa';
        else if (stars.some(s => s.status === 'Hãm Địa')) status = 'Hãm Địa';
        
        (chart as any)[palaceId] = { main_stars: mainStars, support_stars: supportStars, status, stars };
    });
    
    return chart as ChartData;
}

function getMenhFromYear(year: number): string {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    
    const valCan = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][canIndex];
    const valChi = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2][chiIndex];
    
    let sum = valCan + valChi;
    if (sum > 5) sum -= 5;
    
    const MENH: Record<number, string> = { 1: 'Kim', 2: 'Thủy', 3: 'Hỏa', 4: 'Thổ', 5: 'Mộc' };
    return MENH[sum] || 'Chưa xác định';
}
