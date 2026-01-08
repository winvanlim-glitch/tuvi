import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
        <div className="relative overflow-hidden glass rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-8 xl:p-10 border border-primary/20 bg-gradient-to-br from-[#1c1022] to-background-dark">
            <motion.div
                className="absolute top-0 right-0 size-[300px] sm:size-[400px] lg:size-[500px] bg-primary/5 blur-[100px] sm:blur-[120px] lg:blur-[150px] -mr-20 sm:-mr-32 lg:-mr-40 -mt-20 sm:-mt-32 lg:-mt-40 pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 space-y-6">
                {/* Top Section: Avatar, Info, and Button */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    {/* Avatar Section */}
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
                            className="relative size-16 sm:size-20 md:size-24 rounded-full border-2 border-white/5 bg-surface-dark flex items-center justify-center overflow-hidden"
                            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <span className="material-symbols-outlined text-3xl sm:text-4xl md:text-5xl text-primary">scuba_diving</span>
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -right-1 bg-background-dark border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <span className="material-symbols-outlined text-xs text-blue-400">water_drop</span>
                            <span className="text-[10px] font-black text-white/80">{data.menh.toUpperCase()}</span>
                        </motion.div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        className="flex-1 min-w-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <motion.span
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-text-secondary"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                {data.solarDate}
                            </motion.span>
                            <motion.span
                                className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(54, 226, 123, 0.2)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                {data.canChiYear}
                            </motion.span>
                            {data.zodiacSign && (
                                <Link href={`/cung-hoang-dao/${data.zodiacSign.slug}`}>
                                    <motion.div
                                        className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer group relative overflow-hidden"
                                        style={{
                                            backgroundColor: `${data.zodiacSign.color}15`,
                                            borderColor: `${data.zodiacSign.color}40`,
                                        }}
                                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ 
                                            type: 'spring', 
                                            stiffness: 400, 
                                            damping: 20,
                                            delay: 0.1
                                        }}
                                        whileHover={{ 
                                            scale: 1.08, 
                                            backgroundColor: `${data.zodiacSign.color}25`,
                                            borderColor: `${data.zodiacSign.color}60`,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.span
                                            className="material-symbols-outlined text-xs"
                                            style={{ color: data.zodiacSign.color }}
                                            animate={{ 
                                                rotate: [0, 10, -10, 0],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{ 
                                                duration: 2, 
                                                repeat: Infinity, 
                                                ease: "easeInOut",
                                                repeatDelay: 3
                                            }}
                                        >
                                            {data.zodiacSign.icon}
                                        </motion.span>
                                        <span
                                            className="text-[10px] font-black uppercase tracking-widest"
                                            style={{ color: data.zodiacSign.color }}
                                        >
                                            {data.zodiacSign.name}
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{
                                                background: `linear-gradient(90deg, transparent, ${data.zodiacSign.color}20, transparent)`,
                                            }}
                                            animate={{
                                                x: ['-100%', '100%'],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </motion.div>
                                </Link>
                            )}
                        </div>
                        <motion.h1
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter mb-2 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                        >
                            Chào {data.fullName.split(' ').pop()}, <br className="hidden sm:block" />
                            <span className="text-primary">Bản Mệnh {data.menh}</span>
                        </motion.h1>
                        <motion.p
                            className="text-text-secondary text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Hành: <span className="text-white font-medium">{data.menh}</span> • Hướng tốt: <span className="text-primary font-medium">{data.menhContent.direction}</span>
                        </motion.p>
                    </motion.div>

                    {/* Reset Button */}
                    <motion.button
                        onClick={onReset}
                        className="shrink-0 w-full md:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all text-xs sm:text-sm font-bold uppercase tracking-wider text-primary group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.span
                            className="material-symbols-outlined text-base"
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            refresh
                        </motion.span>
                        <span>Tạo lá số mới</span>
                    </motion.button>
                </div>

                {/* Lucky Stats - Grid 2 columns */}
                <motion.div
                    className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4"
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
        </div>
    );
};

export default IdentityHeader;
