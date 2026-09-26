import React from 'react';
import { BRAND_LOGO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPath,
}) => {
  const { user, profile, signOut, openAuthModal } = useAuth();

  const handleItemClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#171513]/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[84vw] max-w-[340px] bg-[#F7F2E9] shadow-[0_12px_32px_-4px_rgba(23,21,19,0.15)] flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-[#D8C8AE]/50 bg-[#F7F2E9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={BRAND_LOGO}
                alt="Simply Styld Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
                }}
              />
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-wider uppercase text-[#171513] block leading-tight">
                Simply Styld
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A88A5A] font-semibold">Atelier</span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="w-10 h-10 flex items-center justify-center text-[#171513] hover:text-[#745a2f] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Links Navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-between">
          <nav className="flex flex-col space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-2">
              Curated Catalog
            </p>

            <button
              onClick={() => handleItemClick('home')}
              className={`flex items-center justify-between py-2.5 text-left font-serif text-lg tracking-wide transition-colors ${
                currentPath === 'home' ? 'text-[#745a2f] font-bold' : 'text-[#171513] hover:text-[#745a2f]'
              }`}
            >
              <span>Home</span>
              <span className="material-symbols-outlined text-sm text-[#A88A5A]">east</span>
            </button>

            <button
              onClick={() => handleItemClick('shop')}
              className={`flex items-center justify-between py-2.5 text-left font-serif text-lg tracking-wide transition-colors ${
                currentPath === 'shop' ? 'text-[#745a2f] font-bold' : 'text-[#171513] hover:text-[#745a2f]'
              }`}
            >
              <span>Shop All</span>
              <span className="material-symbols-outlined text-sm text-[#A88A5A]">east</span>
            </button>

            <button
              onClick={() => handleItemClick('collections')}
              className={`flex items-center justify-between py-2.5 text-left font-serif text-lg tracking-wide transition-colors ${
                currentPath === 'collections' ? 'text-[#745a2f] font-bold' : 'text-[#171513] hover:text-[#745a2f]'
              }`}
            >
              <span>Edits & Collections</span>
              <span className="material-symbols-outlined text-sm text-[#A88A5A]">east</span>
            </button>

            <button
              onClick={() => handleItemClick('wishlist')}
              className={`flex items-center justify-between py-2.5 text-left font-serif text-lg tracking-wide transition-colors ${
                currentPath === 'wishlist' ? 'text-[#745a2f] font-bold' : 'text-[#171513] hover:text-[#745a2f]'
              }`}
            >
              <span>Saved Pieces</span>
              <span className="material-symbols-outlined text-sm text-[#A88A5A]">east</span>
            </button>

            <div className="w-full h-px bg-[#D8C8AE]/50 my-4" />

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-2">
              The Maison
            </p>

            <button
              onClick={() => handleItemClick('about')}
              className={`py-2 text-left text-xs uppercase tracking-widest transition-colors ${
                currentPath === 'about' ? 'text-[#171513] font-bold' : 'text-[#4c4640] hover:text-[#171513]'
              }`}
            >
              About Simply Styld
            </button>

            <button
              onClick={() => handleItemClick('size-guide')}
              className={`py-2 text-left text-xs uppercase tracking-widest transition-colors ${
                currentPath === 'size-guide' ? 'text-[#171513] font-bold' : 'text-[#4c4640] hover:text-[#171513]'
              }`}
            >
              Interactive Size Guide
            </button>

            <button
              onClick={() => handleItemClick('contact')}
              className={`py-2 text-left text-xs uppercase tracking-widest transition-colors ${
                currentPath === 'contact' ? 'text-[#171513] font-bold' : 'text-[#4c4640] hover:text-[#171513]'
              }`}
            >
              Boutique Concierge & Atelier
            </button>

            <div className="w-full h-px bg-[#D8C8AE]/50 my-4" />

            {/* Account Section */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-2">
              Patron Account
            </p>

            {user ? (
              <div className="p-3 bg-[#FCFAF6] rounded-xl border border-[#D8C8AE]/60 mb-2 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EDE4D6] text-[#745a2f] font-bold text-xs flex items-center justify-center">
                    {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-[#171513] truncate">{profile?.fullName || 'Boutique Member'}</p>
                    <p className="text-[10px] text-[#8C827A] truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="w-full text-left text-[11px] text-rose-700 font-semibold hover:underline flex items-center gap-1.5 pt-1 border-t border-[#D8C8AE]/30"
                >
                  <span className="material-symbols-outlined text-[14px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  openAuthModal();
                }}
                className="w-full mb-3 flex items-center justify-center gap-2 p-2.5 rounded-lg border border-[#D8C8AE] bg-[#FCFAF6] text-[#745a2f] font-semibold text-xs uppercase tracking-wider hover:bg-[#171513] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                <span>Sign In / Register</span>
              </button>
            )}

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-2">
              Boutique Management
            </p>

            <button
              onClick={() => handleItemClick('admin')}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#EDE4D6] text-[#171513] hover:bg-[#D8C8AE]/50 transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Store Atelier Console</span>
              </div>
              <span className="text-[10px] text-[#745a2f]">/admin</span>
            </button>
          </nav>

          {/* Bottom quote & WhatsApp quick touch */}
          <div className="pt-4 border-t border-[#D8C8AE]/40 space-y-3">
            <a
              href="https://wa.me/919820145890?text=Hello%20Simply%20Styld"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#745a2f] hover:underline font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Stylist WhatsApp Concierge</span>
            </a>
            <p className="text-[11px] text-[#4c4640] italic font-serif leading-relaxed">
              "Effortless artisanal pieces hand-curated for daily ease, quiet poise, and mindful luxury."
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
