import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '@/lib/animations';

interface OTPDateInputProps {
    value: string; // Format: DD, MM, or YYYY
    onChange: (value: string) => void;
    label: string;
    placeholder: string;
    maxLength: number;
    validateValue?: (value: string) => boolean;
    formatValue?: (value: string) => string;
    onMaxLengthReached?: () => void; // Callback when maxLength is reached
}

const OTPDateInput: React.FC<OTPDateInputProps> = ({
    value,
    onChange,
    label,
    placeholder,
    maxLength,
    validateValue,
    formatValue,
    onMaxLengthReached
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Focus input when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleBlur();
            }
        };
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isEditing]);

    const handleClick = () => {
        setIsEditing(true);
        setInputValue(value || '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        
        // Only allow numbers
        newValue = newValue.replace(/[^0-9]/g, '');
        
        // Apply maxLength
        if (newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
        }
        
        setInputValue(newValue);
        
        // Update parent immediately for auto-focus to work
        if (newValue.length > 0) {
            if (!validateValue || validateValue(newValue)) {
                onChange(newValue);
            }
        }
        
        // Trigger callback when maxLength is reached
        if (newValue.length === maxLength && onMaxLengthReached) {
            setTimeout(() => {
                onMaxLengthReached();
            }, 50);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setInputValue('');
        } else if (e.key === 'Backspace' && inputValue === '') {
            // If backspace on empty input, blur to allow parent to handle
            handleBlur();
        }
    };

    const handleBlur = () => {
        if (inputValue) {
            if (!validateValue || validateValue(inputValue)) {
                onChange(inputValue);
            } else {
                // If invalid, revert to original value
                setInputValue(value || '');
            }
        } else {
            setInputValue(value || '');
        }
        setIsEditing(false);
    };

    const displayValue = value ? (formatValue ? formatValue(value) : value) : '';
    const showPlaceholder = !isEditing && !displayValue;

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={handleClick}
                className={`w-full bg-surface-dark border border-primary/30 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-3 sm:px-4 text-white focus-within:border-primary/50 transition-all hover:bg-surface-dark/80 hover:border-primary/50 flex flex-col items-center gap-1.5 group cursor-pointer ${isEditing ? 'border-primary bg-surface-dark/90' : ''}`}
            >
                {label && (
                    <span className="text-[10px] font-black uppercase text-primary transition-colors text-center w-full">
                        {label}
                    </span>
                )}

                <div className="w-full flex items-center justify-center overflow-hidden min-h-[24px]">
                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.input
                                key="input"
                                ref={inputRef}
                                type="text"
                                inputMode="numeric"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                className="w-full bg-transparent border-none outline-none font-bold text-base sm:text-lg text-center text-white placeholder:text-text-secondary/50 focus:outline-none"
                                placeholder={placeholder}
                                maxLength={maxLength}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={spring.snappy}
                            />
                        ) : (
                            <motion.span
                                key="display"
                                className={`font-bold truncate text-base sm:text-lg leading-none text-center ${showPlaceholder ? 'text-text-secondary' : 'text-white'}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={spring.snappy}
                            >
                                {showPlaceholder ? placeholder : displayValue}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                
                {!isEditing && (
                    <motion.span
                        className="text-[10px] text-text-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        Click để nhập
                    </motion.span>
                )}
            </div>
        </div>
    );
};

export default OTPDateInput;

