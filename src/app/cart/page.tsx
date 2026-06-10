'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trash2, 
  Gift, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  Ticket
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, toggleGiftWrap } = useCartStore();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [globalCardMsg, setGlobalCardMsg] = useState('');
  const [showCardBuilder, setShowCardBuilder] = useState(false);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Custom wrapping cost: ₹30 per item wrapped
  const wrapCost = cart.reduce((acc, item) => acc + (item.giftWrap ? 30 * item.quantity : 0), 0);
  
  // Card/tag fee
  const cardFee = showCardBuilder ? 10 : 0;
  
  // Local delivery is free for orders above ₹999, else ₹50
  const shippingCost = subtotal > 999 || subtotal === 0 ? 0 : 50;
  
  // Coupon Discount
  const couponDiscount = Math.round(subtotal * (discountPercent / 100));
  
  // Grand Total
  const total = subtotal + wrapCost + shippingCost + cardFee - couponDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SPORTS10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else if (code === 'TEAM20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "SPORTS10" or "TEAM20".');
      setCouponApplied(false);
      setDiscountPercent(0);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-32">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="inline-flex p-6 bg-slate-100 dark:bg-slate-800 text-[var(--muted)] rounded-full animate-bounce">
          <ShoppingBag size={48} />
        </div>
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-[var(--foreground)]">Your Cart is Empty</h1>
          <p className="text-sm text-[var(--muted)] mt-2">Looks like you haven't added any sports items to your basket yet.</p>
        </div>
        <Link href="/shop" className="inline-block px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all shadow-md">
          Explore Sports Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-[var(--border)] bg-[var(--card)] rounded-3xl gap-4 card-shadow"
            >
              
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} width={600} height={600} className="w-full h-full object-cover" />
                </div>
                <div>
                  <Link href={`/shop/${item.product.id}`}>
                    <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] hover:text-primary transition-colors leading-snug line-clamp-1">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{item.product.category}</p>
                  <div className="text-sm font-extrabold text-[var(--foreground)] mt-1">₹{item.product.price}</div>
                </div>
              </div>

              {/* Quantity Selector & Actions */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-0 border-[var(--border)] pt-4 sm:pt-0">
                
                {/* Wrap button */}
                <button
                  onClick={() => toggleGiftWrap(item.product.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    item.giftWrap 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)]'
                  }`}
                  title="Add custom wrapping (+₹30)"
                >
                  <Gift size={14} />
                  <span>{item.giftWrap ? 'Wrapping Added 🎁' : 'Add Wrapping'}</span>
                </button>

                {/* Counter */}
                <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--background)]">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-[var(--foreground)] hover:bg-[var(--card)] font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[var(--foreground)]">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-[var(--foreground)] hover:bg-[var(--card)] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2.5 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-950/20 text-slate-500 hover:text-red-500 rounded-xl transition-colors cursor-pointer"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          ))}

          {/* CUSTOM NOTE BUILDER BLOCK */}
          <div className="border border-dashed border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl mt-6 space-y-4 card-shadow">
            <label className="flex items-center space-x-2 text-sm font-bold text-[var(--foreground)] cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={showCardBuilder}
                onChange={(e) => setShowCardBuilder(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-[var(--border)]"
              />
              <span className="flex items-center gap-1.5 text-sm">
                Add custom note / gift tag (+₹10) 📝
              </span>
            </label>

            {showCardBuilder && (
              <div className="space-y-4 pt-1 animate-pop-in">
                <input 
                  type="text"
                  maxLength={80}
                  placeholder="Type your message (e.g. Best of luck team!)"
                  value={globalCardMsg}
                  onChange={(e) => setGlobalCardMsg(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-primary text-[var(--foreground)]"
                />

                {/* VIRTUAL CARD PREVIEW */}
                <div className="relative border-2 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl p-6 overflow-hidden shadow-inner max-w-md mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute top-2 left-3 text-xl opacity-40 select-none">🏆</div>
                  <div className="absolute bottom-2 right-3 text-xl opacity-40 select-none">🥇</div>
                  <div className="absolute top-3 right-6 text-sm text-secondary animate-pulse opacity-50">★</div>
                  
                  <div className="text-center space-y-2 relative z-10">
                    <div className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                      Custom Note Preview
                    </div>
                    <p className="font-serif italic font-extrabold text-primary-playful text-base min-h-[40px] leading-relaxed break-words px-4 pt-1 text-center">
                      "{globalCardMsg || 'All the best! Play like a champion!'}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary & Coupon Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Coupon */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow">
            <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] flex items-center space-x-2 mb-4">
              <Ticket size={16} className="text-primary" />
              <span>Apply Promo Code</span>
            </h3>
            
            <form onSubmit={handleApplyCoupon} className="flex space-x-2">
              <input
                type="text"
                placeholder="PROMOCODE"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
                className="flex-grow py-2 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none placeholder:text-[var(--muted)] text-[var(--foreground)] uppercase"
              />
              <button 
                type="submit"
                disabled={couponApplied}
                className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <div className="mt-3 text-xs text-success font-bold flex items-center space-x-1">
                <span>✓ Coupon code applied successfully ({discountPercent}% Discount)</span>
                <button 
                  onClick={() => { setCouponApplied(false); setDiscountPercent(0); setCouponCode(''); }}
                  className="text-primary hover:underline ml-2"
                >
                  Remove
                </button>
              </div>
            )}
            
            {couponError && (
              <p className="mt-2 text-xs text-primary font-bold">{couponError}</p>
            )}
            <p className="mt-3 text-[10px] text-[var(--muted)]">Try "SPORTS10" for 10% off or "TEAM20" for 20% off.</p>
          </div>

          {/* Checkout summary */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-4">
            <h3 className="font-poppins font-bold text-base border-b border-[var(--border)] pb-3 text-[var(--foreground)]">Order Summary</h3>
            
            <div className="space-y-2.5 text-sm text-[var(--foreground)]">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Subtotal:</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Custom Wrapping:</span>
                <span className="font-semibold">₹{wrapCost}</span>
              </div>
              {showCardBuilder && (
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Custom Note:</span>
                  <span className="font-semibold">₹{cardFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Local Shipping:</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? <span className="text-success font-bold">FREE</span> : `₹${shippingCost}`}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-success font-bold">
                  <span>Coupon Discount:</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
              
              <div className="border-t border-[var(--border)] pt-3 flex justify-between font-poppins font-extrabold text-base">
                <span>Grand Total:</span>
                <span className="text-primary text-lg">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-primary/10 transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            {/* Timings / Shipping Badges */}
            <div className="border-t border-[var(--border)] pt-4 space-y-3.5 text-[11px] text-[var(--muted)] font-semibold">
              <div className="flex items-center space-x-2">
                <Truck size={14} className="text-secondary" />
                <span>Express Delivery in Badlapur (1-2 Days)</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-green-500" />
                <span>Razorpay Secure 256-bit encrypted checkout</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
