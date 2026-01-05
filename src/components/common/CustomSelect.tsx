import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
    value: string | number;
    label: string | number;
}

interface CustomSelectProps {
    options: Option[];
    value: string | number;
    onChange: (value: string) => void;
    placeholder: string;
    label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => String(opt.value) === String(value));

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-surface-dark border border-primary/30 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-3 sm:px-4 text-white focus:border-primary/50 focus:outline-none transition-all hover:bg-surface-dark/80 hover:border-primary/50 flex flex-col items-center gap-1.5 group ${isOpen ? 'border-primary/50 bg-surface-dark/90' : ''}`}
            >
                {label && (
                    <span className="text-[10px] font-black uppercase text-primary transition-colors text-center w-full">
                        {label}
                    </span>
                )}

                <div className="w-full flex items-center justify-center overflow-hidden">
                    <span className={`font-bold truncate text-base sm:text-lg leading-none text-center ${!selectedOption ? 'text-text-secondary' : 'text-white'}`}>
                        {selectedOption ? selectedOption.label : '--'}
                    </span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
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
                                onClick={() => {
                                    onChange(String(option.value));
                                    setIsOpen(false);
                                }}
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

export default CustomSelect;
