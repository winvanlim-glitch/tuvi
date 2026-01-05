
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BlogPost } from '@/types';

const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Giải mã thông điệp lá bài Tarot cho 12 cung hoàng đạo tuần này.',
    category: 'Tarot Tuần Mới',
    time: '2 giờ trước',
    readTime: '5 phút đọc',
    imageUrl: 'https://picsum.photos/seed/tarot/400/300',
    accentColor: 'text-primary'
  },
  {
    id: '2',
    title: 'Sao Thủy nghịch hành: Những điều cần tránh để bình an vô sự.',
    category: 'Sự Kiện Thiên Văn',
    time: '1 ngày trước',
    readTime: '3 phút đọc',
    imageUrl: 'https://picsum.photos/seed/galaxy/401/301',
    accentColor: 'text-purple-400'
  },
  {
    id: '3',
    title: 'Cách sử dụng đá thạch anh tím để thu hút năng lượng tích cực.',
    category: 'Năng Lượng',
    time: '3 ngày trước',
    readTime: '4 phút đọc',
    imageUrl: 'https://picsum.photos/seed/crystal/402/302',
    accentColor: 'text-blue-400'
  }
];

const AstrologyBlog: React.FC = () => {
  // Fix: Explicitly type variants to avoid inference issues
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Fix: Explicitly type variants to ensure 'easeOut' is correctly recognized as an Easing literal
  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
    >
      {posts.map((post) => (
        <motion.div
          key={post.id}
          variants={item}
          className="flex gap-4 lg:gap-6 items-start cursor-pointer group glass p-3 rounded-3xl border border-white/5 hover:border-white/10 transition-colors"
        >
          <div className="size-24 lg:size-28 rounded-2xl overflow-hidden shrink-0 shadow-xl">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="flex-1 pt-1">
            <span className={`${post.accentColor} text-[10px] font-bold uppercase tracking-widest`}>
              {post.category}
            </span>
            <h3 className="text-white font-bold leading-snug mt-1 text-base lg:text-lg group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-text-secondary text-xs mt-2 font-medium">
              {post.time} • {post.readTime}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AstrologyBlog;