'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FocusTab } from '@/hooks/useTarotDraw';

type TarotAdviceTabsProps = {
  activeTab: FocusTab;
  onTabChange: (tab: FocusTab) => void;
};

const tabs: { id: FocusTab; label: string; icon: string }[] = [
  { id: 'love', label: 'Tình yêu', icon: 'favorite' },
  { id: 'work', label: 'Công việc', icon: 'work' },
  { id: 'finance', label: 'Tài chính', icon: 'account_balance_wallet' },
  { id: 'health', label: 'Sức khỏe', icon: 'health_and_safety' },
];

const TarotAdviceTabs: React.FC<TarotAdviceTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-white/5 p-1 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-1.5 ${
            activeTab === tab.id ? 'text-surface-dark' : 'text-text-secondary hover:text-white/80'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-2xl bg-white"
              initial={false}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 material-symbols-outlined text-sm sm:text-base ${activeTab === tab.id ? '' : 'opacity-70'}`}>
            {tab.icon}
          </span>
          <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TarotAdviceTabs;

