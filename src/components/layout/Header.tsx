
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="size-8 sm:size-9 lg:size-10 rounded-full bg-surface-dark flex items-center justify-center text-primary shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-lg sm:text-xl">auto_awesome</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight">Tử Vi VN</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/15 text-primary border border-primary/30">
              AI
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="text-text-secondary hover:text-white transition-colors relative" aria-label="Notifications">
            <span className="material-symbols-outlined text-lg sm:text-xl">notifications</span>
            <span className="absolute top-0 right-0 size-1.5 sm:size-2 bg-red-500 rounded-full border border-background-dark"></span>
          </button>
          <div className="size-8 sm:size-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px] cursor-pointer">
            <img 
              src="https://picsum.photos/seed/user/100/100" 
              alt="Avatar" 
              className="rounded-full w-full h-full object-cover border-2 border-background-dark"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
