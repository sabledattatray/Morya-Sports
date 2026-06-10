'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Star, Tag, Timer, AlertCircle, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';

export default function OffersPage() {
  const offerProducts = PRODUCTS.filter(p => p.isOffer || p.originalPrice);

  // Countdown Timer State (Simulated 2 days from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [copiedCode, setCopiedCode] = useState('');
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Promo banner */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12 text-center space-y-6 card-shadow relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-secondary/10 rounded-full blur-2xl" />
        
        <div className="space-y-2 relative z-10 max-w-xl mx-auto">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">
            <Sparkles size={12} className="animate-spin" />
            <span>Monsoon Sports Festival Sales</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-poppins font-black text-[var(--foreground)] tracking-tight">
            Exclusive Deals & Discounts
          </h1>
          <p className="text-xs text-[var(--muted)]">
            Premium cricket gear, badminton rackets and custom jerseys on special discounts. Available for express delivery in Badlapur.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center space-x-4 max-w-sm mx-auto relative z-10 font-poppins pt-2">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Mins', val: timeLeft.minutes },
            { label: 'Secs', val: timeLeft.seconds }
          ].map((t, idx) => (
            <div key={idx} className="flex flex-col items-center p-3 border border-[var(--border)] bg-[var(--background)] rounded-2xl w-16 shadow-sm">
              <span className="text-lg font-black text-primary">{t.val.toString().padStart(2, '0')}</span>
              <span className="text-[9px] font-bold text-[var(--muted)] uppercase">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coupon Cards section */}
      <section className="space-y-4">
        <h2 className="text-xl font-poppins font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 flex items-center space-x-2">
          <Tag size={18} className="text-primary" />
          <span>Active Coupon Codes</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { code: 'SPORTS10', title: '10% OFF Storewide', desc: 'Apply at cart checkout to receive an extra 10% discount on all products. Valid on orders above ₹499.' },
            { code: 'TEAM20', title: '20% OFF Custom Jerseys & Trophies', desc: 'Get an extra 20% discount on custom sublimation printed jerseys and trophies. Valid on orders above ₹1,999.' }
          ].map((coupon) => (
            <div key={coupon.code} className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow flex flex-col justify-between items-start gap-4">
              <div className="space-y-1">
                <h3 className="font-poppins font-bold text-base text-[var(--foreground)]">{coupon.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{coupon.desc}</p>
              </div>
              <div className="flex w-full items-center justify-between border-t border-[var(--border)] pt-4 mt-auto">
                <span className="font-poppins font-black text-sm text-[var(--foreground)] tracking-wide bg-[var(--accent-light)] px-3 py-1.5 rounded-lg border border-primary/20">{coupon.code}</span>
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  {copiedCode === coupon.code ? 'Copied! ✓' : 'Copy Code'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Products Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-poppins font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 flex items-center space-x-2">
          <Timer size={18} className="text-primary" />
          <span>Deals of the Week</span>
        </h2>

        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {offerProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onQuickView={() => {}} // simple mock
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-sm text-[var(--muted)]">
            No items are currently on sale. Check back next week for fresh discounts!
          </div>
        )}
      </section>

    </div>
  );
}
