import TarotPage from '@/components/pages/TarotPage';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
    title: 'Bói Tarot',
    description: 'Khám phá thông điệp Tarot hàng ngày miễn phí. Trải bài Tarot online để nhận lời khuyên về tình yêu, sự nghiệp và cuộc sống.',
    keywords: 'bói tarot, tarot online, trải bài tarot, tarot miễn phí, tarot hàng ngày, giải bài tarot',
    url: '/tarot',
});

export default function Page() {
    return <TarotPage />;
}
