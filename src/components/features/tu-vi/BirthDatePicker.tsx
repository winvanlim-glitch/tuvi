import React, { useState, useEffect } from 'react';
import CustomSelect from '@/components/common/CustomSelect';

interface BirthDatePickerProps {
    value: string; // Format YYYY-MM-DD
    onChange: (date: string) => void;
}

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({ value, onChange }) => {
    const currentYear = new Date().getFullYear();
    const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: i + 1 }));
    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }));
    const years = Array.from({ length: 100 }, (_, i) => ({ value: currentYear - i, label: currentYear - i }));

    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    useEffect(() => {
        if (value) {
            const [y, m, d] = value.split('-');
            setYear(y);
            setMonth(parseInt(m).toString());
            setDay(parseInt(d).toString());
        }
    }, [value]);

    const handleChange = (type: 'day' | 'month' | 'year', val: string) => {
        let newDay = type === 'day' ? val : day;
        let newMonth = type === 'month' ? val : month;
        let newYear = type === 'year' ? val : year;

        if (type === 'day') setDay(val);
        if (type === 'month') setMonth(val);
        if (type === 'year') setYear(val);

        if (newDay && newMonth && newYear) {
            const d = newDay.padStart(2, '0');
            const m = newMonth.padStart(2, '0');
            onChange(`${newYear}-${m}-${d}`);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 relative z-30">
            <CustomSelect
                label="NGÀY"
                placeholder="--"
                options={days}
                value={day}
                onChange={(val) => handleChange('day', val)}
            />
            <CustomSelect
                label="THÁNG"
                placeholder="--"
                options={months}
                value={month}
                onChange={(val) => handleChange('month', val)}
            />
            <CustomSelect
                label="NĂM"
                placeholder="--"
                options={years}
                value={year}
                onChange={(val) => handleChange('year', val)}
            />
        </div>
    );
};

export default BirthDatePicker;
