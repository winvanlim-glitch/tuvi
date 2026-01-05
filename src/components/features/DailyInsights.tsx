
import React from 'react';
import { motion } from 'framer-motion';

const DailyInsights: React.FC = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-2 sm:gap-3 lg:gap-4">
        {/* Lucky Numbers */}
        <motion.div 
          className="bg-background-dark/50 lg:bg-white/5 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 border border-white/5 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="size-8 sm:size-9 lg:size-10 rounded-lg sm:rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2 sm:mb-3 lg:mb-4">
            <span className="material-symbols-outlined text-base sm:text-lg lg:text-xl">casino</span>
          </div>
          <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Con số may mắn</span>
          <div className="text-lg sm:text-xl lg:text-2xl font-black mt-1 tracking-tighter">08, 24, 77</div>
        </motion.div>

        {/* Lucky Color */}
        <motion.div 
          className="bg-background-dark/50 lg:bg-white/5 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 border border-white/5 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="size-8 sm:size-9 lg:size-10 rounded-lg sm:rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2 sm:mb-3 lg:mb-4">
            <span className="material-symbols-outlined text-base sm:text-lg lg:text-xl">palette</span>
          </div>
          <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Màu sắc chủ đạo</span>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
            <div className="size-2.5 sm:size-3 rounded-full bg-primary shadow-[0_0_8px_rgba(54,226,123,0.5)]"></div>
            <span className="text-base sm:text-lg lg:text-xl font-bold">Xanh Lục</span>
          </div>
        </motion.div>
      </div>

      {/* Feng Shui Direction */}
      <motion.div 
        className="bg-background-dark/50 lg:bg-white/5 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/5 group"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 text-primary text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3">
          <span className="material-symbols-outlined text-xs sm:text-sm">explore</span>
          Phong Thủy
        </div>
        <h4 className="font-bold text-sm sm:text-base mb-1.5 sm:mb-2">Hướng xuất hành: Đông Nam</h4>
        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">Mang lại tài lộc và sự hanh thông trong công việc hôm nay.</p>
      </motion.div>
    </div>
  );
};

export default DailyInsights;
