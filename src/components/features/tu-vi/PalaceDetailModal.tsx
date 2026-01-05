import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PalaceDefinition } from '@/data/tuvi-rules';
import { fadeInScale, spring } from '@/lib/animations';
import { MenhType } from '@/data/tuvi-interpretations';
import { getFullPalaceInterpretation, getPalaceContent } from '@/lib/tuvi-interpretation-helper';

interface PalaceDetailModalProps {
    palace: PalaceDefinition | null;
    menh: MenhType;
    onClose: () => void;
}

const PalaceDetailModal: React.FC<PalaceDetailModalProps> = ({ palace, menh, onClose }) => {
    if (!palace) return null;

    const interpretation = getFullPalaceInterpretation(menh, palace.id);
    const content = interpretation?.detailed || interpretation?.summary || getPalaceContent(menh, palace.id);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* Modal Content */}
                <motion.div
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden glass rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-primary/20 shadow-xl"
                    variants={fadeInScale}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={spring.bouncy}
                >
                    {/* Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent p-4 sm:p-6 lg:p-8 border-b border-white/10">
                        <motion.div
                            className="absolute top-0 right-0 size-48 sm:size-56 lg:size-64 bg-primary/20 blur-[80px] sm:blur-[100px] rounded-full -mr-24 sm:-mr-28 lg:-mr-32 -mt-24 sm:-mt-28 lg:-mt-32"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                <motion.div
                                    className="size-12 sm:size-14 lg:size-16 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0"
                                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                                    transition={spring.bouncy}
                                >
                                    <span className="material-symbols-outlined text-2xl sm:text-3xl lg:text-4xl">{palace.icon}</span>
                                </motion.div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-1">{palace.name}</h2>
                                    <p className="text-xs sm:text-sm text-text-secondary">{palace.description}</p>
                                </div>
                            </div>

                            <motion.button
                                onClick={onClose}
                                className="size-8 sm:size-9 lg:size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 shrink-0"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={spring.snappy}
                                aria-label="Đóng"
                            >
                                <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(85vh-180px)] p-4 sm:p-6 lg:p-8 custom-scrollbar">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Main Interpretation */}
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm sm:text-base">auto_stories</span>
                                    Giải Mã Chi Tiết
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                                    {content}
                                </p>
                            </div>

                            {/* Strengths */}
                            {interpretation?.strengths && interpretation.strengths.length > 0 && (
                                <motion.div
                                    className="mb-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-green-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">trending_up</span>
                                        Điểm Mạnh
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.strengths.map((strength, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-green-400 mt-0.5">•</span>
                                                <span>{strength}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Advice */}
                            {interpretation?.advice && interpretation.advice.length > 0 && (
                                <motion.div
                                    className="mb-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">lightbulb</span>
                                        Lời Khuyên
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.advice.map((advice, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-blue-400 mt-0.5">•</span>
                                                <span>{advice}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Warnings */}
                            {interpretation?.warnings && interpretation.warnings.length > 0 && (
                                <motion.div
                                    className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">warning</span>
                                        Lưu Ý
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.warnings.map((warning, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-amber-400 mt-0.5">•</span>
                                                <span>{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Weaknesses */}
                            {interpretation?.weaknesses && interpretation.weaknesses.length > 0 && (
                                <motion.div
                                    className="mt-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">info</span>
                                        Điểm Cần Cải Thiện
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.weaknesses.map((weakness, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-purple-400 mt-0.5">•</span>
                                                <span>{weakness}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PalaceDetailModal;
