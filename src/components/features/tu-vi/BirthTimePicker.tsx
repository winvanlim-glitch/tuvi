import React, { useState, useEffect } from 'react';
import CustomSelect from '@/components/common/CustomSelect';

interface BirthTimePickerProps {
    value: string; // Format HH:mm
    onChange: (time: string) => void;
}

const BirthTimePicker: React.FC<BirthTimePickerProps> = ({ value, onChange }) => {
    // Generate hours 0-23
    const hours = Array.from({ length: 24 }, (_, i) => ({
        value: i.toString().padStart(2, '0'),
        label: i.toString().padStart(2, '0')
    }));

    // Generate minutes 0-59
    const minutes = Array.from({ length: 60 }, (_, i) => ({
        value: i.toString().padStart(2, '0'),
        label: i.toString().padStart(2, '0')
    }));

    const [hour, setHour] = useState<string>('00');
    const [minute, setMinute] = useState<string>('00');

    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':');
            setHour(h || '00');
            setMinute(m || '00');
        }
    }, [value]);

    const handleChange = (type: 'hour' | 'minute', val: string) => {
        let newHour = type === 'hour' ? val : hour;
        let newMinute = type === 'minute' ? val : minute;

        if (type === 'hour') setHour(val);
        if (type === 'minute') setMinute(val);

        onChange(`${newHour}:${newMinute}`);
    };

    return (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 relative z-20">
            <CustomSelect
                label="Giờ"
                placeholder="--"
                options={hours}
                value={hour}
                onChange={(val) => handleChange('hour', val)}
            />
            <CustomSelect
                label="Phút"
                placeholder="--"
                options={minutes}
                value={minute}
                onChange={(val) => handleChange('minute', val)}
            />
        </div>
    );
};

export default BirthTimePicker;
