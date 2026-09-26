import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('L');

  return (
    <div className="flex flex-col bg-[#FCFAF6] rounded-xl p-2.5 sm:p-3 border border-[#D8C8AE]/50 shadow-xs hover:shadow-md transition-all duration-300 group">
      
      {/* Image container with 3:4 aspect */}
      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#f2ede4] cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from Saved" : "Save to Wishlist"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-[#FCFAF6]/85 text-[#171513] hover:text-[#745a2f]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            {isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute bottom-2 left-2 bg-[#FCFAF6]/90 backdrop-blur-xs text-[#171513] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col mt-2.5 flex-1 justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#A88A5A] font-semibold block">
            {product.category}
          </span>
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-sm sm:text-base font-semibold text-[#171513] line-clamp-1 mt-0.5 hover:text-[#745a2f] cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm sm:text-base font-bold text-[#171513]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8C827A] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Size Selection Pills */}
        <div className="mt-2.5 pt-2 border-t border-[#D8C8AE]/40">
          <div className="flex items-center justify-between text-[10px] text-[#8C827A] mb-1">
            <span>Size:</span>
            <span className="font-semibold text-[#171513]">{selectedSize}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {product.sizes.map((s) => {
              const isSelected = selectedSize === s.size;
              const isSoldOut = s.status === 'Sold Out';

              return (
                <button
                  key={s.size}
                  type="button"
                  disabled={isSoldOut}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s.size);
                  }}
                  className={`flex-1 py-1 rounded text-[10px] font-semibold transition-all ${
                    isSoldOut
                      ? 'bg-[#ece8df] text-[#cec5bd] line-through cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#171513] text-white shadow-xs'
                      : 'bg-[#f2ede4] text-[#1d1c16] hover:bg-[#D8C8AE]/50'
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedSize, product.colors[0]?.name || 'Natural');
            }}
            className="mt-2 w-full py-1.5 rounded bg-[#EDE4D6] hover:bg-[#171513] hover:text-white text-[#171513] text-[10px] font-semibold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1 active:scale-98"
          >
            <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
            <span>Quick Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
