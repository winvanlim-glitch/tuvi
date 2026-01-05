
import React from 'react';
import { motion } from 'framer-motion';
import { ZodiacSign } from '@/types';

const signs: ZodiacSign[] = [
  { id: '1', name: 'Bạch Dương', icon: 'wb_sunny', color: 'primary' },
  { id: '2', name: 'Kim Ngưu', icon: 'pets', color: 'gray' },
  { id: '3', name: 'Song Tử', icon: 'group', color: 'gray' },
  { id: '4', name: 'Cự Giải', icon: 'nightlight', color: 'gray' },
  { id: '5', name: 'Sư Tử', icon: 'emoji_nature', color: 'gray' },
  { id: '6', name: 'Xử Nữ', icon: 'spa', color: 'gray' },
];

const ZodiacSlider: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState('1');

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 snap-x">
      {signs.map((sign) => (
        <div
          key={sign.id}
          className="snap-start flex flex-col items-center gap-3 shrink-0 cursor-pointer"
          onClick={() => setSelectedId(sign.id)}
        >
          <motion.div
            whileHover={{ y: -5 }}
            className={`size-16 rounded-full flex items-center justify-center transition-all ${selectedId === sign.id
                ? 'bg-primary text-background-dark ring-4 ring-primary/20 shadow-lg shadow-primary/20'
                : 'bg-surface-dark text-white/50 border border-white/10'
              }`}
          >
            <span className="material-symbols-outlined text-3xl">{sign.icon}</span>
          </motion.div>
          <span className={`text-xs font-semibold ${selectedId === sign.id ? 'text-white' : 'text-text-secondary'}`}>
            {sign.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ZodiacSlider;
