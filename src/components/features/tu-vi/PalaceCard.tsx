import React from 'react';
import { motion } from 'framer-motion';
import { PalaceDefinition } from '@/data/tuvi-rules';

interface PalaceCardProps {
    palace: PalaceDefinition;
    content: string;
    index: number;
    onClick: () => void;
    isExpanded?: boolean;
}

const PalaceCard: React.FC<PalaceCardProps> = ({ palace, content, index, onClick, isExpanded = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20
            }}
            className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 relative group hover:border-primary/30 transition-all bg-gradient-to-b from-white/5 to-transparent cursor-pointer"
            whileHover={{
                y: -6,
                boxShadow: '0 20px 40px -12px rgba(54, 226, 123, 0.25)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >
            {/* AI Hint Badge - Animated */}
            <motion.div
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 border border-primary/50 backdrop-blur-sm shadow-lg shadow-primary/20"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(54, 226, 123, 0.4)' }}
            >
                <motion.span
                    className="material-symbols-outlined text-primary text-sm sm:text-base"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    auto_awesome
                </motion.span>
                <span className="text-[10px] sm:text-xs font-bold text-primary hidden sm:inline">AI</span>
                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
                <motion.div
                    className="size-10 sm:size-12 lg:size-14 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center text-primary"
                    whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        backgroundColor: 'rgba(54, 226, 123, 0.3)'
                    }}
                    transition={{
                        scale: { type: 'spring', stiffness: 400, damping: 15 },
                        rotate: { duration: 0.5 },
                        backgroundColor: { duration: 0.3 }
                    }}
                >
                    <span className="material-symbols-outlined text-xl sm:text-2xl lg:text-3xl">{palace.icon}</span>
                </motion.div>
                <div>
                    <motion.h3
                        className="text-lg sm:text-xl lg:text-2xl font-bold"
                        whileHover={{ color: 'rgba(54, 226, 123, 1)' }}
                        transition={{ duration: 0.2 }}
                    >
                        {palace.name}
                    </motion.h3>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider font-bold opacity-70">Cung quan trọng</p>
                </div>
            </div>

            <div className="relative flex-1">
                <motion.p
                    className="text-text-secondary leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {content}
                </motion.p>
            </div>

            <motion.div
                className="mt-4 sm:mt-5 lg:mt-6 flex items-center gap-1.5 sm:gap-2 text-primary text-xs sm:text-sm font-bold cursor-pointer group/link relative z-10"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <span>Xem chi tiết</span>
                <motion.span
                    className="material-symbols-outlined text-sm sm:text-base"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    arrow_forward
                </motion.span>
            </motion.div>

            {/* Animated border glow */}
            <motion.div
                className="absolute inset-0 border-2 border-primary/0 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none"
                whileHover={{
                    borderColor: 'rgba(54, 226, 123, 0.3)',
                    boxShadow: '0 0 20px rgba(54, 226, 123, 0.2)'
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default PalaceCard;
