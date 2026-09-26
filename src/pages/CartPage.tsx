import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { BRAND_LOGO } from '../data/mockData';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
  onOrderPlaced: (orderData: any) => void;
}

type CartState = 'active-cart' | 'checkout-form' | 'order-confirmed' | 'empty-cart';

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onOrderPlaced,
}) => {
  const [currentState, setCurrentState] = useState<CartState>(
    cart.length === 0 ? 'empty-cart' : 'active-cart'
  );

  // Coupon state
  const [couponCode, setCouponCode] = useState('SIMPLY10');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Checkout form fields
  const [fullName, setFullName] = useState('Aarohi Mehta');
  const [phone, setPhone] = useState('98201 44892');
  const [email, setEmail] = useState('aarohi.m@outlook.com');
  const [street, setStreet] = useState('B-402, Vrindavan Residences, Linking Road');
  const [city, setCity] = useState('Mumbai');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('400050');
  const [paymentChoice, setPaymentChoice] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  // Confirmed order data
  const [placedOrderRef, setPlacedOrderRef] = useState('SS-84920');

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied && subtotal > 0 ? Math.round(subtotal * 0.1) : 0;
  const totalPayable = Math.max(0, subtotal - discount);
  const freeShippingThreshold = 4000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100)) || 92;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponInput.toUpperCase() === 'SIMPLY10' || couponInput.toUpperCase() === 'ATELIER15') {
      setCouponCode(couponInput.toUpperCase());
      setCouponApplied(true);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon. Try SIMPLY10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `SS-${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrderRef(newRef);

    const orderData = {
      id: newRef,
      customerName: fullName,
      city,
      address: street,
      phone,
      email,
      items: cart.map((i) => ({
        productName: i.product.name,
        size: i.selectedSize,
        color: i.selectedColor,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal,
      discount,
      total: totalPayable,
      paymentMethod:
        paymentChoice === 'upi'
          ? 'Instant UPI'
          : paymentChoice === 'card'
          ? 'Credit/Debit Card'
          : paymentChoice === 'netbanking'
          ? 'Net Banking'
          : 'Cash on Delivery',
      status: 'Processing',
      date: 'Just now',
    };

    onOrderPlaced(orderData);
    setCurrentState('order-confirmed');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-4 pb-20 space-y-4">
      
      {/* Interactive State Navigation Switcher (Matches Image 14 Mockup) */}
      <div className="sticky top-16 z-30 bg-[#fef9f0]/95 backdrop-blur-md py-2 border-b border-[#D8C8AE]/40">
        <div className="flex items-center gap-1.5 p-1 bg-[#f2ede4] rounded-full overflow-x-auto no-scrollbar shadow-xs">
          <button
            onClick={() => setCurrentState('active-cart')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              currentState === 'active-cart'
                ? 'bg-[#171513] text-white shadow-xs'
                : 'text-[#4c4640] hover:text-[#171513]'
            }`}
          >
            Cart ({cart.reduce((n, i) => n + i.quantity, 0)})
          </button>
          <button
            onClick={() => setCurrentState('checkout-form')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              currentState === 'checkout-form'
                ? 'bg-[#171513] text-white shadow-xs'
                : 'text-[#4c4640] hover:text-[#171513]'
            }`}
          >
            Checkout
          </button>
          <button
            onClick={() => setCurrentState('order-confirmed')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              currentState === 'order-confirmed'
                ? 'bg-[#171513] text-white shadow-xs'
                : 'text-[#4c4640] hover:text-[#171513]'
            }`}
          >
            Confirmation
          </button>
          <button
            onClick={() => setCurrentState('empty-cart')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              currentState === 'empty-cart'
                ? 'bg-[#171513] text-white shadow-xs'
                : 'text-[#4c4640] hover:text-[#171513]'
            }`}
          >
            Empty State
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STATE 1: ACTIVE CART */}
      {/* ============================================================== */}
      {currentState === 'active-cart' && (
        <section className="space-y-4 animate-in fade-in">
          
          {/* Header Note & Delivery Progress Bar */}
          <div className="bg-[#f8f3ea] p-4 rounded-2xl border border-[#D8C8AE]/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-[#171513]">Your Shopping Bag</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fedaa4] text-[#795e33] text-[10px] uppercase font-bold">
                {cart.reduce((n, i) => n + i.quantity, 0)} Garments
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#4c4640]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#745a2f]">local_shipping</span>
                  <span className="font-medium text-[#171513]">
                    {subtotal >= freeShippingThreshold
                      ? 'You have unlocked Complimentary Express Delivery!'
                      : `Add ₹${freeShippingThreshold - subtotal} more for Express Delivery!`}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#745a2f]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#ece8df] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#745a2f] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-10 bg-[#FCFAF6] rounded-2xl border border-[#D8C8AE]/50">
              <p className="text-xs text-[#8C827A] mb-3">Your shopping bag is currently empty.</p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-5 py-2 rounded-full bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  className="relative bg-[#FCFAF6] p-3.5 rounded-xl border border-[#D8C8AE]/50 shadow-xs flex gap-3.5 transition-all"
                >
                  <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-[#f2ede4] shrink-0 relative">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-white/90 px-1.5 py-0.5 rounded text-[9px] font-bold text-[#171513]">
                      {item.selectedSize}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-serif text-sm sm:text-base font-semibold text-[#171513] line-clamp-1">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(index)}
                          aria-label="Remove item"
                          className="text-[#8C827A] hover:text-[#ba1a1a] transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#8C827A] mt-0.5">
                        {item.selectedColor} • Size {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-[#f2ede4] rounded-lg px-2 py-0.5 gap-2 border border-[#D8C8AE]/40">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="w-5 h-5 flex items-center justify-center text-[#171513] hover:text-[#745a2f]"
                        >
                          <span className="material-symbols-outlined text-[15px]">remove</span>
                        </button>
                        <span className="text-xs font-bold text-[#171513] min-w-[12px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#171513] hover:text-[#745a2f]"
                        >
                          <span className="material-symbols-outlined text-[15px]">add</span>
                        </button>
                      </div>

                      <span className="font-serif text-sm sm:text-base font-bold text-[#171513]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Boutique Promo Coupon Section */}
          <div className="bg-[#f8f3ea] p-3.5 rounded-xl border border-[#D8C8AE]/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#171513] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#745a2f]">sell</span>
                Boutique Promo
              </span>
              <span className="text-[10px] text-[#745a2f] font-bold uppercase">
                {couponApplied ? 'Coupon Active' : 'Apply Code'}
              </span>
            </div>

            {couponApplied ? (
              <div className="flex items-center justify-between bg-[#FCFAF6] px-3 py-2 rounded-lg border border-[#D8C8AE]/40">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs tracking-wider text-[#171513]">{couponCode}</span>
                  <span className="bg-[#fedaa4] text-[#795e33] px-2 py-0.5 rounded text-[10px] font-bold">
                    10% OFF
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#745a2f]">-₹{discount}</span>
                  <button
                    onClick={() => setCouponApplied(false)}
                    className="text-[#8C827A] hover:text-[#ba1a1a]"
                    aria-label="Remove coupon"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. SIMPLY10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-[#FCFAF6] border border-[#D8C8AE] rounded-lg px-3 py-1.5 text-xs text-[#171513] uppercase tracking-wider focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#171513] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#745a2f]"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[10px] text-red-600">{couponError}</p>}
          </div>

          {/* Order Summary Card */}
          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50 space-y-2 text-xs">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C827A]">
              Order Summary
            </h4>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[#4c4640]">
                <span>Subtotal ({cart.reduce((n, i) => n + i.quantity, 0)} items)</span>
                <span className="font-medium text-[#171513]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-[#745a2f]">
                  <span>Boutique Discount ({couponCode})</span>
                  <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#4c4640]">
                <span>Delivery Fee</span>
                <span className="uppercase text-[10px] font-bold text-[#745a2f]">Complimentary</span>
              </div>
              <div className="h-px bg-[#D8C8AE]/40 my-2" />
              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <span className="font-serif text-base font-bold text-[#171513] block">
                    Total Payable
                  </span>
                  <span className="text-[10px] text-[#8C827A]">Inclusive of all artisanal taxes</span>
                </div>
                <span className="font-serif text-xl font-bold text-[#171513]">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            disabled={cart.length === 0}
            onClick={() => setCurrentState('checkout-form')}
            className={`w-full py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 transition-all ${
              cart.length === 0
                ? 'bg-[#ece8df] text-[#8C827A] cursor-not-allowed'
                : 'bg-[#171513] text-white hover:bg-[#745a2f] active:scale-98'
            }`}
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-4 text-xs text-[#8C827A] pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#745a2f]">verified_user</span>
              <span>100% Genuine Handloom</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#745a2f]">cached</span>
              <span>7-Day Mindful Exchange</span>
            </span>
          </div>

        </section>
      )}

      {/* ============================================================== */}
      {/* STATE 2: CHECKOUT FORM */}
      {/* ============================================================== */}
      {currentState === 'checkout-form' && (
        <form onSubmit={handlePlaceOrder} className="space-y-4 animate-in fade-in">
          
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#171513]">Delivery &amp; Payment</h2>
              <p className="text-xs text-[#8C827A]">Simply Styld Express Atelier Dispatch</p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentState('active-cart')}
              className="text-[#745a2f] text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Bag ({cart.length})</span>
            </button>
          </div>

          {/* Delivery Address */}
          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50 space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#D8C8AE]/30">
              <span className="material-symbols-outlined text-[#745a2f] text-[18px]">pin_drop</span>
              <h3 className="font-serif text-sm font-semibold text-[#171513]">1. Delivery Address</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    Phone (+91)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                  Street &amp; Apartment
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/50 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#D8C8AE]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#745a2f] text-[18px]">payments</span>
                <h3 className="font-serif text-sm font-semibold text-[#171513]">2. Payment Method</h3>
              </div>
              <span className="text-[10px] text-[#8C827A] uppercase tracking-wider">Encrypted 256-bit</span>
            </div>

            <div className="space-y-2 text-xs">
              
              {/* Option 1: UPI */}
              <label
                onClick={() => setPaymentChoice('upi')}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  paymentChoice === 'upi'
                    ? 'bg-[#fedaa4]/30 border-[#745a2f] shadow-xs'
                    : 'bg-[#f8f3ea] border-[#D8C8AE]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentChoice === 'upi'}
                    onChange={() => setPaymentChoice('upi')}
                    className="accent-[#171513]"
                  />
                  <div>
                    <span className="font-semibold text-[#171513] block">Instant UPI</span>
                    <span className="text-[11px] text-[#8C827A]">Google Pay, PhonePe, Paytm &amp; QR</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#fedaa4] text-[#795e33] text-[9px] uppercase font-bold">
                  Fastest
                </span>
              </label>

              {/* Option 2: Cards */}
              <label
                onClick={() => setPaymentChoice('card')}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  paymentChoice === 'card'
                    ? 'bg-[#fedaa4]/30 border-[#745a2f] shadow-xs'
                    : 'bg-[#f8f3ea] border-[#D8C8AE]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentChoice === 'card'}
                    onChange={() => setPaymentChoice('card')}
                    className="accent-[#171513]"
                  />
                  <div>
                    <span className="font-semibold text-[#171513] block">Credit / Debit Card</span>
                    <span className="text-[11px] text-[#8C827A]">Visa, Mastercard, RuPay &amp; Amex</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#8C827A]">credit_card</span>
              </label>

              {/* Option 3: Net Banking */}
              <label
                onClick={() => setPaymentChoice('netbanking')}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  paymentChoice === 'netbanking'
                    ? 'bg-[#fedaa4]/30 border-[#745a2f] shadow-xs'
                    : 'bg-[#f8f3ea] border-[#D8C8AE]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentChoice === 'netbanking'}
                    onChange={() => setPaymentChoice('netbanking')}
                    className="accent-[#171513]"
                  />
                  <div>
                    <span className="font-semibold text-[#171513] block">Net Banking</span>
                    <span className="text-[11px] text-[#8C827A]">HDFC, ICICI, SBI, Axis &amp; 40+ banks</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#8C827A]">account_balance</span>
              </label>

              {/* Option 4: COD */}
              <label
                onClick={() => setPaymentChoice('cod')}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  paymentChoice === 'cod'
                    ? 'bg-[#fedaa4]/30 border-[#745a2f] shadow-xs'
                    : 'bg-[#f8f3ea] border-[#D8C8AE]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentChoice === 'cod'}
                    onChange={() => setPaymentChoice('cod')}
                    className="accent-[#171513]"
                  />
                  <div>
                    <span className="font-semibold text-[#171513] block">Cash on Delivery</span>
                    <span className="text-[11px] text-[#8C827A]">Pay at your doorstep</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#8C827A]">local_atm</span>
              </label>

            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-[#171513] text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md hover:bg-[#745a2f] active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Place Order • ₹{totalPayable.toLocaleString('en-IN')}</span>
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </button>

          <p className="text-center text-[11px] text-[#8C827A]">
            By placing an order, you agree to Simply Styld's Mindful Terms.
          </p>

        </form>
      )}

      {/* ============================================================== */}
      {/* STATE 3: ORDER CONFIRMED */}
      {/* ============================================================== */}
      {currentState === 'order-confirmed' && (
        <section className="bg-[#FCFAF6] p-6 sm:p-8 rounded-2xl border border-[#D8C8AE]/60 shadow-sm flex flex-col items-center text-center space-y-4 animate-in fade-in">
          
          {/* Stamp Emblem */}
          <div className="relative w-20 h-20 rounded-full border-2 border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden shadow-md flex items-center justify-center p-0.5">
            <img
              src={BRAND_LOGO}
              alt="Simply Styld Seal"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
              }}
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#745a2f] font-bold">
              Atelier Confirmation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171513]">Order Confirmed!</h2>
            <div className="inline-flex items-center gap-2 bg-[#f2ede4] px-3.5 py-1 rounded-full mx-auto mt-1 border border-[#D8C8AE]/40">
              <span className="text-[10px] uppercase text-[#8C827A]">Reference</span>
              <span className="font-bold text-xs text-[#171513]">#{placedOrderRef}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#4c4640] max-w-sm leading-relaxed">
            Thank you for shopping with Simply Styld. We are preparing your handpicked silhouettes with utmost care.
          </p>

          {/* Details Card */}
          <div className="w-full bg-[#f8f3ea] p-4 rounded-xl border border-[#D8C8AE]/50 space-y-2 text-left text-xs">
            <div className="flex items-center justify-between text-[#4c4640]">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-[#171513]">Thursday, Oct 24</span>
            </div>
            <div className="flex items-center justify-between text-[#4c4640]">
              <span>Payment Method:</span>
              <span className="font-medium text-[#171513]">
                {paymentChoice === 'cod' ? 'Cash on Delivery' : 'Paid Online'} • ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#4c4640]">
              <span>Shipping To:</span>
              <span className="font-medium text-[#171513] truncate max-w-[200px]">
                {fullName}, {city}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col w-full gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full bg-[#171513] text-white py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-[#745a2f] transition-all"
            >
              Continue Browsing
            </button>
            <button
              onClick={() => setCurrentState('active-cart')}
              className="w-full bg-[#f2ede4] text-[#171513] py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#EDE4D6] transition-all"
            >
              Back to Shopping Bag
            </button>
          </div>

        </section>
      )}

      {/* ============================================================== */}
      {/* STATE 4: EMPTY CART */}
      {/* ============================================================== */}
      {currentState === 'empty-cart' && (
        <section className="flex flex-col items-center justify-center text-center p-8 bg-[#FCFAF6] rounded-2xl border border-[#D8C8AE]/50 space-y-4 animate-in fade-in">
          
          <div className="relative w-32 h-32 rounded-full bg-[#f8f3ea] flex items-center justify-center p-4">
            <div className="w-20 h-20 rounded-full bg-[#f2ede4] flex items-center justify-center text-[#745a2f]">
              <span className="material-symbols-outlined text-[40px]">local_mall</span>
            </div>
            <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full text-[#745a2f] shadow-xs">
              <span className="material-symbols-outlined text-[16px]">yard</span>
            </div>
          </div>

          <div className="space-y-1 max-w-xs">
            <h2 className="font-serif text-2xl text-[#171513]">Your Bag is Empty</h2>
            <p className="text-xs text-[#4c4640] leading-relaxed">
              No artisanal treasures found in your cart right now. Explore our curated everyday styles crafted with mindful luxury.
            </p>
          </div>

          <div className="w-full max-w-xs space-y-3 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full bg-[#171513] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-[#745a2f] transition-all"
            >
              Discover New Arrivals
            </button>

            <div className="flex items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-[#8C827A]">Popular:</span>
              <button
                onClick={() => onNavigate('shop')}
                className="text-[#745a2f] underline underline-offset-2"
              >
                Chanderi Kurtas
              </button>
              <span className="text-[#D8C8AE]">•</span>
              <button
                onClick={() => onNavigate('shop')}
                className="text-[#745a2f] underline underline-offset-2"
              >
                Cotton Palazzos
              </button>
            </div>
          </div>

        </section>
      )}

    </div>
  );
};
