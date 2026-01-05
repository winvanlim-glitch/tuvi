
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-surface-dark flex items-center justify-center text-primary shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">Astrology VN</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="text-text-secondary hover:text-white transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-background-dark"></span>
          </button>
          <div className="size-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px] cursor-pointer">
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
