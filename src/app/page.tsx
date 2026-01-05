'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/features/Hero';
import ZodiacGrid from '@/components/features/ZodiacGrid';
import DailyInsights from '@/components/features/DailyInsights';
import AstrologyBlog from '@/components/pages/AstrologyBlog';
import SearchBar from '@/components/features/SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <>
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="lg:hidden mt-2">
                <SearchBar />
            </motion.div>

            <motion.div variants={sectionVariants} initial="hidden" animate="visible">
                <Hero onStartChart={() => router.push('/tu-vi')} />
            </motion.div>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">Cung Hoàng Đạo</h2>
                    <Link href="/cung-hoang-dao" className="text-primary font-medium hover:underline">
                        Khám phá tất cả
                    </Link>
                </div>
                <ZodiacGrid />
            </motion.section>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="lg:hidden">
                <h2 className="text-xl font-bold tracking-tight mb-4">Thông Điệp Hôm Nay</h2>
                <DailyInsights />
            </motion.section>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">Góc Chiêm Tinh</h2>
                    <button className="text-primary font-medium hover:underline">Xem thêm bài viết</button>
                </div>
                <AstrologyBlog />
            </motion.section>
        </>
    );
}
