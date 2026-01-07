'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { signs } from '@/components/features/ZodiacGrid';

type ElementType = 'Lửa' | 'Đất' | 'Khí' | 'Nước';

type PairInsight = {
  score: number;
  tagline: string;
  pros: string[];
  cons: string[];
  adviceLove: string;
  adviceWork: string;
};

const elementById: Record<string, ElementType> = {
  '1': 'Lửa',
  '2': 'Đất',
  '3': 'Khí',
  '4': 'Nước',
  '5': 'Lửa',
  '6': 'Đất',
  '7': 'Khí',
  '8': 'Nước',
  '9': 'Lửa',
  '10': 'Đất',
  '11': 'Khí',
  '12': 'Nước',
};

const ruleByElementPair: Record<string, PairInsight> = {
  'Lửa|Lửa': {
    score: 84,
    tagline: 'Nhiệt huyết nhân đôi, cần nhịp điều hòa.',
    pros: ['Động lực mạnh, dễ truyền cảm hứng cho nhau', 'Chung tinh thần tiên phong, sẵn sàng thử cái mới'],
    cons: ['Cái tôi cao, dễ tranh phần dẫn', 'Quyết định nhanh có thể bỏ qua chi tiết'],
    adviceLove: 'Chia phiên dẫn dắt, ưu tiên lắng nghe cảm xúc thay vì tranh thắng thua.',
    adviceWork: 'Rõ vai trò lãnh đạo, đặt nguyên tắc ra quyết định tập trung vào mục tiêu chung.',
  },
  'Khí|Khí': {
    score: 82,
    tagline: 'Ý tưởng dồi dào, nói chuyện không hết.',
    pros: ['Giao tiếp mượt, hiểu ý nhanh', 'Yêu tự do và khám phá, dễ đồng hành'],
    cons: ['Thiếu tính kiên trì với chi tiết nhàm chán', 'Cả hai dễ phân tâm khi quá nhiều hướng'],
    adviceLove: 'Giữ những buổi “no phone talk” để kết nối sâu, không chỉ nói chuyện bề mặt.',
    adviceWork: 'Chốt ưu tiên theo quý và phân công người giữ nhịp thực thi cho từng dự án.',
  },
  'Đất|Đất': {
    score: 83,
    tagline: 'Vững vàng, thực tế và bền bỉ.',
    pros: ['Ổn định, có kế hoạch rõ ràng', 'Tập trung xây nền tảng và tài chính'],
    cons: ['Bảo thủ, ngại thay đổi lớn', 'Dễ thiếu gia vị cảm xúc'],
    adviceLove: 'Thêm những “buổi hẹn hò bất ngờ” để làm mới cảm xúc, không chỉ bàn việc thực tế.',
    adviceWork: 'Định kỳ rà soát lại quy trình để tránh trì trệ, mở cửa cho thử nghiệm nhỏ.',
  },
  'Nước|Nước': {
    score: 84,
    tagline: 'Thấu cảm sâu, kết nối cảm xúc mạnh.',
    pros: ['Nhạy cảm và chăm sóc lẫn nhau', 'Trực giác cao, ít cần nói nhiều vẫn hiểu'],
    cons: ['Dễ cuốn vào cảm xúc, thiếu lý tính khi quyết định', 'Cần ranh giới để không kiệt sức'],
    adviceLove: 'Thiết lập ngôn ngữ an toàn khi khó chịu: mô tả cảm xúc, không đổ lỗi.',
    adviceWork: 'Luôn kèm số liệu/logic khi ra quyết định để cân bằng cảm xúc và thực tế.',
  },
  'Khí|Lửa': {
    score: 82,
    tagline: 'Khí thổi lửa bùng, sáng tạo bứt phá.',
    pros: ['Kết hợp tốc độ (Lửa) và ý tưởng (Khí)', 'Nhiệt huyết + sự linh hoạt giúp tiến nhanh'],
    cons: ['Dễ thiếu kiên nhẫn với quy trình', 'Nóng vội có thể bỏ sót rủi ro'],
    adviceLove: 'Giữ những thoả thuận nhỏ về không gian riêng để tránh “quá nhiệt”.',
    adviceWork: 'Thêm checkpoint ngắn với checklist rủi ro trước khi chốt quyết định lớn.',
  },
  'Đất|Nước': {
    score: 80,
    tagline: 'Đất nâng Nước, Nước nuôi Đất.',
    pros: ['Ổn định + thấu cảm, dễ xây nền tảng dài hạn', 'Thực tế nhưng vẫn giữ sự tinh tế trong chăm sóc'],
    cons: ['Đất có thể thấy Nước thiếu quyết đoán', 'Nước có thể thấy Đất khô khan'],
    adviceLove: 'Chia sẻ rõ nhu cầu an toàn (Đất) và lắng nghe (Nước) để tránh hiểu nhầm.',
    adviceWork: 'Chia vai: Đất lo cấu trúc, Nước lo kết nối đội ngũ và khách hàng.',
  },
  'Lửa|Nước': {
    score: 62,
    tagline: 'Nhiệt gặp cảm xúc, cần nhịp chung.',
    pros: ['Lửa mang động lực, Nước mang chiều sâu', 'Có thể bổ sung cho nhau nếu biết lắng nghe'],
    cons: ['Dễ xung đột: nóng vội vs nhạy cảm', 'Cảm xúc dễ bị tổn thương khi tranh luận'],
    adviceLove: 'Thống nhất cách tranh luận “mềm”: tạm dừng khi quá nóng, quay lại khi cả hai dịu lại.',
    adviceWork: 'Quy ước rõ: Lửa đề xuất, Nước phản biện; quyết định dựa trên dữ liệu chung.',
  },
  'Đất|Khí': {
    score: 64,
    tagline: 'Thực tế gặp ý tưởng, cần cầu nối.',
    pros: ['Khí mang đổi mới, Đất biến thành kế hoạch', 'Bổ trợ: sáng tạo + triển khai'],
    cons: ['Đất thấy Khí thiếu thực tế; Khí thấy Đất chậm', 'Dễ mắc kẹt ở bước thuyết phục nhau'],
    adviceLove: 'Tôn trọng khác biệt: một người lo “hôm nay”, một người lo “ngày mai”.',
    adviceWork: 'Dùng nguyên tắc: thử nhỏ (pilot) trước khi mở rộng để cả hai yên tâm.',
  },
};

const pairOverrides: Record<string, Partial<PairInsight>> = {
  '1-5': {
    score: 88,
    tagline: 'Song kiếm Lửa, tỏa sáng và hào sảng.',
    pros: ['Nhiệt huyết mạnh, cùng thích dẫn đầu', 'Thẳng thắn, rõ ràng trong giao tiếp'],
    cons: ['Cái tôi cao, dễ tranh spotlight', 'Quyết nhanh dễ thiếu cân bằng dài hạn'],
    adviceLove: 'Chia mục tiêu: người dẫn, người hậu cần; đổi vai định kỳ để ai cũng được tỏa sáng.',
    adviceWork: 'Rõ vai trò chính/phụ trong dự án, tránh cả hai cùng “chỉ huy trưởng”.',
  },
  '1-11': {
    score: 83,
    tagline: 'Ý tưởng Khí thổi bùng Lửa hành động.',
    pros: ['Một bên sáng tạo, một bên bứt phá', 'Cùng thích tự do và thử cái mới'],
    cons: ['Thiếu kiên nhẫn với chi tiết', 'Dễ bỏ dở khi có ý tưởng khác'],
    adviceLove: 'Giữ cam kết nhỏ theo tuần thay vì những lời hứa quá xa để tránh hụt hẫng.',
    adviceWork: 'Khóa mục tiêu ngắn 2 tuần, review nhanh để duy trì tập trung.',
  },
  '2-4': {
    score: 82,
    tagline: 'Đất ổn định, Nước dịu êm.',
    pros: ['Chăm sóc thực tế + cảm xúc', 'Giỏi xây tổ ấm và tài chính vững'],
    cons: ['Có thể chậm khi cần quyết nhanh', 'Dễ ngại thay đổi lớn'],
    adviceLove: 'Ưu tiên chia sẻ cảm xúc trước, sau đó mới bàn đến kế hoạch cụ thể.',
    adviceWork: 'Đặt quỹ “thử nghiệm” nhỏ để cùng dám đổi mới.',
  },
  '7-11': {
    score: 85,
    tagline: 'Khí + Khí: hòa nhã, nói chuyện bất tận.',
    pros: ['Hợp về giao tiếp, thẩm mỹ và lý tưởng', 'Hỗ trợ xã hội tốt, kết nối rộng'],
    cons: ['Thiếu thực thi chi tiết', 'Dễ trì hoãn quyết định khó'],
    adviceLove: 'Duy trì những cuộc hẹn riêng tư, không chỉ tụ tập bạn bè hoặc sự kiện.',
    adviceWork: 'Chốt deadline cứng và mời người Đất/Lửa phản biện.',
  },
  '8-12': {
    score: 78,
    tagline: 'Cảm xúc sâu, trực giác mạnh.',
    pros: ['Tin cậy và trung thành cao', 'Thấu cảm, hiểu tầng sâu của nhau'],
    cons: ['Ghen tuông/nhạy cảm nếu thiếu minh bạch', 'Dễ cuốn vào cảm xúc nặng'],
    adviceLove: 'Thiết lập “minh bạch tài chính/cảm xúc” định kỳ để giữ niềm tin.',
    adviceWork: 'Đặt ranh giới giữa chuyện cá nhân và quyết định công việc để giữ sự khách quan.',
  },
  '1-7': {
    score: 76,
    tagline: 'Đối đỉnh Lửa–Khí: cân bằng cái tôi và công bằng.',
    pros: ['Bổ trợ: nhiệt huyết + ngoại giao', 'Tăng khả năng nhìn đa chiều trước khi quyết'],
    cons: ['Bạch Dương nóng, Thiên Bình cân nhắc lâu', 'Dễ bất đồng khi cần quyết nhanh'],
    adviceLove: 'Thống nhất “quy tắc 24h”: tạm hoãn tranh luận khi cảm xúc cao, hẹn lại khi cả hai bình tĩnh.',
    adviceWork: 'Ấn định thời hạn quyết định; ai mạnh hơn chủ đề thì có quyền chốt.',
  },
  '2-8': {
    score: 74,
    tagline: 'Đất gặp Nước sâu: bền vững nhưng cần minh bạch.',
    pros: ['Kim Ngưu đem ổn định, Bọ Cạp đem chiều sâu', 'Tin cậy cao nếu thống nhất tài chính/cảm xúc'],
    cons: ['Dễ cố chấp; bảo thủ quan điểm', 'Cảm xúc mạnh có thể gây căng thẳng kéo dài'],
    adviceLove: 'Ưu tiên nói về cảm xúc trước khi bàn đúng sai để tránh công kích nhau.',
    adviceWork: 'Đặt quy tắc minh bạch và quyền phủ quyết giới hạn để tránh leo thang.',
  },
  '3-9': {
    score: 80,
    tagline: 'Khí + Lửa thích khám phá: vui, nhanh, tò mò.',
    pros: ['Trò chuyện vô tận, nhiều ý tưởng du lịch/học hỏi', 'Nhân Mã truyền cảm hứng, Song Tử linh hoạt'],
    cons: ['Dễ chán nếu thiếu mục tiêu chung', 'Thẳng thắn quá có thể thành vô tâm'],
    adviceLove: 'Lập danh sách “trải nghiệm chung” theo quý, cùng tick-off để giữ lửa.',
    adviceWork: 'Chia nhỏ dự án thành các chặng ngắn, ăn mừng mỗi milestone để giữ động lực.',
  },
  '4-10': {
    score: 73,
    tagline: 'Nước cần an toàn, Đất cần kỷ luật.',
    pros: ['Cự Giải chăm sóc cảm xúc, Ma Kết lo kế hoạch dài hạn', 'Tạo tổ ấm bền và mục tiêu rõ'],
    cons: ['Ma Kết có thể thấy cảm xúc “quá nhiều”; Cự Giải thấy khô khan', 'Rủi ro thiếu thời gian cho gia đình'],
    adviceLove: 'Chốt “lịch gia đình” cố định để Cự Giải yên tâm, Ma Kết cũng có khung thư giãn.',
    adviceWork: 'Thống nhất rõ ưu tiên: giai đoạn nào tập trung sự nghiệp, giai đoạn nào giảm tải.',
  },
  '5-11': {
    score: 79,
    tagline: 'Sáng tạo Lửa gặp ý tưởng Khí: khác biệt thú vị.',
    pros: ['Sư Tử tỏa sáng, Bảo Bình độc đáo', 'Cùng tạo giá trị cho cộng đồng/nhóm bạn'],
    cons: ['Cái tôi vs tính tự do; dễ tranh quyền dẫn', 'Nhịp cảm xúc khác nhau (ấm áp vs lý trí)'],
    adviceLove: 'Tôn trọng không gian riêng của Bảo Bình và nhu cầu được công nhận của Sư Tử.',
    adviceWork: 'Đặt vai trò rõ: một người dẫn, một người kiến trúc ý tưởng; đổi vai khi cần.',
  },
  '6-12': {
    score: 75,
    tagline: 'Đất tỉ mỉ gặp Nước mộng mơ: bù trừ tốt nếu tôn trọng nhịp.',
    pros: ['Xử Nữ giúp hiện thực hóa ý tưởng của Song Ngư', 'Song Ngư mang cảm hứng sáng tạo, mềm hóa sự khô khan'],
    cons: ['Xử Nữ có thể phê bình quá mức; Song Ngư nhạy cảm', 'Dễ mệt khi không có ranh giới rõ'],
    adviceLove: 'Thỏa thuận cách góp ý: cụ thể, dịu và có hành động; dành “ngày thư giãn” chung.',
    adviceWork: 'Để Xử Nữ lo checklist, Song Ngư lo ý tưởng sáng tạo và cảm hứng.',
  },
  // Một số cặp Lửa–Nước “khó” được seed kỹ hơn
  '1-4': {
    score: 60,
    tagline: 'Bạch Dương bốc lửa, Cự Giải nhạy cảm – dễ hiểu lầm nhưng cũng dễ bù trừ.',
    pros: ['Bạch Dương mang lại sự bảo vệ, Cự Giải mang lại sự ấm áp', 'Nếu tôn trọng nhịp cảm xúc, cả hai rất trung thành'],
    cons: ['Lời nói vội của Bạch Dương có thể làm Cự Giải tổn thương sâu', 'Cự Giải thu mình khiến Bạch Dương khó hiểu'],
    adviceLove: 'Học thói quen “nói chậm lại 3 giây” trước khi phản ứng, và chủ động chia sẻ nỗi sợ thay vì im lặng.',
    adviceWork: 'Cho Cự Giải thời gian chuẩn bị trước các thay đổi lớn do Bạch Dương đề xuất.',
  },
  '1-8': {
    score: 58,
    tagline: 'Hai chiến binh mạnh mẽ: Bạch Dương hành động, Bọ Cạp sâu sắc.',
    pros: ['Cả hai rất quyết liệt khi đã chọn mục tiêu', 'Có thể là cặp đôi “quyền lực” nếu tin tưởng nhau'],
    cons: ['Ghen tuông, kiểm soát và tranh quyền dẫn dễ xảy ra', 'Xung đột thường không “vừa phải” mà khá căng'],
    adviceLove: 'Thống nhất vùng riêng tư và mức độ chia sẻ, tránh kiểm soát điện thoại/mạng xã hội.',
    adviceWork: 'Rõ quyền quyết định cuối cùng cho từng mảng để tránh giằng co hậu trường.',
  },
  '5-8': {
    score: 61,
    tagline: 'Sư Tử rực rỡ, Bọ Cạp bí ẩn – cuốn hút nhưng căng.',
    pros: ['Hấp dẫn mạnh về mặt cảm xúc và thể chất', 'Có thể bảo vệ nhau rất tốt khi đã đứng cùng một phía'],
    cons: ['Tự ái cao, khó xin lỗi trước', 'Hay thử nhau bằng những “bài test” cảm xúc'],
    adviceLove: 'Thay vì thử lòng, hãy nói thẳng mong đợi và giới hạn; học cách khen – công khai và riêng tư.',
    adviceWork: 'Chia việc theo thế mạnh: Sư Tử đối ngoại, Bọ Cạp lo chiến lược và phân tích sâu.',
  },
  '9-4': {
    score: 63,
    tagline: 'Nhân Mã phiêu lưu, Cự Giải hướng gia đình – hai nhu cầu khác nhịp.',
    pros: ['Nhân Mã giúp Cự Giải bước ra thế giới rộng hơn', 'Cự Giải cho Nhân Mã một nơi để quay về'],
    cons: ['Khác biệt lớn về quan niệm tự do và an toàn', 'Nếu không tôn trọng giới hạn, cả hai đều thấy bị bó buộc'],
    adviceLove: 'Thống nhất “quota” cho các chuyến đi/hoạt động riêng và cùng nhau để ai cũng thoải mái.',
    adviceWork: 'Để Nhân Mã lo tầm nhìn/khai phá, Cự Giải lo chăm sóc team và khách hàng hiện hữu.',
  },
  // Một số cặp hot khác
  '3-7': {
    score: 81,
    tagline: 'Song Tử lanh lợi, Thiên Bình tinh tế – cặp đôi xã giao đỉnh cao.',
    pros: ['Nói chuyện hợp tần số, dễ thành bạn thân trước người yêu', 'Cùng yêu cái đẹp, nghệ thuật và trải nghiệm mới'],
    cons: ['Cả hai có thể thiếu quyết đoán trong chuyện lớn', 'Dễ né tránh xung đột để giữ hoà khí bề mặt'],
    adviceLove: 'Thống nhất “giờ nói thật”: định kỳ nói rõ điều chưa hài lòng thay vì xuề xoà cho qua.',
    adviceWork: 'Chia vai: Song Tử thu thập thông tin/ý tưởng, Thiên Bình so sánh và đưa khuyến nghị cân bằng.',
  },
  '5-9': {
    score: 86,
    tagline: 'Sư Tử và Nhân Mã – combo Lửa lạc quan, náo nhiệt và rộng lượng.',
    pros: ['Cùng thích vui, khám phá, ít để bụng', 'Dễ trở thành cặp đôi truyền cảm hứng cho bạn bè xung quanh'],
    cons: ['Dễ tiêu xài mạnh tay hoặc thiếu kế hoạch dài hạn', 'Thẳng thắn quá có thể vô tình làm nhau tổn thương'],
    adviceLove: 'Đặt mục tiêu chung (chuyến đi lớn, tài chính, dự án) để năng lượng không bị tản mát.',
    adviceWork: 'Dùng sức hút và óc hài hước của cả hai cho các vai trò pitching, trình bày, dẫn dắt workshop.',
  },
  '2-10': {
    score: 79,
    tagline: 'Kim Ngưu và Ma Kết – bộ đôi Đất siêu bền, siêu chịu khó.',
    pros: ['Rất có trách nhiệm, coi trọng kết quả thực tế', 'Hợp để xây dựng tài chính, dự án dài hạn'],
    cons: ['Dễ đặt công việc/tài chính lên trên cảm xúc', 'Có xu hướng lo lắng quá mức về rủi ro'],
    adviceLove: 'Chừa ra “khoảng không nói chuyện không phải về tiền/buồn lo” mỗi tuần.',
    adviceWork: 'Phân tầng mục tiêu: dài hạn rõ ràng nhưng giữ những bước nhỏ linh hoạt hơn.',
  },
  '11-3': {
    score: 80,
    tagline: 'Bảo Bình độc đáo, Song Tử nhanh nhạy – bộ não ý tưởng.',
    pros: ['Tư duy mở, thích thử nghiệm, hiếm khi nhàm chán', 'Tôn trọng sự khác biệt và tự do của nhau'],
    cons: ['Thỉnh thoảng khá “trên mây”, thiếu neo thực tế', 'Cảm xúc có thể bị bỏ quên vì quá chú trọng lý trí/ý tưởng'],
    adviceLove: 'Tập thói quen hỏi nhau “hôm nay bạn cảm thấy thế nào?” thay vì chỉ chia sẻ ý tưởng.',
    adviceWork: 'Rất hợp cùng nhau brainstorm, nhưng nên có một người Đất trong team để chốt triển khai.',
  },
};

const levelByScore = (score: number) => {
  if (score >= 85) return { label: 'Rất hợp', color: '#22c55e' };
  if (score >= 75) return { label: 'Khá hợp', color: '#a855f7' };
  if (score >= 65) return { label: 'Cân bằng', color: '#eab308' };
  return { label: 'Thử thách', color: '#f97316' };
};

const getPairKey = (a: string, b: string) => [a, b].sort().join('-');
const getElementKey = (a: ElementType, b: ElementType) => [a, b].sort().join('|');

const computeCompatibility = (a: string, b: string): PairInsight => {
  const elemA = elementById[a];
  const elemB = elementById[b];
  const elementKey = getElementKey(elemA, elemB);
  const rule = ruleByElementPair[elementKey] ?? {
    score: 70,
    tagline: 'Cần hiểu nhịp nhau, có tiềm năng bổ trợ.',
    pros: ['Bổ sung góc nhìn khác biệt', 'Có thể học kỹ năng còn thiếu từ đối phương'],
    cons: ['Cần thêm thời gian để hiểu thói quen', 'Dễ xung đột khi chưa thống nhất cách làm'],
    adviceLove: 'Đi chậm lại ở giai đoạn đầu, nói rõ nhu cầu và nỗi sợ của mỗi người.',
    adviceWork: 'Đặt quy tắc hợp tác rõ ràng ngay từ đầu.',
  };

  const override = pairOverrides[getPairKey(a, b)] ?? {};

  return {
    score: override.score ?? rule.score,
    tagline: override.tagline ?? rule.tagline,
    pros: override.pros ?? rule.pros,
    cons: override.cons ?? rule.cons,
    adviceLove: override.adviceLove ?? rule.adviceLove,
    adviceWork: override.adviceWork ?? rule.adviceWork,
  };
};

const CompatibilityPage: React.FC = () => {
  const [first, setFirst] = useState('1');
  const [second, setSecond] = useState('5');
  const [focus, setFocus] = useState<'love' | 'work'>('love');

  const result = useMemo(() => computeCompatibility(first, second), [first, second]);
  const level = levelByScore(result.score);
  const colorA = signs.find(s => s.id === first)?.color ?? '#22c55e';
  const colorB = signs.find(s => s.id === second)?.color ?? '#06b6d4';
  const barGradient = `linear-gradient(90deg, ${colorA}, ${colorB})`;

  return (
    <div className="space-y-4 lg:space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary">Độ tương hợp</p>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">So khớp 12 cung hoàng đạo</h1>
        <p className="text-text-secondary text-sm lg:text-base">Chọn hai cung để xem mức độ hòa hợp, điểm mạnh - yếu và lời khuyên nhanh.</p>
      </header>

      <div
        className="glass rounded-[28px] p-4 lg:p-5 border border-white/5 space-y-4"
        style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <PickerCard title="Bạn" selectedId={first} onSelect={setFirst} />
          <PickerCard title="Đối phương" selectedId={second} onSelect={setSecond} />
        </motion.div>

        <motion.div
          key={`${first}-${second}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-3"
        >
          <div className="glass rounded-[24px] p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-text-secondary">Tổng quan</span>
              <span
                className="px-3 py-1 rounded-full text-[11px] font-black"
                style={{ backgroundColor: `${level.color}1f`, color: level.color }}
              >
                {level.label}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl font-black" style={{ color: level.color }}>{result.score}</div>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: barGradient, boxShadow: `0 0 16px ${level.color}40` }}
                />
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{result.tagline}</p>
          </div>

          <div className="glass rounded-[24px] p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white/60 mb-3">Điểm hợp</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              {result.pros.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-base shrink-0">check_small</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-[24px] p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white/60 mb-3">Điểm lưu ý</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              {result.cons.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-base shrink-0">error_circle_rounded</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="glass rounded-[24px] p-4 border border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-white/70">
              <span className="material-symbols-outlined text-primary">tips_and_updates</span>
              Lời khuyên nhanh
            </div>
            <div className="inline-flex items-center gap-1 rounded-2xl bg-white/5 p-1">
              {(['love', 'work'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFocus(mode)}
                  className={`px-3 py-1 rounded-2xl text-[11px] font-black uppercase tracking-[0.18em] transition-colors ${
                    focus === mode ? 'bg-white text-surface-dark' : 'text-text-secondary'
                  }`}
                >
                  {mode === 'love' ? 'Tình yêu' : 'Công việc'}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {focus === 'love' ? result.adviceLove : result.adviceWork}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-text-secondary">
            <Badge label="Cung A" value={signs.find(s => s.id === first)?.name || ''} color={signs.find(s => s.id === first)?.color} />
            <Badge label="Cung B" value={signs.find(s => s.id === second)?.name || ''} color={signs.find(s => s.id === second)?.color} />
            <Badge label="Nguyên tố A" value={elementById[first]} />
            <Badge label="Nguyên tố B" value={elementById[second]} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PickerCard: React.FC<{
  title: string;
  selectedId: string;
  onSelect: (id: string) => void;
}> = ({ title, selectedId, onSelect }) => (
  <div className="glass rounded-[24px] p-3 border border-white/5 space-y-3">
    <div className="flex items-center justify-between">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-white/50">{title}</p>
      <span className="text-[10px] text-text-secondary">Chọn 1/12</span>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {signs.map((s) => {
        const active = s.id === selectedId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`rounded-2xl p-2 flex flex-col items-center gap-1 border text-[11px] font-bold transition-all ${active ? 'border-white/20' : 'border-white/5 hover:border-white/15 hover:bg-white/5'}`}
            style={{
              background: active
                ? `radial-gradient(120% 120% at 50% 35%, ${s.color}24, transparent 60%), rgba(255,255,255,0.04)`
                : 'rgba(255,255,255,0.02)',
              color: active ? s.color : undefined,
              boxShadow: active ? `0 12px 30px ${s.color}30` : undefined,
            }}
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ color: active ? s.color : '#a7b0b7' }}
            >
              {s.icon}
            </span>
            <span className="leading-tight text-center" style={{ color: active ? s.color : undefined }}>{s.name.split(' ')[0]}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const Badge: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color }) => (
  <div className="px-3 py-2 rounded-2xl bg-white/5 border border-white/5">
    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">{label}</p>
    <p className="text-xs font-semibold" style={{ color: color ?? 'inherit' }}>{value}</p>
  </div>
);

export default CompatibilityPage;

