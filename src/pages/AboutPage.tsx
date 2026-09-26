import React, { useState } from 'react';
import { BRAND_LOGO } from '../data/mockData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [showStylistNote, setShowStylistNote] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 pb-16">
      
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center">
        {/* Brand Emblem Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden shadow-md mb-4 flex items-center justify-center p-0.5">
          <img
            src={BRAND_LOGO}
            alt="Simply Styld Emblem"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
            }}
          />
        </div>

        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#745a2f] font-semibold mb-2">
          Artisanal Ethos
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171513] tracking-tight leading-tight">
          Simply Styled.<br />Simply You.
        </h1>
        <p className="text-xs sm:text-base text-[#4c4640] max-w-xs sm:max-w-md mt-2 font-serif italic">
          Born out of a desire for effortless grace in daily dressing.
        </p>

        {/* Hero Visual Frame */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm bg-[#f2ede4] mt-6 border border-[#D8C8AE]/50">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuX81QG3zkv18LdKF4VLgFOPCzTbcXJ53o5lzfWNRQ3oB-nkUaWcNSpRei02qIh8r-KfGyoqprDwXTwIZMvGYHlTW3FVEMIgUjsr4Po_b3cCXR07B1vc3q8js1RK0NlBNvtHdbHKBDoyhZRnUB-nZEVR6dTh-TYhxpI1nr2_M7RWKU46T29PPKVBCQamm0aDOChrvg_Xq_8bT06Axy7fHZSuUQkbXjWgCA1h_H2xmv-CQ3Xc2acCNZkw"
            alt="The Jaipur Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-between border border-[#D8C8AE]/40">
            <div className="text-left">
              <span className="text-[10px] text-[#745a2f] uppercase tracking-widest font-semibold block">
                Est. 2021
              </span>
              <span className="font-serif text-base sm:text-lg text-[#171513] font-medium">
                The Jaipur Studio
              </span>
            </div>
            <span className="material-symbols-outlined text-[#745a2f] text-[24px]">spa</span>
          </div>
        </div>
      </section>

      {/* Section 1: The Sanctuary */}
      <section className="bg-[#f8f3ea] rounded-2xl p-6 sm:p-8 border border-[#D8C8AE]/50 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#745a2f]"></span>
          <span className="text-[10px] uppercase text-[#745a2f] tracking-widest font-semibold">
            The Sanctuary
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#171513] leading-snug">
          Honoring the subtle beauty of the everyday woman.
        </h2>
        <p className="text-xs sm:text-sm text-[#4c4640] leading-relaxed">
          Simply Styld was created as an antidote to fast-paced trends. We believe mindful clothing should touch the skin like a whisper—crafted from unadulterated natural weaves, cut to provide freedom, and refined enough to carry you from a quiet dawn to celebratory evenings.
        </p>

        {/* 3 Pillars Row */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D8C8AE]/50 text-center">
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#171513]">100%</span>
            <span className="text-[9px] uppercase tracking-wider text-[#8C827A] font-semibold">Natural Fibers</span>
          </div>
          <div className="w-px h-8 bg-[#D8C8AE]/60" />
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#171513]">Zero</span>
            <span className="text-[9px] uppercase tracking-wider text-[#8C827A] font-semibold">Deadstock Waste</span>
          </div>
          <div className="w-px h-8 bg-[#D8C8AE]/60" />
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#171513]">Bespoke</span>
            <span className="text-[9px] uppercase tracking-wider text-[#8C827A] font-semibold">Indian Cuts</span>
          </div>
        </div>
      </section>

      {/* Section 2: Our Evolution (Timeline) */}
      <section className="space-y-4">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
            Our Evolution
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#171513] mt-0.5">
            From Sketch to Silhouette
          </h2>
        </div>

        <div className="space-y-3">
          
          {/* Step 1 */}
          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/50 flex gap-4 items-start shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              01
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#171513]">Small Batch Origins</h3>
              <p className="text-xs text-[#4c4640] mt-1 leading-relaxed">
                Beginning with a single wooden cutting desk and a solitary master tailor, we hand-stitched everyday kurtas for family and close friends who craved non-synthetic luxury.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/50 flex gap-4 items-start shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              02
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#171513]">Direct Weaver Linkages</h3>
              <p className="text-xs text-[#4c4640] mt-1 leading-relaxed">
                We journeyed across Chanderi, Maheshwar, and coastal Bengal to partner directly with generational artisan clusters, reviving slow loom traditions.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/50 flex gap-4 items-start shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              03
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#171513]">The Curated Wardrobe</h3>
              <p className="text-xs text-[#4c4640] mt-1 leading-relaxed">
                Today, Simply Styld delivers capsule wardrobes celebrated worldwide for unpretentious Indian elegance and tactile comfort.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: The Materiality */}
      <section className="bg-[#ece8df] rounded-2xl p-6 sm:p-8 border border-[#D8C8AE]/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
              The Materiality
            </span>
            <h2 className="font-serif text-2xl text-[#171513] mt-0.5">Our Signature Touch</h2>
          </div>
          <span className="material-symbols-outlined text-[#745a2f] text-[26px]">temp_preferences_custom</span>
        </div>

        <p className="text-xs sm:text-sm text-[#4c4640] leading-relaxed">
          Quiet luxury lives in touch, drape, and breathability. We deliberately source fabrics that grow softer with every wash and age gracefully.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          
          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50">
            <span className="material-symbols-outlined text-[#745a2f] text-[20px] mb-1">air</span>
            <h4 className="font-serif text-sm font-semibold text-[#171513]">Cloud Mulmul</h4>
            <p className="text-[11px] text-[#8C827A] mt-0.5">Featherweight cotton that embraces humid afternoons.</p>
          </div>

          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50">
            <span className="material-symbols-outlined text-[#745a2f] text-[20px] mb-1">auto_awesome</span>
            <h4 className="font-serif text-sm font-semibold text-[#171513]">Raw Chanderi</h4>
            <p className="text-[11px] text-[#8C827A] mt-0.5">Subtle crystalline sheen crafted on historic pit looms.</p>
          </div>

          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50">
            <span className="material-symbols-outlined text-[#745a2f] text-[20px] mb-1">grain</span>
            <h4 className="font-serif text-sm font-semibold text-[#171513]">Slub Cottons</h4>
            <p className="text-[11px] text-[#8C827A] mt-0.5">Organic textures celebrating wabi-sabi charm.</p>
          </div>

          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50">
            <span className="material-symbols-outlined text-[#745a2f] text-[20px] mb-1">dry_cleaning</span>
            <h4 className="font-serif text-sm font-semibold text-[#171513]">Linen Blends</h4>
            <p className="text-[11px] text-[#8C827A] mt-0.5">Crisp, structured, and effortless from dusk till dawn.</p>
          </div>

        </div>
      </section>

      {/* Section 4: What We Believe */}
      <section className="space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <span className="w-8 h-px bg-[#745a2f]/40"></span>
            <span className="material-symbols-outlined text-[#745a2f] text-[16px]">stars</span>
            <span className="w-8 h-px bg-[#745a2f]/40"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#171513]">What We Believe</h2>
          <p className="text-xs text-[#4c4640] mt-0.5">Four pillars woven into every stitch</p>
        </div>

        <div className="space-y-3">
          
          <div className="bg-[#FCFAF6] p-5 rounded-xl border border-[#D8C8AE]/50 flex flex-col shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#171513]">Everyday Elegance</h3>
              </div>
              <span className="material-symbols-outlined text-[#745a2f] text-[18px]">eco</span>
            </div>
            <p className="text-xs text-[#4c4640] leading-relaxed">
              Thoughtful cuts crafted to shift seamlessly from quiet morning meetings to sunset gatherings with grace.
            </p>
          </div>

          <div className="bg-[#FCFAF6] p-5 rounded-xl border border-[#D8C8AE]/50 flex flex-col shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#171513]">Comfort First</h3>
              </div>
              <span className="material-symbols-outlined text-[#745a2f] text-[18px]">eco</span>
            </div>
            <p className="text-xs text-[#4c4640] leading-relaxed">
              Tactile fabrics engineered to breathe naturally with your body across seasons, moods, and warm weather.
            </p>
          </div>

          <div className="bg-[#FCFAF6] p-5 rounded-xl border border-[#D8C8AE]/50 flex flex-col shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">recycling</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#171513]">Thoughtful Craft</h3>
              </div>
              <span className="material-symbols-outlined text-[#745a2f] text-[18px]">eco</span>
            </div>
            <p className="text-xs text-[#4c4640] leading-relaxed">
              Controlled small-batch releases that uphold fair wages, respect seasonal pacing, and guarantee zero warehouse dumping.
            </p>
          </div>

          <div className="bg-[#FCFAF6] p-5 rounded-xl border border-[#D8C8AE]/50 flex flex-col shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#171513]">Personal Touch</h3>
              </div>
              <span className="material-symbols-outlined text-[#745a2f] text-[18px]">eco</span>
            </div>
            <p className="text-xs text-[#4c4640] leading-relaxed">
              Direct bespoke consultation, tailored hems, and personalized style pairings dedicated to making you feel genuinely held.
            </p>
          </div>

        </div>
      </section>

      {/* Section 5: Atelier Glimpse (3-Photo Montage) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
              Inside Our Hands
            </span>
            <h2 className="font-serif text-2xl text-[#171513]">Atelier Glimpse</h2>
          </div>
          <span className="text-[10px] text-[#745a2f] uppercase tracking-widest font-semibold">03 Frames</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          
          {/* Main Left Photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xs bg-[#f2ede4] border border-[#D8C8AE]/50">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw0Qn62XgWqv1WEDyYFNuvaelS-Hlerq0XTIzsDipKXFvJP1R5SWCsmhBM_x4Z9Wv6pfxoN9BIrMzfJ082Oug1ICTJXa3iI-BwWCPDAnKO5Tmn86IClgWrYI37DlXceZqCfm2OvJPTB-w3ZMvdTkn5NNHNYhrt6JnfWshiiD3eqZR26vbDXW480wmdndCRlasm63bRjHBmvGTVUN_DfZ1WTcN1PGAZ5Bw0bmZ2Hvqp4Zbve6yCGoXX1w"
              alt="Swatching process"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/90 backdrop-blur-xs rounded-lg">
              <span className="text-[9px] uppercase tracking-wider font-bold text-[#171513] block">Swatching</span>
              <span className="text-[10px] text-[#8C827A]">Pure fiber purity test</span>
            </div>
          </div>

          {/* Right Stacked 2 Photos */}
          <div className="flex flex-col gap-3">
            
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] flex-1 bg-[#f2ede4] border border-[#D8C8AE]/50">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNWPaavgGtuuiOoZlVnOhq52bty1Zo0u1ZuwRwVInD5rxsLbz5VnjssV6nROQkHBDZJfB3jnpve0L8V4cOE3YosPBjS3_jZFzTEGxkekvxmU79vgcvbPJmdCr_YaoCBRF-E5dIxJoiXxJltk0kKg4lqpGwt019IukLN_gGh_DA7YigSEjyTAfRv_y4qm9lG-T4eTYfljWez6HXHubazGJVMCfUkXrWc5F3KP9j-6PA_waHiCLNmjuM9A"
                alt="Needlework"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs rounded-lg">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#171513]">Needlework</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] flex-1 bg-[#f2ede4] border border-[#D8C8AE]/50">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8pzPpG_uvq-ag8Op5emrz8JQXd0gEom53PCUR1nRKDQYjqI7Q6oYsz6j-onLCh1UHVyEpuYqcuYkg1zva5L9PJ8wIK2rM6W3ZMt5aVjbW95sA2wYTDF_D3pF1ImqUJB85sUBeXdi3Fz6RrFS7nWDCMfVTZetk-bqremv3XNwV8lOJu6L89HkEWlnflzzd1Nh9DOrDeR2C0lCJS83x9zQYCbf0kLTd9f364UxQr9TlaVWmQY_FSqxSmQ"
                alt="Muslin Packaging"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs rounded-lg">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#171513]">Muslin Packaging</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section 6: Interactive Stylist Note Toggle */}
      <section className="bg-[#f8f3ea] rounded-2xl p-5 border border-[#D8C8AE]/50 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fedaa4] text-[#795e33] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">format_quote</span>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#171513]">Have a fit query?</h3>
              <p className="text-xs text-[#8C827A]">Speak directly to our head stylist</p>
            </div>
          </div>
          <button
            onClick={() => setShowStylistNote(!showStylistNote)}
            className="w-9 h-9 rounded-full bg-[#FCFAF6] border border-[#D8C8AE] flex items-center justify-center text-[#171513] hover:bg-[#EDE4D6] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showStylistNote ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {showStylistNote && (
          <div className="p-4 bg-[#FCFAF6] rounded-xl border border-[#D8C8AE]/40 space-y-2 animate-in fade-in">
            <p className="text-xs text-[#4c4640] italic font-serif leading-relaxed">
              "Every cut we produce is tested on multiple body shapes across ages. If you are between sizes or need an inch customized on your sleeves, we do it with joy."
            </p>
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#745a2f]">
                — Ananya, Creative Director
              </span>
              <a
                href="https://wa.me/919820145890?text=Hello%20Ananya,%20I%20have%20a%20fit%20query"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#171513] underline"
              >
                WhatsApp Stylist →
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Section 7: Closing Note & CTA */}
      <section className="pt-6 text-center flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#fedaa4]/50 flex items-center justify-center text-[#745a2f] mb-3">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
        </div>
        <h3 className="font-serif text-2xl text-[#171513] max-w-sm leading-snug">
          Thank you for being part of Simply Styld.
        </h3>
        <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm mt-2 font-light">
          Your trust lets Indian textile heritage breathe into the rhythms of everyday contemporary living.
        </p>

        <div className="flex flex-col items-center my-6">
          <span className="font-serif text-lg text-[#745a2f] tracking-widest italic font-light">
            Simply Styld Atelier
          </span>
          <div className="w-12 h-0.5 bg-[#745a2f]/40 mt-1 rounded-full"></div>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="w-full max-w-sm py-4 rounded-full bg-[#171513] text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md hover:bg-[#745a2f] active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Shop Our Collection</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

    </div>
  );
};
