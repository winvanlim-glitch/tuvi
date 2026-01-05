'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: 'home', href: '/' },
    { id: 'chart', label: 'Lá số Tử vi', icon: 'auto_awesome', href: '/tu-vi' },
    { id: 'tarot', label: 'Trải bài Tarot', icon: 'style', href: '/tarot' },
    { id: 'signs', label: '12 Cung mệnh', icon: 'language', href: '/cung-hoang-dao' },
    { id: 'compatibility', label: 'Độ tương hợp', icon: 'favorite', href: '/tuong-hop' },
    { id: 'settings', label: 'Cài đặt', icon: 'settings', href: '/cai-dat' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col glass rounded-[40px] border border-white/5 p-6 shadow-2xl"
    >
      <div className="flex items-center gap-3 px-4 mb-10 shrink-0">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="size-12 rounded-2xl bg-primary flex items-center justify-center text-background-dark shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-3xl">flare</span>
        </motion.div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter leading-none">Astrology</h1>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Vietnam</span>
        </div>
      </div>

      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2 mb-10"
      >
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              passHref
            >
              <motion.div
                variants={itemVariants}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative group ${active
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
              >
                <span className={`material-symbols-outlined transition-transform duration-300 group-hover:scale-110 ${active ? 'fill-1' : ''
                  }`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{item.label}</span>

                {active && (
                  <motion.div
                    layoutId="activeSide"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="shrink-0"
      >
        <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <img src="https://picsum.photos/seed/pcuser/100/100" className="size-10 rounded-full border border-primary/30" alt="User" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">An Nguyễn</p>
              <p className="text-[10px] text-text-secondary uppercase">Thành viên Pro</p>
            </div>
          </div>
          <button className="w-full text-[10px] font-bold text-primary uppercase tracking-widest hover:underline text-left">Nâng cấp tài khoản</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
