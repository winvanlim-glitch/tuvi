import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Tử Vi VN AI - Trợ lý tử vi & cung hoàng đạo',
  description: 'Trợ lý tử vi AI tiếng Việt: lập lá số, luận giải cung hoàng đạo, tarot và gợi ý cá nhân hóa dựa trên dữ liệu sinh. Khám phá vận mệnh, tính cách và tương lai của bạn.',
  keywords: 'tử vi, tử vi AI, xem tử vi, lá số tử vi, tử vi đẩu số, bình giải tử vi, trợ lý tử vi, cung hoàng đạo, 12 cung hoàng đạo, tarot, bói tarot, tử vi miễn phí, tử vi online, tử vi hàng ngày, chiêm tinh học, astrology, tử vi vn, tuvivn',
  url: '/',
});

export default function Home() {
    return <HomePage />;
}
