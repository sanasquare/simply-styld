import React, { useState } from 'react';

export const SizeGuidePage: React.FC = () => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [selectedRow, setSelectedRow] = useState<string>('L');

  const measurements = [
    {
      size: 'M',
      label: 'Med',
      in: { bust: '38"', waist: '34"', hip: '42"', length: '44"' },
      cm: { bust: '96.5', waist: '86.4', hip: '106.7', length: '111.8' },
    },
    {
      size: 'L',
      label: 'Lrg',
      in: { bust: '40"', waist: '36"', hip: '44"', length: '44"' },
      cm: { bust: '101.6', waist: '91.4', hip: '111.8', length: '111.8' },
    },
    {
      size: 'XL',
      label: '1X',
      in: { bust: '42"', waist: '38"', hip: '46"', length: '45"' },
      cm: { bust: '106.7', waist: '96.5', hip: '116.8', length: '114.3' },
    },
    {
      size: 'XXL',
      label: '2X',
      in: { bust: '44"', waist: '40"', hip: '48"', length: '45"' },
      cm: { bust: '111.8', waist: '101.6', hip: '121.9', length: '114.3' },
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      
      {/* Editorial Lead Section */}
      <section className="text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#D8C8AE]"></span>
          <span className="material-symbols-outlined text-[14px] text-[#745a2f]">star_rate</span>
          <span className="w-6 h-px bg-[#D8C8AE]"></span>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#745a2f] font-semibold mb-1">
          Tailored Comfort
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171513]">Size Guide</h1>
        <p className="text-xs sm:text-sm text-[#4c4640] max-w-xs mt-1">
          Find your comfortable fit crafted with artisanal ease.
        </p>

        {/* Unit Toggle Pill */}
        <div className="mt-4 bg-[#ece8df] p-1 rounded-full flex items-center shadow-xs">
          <button
            onClick={() => setUnit('in')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              unit === 'in'
                ? 'bg-[#171513] text-white shadow-xs'
                : 'text-[#4c4640] hover:text-[#171513]'
            }`}
          >
            Inches (in)
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              unit === 'cm'
                ? 'bg-[#171513] text-white shadow-xs'
                : 'text-[#4c4640] hover:text-[#171513]'
            }`}
          >
            Centimetres (cm)
          </button>
        </div>
      </section>

      {/* Interactive Measurement Table Card */}
      <section className="bg-[#FCFAF6] rounded-2xl p-4 sm:p-6 border border-[#D8C8AE]/60 shadow-xs flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#745a2f]">straighten</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#171513]">
              Garment Measurements
            </span>
          </div>
          <span className="text-[10px] text-[#745a2f] bg-[#f8f3ea] px-2.5 py-0.5 rounded-full font-semibold border border-[#D8C8AE]/50">
            Standard Fit
          </span>
        </div>
        
        <p className="text-xs text-[#8C827A] mb-4">
          Tap a size row to highlight and inspect fit dimensions.
        </p>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[310px] flex flex-col space-y-2">
            
            {/* Header */}
            <div className="grid grid-cols-5 px-3 py-2 bg-[#f8f3ea] rounded-lg text-center items-center text-[10px] uppercase font-bold tracking-wider text-[#8C827A]">
              <span className="text-left">Size</span>
              <span>Bust</span>
              <span>Waist</span>
              <span>Hip</span>
              <span>Length</span>
            </div>

            {/* Rows */}
            {measurements.map((row) => {
              const isSelected = selectedRow === row.size;
              const values = unit === 'in' ? row.in : row.cm;

              return (
                <div
                  key={row.size}
                  onClick={() => setSelectedRow(row.size)}
                  className={`grid grid-cols-5 px-3 py-3 rounded-xl text-center items-center cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#fedaa4]/40 border-[#745a2f]/40 shadow-xs'
                      : 'bg-[#f8f3ea]/50 border-transparent hover:bg-[#ece8df]/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-left">
                    <span className={`font-serif text-base font-bold ${
                      isSelected ? 'text-[#745a2f]' : 'text-[#171513]'
                    }`}>
                      {row.size}
                    </span>
                    <span className="text-[10px] text-[#8C827A] font-medium hidden xs:inline">
                      {row.label}
                    </span>
                  </div>
                  <span className={`text-xs ${isSelected ? 'font-bold text-[#171513]' : 'text-[#4c4640]'}`}>
                    {values.bust}
                  </span>
                  <span className={`text-xs ${isSelected ? 'font-bold text-[#171513]' : 'text-[#4c4640]'}`}>
                    {values.waist}
                  </span>
                  <span className={`text-xs ${isSelected ? 'font-bold text-[#171513]' : 'text-[#4c4640]'}`}>
                    {values.hip}
                  </span>
                  <span className={`text-xs ${isSelected ? 'font-bold text-[#171513]' : 'text-[#4c4640]'}`}>
                    {values.length}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-[#f8f3ea] rounded-xl flex items-start gap-2.5 text-xs text-[#4c4640] border border-[#D8C8AE]/40">
          <span className="material-symbols-outlined text-[18px] text-[#745a2f] shrink-0 mt-0.5">info</span>
          <p className="leading-relaxed">
            Kurti length is measured from highest shoulder point down to bottom hemline. All pieces allow 1-1.5 inches of internal margin for ease of alteration.
          </p>
        </div>
      </section>

      {/* How to Measure Step-by-Step */}
      <section className="space-y-4">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
            Step by Step
          </span>
          <h2 className="font-serif text-2xl text-[#171513]">How to Measure</h2>
          <div className="w-8 h-px bg-[#745a2f] mt-1"></div>
        </div>

        <div className="space-y-3">
          
          {/* Bust */}
          <div className="bg-[#FCFAF6] rounded-xl p-4 flex gap-4 items-center border border-[#D8C8AE]/50 shadow-xs">
            <div className="w-16 h-16 rounded-xl bg-[#f2ede4] shrink-0 relative overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px] text-[#745a2f]">straighten</span>
              <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#171513] text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-base font-semibold text-[#171513]">Bust</h3>
              <p className="text-xs text-[#4c4640] mt-0.5 leading-relaxed">
                Measure around the fullest part of your chest with relaxed posture, keeping tape horizontal.
              </p>
            </div>
          </div>

          {/* Waist */}
          <div className="bg-[#FCFAF6] rounded-xl p-4 flex gap-4 items-center border border-[#D8C8AE]/50 shadow-xs">
            <div className="w-16 h-16 rounded-xl bg-[#f2ede4] shrink-0 relative overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px] text-[#745a2f]">hdr_weak</span>
              <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#171513] text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-base font-semibold text-[#171513]">Waist</h3>
              <p className="text-xs text-[#4c4640] mt-0.5 leading-relaxed">
                Measure around your natural waistline, approximately 1–2 inches above the navel.
              </p>
            </div>
          </div>

          {/* Hip */}
          <div className="bg-[#FCFAF6] rounded-xl p-4 flex gap-4 items-center border border-[#D8C8AE]/50 shadow-xs">
            <div className="w-16 h-16 rounded-xl bg-[#f2ede4] shrink-0 relative overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px] text-[#745a2f]">flare</span>
              <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#171513] text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-base font-semibold text-[#171513]">Hip</h3>
              <p className="text-xs text-[#4c4640] mt-0.5 leading-relaxed">
                Measure around the fullest part of your hips and seat while standing with feet together.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Between Two Sizes */}
      <section className="bg-[#f2ede4] rounded-2xl p-5 border border-[#D8C8AE]/60 relative overflow-hidden">
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-full bg-[#fedaa4] flex items-center justify-center shrink-0 text-[#795e33]">
            <span className="material-symbols-outlined text-[20px]">balance</span>
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-[#171513]">Between two sizes?</h3>
            <p className="text-xs text-[#4c4640] mt-1 leading-relaxed">
              If you prefer a relaxed, breezy drape for daily wear, we recommend <span className="font-bold text-[#171513]">sizing up</span>. For tailored silhouettes like our straight-cut co-ords, pick your <span className="font-bold text-[#171513]">exact measurement</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Sizing Concierge / WhatsApp Callout */}
      <section className="bg-[#FCFAF6] rounded-2xl p-6 border border-[#D8C8AE]/60 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-[#fedaa4]/60 flex items-center justify-center text-[#745a2f] mb-2">
          <span className="material-symbols-outlined text-[24px]">support_agent</span>
        </div>
        <h3 className="font-serif text-xl text-[#171513]">Need Personal Sizing Assistance?</h3>
        <p className="text-xs text-[#4c4640] mt-1 max-w-sm">
          Our boutique styling team is available to help you find the drape that flatters you effortlessly.
        </p>

        <a
          href="https://wa.me/919820145890?text=Hello%20Simply%20Styld,%20I%20would%20love%20some%20help%20with%20choosing%20my%20perfect%20size."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full max-w-sm py-3.5 px-4 rounded-xl bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#745a2f] active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>Chat on WhatsApp</span>
        </a>

        <div className="flex items-center justify-center gap-1.5 mt-3 text-[#8C827A] text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Typically replies within 15 minutes</span>
        </div>
      </section>

    </div>
  );
};
