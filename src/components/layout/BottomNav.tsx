'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { id: 'home', label: 'Home', icon: 'home', href: '/' },
    { id: 'chart', label: 'Tử vi', icon: 'auto_awesome', href: '/tu-vi' },
    { id: 'tarot', label: 'Tarot', icon: 'style', href: '/tarot' },
    { id: 'zodiac', label: 'Cung mệnh', icon: 'nightlight', href: '/cung-hoang-dao' },
    { id: 'compatibility', label: 'Tương hợp', icon: 'favorite', href: '/tuong-hop' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none">
      <nav className="max-w-md w-full glass rounded-3xl h-16 flex items-center justify-between px-2 shadow-2xl pointer-events-auto overflow-hidden">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-1 flex-1 min-w-0 transition-all duration-300 relative group`}
            >
              <span className={`material-symbols-outlined text-[24px] transition-all duration-300 ${active ? 'text-primary fill-1 scale-110' : 'text-text-secondary group-hover:text-white'
                }`}>
                {tab.icon}
              </span>
              <span className={`text-[9px] font-bold transition-all ${active ? 'text-primary' : 'text-text-secondary group-hover:text-white'
                }`}>
                {tab.label}
              </span>

              {active && (
                <div className="absolute -bottom-3 size-1 bg-primary rounded-full shadow-[0_0_10px_#36e27b]"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
