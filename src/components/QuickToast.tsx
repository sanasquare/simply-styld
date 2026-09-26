import React from 'react';

interface QuickToastProps {
  message: string | null;
  icon?: string;
}

export const QuickToast: React.FC<QuickToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 inset-x-4 z-50 flex justify-center pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#171513] text-[#ffffff] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-[#D8C8AE]/30 backdrop-blur-md">
        <span className="material-symbols-outlined text-[18px] text-[#fedaa4]">{icon}</span>
        <span className="text-xs uppercase tracking-wider font-medium">{message}</span>
      </div>
    </div>
  );
};
