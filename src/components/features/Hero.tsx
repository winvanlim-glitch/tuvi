
import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onStartChart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartChart }) => {
  return (
    <div className="relative h-[400px] lg:h-[500px] rounded-[40px] overflow-hidden bg-surface-dark group shadow-2xl">
      {/* Background */}
      <img 
        src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop" 
        alt="Galaxy Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 group-hover:scale-100 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/40 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 lg:px-16 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 bg-primary/20 border border-primary/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          Năng lượng ngày hôm nay
        </motion.div>
        
        <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tighter">
          Khám phá <br />
          <span className="text-primary">Định mệnh</span> của bạn.
        </h2>
        
        <p className="text-text-secondary text-base lg:text-lg mb-8 max-w-md leading-relaxed">
          Phân tích các hành tinh, giải mã những tín hiệu từ vũ trụ để định hướng cuộc sống thịnh vượng hơn.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartChart}
            className="bg-primary text-background-dark font-black py-4 px-10 rounded-2xl flex items-center gap-2 shadow-[0_15px_35px_rgba(54,226,123,0.3)]"
          >
            <span>Tạo Lá Số Miễn Phí</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            className="glass px-8 py-4 rounded-2xl font-bold border border-white/10"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-1/4 right-20 hidden lg:block animate-bounce duration-1000">
         <div className="size-20 rounded-full glass border border-primary/20 flex items-center justify-center text-primary/40">
            <span className="material-symbols-outlined text-5xl">ac_unit</span>
         </div>
      </div>
    </div>
  );
};

export default Hero;
