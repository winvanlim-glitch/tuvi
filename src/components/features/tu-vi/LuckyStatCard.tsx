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
        className="bg-background-dark/40 border border-white/5 rounded-3xl p-5 flex items-center gap-4 hover:border-white/20 transition-all group cursor-pointer"
        whileHover={{
            scale: 1.05,
            y: -4,
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
        <motion.div
            className={`size-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${color}`}
            whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, 0]
            }}
            transition={{
                scale: { type: 'spring', stiffness: 300, damping: 15 },
                rotate: { duration: 0.5 }
            }}
        >
            <span className="material-symbols-outlined">{icon}</span>
        </motion.div>
        <div>
            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-0.5">{label}</p>
            <motion.p
                className="text-sm font-bold text-white leading-tight"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
            >
                {value}
            </motion.p>
        </div>
    </motion.div>
);

export default LuckyStatCard;
