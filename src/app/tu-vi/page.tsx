import ChartPage from '@/components/pages/ChartPage';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
    title: 'Lá Số Tử Vi',
    description: 'Lập và bình giải lá số tử vi chi tiết miễn phí. Khám phá vận mệnh, tính cách và tương lai qua tử vi đẩu số chính xác.',
    keywords: 'lá số tử vi, tử vi đẩu số, bình giải tử vi, tử vi miễn phí, xem tử vi, lá số tử vi online',
    url: '/tu-vi',
});

export default function Page() {
    return <ChartPage />;
}
