import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { spring } from '@/lib/animations';

interface DateInputProps {
    value: string; // Format: YYYY-MM-DD (internal) or DD-MM-YYYY (display)
    onChange: (date: string) => void; // Returns YYYY-MM-DD format
    placeholder?: string;
    label?: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, placeholder = "dd-mm-yyyy", label }) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Convert YYYY-MM-DD to DD-MM-YYYY for display
    const formatForDisplay = (dateStr: string): string => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        if (year && month && day) {
            return `${day}-${month}-${year}`;
        }
        return dateStr;
    };

    // Convert DD-MM-YYYY to YYYY-MM-DD for internal storage
    const parseFromDisplay = (displayStr: string): string => {
        const parts = displayStr.split('-').filter(p => p);
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return '';
    };

    useEffect(() => {
        if (value) {
            setDisplayValue(formatForDisplay(value));
        } else {
            setDisplayValue('');
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        
        // Remove all non-digits and existing dashes
        input = input.replace(/[^0-9]/g, '');
        
        // Limit to 8 digits (ddmmyyyy)
        if (input.length > 8) {
            input = input.slice(0, 8);
        }
        
        // Auto-format with dashes
        let formatted = '';
        if (input.length > 0) {
            formatted = input.slice(0, 2); // Day
        }
        if (input.length > 2) {
            formatted += '-' + input.slice(2, 4); // Month
        }
        if (input.length > 4) {
            formatted += '-' + input.slice(4, 8); // Year
        }
        
        setDisplayValue(formatted);
        
        // Update parent if we have complete date
        if (input.length === 8) {
            const parsed = parseFromDisplay(formatted);
            if (parsed) {
                onChange(parsed);
            }
        } else if (input.length < 8) {
            // Clear parent value if incomplete
            onChange('');
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        // Validate and format on blur
        if (displayValue) {
            const parsed = parseFromDisplay(displayValue);
            if (parsed) {
                onChange(parsed);
                setDisplayValue(formatForDisplay(parsed));
            } else {
                // If invalid, revert to original value
                if (value) {
                    setDisplayValue(formatForDisplay(value));
                } else {
                    setDisplayValue('');
                }
            }
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    return (
        <div className="relative">
            {label && (
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 mb-2 block">
                    {label}
                </label>
            )}
            <motion.div
                className={`flex items-center bg-background-dark/60 border rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 gap-3 sm:gap-4 transition-all ${
                    isFocused 
                        ? 'border-primary/50 ring-1 ring-primary/20' 
                        : 'border-white/5 hover:border-primary/30'
                }`}
                whileFocus={{ scale: 1.01 }}
                transition={spring.snappy}
            >
                <span className="material-symbols-outlined text-text-secondary text-lg sm:text-xl">calendar_today</span>
                <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className="bg-transparent border-none outline-none flex-1 text-sm sm:text-base text-white placeholder:text-text-secondary/50 focus:outline-none"
                    maxLength={10} // dd-mm-yyyy = 10 chars
                />
            </motion.div>
        </div>
    );
};

export default DateInput;



