'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DateInput from "@/components/common/DateInput";
import { getZodiacSignFromDate } from "@/lib/zodiac-utils";

interface BirthDatePickerProps {
  value: string; // Format YYYY-MM-DD
  onChange: (date: string) => void;
}

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({
  value,
  onChange,
}) => {
  const zodiacSign = value ? getZodiacSignFromDate(value) : null;

  return (
    <div className="relative z-30 space-y-3">
      <DateInput value={value} onChange={onChange} placeholder="dd-mm-yyyy" />
      
      {/* Zodiac Sign Preview */}
      <AnimatePresence mode="wait">
        {zodiacSign && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.4
            }}
            className="overflow-hidden"
          >
            <Link href={`/cung-hoang-dao/${zodiacSign.slug}`}>
              <motion.div
                className="flex items-center gap-3 px-4 py-3 rounded-xl sm:rounded-2xl border backdrop-blur-sm cursor-pointer group"
                style={{
                  backgroundColor: `${zodiacSign.color}10`,
                  borderColor: `${zodiacSign.color}30`,
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: `${zodiacSign.color}15`,
                  borderColor: `${zodiacSign.color}50`,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.div
                  className="size-10 sm:size-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${zodiacSign.color}20`,
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <span 
                    className="material-symbols-outlined text-xl sm:text-2xl"
                    style={{ color: zodiacSign.color }}
                  >
                    {zodiacSign.icon}
                  </span>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <motion.p
                    className="text-[10px] font-black uppercase tracking-widest mb-0.5 opacity-60"
                    style={{ color: zodiacSign.color }}
                  >
                    Cung hoàng đạo
                  </motion.p>
                  <motion.p
                    className="text-sm sm:text-base font-black truncate"
                    style={{ color: zodiacSign.color }}
                  >
                    {zodiacSign.name}
                  </motion.p>
                </div>
                <motion.span
                  className="material-symbols-outlined text-text-secondary group-hover:text-white transition-colors"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  arrow_forward
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthDatePicker;
