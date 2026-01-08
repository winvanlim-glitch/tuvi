import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
    title: '12 Cung Hoàng Đạo',
    description: 'Khám phá 12 cung hoàng đạo: Bạch Dương, Kim Ngưu, Song Tử, Cự Giải, Sư Tử, Xử Nữ, Thiên Bình, Bọ Cạp, Nhân Mã, Ma Kết, Bảo Bình, Song Ngư. Tìm hiểu tính cách, tình yêu, sự nghiệp của từng cung.',
    keywords: 'cung hoàng đạo, 12 cung hoàng đạo, 12 cung mệnh, bạch dương, kim ngưu, song tử, cự giải, sư tử, xử nữ, thiên bình, bọ cạp, nhân mã, ma kết, bảo bình, song ngư, xem cung hoàng đạo, tính cách cung hoàng đạo, cung hoàng đạo hôm nay, horoscope, astrology, chiêm tinh học',
    url: '/cung-hoang-dao',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

