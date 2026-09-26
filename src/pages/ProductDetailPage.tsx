import React, { useState, useEffect } from 'react';
import { Product, Review } from '../types';
import { REVIEWS, BRAND_LOGO } from '../data/mockData';
import { reviewsService } from '../services/reviewsService';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  onBuyNow: (product: Product, size: string, color: string, quantity?: number) => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Warm Ivory');
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState(1);
  const [show360Modal, setShow360Modal] = useState(false);

  // Accordion toggle states
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Fetch reviews on product change
  useEffect(() => {
    reviewsService.getReviewsForProduct(product.id).then((fetched) => {
      if (fetched && fetched.length > 0) {
        setReviewsList(fetched);
      }
    });
  }, [product.id]);

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      location: newReviewCity || 'India',
      rating: newReviewRating,
      verified: true,
      date: 'Just now',
      comment: newReviewComment,
      sizePurchased: `Size ${selectedSize}`
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewModal(false);

    await reviewsService.addReview({
      productId: product.id,
      author: newReviewAuthor,
      location: newReviewCity || 'India',
      rating: newReviewRating,
      content: newReviewComment,
    });

    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 pb-20">
      
      {/* Top Artisanal Origin Banner */}
      <div className="bg-[#f8f3ea] py-2 px-4 rounded-xl text-center border border-[#D8C8AE]/50 mb-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#745a2f]"></span>
          <span className="font-semibold uppercase tracking-wider text-[#745a2f] text-[10px]">
            ARTISANAL CRAFT
          </span>
        </div>
        <span className="font-medium text-[#4c4640] text-[11px] sm:text-xs">
          {product.provenance}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY */}
        <div className="space-y-3">
          
          {/* Main Visual Display */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#f2ede4] border border-[#D8C8AE]/60 shadow-sm">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Bestseller Badge */}
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#171513] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                {product.badge}
              </span>
            )}

            {/* Low inventory alert overlay pill */}
            {currentSizeObj && (
              <span className="absolute top-10 left-3 mt-1 bg-[#fedaa4] text-[#795e33] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#745a2f] animate-pulse"></span>
                <span>Only {currentSizeObj.stock} Left in {selectedSize}</span>
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#171513] shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  color: isWishlisted ? '#ba1a1a' : '#171513',
                  fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0"
                }}
              >
                {isWishlisted ? 'favorite' : 'favorite_border'}
              </span>
            </button>

            {/* 360 Weave Interactive Trigger */}
            <button
              onClick={() => setShow360Modal(true)}
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#171513] flex items-center gap-1 shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px] text-[#745a2f]">360</span>
              <span>360° Weave</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImageIndex === idx
                    ? 'border-[#171513] shadow-sm'
                    : 'border-[#D8C8AE]/60 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: PRODUCT DETAILS & BUYING ACTIONS */}
        <div className="space-y-5">
          
          {/* Collection & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-[#745a2f] font-semibold">
              {product.subCategory || 'Artisanal Edit'}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#171513] font-medium">
              <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">star</span>
              <span className="font-bold">{product.rating}</span>
              <span className="text-[#8C827A]">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-3xl text-[#171513] font-medium leading-snug">
            {product.name}
          </h1>

          {/* Pricing Box */}
          <div className="bg-[#f8f3ea] p-4 rounded-xl border border-[#D8C8AE]/50 flex items-center justify-between">
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#171513]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#8C827A] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-0.5 rounded bg-[#fedaa4] text-[#795e33] text-[10px] font-bold uppercase">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#8C827A] font-medium">Taxes Included</span>
          </div>

          {/* Free Shipping Callout */}
          <div className="p-3 bg-[#FCFAF6] rounded-xl border border-[#D8C8AE]/60 flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#745a2f] mt-0.5">local_shipping</span>
            <div className="text-xs">
              <p className="font-semibold text-[#171513]">Complimentary India Delivery</p>
              <p className="text-[#4c4640] mt-0.5">Dispatched in 24 hours • Express delivery available</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#4c4640] leading-relaxed">
            {product.description}
          </p>

          <div className="w-full h-px bg-[#D8C8AE]/40" />

          {/* COLOR SELECTOR */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-[#171513] uppercase tracking-wider text-[11px]">
                COLOUR: <span className="font-normal text-[#4c4640]">{selectedColor}</span>
              </span>
              <span className="text-[10px] text-[#745a2f] uppercase tracking-wider font-semibold">
                Pure Zari Work
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === c.name
                      ? 'border-[#171513] scale-110 shadow-sm'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <span className="material-symbols-outlined text-[14px] text-white mix-blend-difference">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-[#171513] uppercase tracking-wider text-[11px]">
                SIZE: <span className="font-normal text-[#4c4640]">{selectedSize}</span>
              </span>
              <button
                onClick={onOpenSizeGuide}
                className="text-[11px] text-[#745a2f] uppercase tracking-wider font-semibold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">straighten</span>
                <span>SIZE GUIDE</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.size;
                const isSoldOut = s.status === 'Sold Out';

                return (
                  <button
                    key={s.size}
                    disabled={isSoldOut}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center border transition-all ${
                      isSoldOut
                        ? 'bg-[#ece8df] border-transparent text-[#cec5bd] line-through cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#171513] text-white border-[#171513] shadow-sm'
                        : 'bg-[#FCFAF6] text-[#171513] border-[#D8C8AE]/80 hover:bg-[#EDE4D6]'
                    }`}
                  >
                    <span className="font-bold text-sm">{s.size}</span>
                    <span className={`text-[9px] uppercase tracking-wider font-medium ${
                      isSelected ? 'text-[#fedaa4]' : 'text-[#8C827A]'
                    }`}>
                      {s.status}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-[#745a2f] italic mt-2">
              Low inventory: Only {currentSizeObj?.stock || 3} garments left in size {selectedSize}.
            </p>
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center bg-[#f2ede4] rounded-xl px-2 py-1.5 border border-[#D8C8AE]/60">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#171513] hover:text-[#745a2f]"
                  aria-label="Decrease quantity"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="font-bold text-sm text-[#171513] w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#171513] hover:text-[#745a2f]"
                  aria-label="Increase quantity"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
                className="flex-1 py-3.5 px-4 bg-[#171513] text-white rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2e2a27] active:scale-98 shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>ADD TO BAG</span>
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              onClick={() => onBuyNow(product, selectedSize, selectedColor, quantity)}
              className="w-full py-3.5 px-4 bg-[#745a2f] text-white rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#5a431a] active:scale-98 shadow-md transition-all"
            >
              <span>⚡ BUY NOW • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>

          {/* Authenticity Guarantee Card */}
          <div className="bg-[#f8f3ea] p-4 rounded-xl border border-[#D8C8AE]/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
              <img
                src={BRAND_LOGO}
                alt="Simply Styld Authenticity"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
                }}
              />
            </div>
            <div className="text-xs">
              <h4 className="font-semibold text-[#171513]">Simply Styld Pure Authenticity</h4>
              <p className="text-[#4c4640] mt-0.5 leading-relaxed">
                Includes silk mark certification tag & handmade fabric keepsake pouch.
              </p>
            </div>
          </div>

          {/* ACCORDIONS: DETAILS, FABRIC & CARE, SHIPPING */}
          <div className="space-y-2 border-t border-[#D8C8AE]/50 pt-4">
            
            {/* Details */}
            <div className="border border-[#D8C8AE]/60 rounded-xl overflow-hidden bg-[#FCFAF6]">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                className="w-full p-3.5 text-left flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-[#171513]"
              >
                <span>Product Details</span>
                <span className="material-symbols-outlined text-[18px] text-[#745a2f]">
                  {openAccordion === 'details' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'details' && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#4c4640] space-y-1.5 border-t border-[#D8C8AE]/30">
                  {product.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#745a2f] mt-0.5">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fabric & Care */}
            <div className="border border-[#D8C8AE]/60 rounded-xl overflow-hidden bg-[#FCFAF6]">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                className="w-full p-3.5 text-left flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-[#171513]"
              >
                <span>Fabric &amp; Care</span>
                <span className="material-symbols-outlined text-[18px] text-[#745a2f]">
                  {openAccordion === 'care' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'care' && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#4c4640] space-y-2 border-t border-[#D8C8AE]/30">
                  <p className="font-semibold text-[#171513]">{product.fabric}</p>
                  {product.careInstructions.map((c, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#745a2f] mt-0.5">✦</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border border-[#D8C8AE]/60 rounded-xl overflow-hidden bg-[#FCFAF6]">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full p-3.5 text-left flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-[#171513]"
              >
                <span>Shipping &amp; Mindful Returns</span>
                <span className="material-symbols-outlined text-[18px] text-[#745a2f]">
                  {openAccordion === 'shipping' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordion === 'shipping' && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#4c4640] space-y-1.5 border-t border-[#D8C8AE]/30 leading-relaxed">
                  <p>• Complimentary express shipping across all pin codes in India.</p>
                  <p>• 7-day hassle-free mindful exchange policy with free doorstep reverse pickup.</p>
                  <p>• International dispatch available to 40+ countries via DHL Express.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* COMPLETE THE LOOK SECTION */}
      {product.pairings && product.pairings.length > 0 && (
        <section className="mt-14 pt-8 border-t border-[#D8C8AE]/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
                Curated Pairings
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#171513]">Complete The Look</h3>
            </div>
            <span className="text-xs text-[#745a2f] font-semibold uppercase tracking-wider cursor-pointer hover:underline">
              View Edit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {product.pairings.map((pairing) => (
              <div
                key={pairing.id}
                className="bg-[#FCFAF6] p-3 rounded-xl border border-[#D8C8AE]/50 flex flex-col justify-between shadow-xs"
              >
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#f2ede4] mb-2">
                  <img src={pairing.image} alt={pairing.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#171513] truncate">
                    {pairing.name}
                  </h4>
                  <p className="text-xs font-bold text-[#171513] mt-0.5">
                    ₹{pairing.price.toLocaleString('en-IN')}
                  </p>
                  <button
                    onClick={() =>
                      onAddToCart(
                        {
                          id: pairing.id,
                          name: pairing.name,
                          price: pairing.price,
                          category: 'Accessories',
                          rating: 5,
                          reviewCount: 12,
                          images: [pairing.image],
                          provenance: 'Atelier Selection',
                          fabric: 'Handloom Cotton / Brass',
                          description: 'Curated styling pairing.',
                          colors: [{ name: 'Gold/Off-White', hex: '#E6DFC8' }],
                          sizes: [{ size: 'L', stock: 10, status: 'Ready' }],
                          details: ['Matching piece'],
                          careInstructions: ['Handle with care']
                        },
                        'L',
                        'Gold/Off-White'
                      )
                    }
                    className="mt-2 w-full py-1.5 bg-[#171513] hover:bg-[#745a2f] text-white text-[10px] font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    + ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BOUTIQUE FEEDBACK / CUSTOMER REVIEWS */}
      <section className="mt-14 pt-8 border-t border-[#D8C8AE]/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
              Boutique Feedback
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#171513]">Customer Reviews</h3>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 rounded-lg bg-[#FCFAF6] border border-[#D8C8AE] hover:bg-[#EDE4D6] text-[#171513] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
          >
            Write Review
          </button>
        </div>

        {/* Rating Breakdown Card */}
        <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/50 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-left sm:border-r border-[#D8C8AE]/40 sm:pr-8">
            <div className="font-serif text-4xl font-bold text-[#171513]">4.9</div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 my-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[18px] fill-current">star</span>
              ))}
            </div>
            <span className="text-xs text-[#8C827A]">{reviewsList.length + 39} Verified Reviews</span>
          </div>

          <div className="flex-1 w-full space-y-1.5 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-3 text-[#8C827A]">5</span>
              <div className="flex-1 h-2 bg-[#f2ede4] rounded-full overflow-hidden">
                <div className="h-full bg-[#745a2f] rounded-full" style={{ width: '88%' }}></div>
              </div>
              <span className="w-6 text-right text-[#8C827A]">38</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 text-[#8C827A]">4</span>
              <div className="flex-1 h-2 bg-[#f2ede4] rounded-full overflow-hidden">
                <div className="h-full bg-[#A88A5A] rounded-full" style={{ width: '10%' }}></div>
              </div>
              <span className="w-6 text-right text-[#8C827A]">4</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 text-[#8C827A]">3</span>
              <div className="flex-1 h-2 bg-[#f2ede4] rounded-full overflow-hidden">
                <div className="h-full bg-[#D8C8AE] rounded-full" style={{ width: '2%' }}></div>
              </div>
              <span className="w-6 text-right text-[#8C827A]">0</span>
            </div>
          </div>
        </div>

        {/* Review Cards List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-[#FCFAF6] p-4 sm:p-5 rounded-xl border border-[#D8C8AE]/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EDE4D6] text-[#745a2f] flex items-center justify-center font-bold text-xs uppercase">
                    {rev.author.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#171513]">{rev.author}</h4>
                    <p className="text-[10px] text-[#8C827A]">
                      {rev.verified && 'Verified Buyer • '} {rev.location} {rev.sizePurchased && `• ${rev.sizePurchased}`}
                    </p>
                  </div>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[15px] fill-current">star</span>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4c4640] italic leading-relaxed pt-1">
                "{rev.comment}"
              </p>

              {rev.images && rev.images.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {rev.images.map((img, i) => (
                    <div key={i} className="w-14 h-16 rounded-md overflow-hidden bg-[#f2ede4] border border-[#D8C8AE]/60">
                      <img src={img} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* 360 WEAVE MODAL */}
      {show360Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FCFAF6] rounded-2xl max-w-lg w-full p-6 border border-[#D8C8AE] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8C8AE]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#745a2f]">360</span>
                <h3 className="font-serif text-lg font-semibold text-[#171513]">360° Fabric Weave Inspection</h3>
              </div>
              <button
                onClick={() => setShow360Modal(false)}
                className="w-8 h-8 rounded-full bg-[#f2ede4] flex items-center justify-center text-[#171513]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f8f3ea]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt="Weave zoom"
                className="w-full h-full object-cover scale-150 transform hover:scale-200 transition-transform duration-500 cursor-zoom-in"
              />
              <span className="absolute bottom-2 left-2 bg-[#171513]/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                Hover to magnify natural pit-loom silk threads
              </span>
            </div>
            <p className="text-xs text-[#4c4640] leading-relaxed">
              Every warp and weft is tensioned by hand in Chanderi. Small irregularities and slubs are hallmarks of true artisanal handloom.
            </p>
          </div>
        </div>
      )}

      {/* WRITE REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FCFAF6] rounded-2xl max-w-md w-full p-6 border border-[#D8C8AE] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8C8AE]/40 pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#171513]">Share Boutique Feedback</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2ede4] flex items-center justify-center text-[#171513]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#4c4640] font-semibold uppercase tracking-wider text-[10px] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-[#f8f3ea] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4c4640] font-semibold uppercase tracking-wider text-[10px] mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  className="w-full bg-[#f8f3ea] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4c4640] font-semibold uppercase tracking-wider text-[10px] mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className={`text-lg ${star <= newReviewRating ? 'text-amber-500' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#4c4640] font-semibold uppercase tracking-wider text-[10px] mb-1">
                  Your Experience (Fabric, Fit &amp; Drape)
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How did the fabric feel on your skin? Was the sizing true to size?"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-[#f8f3ea] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#171513] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#745a2f] transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
