
import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onStartChart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartChart }) => {
  return (
    <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] xl:h-[480px] rounded-2xl lg:rounded-3xl overflow-hidden bg-surface-dark group shadow-xl">
      {/* Background */}
      <img 
        src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop" 
        alt="Galaxy Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 group-hover:scale-100 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/40 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 lg:px-8 xl:px-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-3 sm:mb-4 lg:mb-5 bg-primary/20 border border-primary/30 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 sm:gap-2"
        >
          <span className="material-symbols-outlined text-xs sm:text-sm">auto_awesome</span>
          Trợ lý tử vi AI
        </motion.div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.1] mb-3 sm:mb-4 lg:mb-5 tracking-tighter">
          Khám phá <br />
          <span className="text-primary">Định mệnh</span> của bạn.
        </h1>
        
        <p className="text-text-secondary text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-7 max-w-md leading-relaxed">
          Phân tích bởi AI tiếng Việt: thu thập dữ liệu sinh, giải mã bản mệnh và gợi ý hành động rõ ràng để bạn định hướng cuộc sống thịnh vượng hơn.
        </p>
        
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartChart}
            className="bg-primary text-background-dark font-black py-2.5 sm:py-3 lg:py-3.5 px-6 sm:px-8 lg:px-10 rounded-xl sm:rounded-2xl flex items-center gap-2 text-sm sm:text-base shadow-[0_10px_25px_rgba(54,226,123,0.3)]"
          >
            <span>Tạo Lá Số Miễn Phí</span>
            <span className="material-symbols-outlined text-lg sm:text-xl">arrow_forward</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            className="glass px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-xl sm:rounded-2xl font-bold border border-white/10 text-sm sm:text-base"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-1/4 right-8 sm:right-12 lg:right-16 xl:right-20 hidden lg:block animate-bounce duration-1000">
         <div className="size-16 xl:size-20 rounded-full glass border border-primary/20 flex items-center justify-center text-primary/40">
            <span className="material-symbols-outlined text-4xl xl:text-5xl">ac_unit</span>
         </div>
      </div>
    </div>
  );
};

export default Hero;
