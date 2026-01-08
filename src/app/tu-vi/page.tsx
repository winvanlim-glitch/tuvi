import ChartPage from '@/components/pages/ChartPage';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
    title: 'Lá Số Tử Vi AI',
    description: 'Lập và bình giải lá số tử vi chi tiết với trợ lý AI tiếng Việt. Khám phá vận mệnh, tính cách và tương lai qua phân tích tự động, trực quan.',
    keywords: 'lá số tử vi, tử vi đẩu số, bình giải tử vi, xem tử vi, lập lá số tử vi, tử vi AI, tử vi online, tử vi miễn phí, tử vi đẩu số AI, bình giải tử vi tự động, trợ lý tử vi, lá số tử vi online, xem tử vi theo ngày sinh, tử vi trọn đời, tử vi hàng ngày',
    url: '/tu-vi',
});

export default function Page() {
    return <ChartPage />;
}
