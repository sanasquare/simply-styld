import React from 'react';
import { BRAND_LOGO } from '../data/mockData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#F7F2E9] mt-16 px-4 sm:px-6 pt-12 pb-24 md:pb-12 border-t border-[#D8C8AE]/50 flex flex-col items-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Brand Insignia */}
        <div className="flex flex-col items-center gap-2 mb-3">
          <div className="w-14 h-14 rounded-full border border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden flex items-center justify-center shadow-sm">
            <img
              src={BRAND_LOGO}
              alt="Simply Styld"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
              }}
            />
          </div>
          <span className="font-serif font-bold text-lg sm:text-xl uppercase tracking-widest text-[#171513]">
            Simply Styld
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#4c4640] italic font-serif mb-6">
          Everyday styles, simply styled.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#4c4640]">
          <button onClick={() => onNavigate('shop')} className="hover:text-[#745a2f] transition-colors">
            Shop
          </button>
          <button onClick={() => onNavigate('collections')} className="hover:text-[#745a2f] transition-colors">
            Collections
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-[#745a2f] transition-colors">
            About
          </button>
          <button onClick={() => onNavigate('size-guide')} className="hover:text-[#745a2f] transition-colors">
            Size Guide
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#745a2f] transition-colors">
            Contact
          </button>
          <button onClick={() => onNavigate('admin')} className="text-[#745a2f] hover:underline">
            Atelier Admin
          </button>
        </div>

        {/* Boutique Care & Socials */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-8 text-[11px] text-[#4c4640]">
          <span className="text-[#A88A5A] uppercase font-bold tracking-wider">Care:</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#171513] underline-offset-2 hover:underline">
            Shipping
          </button>
          <span className="text-[#D8C8AE]">•</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#171513] underline-offset-2 hover:underline">
            Returns
          </button>
          <span className="text-[#D8C8AE]">•</span>
          <a
            href="https://wa.me/919820145890?text=Hello%20Simply%20Styld"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#171513] underline-offset-2 hover:underline"
          >
            WhatsApp Concierge
          </a>
          <span className="text-[#D8C8AE]">•</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#171513] underline-offset-2 hover:underline"
          >
            Instagram
          </a>
        </div>

        {/* Atelier Coordinates & Copyright */}
        <div className="space-y-1 text-[10px] uppercase tracking-widest text-[#8C827A]">
          <p>42, Heritage Boulevard, Khar West, Mumbai — 400052</p>
          <p>© 2024 Simply Styld Studio. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
