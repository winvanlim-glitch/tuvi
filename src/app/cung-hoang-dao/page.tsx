import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import SignsPage from '@/components/pages/SignsPage';

export const metadata: Metadata = generateSEOMetadata({
    title: '12 Cung Hoàng Đạo',
    description: 'Khám phá 12 cung hoàng đạo: Bạch Dương, Kim Ngưu, Song Tử, Cự Giải, Sư Tử, Xử Nữ, Thiên Bình, Bọ Cạp, Nhân Mã, Ma Kết, Bảo Bình, Song Ngư. Tìm hiểu tính cách, tình yêu, sự nghiệp của từng cung.',
    keywords: 'cung hoàng đạo, 12 cung hoàng đạo, 12 cung mệnh, bạch dương, kim ngưu, song tử, cự giải, sư tử, xử nữ, thiên bình, bọ cạp, nhân mã, ma kết, bảo bình, song ngư, xem cung hoàng đạo, tính cách cung hoàng đạo, cung hoàng đạo hôm nay, horoscope, astrology, chiêm tinh học',
    url: '/cung-hoang-dao',
});

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
