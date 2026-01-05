import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
    title: 'Độ Tương Hợp',
    description: 'Kiểm tra độ tương hợp giữa các cung hoàng đạo. Tìm hiểu mức độ hòa hợp trong tình yêu, tình bạn và các mối quan hệ.',
    keywords: 'độ tương hợp, tương hợp cung hoàng đạo, hợp nhau, xem tương hợp, tương hợp tình yêu',
    url: '/tuong-hop',
    noindex: true,
});

export default function Page() {
    return (
        <div className="flex items-center justify-center py-20 lg:py-32">
            <div className="text-center">
                <span className="material-symbols-outlined text-4xl lg:text-5xl text-white/20 mb-4">favorite</span>
                <h1 className="text-xl lg:text-2xl font-bold mb-2">Tính năng đang được phát triển</h1>
                <p className="text-text-secondary text-sm lg:text-base mb-6">Chúng tôi đang nỗ lực để mang đến trải nghiệm tốt nhất cho bạn.</p>
                <Link href="/" className="inline-block text-primary font-bold hover:underline text-sm lg:text-base">
                    Quay lại Trang chủ
                </Link>
            </div>
        </div>
    );
}
