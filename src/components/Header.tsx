import React from 'react';
import { BRAND_LOGO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  pageTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenDrawer,
  onOpenSearch,
  pageTitle
}) => {
  const { user, profile, signOut, openAuthModal } = useAuth();
  const isHome = currentPath === 'home';
  const isAdmin = currentPath === 'admin';

  return (
    <header className="fixed top-0 w-full z-40 bg-[#F7F2E9]/95 backdrop-blur-xl border-b border-[#D8C8AE]/50 shadow-[0_1px_8px_rgba(23,21,19,0.03)] transition-all">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: Menu / Back + Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isHome ? (
            <button
              onClick={onOpenDrawer}
              aria-label="Open Navigation Menu"
              className="w-10 h-10 flex items-center justify-center text-[#1d1c16] hover:text-[#745a2f] transition-colors rounded-lg hover:bg-[#ece8df]/60"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              aria-label="Back to Home"
              className="w-10 h-10 flex items-center justify-center text-[#1d1c16] hover:text-[#745a2f] transition-colors rounded-lg hover:bg-[#ece8df]/60"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
          )}

          {/* Brand Logo & Name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D8C8AE] overflow-hidden bg-[#FAF6ED] flex items-center justify-center shadow-xs shrink-0 group-hover:border-[#A88A5A] transition-colors">
              <img
                src={BRAND_LOGO}
                alt="Simply Styld"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
                }}
              />
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-[#171513] uppercase block leading-tight group-hover:text-[#745a2f] transition-colors">
                {pageTitle && !isHome ? pageTitle : 'SIMPLY STYLD'}
              </span>
              <span className="text-[9px] tracking-widest text-[#745a2f] uppercase font-medium hidden xs:block">
                Everyday Styles, Simply Styled
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#4c4640]">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#171513] transition-colors py-1 ${isHome ? 'text-[#171513] border-b-2 border-[#171513] font-semibold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className={`hover:text-[#171513] transition-colors py-1 ${currentPath === 'shop' ? 'text-[#171513] border-b-2 border-[#171513] font-semibold' : ''}`}
          >
            Catalog
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className={`hover:text-[#171513] transition-colors py-1 ${currentPath === 'collections' ? 'text-[#171513] border-b-2 border-[#171513] font-semibold' : ''}`}
          >
            Edits
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`hover:text-[#171513] transition-colors py-1 ${currentPath === 'about' ? 'text-[#171513] border-b-2 border-[#171513] font-semibold' : ''}`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('size-guide')}
            className={`hover:text-[#171513] transition-colors py-1 ${currentPath === 'size-guide' ? 'text-[#171513] border-b-2 border-[#171513] font-semibold' : ''}`}
          >
            Size Guide
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`hover:text-[#171513] transition-colors py-1 ${currentPath === 'contact' ? 'text-[#171513] border-b-2 border-[#171513] font-semibold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Admin Atelier Switch */}
          <button
            onClick={() => onNavigate(isAdmin ? 'home' : 'admin')}
            aria-label="Atelier Admin"
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all hidden sm:flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-[#171513] text-[#FAF7F0]'
                : 'bg-[#EDE4D6] text-[#745a2f] hover:bg-[#D8C8AE]/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isAdmin ? 'Store View' : 'Atelier Admin'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Catalog"
            className="w-10 h-10 flex items-center justify-center text-[#1d1c16] hover:text-[#745a2f] transition-colors rounded-lg hover:bg-[#ece8df]/60"
          >
            <span className="material-symbols-outlined text-[21px]">search</span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => onNavigate('wishlist')}
            aria-label="Saved Wishlist"
            className="relative w-10 h-10 flex items-center justify-center text-[#1d1c16] hover:text-[#745a2f] transition-colors rounded-lg hover:bg-[#ece8df]/60"
          >
            <span className="material-symbols-outlined text-[21px]">favorite_border</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#745a2f] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon */}
          <button
            onClick={() => onNavigate('cart')}
            aria-label="Shopping Bag"
            className="relative w-10 h-10 flex items-center justify-center text-[#1d1c16] hover:text-[#745a2f] transition-colors rounded-lg hover:bg-[#ece8df]/60"
          >
            <span className="material-symbols-outlined text-[21px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#171513] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account Profile / Sign In */}
          {user ? (
            <div className="relative group">
              <button
                className="w-9 h-9 rounded-full bg-[#EDE4D6] border border-[#D8C8AE] text-[#745a2f] font-serif font-bold text-xs flex items-center justify-center hover:bg-[#D8C8AE]/60 transition-colors"
                title={user.email}
              >
                {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#FCFAF6] border border-[#D8C8AE] rounded-xl shadow-xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-[#D8C8AE]/40">
                  <p className="font-semibold text-[#171513] truncate">{profile?.fullName || 'Boutique Member'}</p>
                  <p className="text-[10px] text-[#8C827A] truncate">{user.email}</p>
                  {profile?.role === 'admin' && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#171513] text-white text-[9px] uppercase font-bold tracking-wider">
                      Atelier Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onNavigate('cart')}
                  className="w-full text-left px-3 py-2 text-[#4c4640] hover:bg-[#f2ede4] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="w-full text-left px-3 py-2 text-[#4c4640] hover:bg-[#f2ede4] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>Saved Pieces</span>
                </button>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-[#D8C8AE]/30 mt-1"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-2.5 py-1.5 rounded-lg border border-[#D8C8AE] bg-[#FCFAF6] text-[#745a2f] hover:bg-[#171513] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="hidden xs:inline">Sign In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
