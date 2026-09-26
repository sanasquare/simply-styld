import React from 'react';

interface BottomTabBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  cartCount: number;
  wishlistCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentPath,
  onNavigate,
  cartCount,
  wishlistCount,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F7F2E9]/95 backdrop-blur-xl border-t border-[#D8C8AE]/50 shadow-[0_-4px_16px_rgba(23,21,19,0.04)]">
      <div className="flex justify-around items-center h-16 px-1">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors ${
            currentPath === 'home' ? 'text-[#171513] font-bold' : 'text-[#8C827A] hover:text-[#171513]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">home</span>
          <span className="text-[10px] uppercase tracking-wider">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors ${
            currentPath === 'shop' ? 'text-[#171513] font-bold' : 'text-[#8C827A] hover:text-[#171513]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">grid_view</span>
          <span className="text-[10px] uppercase tracking-wider">Shop</span>
        </button>

        {/* Edits */}
        <button
          onClick={() => onNavigate('collections')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors ${
            currentPath === 'collections' ? 'text-[#171513] font-bold' : 'text-[#8C827A] hover:text-[#171513]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">auto_awesome</span>
          <span className="text-[10px] uppercase tracking-wider">Edits</span>
        </button>

        {/* Saved */}
        <button
          onClick={() => onNavigate('wishlist')}
          className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors ${
            currentPath === 'wishlist' ? 'text-[#171513] font-bold' : 'text-[#8C827A] hover:text-[#171513]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">favorite_border</span>
          <span className="text-[10px] uppercase tracking-wider">Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-[#745a2f] text-white text-[8px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Bag */}
        <button
          onClick={() => onNavigate('cart')}
          className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors ${
            currentPath === 'cart' ? 'text-[#171513] font-bold' : 'text-[#8C827A] hover:text-[#171513]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">shopping_bag</span>
          <span className="text-[10px] uppercase tracking-wider">Bag</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-[#171513] text-white text-[8px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
};
