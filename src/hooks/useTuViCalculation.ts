import { convertSolarToLunar, getMenh, getYearCanChi } from '@/lib/tuvi/core';
import { MENH_RULES, TuViContent } from '@/data/tuvi-rules';

export interface TuViFormData {
    fullName: string;
    dob: string; // YYYY-MM-DD
    tob: string;
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
}

export function useTuViCalculation() {
    const calculate = (formData: TuViFormData): CalculatedData | null => {
        if (!formData.dob) return null;

        const [y, m, d] = formData.dob.split('-').map(Number);
        const lunar = convertSolarToLunar(d, m, y);
        const canChiYear = `${lunar.canYear} ${lunar.chiYear}`;
        const menh = getMenh(y);
        const menhContent = MENH_RULES[menh] || MENH_RULES['Chưa xác định'];

        return {
            fullName: formData.fullName,
            solarDate: `${d}/${m}/${y}`,
            lunarDate: `${lunar.day}/${lunar.month}/${lunar.year}`,
            canChiYear,
            menh,
            menhContent
        };
    };

    return { calculate };
}
