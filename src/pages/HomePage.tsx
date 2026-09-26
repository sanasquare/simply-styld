import React from 'react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { BRAND_LOGO } from '../data/mockData';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onNavigate: (path: string, categoryFilter?: Category) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
  wishlistIds,
  onToggleWishlist,
}) => {
  const newArrivals = products.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full bg-[#f8f3ea] px-4 sm:px-6 pt-6 pb-12 sm:pb-16 border-b border-[#D8C8AE]/40">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Brand Emblem Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden shadow-sm mb-4 flex items-center justify-center p-0.5">
            <img
              src={BRAND_LOGO}
              alt="Simply Styld"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
              }}
            />
          </div>

          {/* Decorative Botanical Insignia */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#D8C8AE]"></span>
            <span className="material-symbols-outlined text-[#745a2f] text-sm">spa</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#745a2f] font-semibold">
              The Spring Wardrobe
            </span>
            <span className="material-symbols-outlined text-[#745a2f] text-sm">spa</span>
            <span className="w-8 h-px bg-[#D8C8AE]"></span>
          </div>

          {/* Hero Title Lockup */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#171513] uppercase tracking-tight font-normal leading-tight">
            Everyday Styles,<br />
            <span className="italic font-normal lowercase block mt-1 text-[#745a2f]">
              simply styled.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-[#4c4640] max-w-md mt-3 mb-6 sm:mb-8 font-normal leading-relaxed">
            Effortless artisanal pieces hand-curated for daily ease, quiet poise, and mindful luxury.
          </p>

          {/* Editorial Visual Frame */}
          <div className="relative w-full max-w-xl aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-md mb-6 sm:mb-8 bg-[#f2ede4] group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0-5vS0kfYM_9-CRUzsm1eYE6wg2Md4ymv_VedmZ8fWfayIFcbMiSV4fcY-YBcMEBD_7y_DDFUSLBROkTMPV29wi3SBUAwksyVMScC8ADvAYr1_3iTkUrS2i0NDcP7awffHSaCROMCgSjglWLjhi8G3LsX1kIQlbiR-4D3Psw94fwjNC_Jf2DPGp-GNLj2CE3Z46KaGJmxY5_5ZNrClPHMBKbt5r4QN9jaT8qv-uKpYrfmpQC79hVxCA"
              alt="Artisanal Chanderi Kurti Editorial"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-white">
              <div className="text-left">
                <span className="text-[10px] tracking-widest uppercase opacity-80 block">Collection Edit</span>
                <p className="font-serif text-lg sm:text-2xl font-medium">Chanderi & Raw Silk</p>
              </div>
              <button
                onClick={() => onNavigate('collections')}
                className="text-[10px] sm:text-xs uppercase tracking-wider bg-white/20 hover:bg-white hover:text-[#171513] backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-white transition-all font-medium"
              >
                New Season
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full max-w-md gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full py-3.5 bg-[#171513] text-[#ffffff] text-xs font-semibold uppercase tracking-widest rounded-full text-center shadow-md hover:bg-[#2b2724] active:scale-98 transition-all"
            >
              Shop New Arrivals
            </button>
            <button
              onClick={() => onNavigate('collections')}
              className="w-full py-3.5 bg-[#FCFAF6] text-[#171513] border border-[#D8C8AE] text-xs font-semibold uppercase tracking-widest rounded-full text-center hover:bg-[#EDE4D6] active:scale-98 transition-all"
            >
              Explore Collections
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: NEW ARRIVALS */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#fef9f0]">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-1">
              Handpicked Selections
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171513]">New Arrivals</h2>
            <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm mt-1">
              Fresh styles, thoughtfully selected for your everyday wardrobe.
            </p>
            <div className="w-12 h-px bg-[#D8C8AE] mt-3"></div>
          </div>

          {/* 4-Item Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>

          {/* View Full Catalog Link */}
          <div className="w-full flex justify-center mt-8">
            <button
              onClick={() => onNavigate('shop')}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171513] hover:text-[#745a2f] pb-1 border-b border-[#171513] transition-colors"
            >
              <span>View Full Catalog ({products.length} Pieces)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: SHOP BY CATEGORY */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#f8f3ea] border-y border-[#D8C8AE]/40">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-1">
              Wardrobe Staples
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171513]">Shop By Category</h2>
            <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm mt-1">
              Curated edits shaped for contemporary everyday dressing.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            
            {/* Category: Kurtis */}
            <div
              onClick={() => onNavigate('shop', 'Kurtis')}
              className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-[#f2ede4] shadow-sm flex flex-col justify-end p-3.5 sm:p-4 cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcfrFV9kMkeqteKGc_sTlRwGWmPFdAy0HT5-wvVpmftnegTy5jGRarkbbFLhQfvCvRpTA8zr8gQA_nGtAlGdYpCnw9frN0qswKM00aGOs7X_DTP_FE-WEovSDZe7S2IwUFVLTc4wXSkOUxi6y_o2rVCClcxY538DFb_w9nHGiMrJi7QQj5W80lBa3LbVfj_ilRLjxjeVcHZPeukTi2aPYImh4B9aFN5Qj-1cTr6NbTzYSoX7tThAzlAQ"
                alt="Kurtis Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-[#171513]/20 to-transparent" />
              <div className="relative z-10 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#fedaa4] font-semibold">Essential</span>
                <h3 className="font-serif text-lg sm:text-xl text-white">Kurtis</h3>
                <span className="text-xs text-[#ece8df]">42 Pieces →</span>
              </div>
            </div>

            {/* Category: Dresses */}
            <div
              onClick={() => onNavigate('shop', 'Dresses')}
              className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-[#f2ede4] shadow-sm flex flex-col justify-end p-3.5 sm:p-4 cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5SaYLiKnCNBADX8Xyj4Zksdm5cmfk3h9TaUSqjLTKNR8Nc-BkzOutrHXPIfrRoKsa1kdjhazj05u2eDRlDevW-uYf-zk0unnvgUMqcveuB_Cr_xE11td545QHfs4087hrThPAZCCSv1n7PEd0hv_yfXH2qMTxR5hzc4x8NEmj3fJz2Jw77tqtMHdixiWmM0Qkoh_7QWSF_vHt5t30t3UQsKfF_2KmQD-jdaxgcuhaqxety2davtOQ2Q"
                alt="Dresses Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-[#171513]/20 to-transparent" />
              <div className="relative z-10 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#fedaa4] font-semibold">Flowing</span>
                <h3 className="font-serif text-lg sm:text-xl text-white">Dresses</h3>
                <span className="text-xs text-[#ece8df]">28 Pieces →</span>
              </div>
            </div>

            {/* Category: Co-ords */}
            <div
              onClick={() => onNavigate('shop', 'Co-ords')}
              className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-[#f2ede4] shadow-sm flex flex-col justify-end p-3.5 sm:p-4 cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsYbJPikZc8E4f4yzh6fBCydc7yV69wlIJWSporG-0HDE0LiHq6DCzRMZuJU9uVdq7tWmi-1jxwHnl_HD1NFppdl5bXq4Rq0aRGWjiOdFJKpEm5698fmOTR03o6R25ftQ2umDWM-ZTgJ2Z6dbDgaInuJKbx6QEPh-bIcpLdzyMp2tAZDV-5b2y1L0KtDBv9gEs8eR8S_m3UYk466ngkTLz3Ro4UVPIMlJA1q-60DRtP8t_z3Pawo_Axw"
                alt="Co-ords Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-[#171513]/20 to-transparent" />
              <div className="relative z-10 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#fedaa4] font-semibold">Modern</span>
                <h3 className="font-serif text-lg sm:text-xl text-white">Co-ords</h3>
                <span className="text-xs text-[#ece8df]">19 Pieces →</span>
              </div>
            </div>

            {/* Category: Pakistani Wear */}
            <div
              onClick={() => onNavigate('shop', 'Pakistani Wear')}
              className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-[#f2ede4] shadow-sm flex flex-col justify-end p-3.5 sm:p-4 cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwrEwvM0TOpwkEGNEJKUh4ZZ2dYRF3GnXs5fFofUcDqsufCXo29mFM1YYmIBVRCBdIgX7kOeyTDKexie05LPJVVemdGRArDOvT8qs-7l478AZkH3NcOPknF1AtyRGpyiSoMv3tXxnqWDVjUQbXvl4xpTZ2qZ3EpZKbDiTgZk3GQpKg5KNkH2lCgT998wTWVWFch17PM11xZMI-jKXYDKDXzhrHz433zXd78Xbonqs6ACFUu8x5UpOeBQ"
                alt="Pakistani Wear Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-[#171513]/20 to-transparent" />
              <div className="relative z-10 flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#fedaa4] font-semibold">Artisanal</span>
                <h3 className="font-serif text-lg sm:text-xl text-white">Pakistani Wear</h3>
                <span className="text-xs text-[#ece8df]">34 Pieces →</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: SEASONAL EDIT BANNER */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#fef9f0]">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#171513] text-white p-8 sm:p-12 shadow-lg flex flex-col items-center text-center">
            
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBF9t8FVZkIgDNQnmvXhGPl68ync9ZKV8HhsbH96D7Z9yU0v38-ckH-DE5NGy0JBONhSl-7BzBceF2ppaMliI3wBnWEGqOTagDq9Qaa6DhIixNWqvpMUE88TFvLxqXgrZr4DDYcve4y-nnZXOFiZkndW8fnVn8W7a1N9_wRjDwzBduLArFSbwyFrjrUNzPcW7mfSVkQn9GxeQvut5pbaAxHh9PuwT2RKThxzsRJy3-QG8QUm5wJvbfvPw')`
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#fedaa4] mb-3">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#fedaa4] font-semibold mb-1">
                Curated Season Edit
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Made for Everyday Moments
              </h2>
              <p className="text-xs sm:text-sm text-[#ece8df] max-w-sm mt-2 mb-6 font-light leading-relaxed">
                Easy silhouettes, beautiful details, and styles you’ll reach for again and again.
              </p>
              
              <button
                onClick={() => onNavigate('collections')}
                className="px-7 py-3 bg-[#fedaa4] text-[#171513] text-xs font-semibold uppercase tracking-widest rounded-full shadow hover:bg-[#ffdeac] transition-colors active:scale-95"
              >
                Shop The Collection
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: WHY SIMPLY STYLD */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#f2ede4] border-y border-[#D8C8AE]/50">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-1">
              Our Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171513]">Why Simply Styld</h2>
            <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm mt-1">
              Crafted with quiet intention, worn with graceful ease.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            
            {/* Pillar 1 */}
            <div className="bg-[#FCFAF6] p-5 rounded-xl flex flex-col shadow-xs border border-[#D8C8AE]/40">
              <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] mb-3">
                <span className="material-symbols-outlined text-[20px]">filter_vintage</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-[#171513]">
                Thoughtfully Selected
              </h3>
              <p className="text-xs text-[#4c4640] mt-1.5 leading-relaxed">
                Hand-picked fabrics and timeless cuts that transcend seasonal hype.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#FCFAF6] p-5 rounded-xl flex flex-col shadow-xs border border-[#D8C8AE]/40">
              <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] mb-3">
                <span className="material-symbols-outlined text-[20px]">clock_loader_40</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-[#171513]">
                Everyday Comfort
              </h3>
              <p className="text-xs text-[#4c4640] mt-1.5 leading-relaxed">
                Breathable cottons, pure mulmul, and light silks made for warm Indian days.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#FCFAF6] p-5 rounded-xl flex flex-col shadow-xs border border-[#D8C8AE]/40">
              <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] mb-3">
                <span className="material-symbols-outlined text-[20px]">checkroom</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-[#171513]">
                Easy Styling
              </h3>
              <p className="text-xs text-[#4c4640] mt-1.5 leading-relaxed">
                Versatile separates that transition effortlessly from office to sunset tea.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#FCFAF6] p-5 rounded-xl flex flex-col shadow-xs border border-[#D8C8AE]/40">
              <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] mb-3">
                <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-[#171513]">
                Personal Touch
              </h3>
              <p className="text-xs text-[#4c4640] mt-1.5 leading-relaxed">
                Direct styling assistance on WhatsApp and bespoke custom sizing advice.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: INSTAGRAM COMMUNITY */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#fef9f0]">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-1.5 text-[#745a2f] mb-1">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold">
                Follow Along
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171513]">@simplystyld</h2>
            <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm mt-1">
              More styles, new arrivals, and everyday inspiration from our atelier community.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCA6G1dJrqwHW6LTUbg4X63NJqn4YcH8b52InlxsyYd-hLS1o2IOlMJn0v7F8IurB3ItCutQf3lmsee_raPqg3NFa6Ax4ft8UbxKU5dOxY9VaV_ZeG9PVIGlC8hM_OOc0LnIOIZoJD0LInIcn-8H0fapYfRkIvSYKnuYwhKaXVT9SfgLpTXmEfW_pPFx7dYcO4dwHJQeN3zDwDeiWDfC23jngFlu_pqbMHcOqImyvgeEfG2SciyIeMFfg',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBJetvTyNV5e6NIqnDsBoU0SrZ_x28HEUGBeROEub_W3xi_sTLi8pxrR0iNg-avZg1HEzfs4da5bm00qLyYTmTrszUJ-B0MUwbvF40vAR8i8A2bkeJFz2IFDGXogXIV8nu0Dc6iku6zJBZHaISMObORSrMhsqO-aWbj8abIfMJCWQfMNU6Y7XEw51X6uem9ouJmfqNMtre0YbiNwr-SafbUFGS8Ud8WFl0ANGjmaJ3DTxrX0y41VS-C9g',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBYVh-7-fxN7OxLLd3QkQylB7-9SXafTr47dni8J_WzLhdnRpL0lO3bHGiDPjZgp5QADNRJSOOjNa8O7TG-tvuHWahbnsZ-M65nh2HRlyg2sIsplEeneopm90ro2RBkGVi9UUz-1ZyPkEiFOo_d6AAzFsQ2F_A6ND8vOed8JHfmqYuSdP5DgMt1rx7HIuwmeIqkM1-pHRPaxvFVJqaEZCLjGuadV6WRlur4FaJJes8PZ7hpETBxXOHr9Q',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmpqkWbs0jY5ygs_qzwvEg943CJKz0kTP2L1LlQwuz99LqUT5A-zA6JXwp3oSW3gGwhUor0J-lNwvS90xKGs74cEVoBZ0dDFrSmn6dNJiN7n7I6uOxUnKz-QT8Kl_sRO689oGNwBedtDzvIXbxbdJ1FQ_WE7uc66oqFa7VIBZpRPRBOShhgDVY7tyw5JI0neRCndpcQZZJcvS3l0gYHfetCQ142d7BZ0Ljb_rVvWx73TNlf2fJg0cyQ',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCZn6L5Z1sNvAXMv_RK3N9RPaH0PSOcEt8utOaHajlG7CYxxTapdjlmd3UlVvqyixQG2Wf63L0HZ-enz8pYJ65FCUvUhnG4SvOUsDO9JhZaNB94E-BxRg8dUdXW0ijnOkw1eibf78juOB0jxGvL1HTTf3ffeZ_7TP1dyS9TH72lNqI4Rf5cQF1r10vAIY_ZVTuwRi5nhqDQdpsxX0VAIenJv34X-FYo66LYOdeCKR1b2qpTNXn-HjD6SA',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDUkCWAduQn5QYm9LD2RXWMEjBgmpvmZQ6YcpwQH5-YWVbBmQv0JhEGLcv4ZIzr2gvUMYgRjpqUZkm8ZHkAb0IWvbNTuHvaO81DWR6fFjIPiJTwJD4ppnovTSU5u4ymvlSY9CkkmjiZKKZybspJZrjYZX9wHlcyhLikg5AiYVbBA821mM6j8_pn6yFAxLBXs2aXARSjlRjX2BZhSz2hJoQ_L3NhsbE0rVN7mzfq7VzHYcxJ15CgvNUZIA'
            ].map((img, idx) => (
              <a
                key={idx}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-lg overflow-hidden bg-[#f2ede4] shadow-xs group"
              >
                <img
                  src={img}
                  alt={`Instagram drop ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-[#EDE4D6] text-[#171513] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#D8C8AE]/50 transition-colors"
            >
              <span>Follow on Instagram</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#f8f3ea] text-center flex flex-col items-center border-t border-[#D8C8AE]/40">
        <div className="w-12 h-12 rounded-full bg-[#fedaa4]/40 flex items-center justify-center text-[#745a2f] mb-3">
          <span className="material-symbols-outlined text-[24px]">favorite</span>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A88A5A] font-semibold mb-1">
          Your Personal Edit
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#171513]">Find your next favourite.</h2>
        <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm mt-1 mb-6">
          Pieces curated to make getting dressed the easiest, most graceful part of your morning.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="w-full max-w-xs py-3.5 bg-[#171513] text-[#ffffff] text-xs font-semibold uppercase tracking-widest rounded-full text-center shadow-md hover:bg-[#2b2724] active:scale-95 transition-all"
        >
          Shop Now
        </button>
      </section>

    </div>
  );
};
