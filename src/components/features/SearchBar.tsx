
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex items-center bg-surface-dark/50 border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 gap-2 sm:gap-3 focus-within:border-primary/50 transition-all group">
        <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary text-lg sm:text-xl">search</span>
        <input 
          type="text" 
          placeholder="Tìm cung hoàng đạo, ngày sinh..." 
          className="bg-transparent border-none outline-none flex-1 text-xs sm:text-sm placeholder:text-text-secondary"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
