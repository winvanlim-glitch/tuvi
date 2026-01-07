'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawnCard } from '@/hooks/useTarotDraw';

type TarotCardViewProps = {
  card: DrawnCard | null;
  isShuffling: boolean;
  size?: 'sm' | 'md' | 'lg';
  position?: 'past' | 'present' | 'future';
};

const sizeClasses = {
  sm: 'w-28 h-44 sm:w-32 sm:h-48',
  md: 'w-36 h-56 sm:w-40 sm:h-64',
  lg: 'w-40 h-64 sm:w-44 sm:h-72 lg:w-52 lg:h-80',
};

const TarotCardView: React.FC<TarotCardViewProps> = ({ card, isShuffling, size = 'md', position }) => {
  const sizeClass = sizeClasses[size];

  return (
    <motion.div
      key={card ? `${card.card.id}-${card.reversed}` : isShuffling ? 'shuffling' : 'back'}
      initial={{ opacity: 0, y: 20, scale: 0.95, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95, rotateY: 15 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.8,
        duration: 0.5
      }}
      whileHover={card && !isShuffling ? { scale: 1.02, y: -4 } : {}}
      className={`relative ${sizeClass} rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1b1f26] to-[#05070a] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Viền phát sáng nhẹ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-[1px] rounded-[22px] bg-gradient-to-br from-white/5 via-white/0 to-white/10" />
        {card && !isShuffling && (
          <motion.div
            className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        {card && !isShuffling ? (
          <motion.div
            key="card-content"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 px-3 text-center space-y-2"
            style={{
              transform: card.reversed ? 'rotate(180deg)' : 'rotate(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {position && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[9px] font-black uppercase tracking-[0.25em] text-primary/50"
              >
                {position === 'past' ? 'Quá khứ' : position === 'present' ? 'Hiện tại' : 'Tương lai'}
              </motion.p>
            )}
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/70"
            >
              {card.reversed ? 'Ngược' : 'Hôm nay của bạn'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-base sm:text-lg font-bold"
            >
              {card.card.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-[10px] sm:text-[11px] text-primary/80 font-semibold leading-snug"
            >
              {card.card.keyword}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="back-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <motion.span
              animate={isShuffling ? { rotate: [0, 360] } : {}}
              transition={isShuffling ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}}
              className="material-symbols-outlined text-3xl sm:text-4xl text-primary"
            >
              style
            </motion.span>
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-white/60">
              {isShuffling ? 'Đang xáo bài...' : 'Bốc 1 lá'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiệu ứng shuffle */}
      {isShuffling && (
        <motion.div
          className="absolute inset-0 rounded-[24px] border-2 border-primary/40"
          initial={{ rotate: -6, opacity: 0, scale: 1.05 }}
          animate={{ 
            rotate: [-6, 6, -4, 4, 0], 
            opacity: [0, 0.8, 1, 0.8, 0],
            scale: [1.05, 1.1, 1.05, 1.1, 1]
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};

export default TarotCardView;

