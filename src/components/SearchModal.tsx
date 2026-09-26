import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-[#171513]/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FCFAF6] rounded-2xl w-full max-w-xl border border-[#D8C8AE] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#D8C8AE]/50 flex items-center gap-3 bg-[#F7F2E9]">
          <span className="material-symbols-outlined text-[22px] text-[#745a2f]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kurtis, co-ords, chanderi, silk, mulmul..."
            className="flex-1 bg-transparent text-sm text-[#171513] placeholder-[#8C827A] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8C827A] hover:text-[#171513]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#EDE4D6] text-xs font-semibold text-[#171513] hover:bg-[#D8C8AE]/60"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#f8f3ea] border-b border-[#D8C8AE]/30 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-[#8C827A] font-medium shrink-0">Popular:</span>
          {['Chanderi Kurti', 'Co-ord Set', 'Pure Silk', 'Anarkali', 'Palazzos'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-0.5 rounded-full bg-[#FCFAF6] border border-[#D8C8AE]/60 text-[#745a2f] hover:bg-[#171513] hover:text-white transition-colors shrink-0"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-[#8C827A]">
              <span className="material-symbols-outlined text-[32px] text-[#D8C8AE]">manage_search</span>
              <p className="text-xs mt-1">No matching garments found for "{query}".</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f2ede4] cursor-pointer transition-colors border border-transparent hover:border-[#D8C8AE]/40 group"
              >
                <div className="w-12 h-16 rounded-md bg-[#EDE4D6] overflow-hidden shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#A88A5A] font-semibold">
                    {product.category}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#171513] truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#8C827A] truncate">
                    {product.fabric}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-[#171513]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[10px] text-[#745a2f] group-hover:underline">
                    View Detail →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
