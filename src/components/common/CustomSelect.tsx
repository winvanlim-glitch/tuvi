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
                className={`w-full bg-background-dark/60 border border-white/5 rounded-2xl py-3 px-4 text-white focus:border-primary/50 focus:outline-none transition-all hover:bg-white/5 flex flex-col items-start gap-1 group ${isOpen ? 'border-primary/50' : ''}`}
            >
                {label && (
                    <span className="text-[10px] font-black uppercase text-text-secondary group-focus-within:text-primary transition-colors">
                        {label}
                    </span>
                )}

                <div className="w-full flex items-center justify-between gap-2 overflow-hidden">
                    <span className={`font-bold truncate text-lg leading-none ${!selectedOption ? 'text-text-secondary' : ''}`}>
                        {selectedOption ? selectedOption.label : '--'}
                    </span>
                    <span className={`material-symbols-outlined text-text-secondary text-sm transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
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
                        className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#1c2420] border border-white/10 rounded-2xl shadow-xl z-50 py-2 custom-scrollbar"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(String(option.value));
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/10 ${String(value) === String(option.value) ? 'text-primary font-bold bg-white/5' : 'text-text-secondary'}`}
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
