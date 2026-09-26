import React from 'react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

interface CollectionsPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onNavigate: (path: string, categoryFilter?: Category) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
  wishlistIds,
  onToggleWishlist,
}) => {
  const festivePret = products.filter((p) => p.category === 'Kurtis' || p.badge?.includes('SILK') || p.badge?.includes('BESTSELLER'));
  const coordsAndSets = products.filter((p) => p.category === 'Co-ords' || p.category === 'Dresses');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A88A5A] font-semibold">
          Curated Editorial Capsule
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171513] mt-1">
          Seasonal Edits
        </h1>
        <p className="text-xs sm:text-sm text-[#4c4640] mt-2 font-light">
          Thoughtfully paced releases created in small artisanal batches with zero deadstock waste.
        </p>
      </div>

      {/* EDIT 1: CHANDERI & RAW SILK */}
      <section className="bg-[#f8f3ea] rounded-2xl p-6 sm:p-8 border border-[#D8C8AE]/50 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-[#D8C8AE]/50">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
              Edit No. 01 • Festive Pret '25
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171513] mt-0.5">
              Chanderi &amp; Raw Silk Weaves
            </h2>
            <p className="text-xs text-[#4c4640] mt-1 max-w-lg">
              Woven on historic pit looms in Madhya Pradesh and Bhagalpur. Natural luster with breathable mulmul linings.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop', 'Kurtis')}
            className="px-4 py-2 bg-[#171513] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#745a2f] transition-colors"
          >
            Explore All Weaves →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {festivePret.slice(0, 4).map((product) => (
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
      </section>

      {/* EDIT 2: RELAXED CO-ORDS & DAY DRESSES */}
      <section className="bg-[#FCFAF6] rounded-2xl p-6 sm:p-8 border border-[#D8C8AE]/50 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-[#D8C8AE]/50">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
              Edit No. 02 • Everyday Staples
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171513] mt-0.5">
              Modern Co-ords &amp; Fluid Silhouettes
            </h2>
            <p className="text-xs text-[#4c4640] mt-1 max-w-lg">
              From morning meetings to sunset tea. Unfussy tailoring with functional deep pockets and gentle elastic waistbands.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop', 'Co-ords')}
            className="px-4 py-2 bg-[#EDE4D6] text-[#171513] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#D8C8AE] transition-colors"
          >
            View Co-ords →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {coordsAndSets.map((product) => (
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
      </section>

    </div>
  );
};
