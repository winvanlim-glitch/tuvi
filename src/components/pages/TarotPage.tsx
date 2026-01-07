'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TarotCard = {
  id: string;
  name: string;
  keyword: string;
  vibe: string;
  adviceLove: string;
  adviceWork: string;
};

const dailyDeck: TarotCard[] = [
  {
    id: 'the-sun',
    name: 'The Sun',
    keyword: 'Lạc quan – Rõ ràng – Thành tựu',
    vibe: 'Một ngày thích hợp để bước ra ánh sáng, nói thẳng điều bạn tin vào.',
    adviceLove: 'Đừng giấu cảm xúc tích cực. Một lời khen, một cử chỉ ấm áp hôm nay có thể làm rõ mối quan hệ của bạn hơn rất nhiều.',
    adviceWork: 'Chọn 1 việc quan trọng và “show” bản thân tốt nhất. Hãy trình bày ý tưởng, xin feedback hoặc chốt deal.',
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    keyword: 'Trực giác – Mơ hồ – Tiềm thức',
    vibe: 'Không phải điều gì hôm nay cũng rõ ràng, nhưng trực giác của bạn đang rất nhạy.',
    adviceLove: 'Nếu thấy bất an, hãy hỏi nhẹ nhàng thay vì suy diễn một mình. Đặt câu hỏi mở để hiểu người kia hơn.',
    adviceWork: 'Tránh ký kết lớn nếu còn lăn tăn. Tập trung thu thập thêm thông tin và lắng nghe cảm giác bên trong.',
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    keyword: 'Chiêm nghiệm – Tĩnh lặng – Tự hiểu mình',
    vibe: 'Đây là ngày phù hợp để chậm lại, soi chiếu bên trong và sắp xếp lại suy nghĩ.',
    adviceLove: 'Dành một chút không gian cho riêng bạn. Khi đã rõ mình cần gì, bạn sẽ giao tiếp với người thương dễ hơn.',
    adviceWork: 'Ưu tiên làm việc một mình, dọn dẹp to-do, tài liệu và chiến lược. Các ý tưởng sâu sắc sẽ đến khi bạn bớt ồn.',
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    keyword: 'Cơ hội – Vòng xoay – Thay đổi',
    vibe: 'Một vòng xoay mới đang tới, có thể mang theo cơ hội bất ngờ.',
    adviceLove: 'Mở lòng với những kết nối mới hoặc cách tương tác mới trong mối quan hệ hiện tại. Đừng đóng khung mọi thứ “như cũ”.',
    adviceWork: 'Để ý những lời mời, email, tin nhắn tưởng nhỏ nhưng có thể mở ra hướng đi khác. Chuẩn bị sẵn tinh thần linh hoạt.',
  },
  {
    id: 'strength',
    name: 'Strength',
    keyword: 'Can đảm – Kiên nhẫn – Nội lực',
    vibe: 'Sức mạnh của bạn hôm nay nằm ở sự điềm tĩnh, không phải ở việc cố thắng.',
    adviceLove: 'Thay vì phản ứng phòng thủ, hãy chọn lắng nghe và ôm trọn cả điểm yếu của mình lẫn của đối phương.',
    adviceWork: 'Đừng để áp lực khiến bạn tự công kích bản thân. Bước từng việc nhỏ, bền bỉ – đó là sức mạnh thật.',
  },
];

const shuffleOnce = () => Math.random() - 0.5;

const TarotPage: React.FC = () => {
  const [hasDrawn, setHasDrawn] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [focus, setFocus] = useState<'love' | 'work'>('love');
  const [isShuffling, setIsShuffling] = useState(false);

  const deck = useMemo(() => [...dailyDeck].sort(shuffleOnce), []);
  const activeCard = deck[cardIndex];

  const handleDraw = () => {
    setIsShuffling(true);
    setFocus('love');
    // hiệu ứng shuffle ngắn rồi lấy random index
    setTimeout(() => {
      const idx = Math.floor(Math.random() * deck.length);
      setCardIndex(idx);
      setHasDrawn(true);
      setIsShuffling(false);
    }, 700);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <header className="space-y-2 max-w-xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-text-secondary">Trải bài tarot</p>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Thông điệp Tarot hôm nay</h1>
        <p className="text-text-secondary text-sm lg:text-base">
          Hít sâu, nghĩ về điều bạn đang băn khoăn, rồi bốc 1 lá bài. Hãy xem vũ trụ muốn gửi đến bạn điều gì.
        </p>
      </header>

      <div className="glass rounded-[32px] p-4 lg:p-5 border border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Khu vực lá bài */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={hasDrawn ? activeCard.id : isShuffling ? 'shuffling' : 'back'}
              initial={{ opacity: 0, y: 16, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -16, rotateX: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-40 h-64 lg:w-44 lg:h-72 rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1b1f26] to-[#05070a] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden"
            >
              {/* viền phát sáng nhẹ */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[1px] rounded-[22px] bg-gradient-to-br from-white/5 via-white/0 to-white/10" />
              </div>

              {hasDrawn && !isShuffling ? (
                <div className="relative z-10 px-3 text-center space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/70">Hôm nay của bạn</p>
                  <h2 className="text-lg font-bold">{activeCard.name}</h2>
                  <p className="text-[11px] text-primary/80 font-semibold leading-snug">{activeCard.keyword}</p>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-4xl text-primary">style</span>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60">
                    Bốc 1 lá
                  </p>
                </div>
              )}

              {/* hiệu ứng shuffle */}
              {isShuffling && (
                <motion.div
                  className="absolute inset-0 rounded-[24px] border border-primary/40"
                  initial={{ rotate: -6, opacity: 0 }}
                  animate={{ rotate: [ -6, 6, -4, 4, 0 ], opacity: [0, 1, 1, 1, 0.8 ] }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.96 }}
            disabled={isShuffling}
            onClick={handleDraw}
            className="mt-1 px-6 py-3 rounded-3xl bg-primary text-surface-dark text-sm font-black uppercase tracking-[0.18em] shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {hasDrawn ? 'Bốc lại 1 lá' : 'Bốc bài'}
          </motion.button>

          <p className="text-[11px] text-text-secondary max-w-xs text-center">
            Mỗi lần bốc là một thông điệp khác nhau. Hãy coi đây là gợi ý để suy ngẫm, không phải “án định số phận”.
          </p>
        </div>

        {/* Khu vực diễn giải */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={hasDrawn ? activeCard.id : 'placeholder'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <p className="text-xs font-black uppercase tracking-[0.25em] text-text-secondary">
                {hasDrawn ? 'Thông điệp chính' : 'Hướng dẫn'}
              </p>
              {hasDrawn ? (
                <>
                  <p className="text-base lg:text-lg text-white leading-relaxed">
                    {activeCard.vibe}
                  </p>
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
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {focus === 'love' ? activeCard.adviceLove : activeCard.adviceWork}
                  </p>
                </>
              ) : (
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>1. Hít sâu 3 lần, nghĩ về câu hỏi hoặc chủ đề bạn muốn nhận gợi ý.</p>
                  <p>2. Khi cảm thấy sẵn sàng, nhấn nút <span className="font-semibold text-white">“Bốc bài”</span>.</p>
                  <p>3. Đọc thông điệp chung, sau đó chuyển tab <span className="font-semibold text-white">Tình yêu</span> hoặc <span className="font-semibold text-white">Công việc</span> để xem gợi ý cụ thể.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TarotPage;
