'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/features/Hero';
import ZodiacGrid from '@/components/features/ZodiacGrid';
import DailyInsights from '@/components/features/DailyInsights';
import TuViBlog from '@/components/pages/TuViBlog';
import SearchBar from '@/components/features/SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateStructuredData } from '@/lib/seo';

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

            <motion.section variants={sectionVariants} initial="hidden" animate="visible" aria-label="Hero section">
                <Hero onStartChart={() => router.push('/tu-vi')} />
            </motion.section>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible" aria-labelledby="zodiac-heading">
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                    <h2 id="zodiac-heading" className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight">Cung Hoàng Đạo</h2>
                    <Link href="/cung-hoang-dao" className="text-primary font-medium hover:underline text-sm lg:text-base">
                        Khám phá tất cả
                    </Link>
                </div>
                <ZodiacGrid />
            </motion.section>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="lg:hidden" aria-labelledby="daily-heading">
                <h2 id="daily-heading" className="text-lg lg:text-xl font-bold tracking-tight mb-4">Thông Điệp Hôm Nay</h2>
                <DailyInsights />
            </motion.section>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible" aria-labelledby="blog-heading">
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                    <h2 id="blog-heading" className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight">Góc Chiêm Tinh</h2>
                    <button className="text-primary font-medium hover:underline text-sm lg:text-base">Xem thêm bài viết</button>
                </div>
                <TuViBlog />
            </motion.section>
        </>
    );
}
