import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PalaceDefinition } from '@/data/tuvi-rules';
import { fadeInScale, spring } from '@/lib/animations';

interface PalaceDetailModalProps {
    palace: PalaceDefinition | null;
    content: string;
    onClose: () => void;
}

const PalaceDetailModal: React.FC<PalaceDetailModalProps> = ({ palace, content, onClose }) => {
    if (!palace) return null;

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
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden glass rounded-[48px] border border-primary/20 shadow-2xl"
                    variants={fadeInScale}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={spring.bouncy}
                >
                    {/* Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent p-8 border-b border-white/10">
                        <motion.div
                            className="absolute top-0 right-0 size-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="relative z-10 flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <motion.div
                                    className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0"
                                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                                    transition={spring.bouncy}
                                >
                                    <span className="material-symbols-outlined text-4xl">{palace.icon}</span>
                                </motion.div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight mb-1">{palace.name}</h2>
                                    <p className="text-sm text-text-secondary">{palace.description}</p>
                                </div>
                            </div>

                            <motion.button
                                onClick={onClose}
                                className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 shrink-0"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={spring.snappy}
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(85vh-180px)] p-8 custom-scrollbar">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Main Interpretation */}
                            <div className="mb-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">auto_stories</span>
                                    Giải Mã Chi Tiết
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-base">
                                    {content}
                                </p>
                            </div>

                            {/* Strengths */}
                            <motion.div
                                className="mb-6 p-6 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-sm font-black uppercase tracking-widest text-green-400 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">trending_up</span>
                                    Điểm Mạnh
                                </h3>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">•</span>
                                        <span>Có khả năng phát triển tốt trong lĩnh vực này</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">•</span>
                                        <span>Nên tận dụng năng lượng tích cực để đẩy mạnh tiến độ</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">•</span>
                                        <span>Thời điểm thuận lợi để đầu tư nguồn lực</span>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Advice */}
                            <motion.div
                                className="mb-6 p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">lightbulb</span>
                                    Lời Khuyên
                                </h3>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-0.5">•</span>
                                        <span>Kiên trì và bền bỉ sẽ mang lại kết quả tốt</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-0.5">•</span>
                                        <span>Tránh vội vàng trong các quyết định quan trọng</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-0.5">•</span>
                                        <span>Nên tham khảo ý kiến từ người có kinh nghiệm</span>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Warnings */}
                            <motion.div
                                className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h3 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">warning</span>
                                    Lưu Ý
                                </h3>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400 mt-0.5">•</span>
                                        <span>Cẩn trọng với những lời hứa hẹn quá ngọt ngào</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400 mt-0.5">•</span>
                                        <span>Tránh đầu tư hoặc quyết định lớn vào cuối tháng âm lịch</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400 mt-0.5">•</span>
                                        <span>Chú ý sức khỏe và nghỉ ngơi hợp lý</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PalaceDetailModal;
