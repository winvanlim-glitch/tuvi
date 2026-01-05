'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TarotCard {
  name: string;
  meaning: string;
  image: string;
  orientation: 'Xuôi' | 'Ngược';
}

const topics = [
  { id: 'love', title: 'Chuyện Tình Cảm', desc: 'Khám phá mối quan hệ và vận mệnh tình duyên của bạn.', icon: 'favorite', color: '#ff4d94', image: '/images/love.jpg' },
  { id: 'career', title: 'Công Việc & Sự Nghiệp', desc: 'Định hướng sự nghiệp và những cơ hội thăng tiến sắp tới.', icon: 'work', color: '#36e27b', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=400&auto=format&fit=crop' },
  { id: 'money', title: 'Tài Chính', desc: 'Phân tích dòng tiền và khả năng thịnh vượng của bạn.', icon: 'payments', color: '#ffd93d', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop' },
];

const tarotCards: TarotCard[] = [
  { name: 'The Magician', meaning: 'Bạn đang có đầy đủ nguồn lực và kỹ năng để biến ước mơ thành hiện thực. Đây là thời điểm tuyệt vời để bắt đầu.', image: 'https://picsum.photos/seed/magician/300/500', orientation: 'Xuôi' },
  { name: 'The Fool', meaning: 'Một hành trình mới đang bắt đầu. Hãy can đảm bước đi dù bạn chưa biết phía trước là gì.', image: 'https://picsum.photos/seed/fool/300/500', orientation: 'Xuôi' },
  { name: 'The Lovers', meaning: 'Sự hòa hợp trong mối quan hệ hoặc một lựa chọn quan trọng từ trái tim đang đến gần.', image: 'https://picsum.photos/seed/lovers/300/500', orientation: 'Xuôi' },
  { name: 'The Star', meaning: 'Hy vọng và sự chữa lành. Vũ trụ đang soi sáng con đường bạn đi.', image: 'https://picsum.photos/seed/star/300/500', orientation: 'Xuôi' },
];

const TarotPage: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('love');
  const [result, setResult] = useState<TarotCard | null>(null);

  const handleShuffleAndDraw = () => {
    setIsShuffling(true);
    setResult(null);

    // Simulate shuffle duration
    setTimeout(() => {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setResult(randomCard);
      setIsShuffling(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[48px] p-8 lg:p-16 text-center bg-gradient-to-br from-[#1e1e2e] to-[#2d2d44] border border-white/5"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0,transparent_70%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="size-20 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
            <span className="material-symbols-outlined text-4xl text-purple-400">style</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter">Hỏi Bài Tarot</h2>
          <p className="max-w-md text-text-secondary leading-relaxed">
            Tập trung vào câu hỏi của bạn và chọn một bộ bài để nhận thông điệp từ vũ trụ.
          </p>
          <div className="mt-8 flex gap-2">
            <span className="material-symbols-outlined text-yellow-400 animate-pulse">star</span>
            <span className="material-symbols-outlined text-purple-400 animate-bounce">auto_awesome</span>
          </div>
        </div>
      </motion.div>

      {/* Topic Selection */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Chọn Chủ Đề</h3>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-black mt-1">3 bộ bài có sẵn</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-4">
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTopic(topic.id)}
              className={`shrink-0 w-72 rounded-[40px] overflow-hidden cursor-pointer border-2 transition-all duration-500 relative group ${selectedTopic === topic.id ? 'border-primary/50 shadow-2xl' : 'border-white/5 opacity-60 hover:opacity-100'
                }`}
            >
              <img src={topic.image} alt={topic.title} className="w-full h-48 object-cover brightness-75 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sm" style={{ color: topic.color }}>{topic.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: topic.color }}>{topic.title.split(' ')[0]}</span>
                </div>
                <h4 className="font-bold text-lg mb-1">{topic.title}</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-2">{topic.desc}</p>
              </div>
              {selectedTopic === topic.id && (
                <div className="absolute top-4 right-4 size-8 rounded-full bg-primary text-background-dark flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">check</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shuffle & Draw Section */}
      <section className="glass rounded-[48px] p-10 border border-white/10 text-center relative overflow-hidden">
        <h3 className="text-2xl font-black mb-8">Rút 1 Lá Bài</h3>

        <div className="relative h-64 mb-10 flex items-center justify-center">
          {/* Animated Cards */}
          <div className="relative flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={isShuffling ? {
                  x: [0, (i - 3) * 100, 0],
                  rotate: [i * 5 - 15, i * 15 - 45, i * 5 - 15],
                  scale: [1, 1.1, 1],
                } : {
                  rotate: (i - 3) * 8,
                  x: (i - 3) * 30,
                }}
                transition={{
                  duration: isShuffling ? 0.8 : 0.5,
                  repeat: isShuffling ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="absolute w-32 h-48 bg-purple-900/40 backdrop-blur-md rounded-2xl border border-purple-400/30 flex items-center justify-center shadow-2xl"
              >
                <span className="material-symbols-outlined text-purple-400/20 text-5xl">auto_awesome</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShuffleAndDraw}
          disabled={isShuffling}
          className={`relative z-10 w-full max-w-sm py-5 font-black rounded-3xl text-sm transition-all shadow-2xl flex items-center justify-center gap-3 ${isShuffling ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-purple-500/20'
            }`}
        >
          <span className={`material-symbols-outlined ${isShuffling ? 'animate-spin' : ''}`}>
            {isShuffling ? 'refresh' : 'style'}
          </span>
          {isShuffling ? 'Đang tráo bài...' : 'Tráo Bài & Rút'}
        </motion.button>
        <p className="mt-6 text-xs text-text-secondary opacity-60">Hãy hít thở sâu và tập trung vào vấn đề của bạn.</p>
      </section>

      {/* Result Display */}
      <AnimatePresence>
        {result && !isShuffling && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold tracking-tight">Kết Quả Rút Bài</h3>
              <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div className="glass rounded-[48px] p-8 lg:p-10 border border-primary/20 flex flex-col md:flex-row gap-8 items-center md:items-start bg-gradient-to-br from-primary/5 to-transparent">
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-48 h-72 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10 shrink-0"
              >
                <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex-1 space-y-4 pt-2">
                <div>
                  <h4 className="text-3xl font-black mb-1">{result.name}</h4>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">{result.orientation} Chiều</span>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed italic">
                  "{result.meaning}"
                </p>
                <div className="pt-4 flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-background-dark font-black text-xs hover:shadow-lg transition-all">
                    XEM CHI TIẾT <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button onClick={() => setResult(null)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
                    Rút lại
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* History List */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-bold tracking-tight">Lịch Sử Xem</h3>
          <button className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline">Xem tất cả</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Tình yêu tháng 11', meta: '3 lá bài • Hôm qua', icon: 'favorite', color: 'text-pink-400' },
            { title: 'Định hướng sự nghiệp', meta: 'Celtic Cross • 2 ngày trước', icon: 'work', color: 'text-primary' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="glass rounded-3xl p-5 border border-white/5 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                </div>
                <div>
                  <h5 className="font-bold group-hover:text-primary transition-colors">{item.title}</h5>
                  <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mt-0.5">{item.meta}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-white">chevron_right</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TarotPage;
