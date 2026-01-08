import { convertSolarToLunar, getMenh, getYearCanChi } from '@/lib/tuvi/core';
import { MENH_RULES, TuViContent } from '@/data/tuvi-rules';
import { calculateChart, ChartData } from '@/lib/tuvi/chart-calculation';
import { getZodiacSignFromDate, ZodiacSignInfo } from '@/lib/zodiac-utils';

export interface TuViFormData {
    fullName: string;
    dob: string; // YYYY-MM-DD
    tob: string; // HH:mm
    pob: string;
    gender: string;
}

export interface CalculatedData {
    fullName: string;
    solarDate: string;
    lunarDate: string;
    canChiYear: string;
    menh: string;
    menhContent: TuViContent;
    chartData: ChartData; // Thêm chart data mới
    zodiacSign: ZodiacSignInfo | null; // Cung hoàng đạo
}

export function useTuViCalculation() {
    const calculate = (formData: TuViFormData): CalculatedData | null => {
        if (!formData.dob || !formData.tob) return null;

        const [y, m, d] = formData.dob.split('-').map(Number);
        const [hour, minute] = formData.tob.split(':').map(Number);
        
        const lunar = convertSolarToLunar(d, m, y);
        const canChiYear = `${lunar.canYear} ${lunar.chiYear}`;
        const menh = getMenh(y);
        const menhContent = MENH_RULES[menh] || MENH_RULES['Chưa xác định'];
        
        // Tính toán chart data mới
        const chartData = calculateChart(
            d,
            m,
            y,
            hour || 12,
            minute || 0,
            formData.gender as 'Nam' | 'Nữ' | 'Khác'
        );

        // Tính cung hoàng đạo từ ngày sinh
        const zodiacSign = getZodiacSignFromDate(formData.dob);

        return {
            fullName: formData.fullName,
            solarDate: `${d}/${m}/${y}`,
            lunarDate: `${lunar.day}/${lunar.month}/${lunar.year}`,
            canChiYear,
            menh,
            menhContent,
            chartData,
            zodiacSign
        };
    };

    return { calculate };
}
