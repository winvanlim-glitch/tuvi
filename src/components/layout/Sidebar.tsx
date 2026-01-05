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
      className="flex flex-col glass rounded-2xl lg:rounded-3xl border border-white/5 p-4 sm:p-5 lg:p-6 shadow-xl"
    >
      <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 lg:px-4 mb-6 sm:mb-8 lg:mb-10 shrink-0">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="size-10 sm:size-11 lg:size-12 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center text-background-dark shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-2xl sm:text-2xl lg:text-3xl">flare</span>
        </motion.div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tighter leading-none">Tử Vi</h1>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Vietnam</span>
        </div>
      </div>

      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8 lg:mb-10"
        aria-label="Main navigation"
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
                className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl transition-all relative group ${active
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
              >
                <span className={`material-symbols-outlined text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110 ${active ? 'fill-1' : ''
                  }`}>
                  {item.icon}
                </span>
                <span className="font-bold text-xs sm:text-sm tracking-wide">{item.label}</span>

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
        <div className="p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl sm:rounded-3xl border border-primary/20">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="size-8 sm:size-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl">lightbulb</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs sm:text-sm font-bold mb-1">Mẹo nhanh</p>
              <p className="text-[10px] sm:text-xs text-text-secondary leading-relaxed">
                Khám phá lá số tử vi để hiểu rõ hơn về bản thân và vận mệnh của bạn
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
