'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { majorArcana } from '@/data/tarot/deck';
import { useTarotDraw, DrawMode, FocusTab } from '@/hooks/useTarotDraw';
import TarotCardView from '@/components/tarot/TarotCardView';
import TarotAdviceTabs from '@/components/tarot/TarotAdviceTabs';

const TarotPage: React.FC = () => {
  const [mode, setMode] = useState<DrawMode>('single');
  const {
    drawnCards,
    isShuffling,
    focusTab,
    hasDrawn,
    setFocusTab,
    draw,
    reshuffle,
    getAdvice,
  } = useTarotDraw(majorArcana, mode, true);

  const activeCard = drawnCards[0];
  const isYesNo = mode === 'yesno' && activeCard;
  const yesNoAnswer = activeCard
    ? activeCard.reversed
      ? 'Không'
      : ['The Sun', 'The Star', 'The World', 'The Wheel of Fortune', 'The Lovers'].includes(activeCard.card.name)
      ? 'Có'
      : 'Có thể'
    : null;

    return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2 max-w-xl"
      >
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-text-secondary">Trải bài tarot</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">Thông điệp Tarot hôm nay</h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
          Hít sâu, nghĩ về điều bạn đang băn khoăn, rồi bốc bài. Hãy xem vũ trụ muốn gửi đến bạn điều gì.
        </p>
      </motion.header>

      {/* Mode selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap gap-2 sm:gap-3"
      >
        {(['single', 'three', 'yesno'] as DrawMode[]).map((m, idx) => (
          <motion.button
            key={m}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setMode(m);
              reshuffle();
            }}
            className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] transition-all duration-300 ${
              mode === m
                ? 'bg-primary text-surface-dark shadow-lg shadow-primary/20'
                : 'bg-white/5 text-text-secondary hover:bg-white/10'
            }`}
          >
            {m === 'single' ? '1 lá' : m === 'three' ? '3 lá' : 'Có/Không'}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`glass rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 border border-white/5 ${
          mode === 'three' && hasDrawn
            ? 'flex flex-col gap-4 sm:gap-5 lg:gap-6'
            : 'grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch'
        }`}
      >
        {/* Khu vực lá bài */}
        <div className={`${mode === 'three' && hasDrawn ? 'w-full' : 'lg:col-span-1'} flex flex-col items-center justify-center gap-4 sm:gap-5`}>
          {mode === 'three' && hasDrawn ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {drawnCards.map((card, idx) => (
                <motion.div
                  key={`${card.card.id}-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="shrink-0"
                >
                  <TarotCardView
                    card={card}
                    isShuffling={false}
                    size="sm"
                    position={card.position}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <TarotCardView card={activeCard || null} isShuffling={isShuffling} size="lg" />
          )}

          {/* Yes/No answer */}
          <AnimatePresence>
            {isYesNo && yesNoAnswer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-3xl text-base sm:text-lg font-black uppercase tracking-[0.2em] ${
                  yesNoAnswer === 'Có'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                    : yesNoAnswer === 'Không'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10'
                }`}
              >
                {yesNoAnswer}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={isShuffling}
            onClick={hasDrawn ? reshuffle : draw}
            className="mt-1 px-6 sm:px-8 py-3 sm:py-3.5 rounded-3xl bg-primary text-surface-dark text-xs sm:text-sm font-black uppercase tracking-[0.18em] shadow-2xl shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-primary/40"
          >
            {hasDrawn ? (mode === 'yesno' ? 'Hỏi lại' : 'Bốc lại') : 'Bốc bài'}
          </motion.button>

          <p className="text-[10px] sm:text-[11px] text-text-secondary max-w-xs text-center leading-relaxed px-2">
            {mode === 'yesno'
              ? 'Mỗi lần hỏi là một câu trả lời khác nhau. Hãy tin vào trực giác của mình.'
              : 'Mỗi lần bốc là một thông điệp khác nhau. Hãy coi đây là gợi ý để suy ngẫm, không phải "án định số phận".'}
          </p>
        </div>

        {/* Khu vực diễn giải */}
        <div className={`${mode === 'three' && hasDrawn ? 'w-full' : 'lg:col-span-2'} flex flex-col gap-4 sm:gap-5`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={hasDrawn ? `${activeCard?.card.id}-${focusTab}` : 'placeholder'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-3 sm:space-y-4"
            >
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-text-secondary">
                {hasDrawn ? 'Thông điệp chính' : 'Hướng dẫn'}
              </p>
              {hasDrawn && activeCard ? (
                <>
                  {mode === 'three' ? (
                    <div className="space-y-3 sm:space-y-4">
                      {drawnCards.map((card, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300"
                        >
                          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">
                            {card.position === 'past' ? 'Quá khứ' : card.position === 'present' ? 'Hiện tại' : 'Tương lai'}
                            {card.reversed && ' (Ngược)'}
                          </p>
                          <p className="text-sm sm:text-base text-white font-semibold mb-1">{card.card.name}</p>
                          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                            {card.reversed ? card.card.reversed.vibe : card.card.upright.vibe}
                          </p>
                        </motion.div>
                      ))}
                      <TarotAdviceTabs activeTab={focusTab} onTabChange={setFocusTab} />
                      <motion.p
                        key={focusTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs sm:text-sm text-text-secondary leading-relaxed"
                      >
                        {getAdvice(activeCard, focusTab)}
                      </motion.p>
                    </div>
                  ) : mode === 'yesno' ? (
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                        {activeCard.reversed ? activeCard.card.reversed.vibe : activeCard.card.upright.vibe}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Giải thích</p>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {activeCard.reversed
                            ? activeCard.card.reversed[focusTab]
                            : activeCard.card.upright[focusTab]}
                        </p>
                      </motion.div>
                      <TarotAdviceTabs activeTab={focusTab} onTabChange={setFocusTab} />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                        {activeCard.reversed ? activeCard.card.reversed.vibe : activeCard.card.upright.vibe}
                      </p>
                      <TarotAdviceTabs activeTab={focusTab} onTabChange={setFocusTab} />
                      <motion.p
                        key={focusTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs sm:text-sm text-text-secondary leading-relaxed"
                      >
                        {getAdvice(activeCard, focusTab)}
                      </motion.p>
                    </>
                  )}
                </>
              ) : (
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-text-secondary">
                  {mode === 'three' ? (
                    <>
                      <p>1. Hít sâu 3 lần, nghĩ về câu hỏi hoặc chủ đề bạn muốn nhận gợi ý.</p>
                      <p>2. Khi cảm thấy sẵn sàng, nhấn nút <span className="font-semibold text-white">"Bốc bài"</span>.</p>
                      <p>3. Bạn sẽ nhận được 3 lá bài: <span className="font-semibold text-white">Quá khứ</span>, <span className="font-semibold text-white">Hiện tại</span>, và <span className="font-semibold text-white">Tương lai</span>.</p>
                      <p>4. Đọc thông điệp từ mỗi lá, sau đó chuyển tab để xem gợi ý cụ thể.</p>
                    </>
                  ) : mode === 'yesno' ? (
                    <>
                      <p>1. Hít sâu 3 lần, nghĩ về câu hỏi Có/Không bạn muốn hỏi.</p>
                      <p>2. Khi cảm thấy sẵn sàng, nhấn nút <span className="font-semibold text-white">"Bốc bài"</span>.</p>
                      <p>3. Lá bài sẽ cho bạn câu trả lời và giải thích chi tiết.</p>
                      <p>4. Chuyển tab để xem gợi ý cụ thể cho từng khía cạnh.</p>
                    </>
                  ) : (
                    <>
                      <p>1. Hít sâu 3 lần, nghĩ về câu hỏi hoặc chủ đề bạn muốn nhận gợi ý.</p>
                      <p>2. Khi cảm thấy sẵn sàng, nhấn nút <span className="font-semibold text-white">"Bốc bài"</span>.</p>
                      <p>3. Đọc thông điệp chung, sau đó chuyển tab <span className="font-semibold text-white">Tình yêu</span>, <span className="font-semibold text-white">Công việc</span>, <span className="font-semibold text-white">Tài chính</span>, hoặc <span className="font-semibold text-white">Sức khỏe</span> để xem gợi ý cụ thể.</p>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
        </div>
    );
};

export default TarotPage;
