import CompatibilityPage from '@/components/pages/CompatibilityPage';
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
    <article className="space-y-4 lg:space-y-6">
      <CompatibilityPage />
    </article>
  );
}
