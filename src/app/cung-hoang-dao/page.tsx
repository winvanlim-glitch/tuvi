'use client';

import SignsPage from '@/components/pages/SignsPage';

export default function Page() {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tighter mb-2">12 Cung Mệnh</h2>
                <p className="text-text-secondary">Tìm hiểu sâu sắc về cá tính và năng lượng của từng cung hoàng đạo.</p>
            </div>
            <SignsPage />
        </div>
    );
}
