'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, toggleGiftWrap } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [globalCardMsg, setGlobalCardMsg] = useState('');
  const [showCardBuilder, setShowCardBuilder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  // Calculate Subtotals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wrapTotal = cart.reduce((acc, item) => acc + (item.giftWrap ? 30 : 0) * item.quantity, 0);
  const cardFee = showCardBuilder ? 10 : 0;
  const grandTotal = itemTotal + wrapTotal + cardFee;

  const handleQuantity = (productId: string, currentQty: number, change: number) => {
    updateQuantity(productId, currentQty + change);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Body */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--background)] shadow-2xl z-50 border-l border-[var(--border)] flex flex-col justify-between transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--card)]">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="text-primary animate-pulse" size={22} />
            <h3 className="font-poppins font-black text-lg text-[var(--foreground)]">Your Sports Cart</h3>
            <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
              {totalItems} items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer text-[var(--foreground)]"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="flex-grow p-6 overflow-y-auto space-y-5">
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-start gap-4 pb-4 border-b border-[var(--border)] animate-pop-in"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-[var(--border)]">
                    <Image 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0 space-y-1">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-wide">
                      {item.product.category}
                    </div>
                    <h4 className="font-poppins font-bold text-xs text-[var(--foreground)] truncate">
                      {item.product.name}
                    </h4>
                    
                    <div className="flex items-center justify-between pt-1.5">
                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--background)] scale-90 origin-left">
                        <button 
                          onClick={() => handleQuantity(item.product.id, item.quantity, -1)}
                          className="px-2 py-1 text-xs font-bold text-[var(--foreground)] hover:bg-[var(--card)]"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-extrabold text-[var(--foreground)]">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantity(item.product.id, item.quantity, 1)}
                          className="px-2 py-1 text-xs font-bold text-[var(--foreground)] hover:bg-[var(--card)]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-black text-[var(--foreground)]">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>

                    {/* Gift Wrap Switcher */}
                    <div className="flex items-center justify-between pt-1.5">
                      <label className="flex items-center space-x-1.5 text-[10px] font-bold text-[var(--muted)] cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={item.giftWrap}
                          onChange={() => toggleGiftWrap(item.product.id)}
                          className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-[var(--border)]"
                        />
                        <span>Wrapping / Custom tag (+₹30) 🎁</span>
                      </label>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* CUSTOM NOTE BUILDER BLOCK */}
              <div className="border border-dashed border-[var(--border)] bg-[var(--card)] p-4 rounded-3xl mt-4 space-y-3">
                <label className="flex items-center space-x-2 text-xs font-bold text-[var(--foreground)] cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={showCardBuilder}
                    onChange={(e) => setShowCardBuilder(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-[var(--border)]"
                  />
                  <span className="flex items-center gap-1.5">
                    Add custom note / gift tag (+₹10) 📝
                  </span>
                </label>

                {showCardBuilder && (
                  <div className="space-y-3 pt-1 animate-pop-in">
                    <input 
                      type="text"
                      maxLength={80}
                      placeholder="Type your message (e.g. Best of luck team!)"
                      value={globalCardMsg}
                      onChange={(e) => setGlobalCardMsg(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    {/* VIRTUAL CARD PREVIEW */}
                    <div className="relative border-2 border-amber-200 bg-amber-50/50 rounded-2xl p-4 overflow-hidden shadow-inner">
                      {/* Decorative elements */}
                      <div className="absolute top-1 left-2 text-base opacity-40 select-none">🏆</div>
                      <div className="absolute bottom-1 right-2 text-base opacity-40 select-none">🥇</div>
                      <div className="absolute top-2 right-4 text-xs text-secondary animate-pulse opacity-50">★</div>
                      
                      <div className="text-center space-y-1 relative z-10">
                        <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest">
                          Custom Note Preview
                        </div>
                        <p className="font-serif italic font-extrabold text-primary-playful text-sm min-h-[30px] leading-relaxed break-words px-2 pt-1 text-center">
                          &ldquo;{globalCardMsg || 'All the best! Play like a champion!'}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-20">
              <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-[var(--muted)]">
                <ShoppingBag size={36} className="animate-bounce-soft" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-base text-[var(--foreground)]">Your cart is empty</h4>
                <p className="text-xs text-[var(--muted)] mt-1 max-w-[200px] mx-auto">
                  Browse our premium collections and add sports items to get started!
                </p>
              </div>
              <button 
                onClick={onClose}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-transform hover:scale-105"
              >
                Browse Shop
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--border)] bg-[var(--card)] space-y-4">
            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Items Subtotal:</span>
                <span>₹{itemTotal}</span>
              </div>
              {wrapTotal > 0 && (
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Custom wrapping fee:</span>
                  <span>₹{wrapTotal}</span>
                </div>
              )}
              {showCardBuilder && (
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Custom Note fee:</span>
                  <span>₹{cardFee}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-green-600">
                <span>Local Shipping (Badlapur):</span>
                <span className="font-bold">FREE</span>
              </div>
              <div className="border-t border-[var(--border)] pt-3 flex justify-between text-base font-black text-[var(--foreground)]">
                <span>Grand Total:</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link 
                href="/cart"
                onClick={onClose}
                className="flex-1 py-3 text-center border border-[var(--border)] text-[var(--foreground)] font-bold text-xs rounded-xl hover:bg-[var(--background)] transition-transform active:scale-95 hover:scale-105"
              >
                Full Cart Page
              </Link>
              <Link 
                href="/checkout"
                onClick={onClose}
                className="flex-1 py-3 text-center bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2 transition-transform active:scale-95 hover:scale-105"
              >
                <span>Checkout</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
