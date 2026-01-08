import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { signs } from '@/components/features/ZodiacGrid';
import ZodiacDetailPage from '@/components/pages/ZodiacDetailPage';

export async function generateMetadata({ params }: { params: { cung: string } }): Promise<Metadata> {
  const slug = params?.cung || '';
  const matchedSign = signs.find((s) => s.slug === slug);

  if (!matchedSign) {
    return generateSEOMetadata({
      title: 'Cung Hoàng Đạo',
      description: 'Khám phá 12 cung hoàng đạo',
      url: '/cung-hoang-dao',
    });
  }

  const signNames = {
    'bach-duong': 'Bạch Dương',
    'kim-nguu': 'Kim Ngưu',
    'song-tu': 'Song Tử',
    'cu-giai': 'Cự Giải',
    'su-tu': 'Sư Tử',
    'xu-nu': 'Xử Nữ',
    'thien-binh': 'Thiên Bình',
    'bo-cap': 'Bọ Cạp',
    'nhan-ma': 'Nhân Mã',
    'ma-ket': 'Ma Kết',
    'bao-binh': 'Bảo Bình',
    'song-ngu': 'Song Ngư',
  };

  const signDescriptions: Record<string, string> = {
    'bach-duong': 'Bạch Dương (Aries) - Cung hoàng đạo đầu tiên, đại diện cho lửa, tính cách mạnh mẽ, quyết đoán và đầy năng lượng.',
    'kim-nguu': 'Kim Ngưu (Taurus) - Cung hoàng đạo đại diện cho đất, tính cách ổn định, kiên nhẫn và yêu thích sự an toàn.',
    'song-tu': 'Song Tử (Gemini) - Cung hoàng đạo đại diện cho không khí, tính cách thông minh, linh hoạt và giao tiếp tốt.',
    'cu-giai': 'Cự Giải (Cancer) - Cung hoàng đạo đại diện cho nước, tính cách nhạy cảm, yêu thương gia đình và trực giác mạnh.',
    'su-tu': 'Sư Tử (Leo) - Cung hoàng đạo đại diện cho lửa, tính cách tự tin, hào phóng và thích được chú ý.',
    'xu-nu': 'Xử Nữ (Virgo) - Cung hoàng đạo đại diện cho đất, tính cách cẩn thận, tỉ mỉ và hoàn hảo.',
    'thien-binh': 'Thiên Bình (Libra) - Cung hoàng đạo đại diện cho không khí, tính cách công bằng, hài hòa và yêu cái đẹp.',
    'bo-cap': 'Bọ Cạp (Scorpio) - Cung hoàng đạo đại diện cho nước, tính cách bí ẩn, mạnh mẽ và đam mê.',
    'nhan-ma': 'Nhân Mã (Sagittarius) - Cung hoàng đạo đại diện cho lửa, tính cách tự do, lạc quan và thích phiêu lưu.',
    'ma-ket': 'Ma Kết (Capricorn) - Cung hoàng đạo đại diện cho đất, tính cách tham vọng, kiên trì và có trách nhiệm.',
    'bao-binh': 'Bảo Bình (Aquarius) - Cung hoàng đạo đại diện cho không khí, tính cách độc lập, sáng tạo và nhân đạo.',
    'song-ngu': 'Song Ngư (Pisces) - Cung hoàng đạo đại diện cho nước, tính cách mơ mộng, nhạy cảm và trực giác.',
  };

  return generateSEOMetadata({
    title: `${matchedSign.name} - Cung Hoàng Đạo`,
    description: signDescriptions[slug] || `Khám phá tính cách, tình yêu, sự nghiệp và vận mệnh của cung ${matchedSign.name}. Xem tử vi, horoscope và chiêm tinh học cho ${matchedSign.name}.`,
    keywords: `${matchedSign.name}, cung ${matchedSign.name}, ${matchedSign.name.toLowerCase()} horoscope, tử vi ${matchedSign.name}, tính cách ${matchedSign.name}, ${matchedSign.name} tình yêu, ${matchedSign.name} sự nghiệp, cung hoàng đạo ${matchedSign.name}`,
    url: `/cung-hoang-dao/${slug}`,
  });
}

export default function Page({ params }: { params: { cung: string } }) {
  return <ZodiacDetailPage />;
}


