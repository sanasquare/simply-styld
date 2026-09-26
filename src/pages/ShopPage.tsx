import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  products: Product[];
  initialCategory?: Category;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onNavigate: (path: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

const CATEGORIES: Category[] = ['All', 'Kurtis', 'Co-ords', 'Dresses', 'Pakistani Wear', 'Bottoms'];
const FABRICS = ['All Fabrics', 'Chanderi Silk', 'Raw Silk', 'Mulmul Cotton', 'Khadi Cotton', 'Slub Cotton'];

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'All',
  onSelectProduct,
  onAddToCart,
  onNavigate,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState<string>('All Fabrics');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedFabric !== 'All Fabrics' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase().replace(' fabrics', ''))) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedFabric, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A88A5A] font-semibold">
          Curated Atelier Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171513] mt-1">
          {selectedCategory === 'All' ? 'Everyday Wardrobe' : selectedCategory}
        </h1>
        <p className="text-xs sm:text-sm text-[#4c4640] mt-1.5 font-light">
          Bespoke cuts, pure natural weaves, and effortless silhouettes designed for warm Indian weather.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-[#171513] text-white shadow-xs'
                : 'bg-[#FCFAF6] text-[#4c4640] border border-[#D8C8AE]/70 hover:bg-[#EDE4D6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#f8f3ea] p-3 sm:p-4 rounded-xl border border-[#D8C8AE]/50 mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by silhouette, weave or motif..."
            className="w-full bg-[#FCFAF6] border border-[#D8C8AE]/70 rounded-lg pl-9 pr-8 py-2 text-xs text-[#171513] placeholder-[#8C827A] focus:outline-none focus:border-[#745a2f]"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-[#8C827A]">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-[#8C827A] hover:text-[#171513]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Fabric & Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Fabric Select */}
          <select
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
            className="bg-[#FCFAF6] border border-[#D8C8AE]/70 rounded-lg px-3 py-2 text-xs text-[#171513] focus:outline-none"
          >
            {FABRICS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FCFAF6] border border-[#D8C8AE]/70 rounded-lg px-3 py-2 text-xs text-[#171513] focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Size Guide Quick Link */}
          <button
            onClick={() => onNavigate('size-guide')}
            className="px-3 py-2 rounded-lg bg-[#EDE4D6] hover:bg-[#D8C8AE] text-[#745a2f] text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span className="hidden sm:inline">Size Guide</span>
          </button>
        </div>

      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between mb-4 text-xs text-[#8C827A]">
        <span>Showing {filteredProducts.length} handcrafted pieces</span>
        {(selectedCategory !== 'All' || selectedFabric !== 'All Fabrics' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFabric('All Fabrics');
              setSearchQuery('');
            }}
            className="text-[#745a2f] hover:underline font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#FCFAF6] rounded-2xl p-12 text-center border border-[#D8C8AE]/50 my-6">
          <span className="material-symbols-outlined text-[44px] text-[#A88A5A]">search_off</span>
          <h3 className="font-serif text-lg font-semibold text-[#171513] mt-2">No garments found</h3>
          <p className="text-xs text-[#4c4640] max-w-xs mx-auto mt-1">
            We couldn't find any piece matching your filters. Try selecting another fabric or category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFabric('All Fabrics');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
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
      )}

      {/* Sizing Help Banner */}
      <div className="mt-12 bg-[#f8f3ea] p-5 sm:p-6 rounded-2xl border border-[#D8C8AE]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fedaa4] flex items-center justify-center text-[#745a2f] shrink-0">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div>
            <h4 className="font-serif text-base font-semibold text-[#171513]">Unsure about your measurements?</h4>
            <p className="text-xs text-[#4c4640]">Our stylists provide custom sizing suggestions over WhatsApp.</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('size-guide')}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#FCFAF6] border border-[#D8C8AE] rounded-lg text-xs font-semibold text-[#171513] hover:bg-[#EDE4D6]"
          >
            Open Size Guide
          </button>
          <a
            href="https://wa.me/919820145890?text=Hello%20Simply%20Styld,%20I%20would%20love%20some%20help%20with%20choosing%20my%20perfect%20size."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2 bg-[#171513] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#745a2f]"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
