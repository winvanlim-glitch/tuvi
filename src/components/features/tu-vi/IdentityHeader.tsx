import React from 'react';
import { motion } from 'framer-motion';
import { CalculatedData } from '@/hooks/useTuViCalculation';
import LuckyStatCard from './LuckyStatCard';
import { getLuckyHours } from '@/data/tuvi-stars';
import { staggerFast } from '@/lib/animations';

interface IdentityHeaderProps {
    data: CalculatedData;
    onReset: () => void;
}

const IdentityHeader: React.FC<IdentityHeaderProps> = ({ data, onReset }) => {
    return (
        <div className="relative overflow-hidden glass rounded-[48px] p-8 lg:p-14 border border-primary/20 bg-gradient-to-br from-[#1c1022] to-background-dark">
            <motion.div
                className="absolute top-0 right-0 size-[500px] bg-primary/5 blur-[150px] -mr-40 -mt-40 pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <motion.div
                    className="relative shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="relative size-32 rounded-full border-4 border-white/5 bg-surface-dark flex items-center justify-center overflow-hidden"
                        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <span className="material-symbols-outlined text-6xl text-primary">scuba_diving</span>
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-2 -right-2 bg-background-dark border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <span className="material-symbols-outlined text-xs text-blue-400">water_drop</span>
                        <span className="text-[10px] font-black text-white/80">{data.menh.toUpperCase()}</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex-1 text-center md:text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                        <motion.span
                            className="px-4 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-text-secondary"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            {data.solarDate}
                        </motion.span>
                        <motion.span
                            className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(54, 226, 123, 0.2)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            {data.canChiYear}
                        </motion.span>
                    </div>
                    <motion.h2
                        className="text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        Chào {data.fullName.split(' ').pop()}, <br />Bản Mệnh {data.menh}
                    </motion.h2>
                    <motion.p
                        className="text-text-secondary text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Hành: <span className="text-white">{data.menh}</span> • Hướng tốt: <span className="text-primary">{data.menhContent.direction}</span>
                    </motion.p>
                </motion.div>

                <motion.button
                    onClick={onReset}
                    className="shrink-0 flex items-center gap-3 px-8 py-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.span
                        className="material-symbols-outlined text-sm"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    >
                        refresh
                    </motion.span>
                    Tạo lá số mới
                </motion.button>
            </div>

            {/* Lucky Row */}
            <motion.div
                className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
            >
                <LuckyStatCard label="Số may mắn" value={data.menhContent.luckyNumbers.join(' • ')} icon="casino" color="text-yellow-500" />
                <LuckyStatCard label="Màu sắc" value={data.menhContent.luckyColors.slice(0, 2).join(' • ')} icon="palette" color="text-pink-500" />
                <LuckyStatCard label="Hướng tốt" value={data.menhContent.direction.split(',')[0]} icon="explore" color="text-blue-400" />
                <LuckyStatCard label="Giờ hoàng đạo" value={getLuckyHours(data.menh)} icon="schedule" color="text-purple-400" />
            </motion.div>
        </div>
    );
};

export default IdentityHeader;
