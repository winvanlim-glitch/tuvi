import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Góp ý & Phản hồi',
  description: 'Chia sẻ ý kiến, đề xuất tính năng hoặc báo lỗi để giúp chúng tôi cải thiện Tử Vi VN.',
  url: '/gop-y',
  noindex: true,
});

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

