import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
    value: string | number;
    label: string | number;
}

interface EditableSelectProps {
    options: Option[];
    value: string | number;
    onChange: (value: string) => void;
    placeholder: string;
    label?: string;
    maxLength?: number;
    formatValue?: (value: string) => string; // Format function for display
    validateValue?: (value: string) => boolean; // Validate function
}

const EditableSelect: React.FC<EditableSelectProps> = ({
    options,
    value,
    onChange,
    placeholder,
    label,
    maxLength,
    formatValue,
    validateValue
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (isEditing) {
                    handleBlur();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isEditing]);

    // Focus input when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const selectedOption = options.find(opt => String(opt.value) === String(value));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        
        // Only allow numbers
        newValue = newValue.replace(/[^0-9]/g, '');
        
        // Apply maxLength if specified
        if (maxLength && newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
        }
        
        setInputValue(newValue);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setInputValue('');
        }
    };

    const handleBlur = () => {
        if (inputValue) {
            // Try to find matching option first
            const exactMatch = options.find(opt => String(opt.value) === inputValue);
            if (exactMatch) {
                onChange(String(exactMatch.value));
            } else if (validateValue && validateValue(inputValue)) {
                // If valid but not in options, use the value directly
                onChange(inputValue);
            } else {
                // Try to find closest match
                const partialMatch = options.find(opt => String(opt.value).startsWith(inputValue));
                if (partialMatch) {
                    onChange(String(partialMatch.value));
                } else {
                    // If no match found, try to find by numeric value
                    const numValue = parseInt(inputValue);
                    if (!isNaN(numValue)) {
                        const numericMatch = options.find(opt => parseInt(String(opt.value)) === numValue);
                        if (numericMatch) {
                            onChange(String(numericMatch.value));
                        }
                    }
                }
            }
        }
        setIsEditing(false);
        setInputValue('');
    };

    const handleClick = () => {
        if (!isEditing) {
            setIsOpen(!isOpen);
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
        // Use the numeric value without leading zeros for easier editing
        const numericValue = selectedOption ? String(selectedOption.value).replace(/^0+/, '') || '0' : '';
        setInputValue(numericValue);
        setIsOpen(false);
    };

    const handleOptionSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const displayValue = isEditing 
        ? inputValue 
        : (selectedOption ? (formatValue ? formatValue(String(selectedOption.value)) : String(selectedOption.label)) : '--');

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                className={`w-full bg-surface-dark border border-primary/30 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-3 sm:px-4 text-white focus-within:border-primary/50 focus-within:outline-none transition-all hover:bg-surface-dark/80 hover:border-primary/50 flex flex-col items-center gap-1.5 group cursor-pointer ${isOpen ? 'border-primary/50 bg-surface-dark/90' : ''} ${isEditing ? 'border-primary' : ''}`}
            >
                {label && (
                    <span className="text-[10px] font-black uppercase text-primary transition-colors text-center w-full">
                        {label}
                    </span>
                )}

                <div className="w-full flex items-center justify-center overflow-hidden">
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            inputMode="numeric"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            onBlur={handleBlur}
                            className="w-full bg-transparent border-none outline-none font-bold text-base sm:text-lg text-center text-white placeholder:text-text-secondary focus:outline-none"
                            placeholder={placeholder}
                            maxLength={maxLength}
                        />
                    ) : (
                        <span className={`font-bold truncate text-base sm:text-lg leading-none text-center ${!selectedOption ? 'text-text-secondary' : 'text-white'}`}>
                            {displayValue}
                        </span>
                    )}
                </div>
                
                {!isEditing && (
                    <span className="text-[10px] text-text-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click để chọn • Double-click để nhập
                    </span>
                )}
            </div>

            <AnimatePresence>
                {isOpen && !isEditing && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-surface-dark border border-white/10 rounded-2xl shadow-xl z-[100] py-2 custom-scrollbar"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleOptionSelect(String(option.value))}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-surface-dark ${String(value) === String(option.value) ? 'text-primary font-bold bg-primary/10' : 'text-text-secondary'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditableSelect;

