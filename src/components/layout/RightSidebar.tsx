'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DailyInsights from '@/components/features/DailyInsights';
import Link from 'next/link';

const RightSidebar: React.FC = () => {
    return (
        <aside className="hidden xl:block w-80 sticky top-8 py-0 self-start z-40 h-fit mb-8 flex-shrink-0">
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="glass rounded-3xl p-6 border border-white/10 shadow-xl"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">insights</span>
                        Thông Số Ngày Mới
                    </h2>
                    <DailyInsights />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-6 border border-primary/20 shadow-lg shadow-primary/5"
                >
                    <span className="text-[10px] font-bold uppercase text-primary tracking-widest">Gợi ý dành riêng</span>
                    <h4 className="font-bold mt-2 mb-4">Bạn có 1 thông điệp mới từ vũ trụ</h4>
                    <Link
                        href="/tu-vi"
                        className="block w-full text-center bg-primary text-background-dark font-black py-3 rounded-xl text-sm transition-all active:scale-95 hover:shadow-lg hover:shadow-primary/20"
                    >
                        Giải mã ngay
                    </Link>
                </motion.div>

                <div className="p-6 glass rounded-3xl border border-white/5 opacity-60">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Lịch Trăng</h5>
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-3xl text-yellow-200">brightness_3</span>
                        <div>
                            <p className="text-sm font-bold">Trăng Lưỡi Liềm</p>
                            <p className="text-[10px] text-text-secondary uppercase">85% Độ sáng</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
