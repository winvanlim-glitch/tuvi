
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ZodiacSign } from '@/types';

export const signs: ZodiacSign[] = [
  { id: '1', name: 'Bạch Dương', icon: 'wb_sunny', color: '#FF4D4D' },
  { id: '2', name: 'Kim Ngưu', icon: 'pets', color: '#36E27B' },
  { id: '3', name: 'Song Tử', icon: 'group', color: '#4D94FF' },
  { id: '4', name: 'Cự Giải', icon: 'nightlight', color: '#FFD93D' },
  { id: '5', name: 'Sư Tử', icon: 'emoji_nature', color: '#FF8C32' },
  { id: '6', name: 'Xử Nữ', icon: 'spa', color: '#A78BFA' },
  { id: '7', name: 'Thiên Bình', icon: 'balance', color: '#F472B6' },
  { id: '8', name: 'Bọ Cạp', icon: 'scuba_diving', color: '#EF4444' },
  { id: '9', name: 'Nhân Mã', icon: 'near_me', color: '#8B5CF6' },
  { id: '10', name: 'Ma Kết', icon: 'terrain', color: '#10B981' },
  { id: '11', name: 'Bảo Bình', icon: 'waves', color: '#06B6D4' },
  { id: '12', name: 'Song Ngư', icon: 'sailing', color: '#3B82F6' },
];

const ZodiacGrid: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState('1');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {signs.map((sign) => (
        <motion.div
          key={sign.id}
          variants={item}
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedId(sign.id)}
          className={`cursor-pointer rounded-[32px] p-4 flex flex-col items-center gap-3 transition-all duration-300 border ${selectedId === sign.id
              ? 'bg-surface-dark border-primary/50 shadow-2xl'
              : 'bg-surface-dark/40 border-white/5 hover:border-white/20'
            }`}
          style={{
            boxShadow: selectedId === sign.id ? `0 20px 40px ${sign.color}20` : 'none'
          }}
        >
          <div
            className={`size-14 lg:size-16 rounded-full flex items-center justify-center transition-all duration-500`}
            style={{
              backgroundColor: selectedId === sign.id ? sign.color : 'rgba(17, 23, 20, 1)',
              color: selectedId === sign.id ? '#111714' : 'rgba(255, 255, 255, 0.4)',
              boxShadow: selectedId === sign.id ? `0 0 20px ${sign.color}40` : 'none'
            }}
          >
            <span className="material-symbols-outlined text-3xl">{sign.icon}</span>
          </div>
          <span
            className={`text-xs lg:text-sm font-bold text-center transition-colors`}
            style={{ color: selectedId === sign.id ? sign.color : '#9eb7a8' }}
          >
            {sign.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ZodiacGrid;
