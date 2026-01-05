import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
    title: 'Cá Nhân',
    description: 'Quản lý thông tin cá nhân và lịch sử lá số tử vi của bạn.',
    url: '/ca-nhan',
    noindex: true,
});

export default function Page() {
    return (
        <div className="flex items-center justify-center py-20 lg:py-32">
            <div className="text-center">
                <span className="material-symbols-outlined text-4xl lg:text-5xl text-white/20 mb-4">person</span>
                <h1 className="text-xl lg:text-2xl font-bold mb-2">Tính năng đang được phát triển</h1>
                <p className="text-text-secondary text-sm lg:text-base mb-6">Chúng tôi đang nỗ lực để mang đến trải nghiệm tốt nhất cho bạn.</p>
                <Link href="/" className="inline-block text-primary font-bold hover:underline text-sm lg:text-base">
                    Quay lại Trang chủ
                </Link>
            </div>
        </div>
    );
}
