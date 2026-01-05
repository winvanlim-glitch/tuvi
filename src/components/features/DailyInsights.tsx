
import React from 'react';
import { motion } from 'framer-motion';

const DailyInsights: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4">
        {/* Lucky Numbers */}
        <motion.div 
          className="bg-background-dark/50 lg:bg-white/5 rounded-3xl p-5 border border-white/5 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined">casino</span>
          </div>
          <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Con số may mắn</span>
          <div className="text-2xl font-black mt-1 tracking-tighter">08, 24, 77</div>
        </motion.div>

        {/* Lucky Color */}
        <motion.div 
          className="bg-background-dark/50 lg:bg-white/5 rounded-3xl p-5 border border-white/5 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="size-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <span className="material-symbols-outlined">palette</span>
          </div>
          <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Màu sắc chủ đạo</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="size-3 rounded-full bg-primary shadow-[0_0_10px_rgba(54,226,123,0.5)]"></div>
            <span className="text-xl font-bold">Xanh Lục</span>
          </div>
        </motion.div>
      </div>

      {/* Feng Shui Direction */}
      <motion.div 
        className="bg-background-dark/50 lg:bg-white/5 rounded-3xl p-6 border border-white/5 group"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
          <span className="material-symbols-outlined text-sm">explore</span>
          Phong Thủy
        </div>
        <h4 className="font-bold text-base mb-2">Hướng xuất hành: Đông Nam</h4>
        <p className="text-text-secondary text-xs leading-relaxed">Mang lại tài lộc và sự hanh thông trong công việc hôm nay.</p>
      </motion.div>
    </div>
  );
};

export default DailyInsights;
