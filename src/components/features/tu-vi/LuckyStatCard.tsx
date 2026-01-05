import React from 'react';
import { motion } from 'framer-motion';

interface LuckyStatCardProps {
    label: string;
    value: string;
    icon: string;
    color: string;
}

const LuckyStatCard: React.FC<LuckyStatCardProps> = ({ label, value, icon, color }) => (
    <motion.div
        className="bg-background-dark/40 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-white/20 transition-all group cursor-pointer"
        whileHover={{
            scale: 1.02,
            y: -2,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
        <motion.div
            className={`size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${color}`}
            whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0]
            }}
            transition={{
                scale: { type: 'spring', stiffness: 300, damping: 15 },
                rotate: { duration: 0.3 }
            }}
        >
            <span className="material-symbols-outlined text-lg sm:text-xl">{icon}</span>
        </motion.div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">{label}</p>
            <motion.p
                className="text-xs sm:text-sm font-bold text-white leading-tight truncate"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                title={value}
            >
                {value}
            </motion.p>
        </div>
    </motion.div>
);

export default LuckyStatCard;
