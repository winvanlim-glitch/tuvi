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
}

/**
 * Chuyển đổi ngày Dương lịch sang Âm lịch và tính Can Chi
 */
export const convertSolarToLunar = (day: number, month: number, year: number): LunarDate => {
    const lunisolarDate = lunisolar(new Date(year, month - 1, day));
    const lunar = lunisolarDate.lunar;

    // Tính năm Can Chi
    const canYearIndex = (year + 6) % 10;
    const chiYearIndex = (year + 8) % 12;

    // Lưu ý: lunisolar có thể trả về thông tin charmbinder, ở đây ta tự tính toán đơn giản trước
    // hoặc dùng API của library nếu có plugin. Để kiểm soát tốt hơn text tiếng Việt, ta tự map.

    return {
        day: lunar.day,
        month: lunar.month,
        year: lunar.year,
        canYear: CAN[canYearIndex],
        chiYear: CHI[chiYearIndex],
        // Tạm thời để trống can/chi tháng/ngày vì logic phức tạp hơn, có thể bổ sung sau
        canMonth: '',
        chiMonth: '',
        canDay: '',
        chiDay: '',
        // isLeap thông tin không cần dùng trong bản hiện tại
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
 * Công thức: Can + Chi = Mệnh
 * Quy ước Can: Giáp/Ất=1, Bính/Đinh=2, Mậu/Kỷ=3, Canh/Tân=4, Nhâm/Quý=5
 * Quy ước Chi: Tý/Sửu/Ngọ/Mùi=0, Dần/Mão/Thân/Dậu=1, Thìn/Tỵ/Tuất/Hợi=2
 * Tổng > 5 thì trừ 5.
 * Kết quả: 1=Kim, 2=Thủy, 3=Hỏa, 4=Thổ, 5=Mộc
 */
export const getMenh = (year: number): string => {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;

    const valCan = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][canIndex];
    const valChi = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2][chiIndex];

    let sum = valCan + valChi;
    if (sum > 5) sum -= 5;

    const MENH = {
        1: 'Kim',
        2: 'Thủy',
        3: 'Hỏa',
        4: 'Thổ',
        5: 'Mộc'
    };

    return (MENH as any)[sum] || 'Chưa xác định';
};
