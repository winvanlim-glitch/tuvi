import lunisolar from 'lunisolar';

// Hằng số cho Can Chi
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export interface LunarDate {
    day: number;
    month: number;
    year: number;
    canYear: string;
    chiYear: string;
    canMonth: string;
    chiMonth: string;
    canDay: string;
    chiDay: string;
    isLeap: boolean;
}

/**
 * Tính Can Chi tháng dựa trên Can năm và tháng âm lịch
 * Công thức: Can tháng = (Can năm * 2 + tháng) % 10
 */
function getMonthCanChi(canYear: string, lunarMonth: number): { can: string; chi: string } {
    const canYearIndex = CAN.indexOf(canYear);
    const canMonthIndex = (canYearIndex * 2 + lunarMonth) % 10;
    const chiMonthIndex = (lunarMonth + 1) % 12;
    return { can: CAN[canMonthIndex], chi: CHI[chiMonthIndex] };
}

/**
 * Tính Can Chi ngày dựa trên chu kỳ 60 ngày
 * Ngày bắt đầu chu kỳ: 04/02/1984 là ngày Giáp Tý
 */
function getDayCanChi(solarDate: Date): { can: string; chi: string } {
    const baseDate = new Date(1984, 1, 4); // 04/02/1984 = Giáp Tý
    const diffTime = solarDate.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const canIndex = diffDays % 10;
    const chiIndex = diffDays % 12;
    
    return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

/**
 * Chuyển đổi ngày Dương lịch sang Âm lịch và tính Can Chi
 */
export const convertSolarToLunar = (day: number, month: number, year: number): LunarDate => {
    const solarDate = new Date(year, month - 1, day);
    const lunisolarDate = lunisolar(solarDate);
    const lunar = lunisolarDate.lunar;

    // Tính Can Chi năm
    const canYearIndex = (year + 6) % 10;
    const chiYearIndex = (year + 8) % 12;
    const canYear = CAN[canYearIndex];
    const chiYear = CHI[chiYearIndex];

    // Tính Can Chi tháng
    const monthCC = getMonthCanChi(canYear, lunar.month);

    // Tính Can Chi ngày
    const dayCC = getDayCanChi(solarDate);

    return {
        day: lunar.day,
        month: lunar.month,
        year: lunar.year,
        canYear,
        chiYear,
        canMonth: monthCC.can,
        chiMonth: monthCC.chi,
        canDay: dayCC.can,
        chiDay: dayCC.chi,
        isLeap: lunar.isLeapMonth || false
    };
};

/**
 * Lấy Can Chi của một năm
 */
export const getYearCanChi = (year: number): string => {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    return `${CAN[canIndex]} ${CHI[chiIndex]}`;
};

/**
 * Tính Mệnh theo năm (Ngũ hành)
 */
export const getMenh = (year: number): string => {
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
};
