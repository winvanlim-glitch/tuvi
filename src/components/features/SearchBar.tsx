"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getZodiacSignFromDate } from "@/lib/zodiac-utils";
import { signs } from "@/components/features/ZodiacGrid";

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center bg-surface-dark/50 border border-white/5 hover:border-primary/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 gap-2 sm:gap-3 transition-all group cursor-pointer">
          <span className="material-symbols-outlined text-text-secondary group-hover:text-primary text-lg sm:text-xl transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Tìm cung hoàng đạo, ngày sinh..."
            className="bg-transparent border-none outline-none flex-1 text-xs sm:text-sm placeholder:text-text-secondary pointer-events-none"
            aria-label="Search"
            readOnly
            value=""
          />
        </div>
      </motion.div>
      <SearchModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const SearchModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  // Clear search value
  const handleClear = () => {
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Xử lý blur - không làm gì cả, modal vẫn mở
  const handleBlur = () => {
    // Không làm gì, modal vẫn mở
    // Chỉ mất focus thôi
  };

  // Parse ngày sinh từ input (hỗ trợ nhiều format)
  const parseDate = (value: string): string | null => {
    if (!value) return null;

    const cleaned = value.trim();

    // Format: DD-MM-YYYY hoặc DD/MM/YYYY
    const datePattern1 = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/;
    const match1 = cleaned.match(datePattern1);
    if (match1) {
      const [, day, month, year] = match1;
      const d = parseInt(day);
      const m = parseInt(month);
      const y = parseInt(year);
      // Validate date
      if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2100) {
        return `${y}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
    }

    // Format: YYYY-MM-DD hoặc YYYY/MM/DD
    const datePattern2 = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
    const match2 = cleaned.match(datePattern2);
    if (match2) {
      const [, year, month, day] = match2;
      const d = parseInt(day);
      const m = parseInt(month);
      const y = parseInt(year);
      // Validate date
      if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2100) {
        return `${y}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
    }

    // Format: DDMMYYYY (8 số)
    const datePattern3 = /^(\d{2})(\d{2})(\d{4})$/;
    const match3 = cleaned.match(datePattern3);
    if (match3) {
      const [, day, month, year] = match3;
      const d = parseInt(day);
      const m = parseInt(month);
      const y = parseInt(year);
      // Validate date
      if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2100) {
        return `${y}-${month}-${day}`;
      }
    }

    return null;
  };

  // Tìm cung hoàng đạo từ ngày sinh
  const zodiacFromDate = useMemo(() => {
    if (!searchValue) return null;
    const dateStr = parseDate(searchValue);
    if (!dateStr) return null;
    return getZodiacSignFromDate(dateStr);
  }, [searchValue]);

  // Tìm cung hoàng đạo theo tên
  const zodiacFromName = useMemo(() => {
    if (!searchValue || zodiacFromDate) return null;
    const lowerSearch = searchValue.toLowerCase().trim();
    if (lowerSearch.length < 2) return null; // Ít nhất 2 ký tự
    return (
      signs.find(
        (sign) =>
          sign.name.toLowerCase().includes(lowerSearch) ||
          sign.slug.toLowerCase().includes(lowerSearch)
      ) || null
    );
  }, [searchValue, zodiacFromDate]);

  const resultZodiac = zodiacFromDate || zodiacFromName;
  const hasResult = !!resultZodiac;

  // Search input component
  const SearchInput = () => (
    <div
      className="flex items-center bg-surface-dark/50 border border-primary/50 ring-1 ring-primary/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 gap-2 sm:gap-3 transition-all group"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span className="material-symbols-outlined text-primary text-lg sm:text-xl">
        search
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Tìm cung hoàng đạo, ngày sinh..."
        className="bg-transparent border-none outline-none flex-1 text-xs sm:text-sm placeholder:text-text-secondary text-white"
        aria-label="Search"
        value={searchValue}
        onChange={(e) => {
          e.stopPropagation();
          setSearchValue(e.target.value);
        }}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        autoFocus={open}
      />
      {searchValue && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClear();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="text-text-secondary hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">
            close
          </span>
        </motion.button>
      )}
    </div>
  );

  // Popover content
  const PopoverContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      }}
      className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10 mt-3 max-w-md mx-auto"
    >
      <p className="text-sm sm:text-base text-text-secondary text-center leading-relaxed">
        Nhập ngày sinh của bạn (ví dụ:{" "}
        <span className="text-white font-semibold">15-05-1995</span>) hoặc tên
        cung hoàng đạo để tìm kiếm.
      </p>
    </motion.div>
  );

  if (!mounted) return null;
  
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={(e) => {
              // Chỉ đóng khi click trực tiếp vào backdrop, không phải từ event bubble
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
            onMouseDown={(e) => {
              // Prevent focus loss khi click backdrop
              if (e.target === e.currentTarget) {
                e.preventDefault();
              }
            }}
          />

          {/* Search bar và popover */}
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3,
              }}
              className="w-full max-w-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end mb-3">
                <motion.button
                  onClick={onClose}
                  className="size-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="material-symbols-outlined">close</span>
                </motion.button>
              </div>

              {/* Search bar */}
              <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <SearchInput />

                {/* Popover - hiển thị khi chưa có kết quả và có text */}
                <AnimatePresence>
                  {!hasResult && searchValue.length > 0 && <PopoverContent />}
                </AnimatePresence>

                {/* Kết quả tìm kiếm */}
                <AnimatePresence>
                  {hasResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3,
                      }}
                      className="mt-3 search-result"
                    >
                      <Link
                        href={`/cung-hoang-dao/${resultZodiac.slug}`}
                        onClick={onClose}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur
                      >
                        <motion.div
                          className="glass rounded-xl sm:rounded-2xl p-4 border border-white/10 overflow-hidden cursor-pointer group"
                          style={{
                            backgroundColor: `${resultZodiac.color}08`,
                            borderColor: `${resultZodiac.color}30`,
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: `${resultZodiac.color}15`,
                            borderColor: `${resultZodiac.color}50`,
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <motion.div
                              className="size-12 sm:size-14 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `${resultZodiac.color}20`,
                              }}
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <span
                                className="material-symbols-outlined text-2xl sm:text-3xl"
                                style={{ color: resultZodiac.color }}
                              >
                                {resultZodiac.icon}
                              </span>
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <motion.p
                                className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60"
                                style={{ color: resultZodiac.color }}
                              >
                                {zodiacFromDate
                                  ? "Cung hoàng đạo của bạn"
                                  : "Tìm thấy"}
                              </motion.p>
                              <motion.p
                                className="text-base sm:text-lg font-black truncate"
                                style={{ color: resultZodiac.color }}
                              >
                                {resultZodiac.name}
                              </motion.p>
                              {zodiacFromDate && (
                                <motion.p
                                  className="text-xs text-text-secondary mt-1"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  Ngày sinh: {searchValue}
                                </motion.p>
                              )}
                            </div>
                            <motion.span
                              className="material-symbols-outlined text-text-secondary group-hover:text-white transition-colors shrink-0"
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              arrow_forward
                            </motion.span>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SearchBar;
