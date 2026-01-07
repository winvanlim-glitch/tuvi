'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signs as baseSigns } from '@/components/features/ZodiacGrid';

interface ZodiacDetail {
  id: string;
  name: string;
  english: string;
  date: string;
  element: 'Lửa' | 'Đất' | 'Khí' | 'Nước';
  planet: string;
  symbol: string;
  strengths: string[];
  vibe: string;
  overview: string;
  career: string;
  love: {
    general: string;
    men: string;
    women: string;
  };
  advice: string;
  lucky: {
    numbers: string;
    colors: string[];
    gemstone: string;
  };
  stats: {
    creativity: number;
    intuition: number;
    logic: number;
    social: number;
  };
  color: string;
  icon: string;
}

const detailedZodiacData: Record<string, Partial<ZodiacDetail>> = {
  '1': {
    english: 'Aries', date: '21/03 - 19/04', element: 'Lửa', planet: 'Sao Hỏa', symbol: 'Con Cừu',
    strengths: ['Năng động', 'Dũng cảm', 'Tiên phong'],
    vibe: 'Nhiệt huyết và đầy khao khát chinh phục đỉnh cao.',
    overview: 'Bạch Dương là cung hoàng đạo đầu tiên, đại diện cho sự khởi đầu và sức sống mãnh liệt. Bạn sở hữu nguồn năng lượng dồi dào, luôn sẵn sàng đối mặt với thử thách.',
    career: 'Lãnh đạo, khởi nghiệp, thể thao chuyên nghiệp. Bạn làm việc tốt nhất khi có quyền tự chủ cao.',
    love: {
      general: 'Mãnh liệt và chân thành, thích sự chủ động.',
      men: 'Nam Bạch Dương là những chiến binh bảo vệ, họ yêu bằng sự hào hiệp và đôi khi hơi nóng nảy.',
      women: 'Nữ Bạch Dương độc lập, mạnh mẽ, khao khát một người bạn đời đủ bản lĩnh để đi cùng mình.'
    },
    advice: 'Hãy học cách lắng nghe và kiên nhẫn hơn. Sự vội vàng đôi khi làm lu mờ những cơ hội tuyệt vời.',
    lucky: { numbers: '1, 9', colors: ['Đỏ tươi', 'Cam'], gemstone: 'Kim cương' },
    stats: { creativity: 85, intuition: 60, logic: 70, social: 90 }
  },
  '2': {
    english: 'Taurus', date: '20/04 - 20/05', element: 'Đất', planet: 'Sao Kim', symbol: 'Con Trâu',
    strengths: ['Kiên nhẫn', 'Thực tế', 'Đáng tin'],
    vibe: 'Vững chãi và yêu thích sự ổn định, thẩm mỹ tinh tế.',
    overview: 'Kim Ngưu đại diện cho sự ổn định và tận hưởng cuộc sống. Bạn là người kiên nhẫn, có gu thẩm mỹ tốt.',
    career: 'Tài chính, bất động sản, nghệ thuật ẩm thực. Bạn xây dựng sự nghiệp chậm nhưng cực kỳ chắc chắn.',
    love: {
      general: 'Chân thành, ấm áp và rất coi trọng sự chung thủy.',
      men: 'Nam Kim Ngưu là trụ cột vững chắc, yêu qua những cử chỉ chăm sóc thực tế và sự chu đáo.',
      women: 'Nữ Kim Ngưu dịu dàng nhưng kiên định, họ tìm kiếm sự an toàn cả về cảm xúc lẫn tài chính.'
    },
    advice: 'Đừng ngại thay đổi. Đôi khi bước ra khỏi vùng an toàn sẽ mang lại những bước ngoặt lớn.',
    lucky: { numbers: '2, 8', colors: ['Xanh lá', 'Hồng'], gemstone: 'Ngọc lục bảo' },
    stats: { creativity: 75, intuition: 55, logic: 95, social: 60 }
  },
  '3': {
    english: 'Gemini', date: '21/05 - 20/06', element: 'Khí', planet: 'Sao Thủy', symbol: 'Song Sinh',
    strengths: ['Linh hoạt', 'Thông minh', 'Hài hước'],
    vibe: 'Luôn tò mò và tràn đầy những ý tưởng đột phá.',
    overview: 'Bậc thầy giao tiếp với khả năng thích nghi cực nhanh. Bạn luôn là linh hồn của mọi cuộc trò chuyện.',
    career: 'Marketing, báo chí, công nghệ thông tin. Bạn cần sự đổi mới liên tục.',
    love: {
      general: 'Tình yêu là sự kết nối về trí tuệ và những cuộc đối thoại.',
      men: 'Nam Song Tử quyến rũ bằng sự thông minh, họ cần một người bạn đồng hành không bao giờ làm họ chán.',
      women: 'Nữ Song Tử đa tài, biến hóa, họ yêu những tâm hồn sâu sắc và có cùng tần số rung động.'
    },
    advice: 'Tập trung vào một mục tiêu thay vì phân tán năng lượng. Sự chuyên tâm sẽ mang lại thành công vang dội.',
    lucky: { numbers: '3, 7', colors: ['Vàng', 'Xanh lơ'], gemstone: 'Đá mã não' },
    stats: { creativity: 95, intuition: 70, logic: 80, social: 100 }
  },
  '4': {
    english: 'Cancer', date: '21/06 - 22/07', element: 'Nước', planet: 'Mặt Trăng', symbol: 'Con Cua',
    strengths: ['Nhạy cảm', 'Bảo bọc', 'Tình cảm'],
    vibe: 'Sâu sắc và luôn hướng về gia đình, cội nguồn.',
    overview: 'Bạn có lớp vỏ cứng cỏi để bảo vệ tâm hồn nhạy cảm, ấm áp bên trong. Trực giác là món quà lớn nhất của bạn.',
    career: 'Tâm lý học, giáo dục, khách sạn. Bạn làm việc bằng cả trái tim.',
    love: {
      general: 'Khao khát xây dựng tổ ấm và sự thấu hiểu tuyệt đối.',
      men: 'Nam Cự Giải là người chồng mẫu mực, nhạy cảm với nhu cầu của đối phương và cực kỳ lãng mạn.',
      women: 'Nữ Cự Giải giàu lòng trắc ẩn, họ nuôi dưỡng tình yêu bằng sự tận tụy và thấu cảm sâu sắc.'
    },
    advice: 'Hãy học cách buông bỏ quá khứ. Tương lai tươi sáng đang chờ đợi khi bạn mở lòng.',
    lucky: { numbers: '4, 6', colors: ['Bạc', 'Trắng'], gemstone: 'Ngọc trai' },
    stats: { creativity: 80, intuition: 100, logic: 50, social: 65 }
  },
  '5': {
    english: 'Leo', date: '23/07 - 22/08', element: 'Lửa', planet: 'Mặt Trời', symbol: 'Sư Tử',
    strengths: ['Tự tin', 'Hào sảng', 'Lãnh đạo'],
    vibe: 'Tỏa sáng và truyền cảm hứng, luôn dẫn đầu cuộc chơi.',
    overview: 'Sư Tử mang năng lượng rực rỡ, thích được nhìn nhận và cống hiến. Bạn có trái tim ấm áp và tinh thần bảo vệ cao.',
    career: 'Giải trí, quản lý, truyền thông. Bạn tỏa sáng nhất khi được dẫn dắt và truyền cảm hứng cho người khác.',
    love: {
      general: 'Lãng mạn, trung thành và thích sự tôn trọng lẫn nhau.',
      men: 'Nam Sư Tử hào hoa, bảo vệ, yêu cuồng nhiệt và muốn làm chỗ dựa.',
      women: 'Nữ Sư Tử kiêu hãnh, mạnh mẽ, cần một người đủ bản lĩnh và tôn trọng không gian tỏa sáng của họ.'
    },
    advice: 'Kiểm soát cái tôi và lắng nghe người khác nhiều hơn để giữ cân bằng.',
    lucky: { numbers: '1, 5', colors: ['Vàng ánh kim', 'Cam'], gemstone: 'Hổ phách' },
    stats: { creativity: 90, intuition: 65, logic: 70, social: 95 }
  },
  '6': {
    english: 'Virgo', date: '23/08 - 22/09', element: 'Đất', planet: 'Sao Thủy', symbol: 'Trinh Nữ',
    strengths: ['Tỉ mỉ', 'Phân tích', 'Tận tâm'],
    vibe: 'Thực tế và tinh tế, luôn tối ưu mọi thứ quanh mình.',
    overview: 'Xử Nữ yêu sự chuẩn xác, thích giúp đỡ người khác và sở hữu tư duy phân tích sắc bén.',
    career: 'Y tế, nghiên cứu, phân tích dữ liệu, vận hành. Bạn nổi bật khi quản lý chi tiết và quy trình.',
    love: {
      general: 'Chân thành, quan tâm bằng hành động chăm sóc nhỏ.',
      men: 'Nam Xử Nữ trầm ổn, thể hiện tình cảm qua sự tận tụy và sửa chữa mọi thứ cho bạn.',
      women: 'Nữ Xử Nữ tinh tế, thực tế, cần cảm giác an toàn và sự tôn trọng ranh giới cá nhân.'
    },
    advice: 'Đừng quá cầu toàn, hãy trân trọng tiến trình và cảm xúc của bản thân.',
    lucky: { numbers: '5, 14', colors: ['Xanh oliu', 'Be'], gemstone: 'Ngọc bích' },
    stats: { creativity: 70, intuition: 75, logic: 98, social: 55 }
  },
  '7': {
    english: 'Libra', date: '23/09 - 22/10', element: 'Khí', planet: 'Sao Kim', symbol: 'Cán Cân',
    strengths: ['Công bằng', 'Hòa nhã', 'Thẩm mỹ'],
    vibe: 'Thanh lịch, yêu cái đẹp và luôn tìm kiếm sự cân bằng.',
    overview: 'Thiên Bình hòa đồng, ngoại giao giỏi và có gu nghệ thuật. Bạn ghét xung đột và luôn cố tạo hòa khí.',
    career: 'Luật, ngoại giao, thiết kế, marketing. Bạn tỏa sáng ở vai trò cầu nối và tư vấn.',
    love: {
      general: 'Tinh tế, lãng mạn, thích mối quan hệ hài hòa.',
      men: 'Nam Thiên Bình duyên dáng, thích trò chuyện sâu và tôn trọng sự công bằng trong tình cảm.',
      women: 'Nữ Thiên Bình nhẹ nhàng, đề cao sự tinh tế và không khí lãng mạn được chăm chút.'
    },
    advice: 'Hãy quyết đoán hơn và đặt ranh giới rõ ràng để tránh bị cuốn theo ý người khác.',
    lucky: { numbers: '6, 15', colors: ['Hồng phấn', 'Xanh lam nhạt'], gemstone: 'Ngọc lam' },
    stats: { creativity: 82, intuition: 68, logic: 75, social: 92 }
  },
  '8': {
    english: 'Scorpio', date: '23/10 - 21/11', element: 'Nước', planet: 'Sao Diêm Vương', symbol: 'Bọ Cạp',
    strengths: ['Sâu sắc', 'Quyết liệt', 'Kiểm soát'],
    vibe: 'Mạnh mẽ, bí ẩn và cảm xúc mãnh liệt.',
    overview: 'Bọ Cạp sở hữu trực giác nhạy bén, ý chí mạnh mẽ và khả năng tái sinh sau khủng hoảng.',
    career: 'Điều tra, tài chính, y học, tâm lý. Bạn giỏi đào sâu vấn đề và giữ bí mật.',
    love: {
      general: 'Cuồng nhiệt, trung thành nhưng cần sự tin tưởng tuyệt đối.',
      men: 'Nam Bọ Cạp bảo vệ, đam mê, đôi khi sở hữu. Họ cần một kết nối trung thực.',
      women: 'Nữ Bọ Cạp quyến rũ, trực giác mạnh, mong muốn sự chân thành và chiều sâu cảm xúc.'
    },
    advice: 'Buông bỏ kiểm soát và học cách chia sẻ cảm xúc để mối quan hệ bền vững hơn.',
    lucky: { numbers: '8, 21', colors: ['Đỏ rượu', 'Đen'], gemstone: 'Hồng ngọc' },
    stats: { creativity: 78, intuition: 95, logic: 72, social: 60 }
  },
  '9': {
    english: 'Sagittarius', date: '22/11 - 21/12', element: 'Lửa', planet: 'Sao Mộc', symbol: 'Cung Thủ',
    strengths: ['Lạc quan', 'Phiêu lưu', 'Thẳng thắn'],
    vibe: 'Tự do, thích khám phá và luôn nhìn xa trông rộng.',
    overview: 'Nhân Mã yêu trải nghiệm mới, ham học hỏi và truyền cảm hứng bằng sự vui tươi, chân thật.',
    career: 'Du lịch, giáo dục, triết học, công nghệ. Bạn hợp các môi trường mở và có tính toàn cầu.',
    love: {
      general: 'Tình yêu cần sự tự do và cùng nhau khám phá.',
      men: 'Nam Nhân Mã phóng khoáng, hài hước, yêu chân thành nhưng ghét bị ràng buộc quá mức.',
      women: 'Nữ Nhân Mã nhiệt huyết, độc lập, muốn người bạn đời tôn trọng ước mơ và chuyến phiêu lưu của họ.'
    },
    advice: 'Kiên trì hơn với cam kết và lắng nghe chi tiết để tránh bỏ lỡ cơ hội.',
    lucky: { numbers: '3, 12', colors: ['Tím than', 'Xanh dương đậm'], gemstone: 'Ngọc lam' },
    stats: { creativity: 88, intuition: 72, logic: 68, social: 93 }
  },
  '10': {
    english: 'Capricorn', date: '22/12 - 19/01', element: 'Đất', planet: 'Sao Thổ', symbol: 'Dê Biển',
    strengths: ['Kỷ luật', 'Kiên trì', 'Tham vọng'],
    vibe: 'Thực tế, bền bỉ và luôn hướng tới đỉnh cao.',
    overview: 'Ma Kết tập trung vào mục tiêu dài hạn, đáng tin cậy và sẵn sàng làm việc chăm chỉ để đạt thành tựu.',
    career: 'Quản trị, tài chính, kỹ thuật, xây dựng. Bạn mạnh ở chiến lược và vận hành bền vững.',
    love: {
      general: 'Ổn định, chung thủy, thể hiện bằng hành động trách nhiệm.',
      men: 'Nam Ma Kết chín chắn, muốn xây dựng tương lai vững chắc trước khi mở lòng hoàn toàn.',
      women: 'Nữ Ma Kết điềm tĩnh, nghiêm túc trong tình cảm và cần sự tôn trọng nỗ lực của họ.'
    },
    advice: 'Đừng quên tận hưởng hiện tại và chia sẻ cảm xúc để kết nối sâu hơn.',
    lucky: { numbers: '4, 10', colors: ['Xám', 'Xanh rêu'], gemstone: 'Hắc diện thạch' },
    stats: { creativity: 65, intuition: 70, logic: 97, social: 58 }
  },
  '11': {
    english: 'Aquarius', date: '20/01 - 18/02', element: 'Khí', planet: 'Thiên Vương Tinh', symbol: 'Người Mang Nước',
    strengths: ['Độc đáo', 'Tiến bộ', 'Nhân văn'],
    vibe: 'Tư duy tương lai, phá cách và yêu tự do tư tưởng.',
    overview: 'Bảo Bình sáng tạo trong ý tưởng, quan tâm cộng đồng và luôn tìm cách cải tiến hệ thống.',
    career: 'Công nghệ, khoa học, hoạt động xã hội, sáng tạo sản phẩm. Bạn hợp môi trường đổi mới và có ảnh hưởng xã hội.',
    love: {
      general: 'Cần sự tôn trọng cá tính và không gian riêng.',
      men: 'Nam Bảo Bình trí tuệ, đôi khi lạnh ngoài nóng trong, yêu bằng sự đồng hành về lý tưởng.',
      women: 'Nữ Bảo Bình độc lập, thích tình yêu dựa trên tình bạn, tôn trọng tự do đôi bên.'
    },
    advice: 'Kết nối cảm xúc nhiều hơn, đừng chỉ ở trên bình diện lý trí.',
    lucky: { numbers: '11, 22', colors: ['Xanh điện', 'Bạc'], gemstone: 'Thạch anh tím' },
    stats: { creativity: 92, intuition: 76, logic: 83, social: 85 }
  },
  '12': {
    english: 'Pisces', date: '19/02 - 20/03', element: 'Nước', planet: 'Hải Vương Tinh', symbol: 'Đôi Cá',
    strengths: ['Thấu cảm', 'Sáng tạo', 'Bao dung'],
    vibe: 'Mộng mơ, giàu lòng trắc ẩn và trực giác mạnh.',
    overview: 'Song Ngư có tâm hồn nghệ sĩ, thích giúp đỡ và thường cảm nhận sâu sắc thế giới quanh mình.',
    career: 'Nghệ thuật, chữa lành, từ thiện, âm nhạc. Bạn làm tốt ở nơi cần sự thấu cảm và sáng tạo.',
    love: {
      general: 'Lãng mạn, mềm mại, cần sự an toàn và thấu hiểu.',
      men: 'Nam Song Ngư nhạy cảm, chung thủy, yêu bằng sự hy sinh và lắng nghe.',
      women: 'Nữ Song Ngư dịu dàng, trực giác cao, cần người tôn trọng cảm xúc và ủng hộ ước mơ nghệ thuật.'
    },
    advice: 'Giữ ranh giới khỏe mạnh và hành động thực tế để bảo vệ năng lượng của mình.',
    lucky: { numbers: '2, 7', colors: ['Xanh biển', 'Tím pastel'], gemstone: 'Aquamarine' },
    stats: { creativity: 98, intuition: 94, logic: 55, social: 78 }
  }
};

const zodiacData: ZodiacDetail[] = baseSigns.map(base => ({
  ...base,
  ...(detailedZodiacData[base.id] || detailedZodiacData['1']) as any
}));

const SignsPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [activeTab, setActiveTab] = useState<'overview' | 'love' | 'stats'>('overview');
  const activeSign = zodiacData.find(s => s.id === selectedId) || zodiacData[0];

  return (
    <div className="space-y-3 lg:space-y-6">
      {/* Sign Picker */}
      <div className="flex gap-2 lg:gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 scroll-smooth">
        {zodiacData.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setSelectedId(sign.id)}
            className={`shrink-0 flex flex-col items-center gap-3 p-4 rounded-[32px] transition-all duration-500 border group ${selectedId === sign.id
              ? 'bg-surface-dark/80 border-white/20'
              : 'bg-transparent border-transparent text-text-secondary hover:bg-white/5'
              }`}
          >
            <div
              className="size-12 lg:size-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{
                backgroundColor: selectedId === sign.id ? sign.color : 'rgba(255,255,255,0.05)',
                color: selectedId === sign.id ? '#111714' : 'rgba(255,255,255,0.3)',
              }}
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl">{sign.icon}</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${selectedId === sign.id ? 'opacity-100' : 'opacity-40'}`} style={{ color: selectedId === sign.id ? sign.color : 'inherit' }}>
              {sign.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4"
        >
          {/* Main Info Card */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3">
            <div className="glass rounded-[32px] p-4 lg:p-4 border border-white/5 relative overflow-hidden flex-1">
              <div
                className="absolute -top-32 -right-32 size-96 blur-[150px] rounded-full opacity-20 pointer-events-none"
                style={{ backgroundColor: activeSign.color }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span
                    className="px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ borderColor: `${activeSign.color}30`, backgroundColor: `${activeSign.color}10`, color: activeSign.color }}
                  >
                    Nguyên tố {activeSign.element}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                    {activeSign.planet}
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-3 leading-none">
                    {activeSign.name}
                  </h2>
                  <div className="flex items-center gap-4 text-text-secondary font-bold text-lg lg:text-xl">
                    <span style={{ color: activeSign.color }} className="uppercase">{activeSign.english}</span>
                    <span className="size-1.5 rounded-full bg-white/10"></span>
                    <span>{activeSign.date}</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 lg:gap-6 border-b border-white/5 mb-5">
                  {['overview', 'love', 'stats'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t as any)}
                      className={`pb-3 text-[11px] font-black uppercase tracking-widest relative transition-colors ${activeTab === t ? 'text-white' : 'text-text-secondary hover:text-white/60'}`}
                    >
                      {t === 'overview' ? 'Tổng quan' : t === 'love' ? 'Tình yêu' : 'Chỉ số'}
                      {activeTab === t && (
                        <motion.div layoutId="signTab" className="absolute bottom-0 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: activeSign.color }} />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {activeTab === 'overview' && (
                        <div className="space-y-4 lg:space-y-5">
                          <p className="text-xl lg:text-2xl font-medium italic text-white/90 leading-tight">"{activeSign.vibe}"</p>
                          <p className="text-base text-text-secondary leading-relaxed">{activeSign.overview}</p>
                          <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Lời khuyên từ vũ trụ</h4>
                            <p className="text-sm font-medium leading-relaxed italic opacity-80">{activeSign.advice}</p>
                          </div>
                        </div>
                      )}
                      {activeTab === 'love' && (
                        <div className="space-y-5">
                          <p className="text-base text-text-secondary">{activeSign.love.general}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="p-4 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                              <span className="material-symbols-outlined text-blue-400 mb-2">man</span>
                              <h5 className="font-bold mb-2">Dành cho Nam giới</h5>
                              <p className="text-xs text-text-secondary leading-relaxed">{activeSign.love.men}</p>
                            </div>
                            <div className="p-4 rounded-3xl bg-pink-500/5 border border-pink-500/10">
                              <span className="material-symbols-outlined text-pink-400 mb-2">woman</span>
                              <h5 className="font-bold mb-2">Dành cho Nữ giới</h5>
                              <p className="text-xs text-text-secondary leading-relaxed">{activeSign.love.women}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === 'stats' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-1">
                          <StatRow label="Sáng tạo" value={activeSign.stats.creativity} color={activeSign.color} />
                          <StatRow label="Trực giác" value={activeSign.stats.intuition} color={activeSign.color} />
                          <StatRow label="Logic" value={activeSign.stats.logic} color={activeSign.color} />
                          <StatRow label="Xã hội" value={activeSign.stats.social} color={activeSign.color} />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <div className="glass rounded-[32px] p-4 border border-white/5">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-5">Vật phẩm may mắn</h4>
              <div className="space-y-4">
                <LuckyItem icon="casino" label="Con số" value={activeSign.lucky.numbers} color="text-primary" />
                <LuckyItem icon="palette" label="Màu sắc" value={activeSign.lucky.colors.join(', ')} color="text-purple-400" />
                <LuckyItem icon="diamond" label="Đá quý" value={activeSign.lucky.gemstone} color="text-cyan-400" />
              </div>
            </div>

            <div
              className="glass rounded-[32px] p-4 border relative overflow-hidden group cursor-pointer"
              style={{ borderColor: `${activeSign.color}20` }}
            >
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-3 leading-tight">Bạn có tò mò về <br />tương lai?</h4>
                <p className="text-sm text-text-secondary mb-6">Xem giải mã lá số chuyên sâu dựa trên giờ sinh và nơi sinh của bạn.</p>
                <button
                  className="w-full py-4 font-black rounded-3xl text-sm transition-all active:scale-95 shadow-2xl"
                  style={{ backgroundColor: activeSign.color, color: '#111714' }}
                >
                  XEM LÁ SỐ NGAY
                </button>
              </div>
              <span
                className="material-symbols-outlined absolute -bottom-10 -right-10 text-[180px] opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000"
                style={{ color: activeSign.color }}
              >
                {activeSign.icon}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LuckyItem: React.FC<{ icon: string, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-5">
    <div className={`size-12 rounded-2xl bg-white/5 flex items-center justify-center ${color}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  </div>
);

const StatRow: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
      <span className="text-text-secondary">{label}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
      />
    </div>
  </div>
);

export default SignsPage;
