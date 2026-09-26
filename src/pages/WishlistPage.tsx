import React from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface WishlistPageProps {
  products: Product[];
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  wishlistIds,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onNavigate,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-20">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A88A5A] font-semibold">
          Your Curated Keepsakes
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171513] mt-1">
          Saved Pieces
        </h1>
        <p className="text-xs sm:text-sm text-[#4c4640] mt-1.5 font-light">
          Silhouettes you’ve saved for upcoming gatherings, festivities, and mindful wardrobe additions.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-[#FCFAF6] rounded-2xl p-12 text-center border border-[#D8C8AE]/50 max-w-md mx-auto my-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] mx-auto">
            <span className="material-symbols-outlined text-[32px]">favorite_border</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#171513]">No saved pieces yet</h3>
          <p className="text-xs text-[#4c4640]">
            Tap the heart icon on any kurti, co-ord set, or dress to save it to your personal boutique wishlist.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-3 px-6 py-3 rounded-full bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#745a2f] transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span>{wishlistedProducts.length} Saved Silhouettes</span>
            <button
              onClick={() => onNavigate('shop')}
              className="text-[#745a2f] hover:underline font-semibold"
            >
              + Add More Pieces
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
