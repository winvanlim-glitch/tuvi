import React, { useState, useEffect } from 'react';
import CustomSelect from '@/components/common/CustomSelect';

interface BirthTimePickerProps {
    value: string; // Format HH:mm
    onChange: (time: string) => void;
}

const BirthTimePicker: React.FC<BirthTimePickerProps> = ({ value, onChange }) => {
    const [hour, setHour] = useState<string>('00');
    const [minute, setMinute] = useState<string>('00');

    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':');
            setHour(h || '00');
            setMinute(m || '00');
        }
    }, [value]);

    const handleHourChange = (newHour: string) => {
        setHour(newHour);
        onChange(`${newHour}:${minute}`);
    };

    const handleMinuteChange = (newMinute: string) => {
        setMinute(newMinute);
        onChange(`${hour}:${newMinute}`);
    };

    // Generate options
    const hourOptions = Array.from({ length: 24 }, (_, i) => ({
        value: i.toString().padStart(2, '0'),
        label: `${i.toString().padStart(2, '0')} giờ`
    }));

    const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
        value: i.toString().padStart(2, '0'),
        label: `${i.toString().padStart(2, '0')} phút`
    }));

    return (
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <CustomSelect
                label="GIỜ"
                value={hour}
                options={hourOptions}
                onChange={handleHourChange}
                placeholder="Chọn giờ"
            />
            <CustomSelect
                label="PHÚT"
                value={minute}
                options={minuteOptions}
                onChange={handleMinuteChange}
                placeholder="Chọn phút"
            />
        </div>
    );
};

export default BirthTimePicker;
