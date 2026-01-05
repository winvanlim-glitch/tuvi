'use client';

import SignsPage from '@/components/pages/SignsPage';

export default function Page() {
    return (
        <article>
            <header className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-black tracking-tighter mb-2">12 Cung Mệnh</h1>
                <p className="text-text-secondary text-sm lg:text-base">Tìm hiểu sâu sắc về cá tính và năng lượng của từng cung hoàng đạo.</p>
            </header>
            <SignsPage />
        </article>
    );
}
