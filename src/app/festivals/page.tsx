'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Timer, Gift, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';

// Festival config data
const FESTIVALS = [
  {
    id: 'diwali',
    name: 'Diwali',
    tagline: 'Celebrate with Champions',
    emoji: '🪔',
    desc: 'Celebrate the Festival of Lights with the perfect sports gear or trophies for tournament celebrations. From cricket kits to custom jerseys — make this Diwali extra special!',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/20',
    border: 'border-amber-200 dark:border-amber-900/40',
    accent: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    coupon: 'DIWALI15',
    couponDesc: '15% off on sports equipment above ₹799',
    decorEmojis: ['🪔', '🏆', '🥇', '🌟', '🏏'],
    countdownDays: 120,
  },
  {
    id: 'christmas',
    name: 'Winter Tournament',
    tagline: 'Christmas & New Year Games',
    emoji: '🎄',
    desc: 'Celebrate the holiday season with Morya Sports! Premium sports gear, equipment, custom team jerseys, and championship trophies delivered express in Badlapur.',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    bgLight: 'bg-green-50',
    bgDark: 'dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-900/40',
    accent: 'text-green-700 dark:text-green-400',
    badge: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    coupon: 'WINTER20',
    couponDesc: '20% off on football kits & gym gear',
    decorEmojis: ['🎄', '⛄', '⚽', '🏆', '❄️'],
    countdownDays: 200,
  },
  {
    id: 'summer',
    name: 'Summer Coaching Camp',
    tagline: 'Get Active This Summer!',
    emoji: '☀️',
    desc: 'School is out! Make summer vacation active and healthy with high-quality cricket kits, badminton rackets, running shoes, and coaching accessories.',
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-950/20',
    border: 'border-sky-200 dark:border-sky-900/40',
    accent: 'text-sky-600 dark:text-sky-400',
    badge: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300',
    coupon: 'SUMMER10',
    couponDesc: '10% off on cricket bats & badminton rackets',
    decorEmojis: ['☀️', '🏏', '🏸', '🏃', '🥇'],
    countdownDays: 15,
  },
];

function CountdownTimer({ days }: { days: number }) {
  const totalSeconds = days * 86400;
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="flex items-center justify-center gap-2 font-poppins">
      {[{ label: 'Days', val: d }, { label: 'Hrs', val: h }, { label: 'Min', val: m }, { label: 'Sec', val: s }].map((t, i) => (
        <div key={i} className="flex flex-col items-center p-2.5 border border-[var(--border)] bg-[var(--background)] rounded-xl w-14 shadow-sm">
          <span className="text-base font-black text-primary">{t.val.toString().padStart(2, '0')}</span>
          <span className="text-[8px] font-bold text-[var(--muted)] uppercase">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function FestivalsPage() {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // Get a slice of products per festival (cycle through available products)
  const getProducts = (index: number) => PRODUCTS.slice(index * 2, index * 2 + 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* Hero Header */}
      <section className="text-center space-y-4 py-8 relative overflow-hidden">
        <div className="absolute inset-0 sports-grid-bg opacity-40" />
        {/* Floating emoji decorations */}
        <div className="absolute top-4 left-8 text-3xl animate-float-slow select-none opacity-60">🪔</div>
        <div className="absolute top-2 right-12 text-3xl animate-float select-none opacity-60">🏆</div>
        <div className="absolute bottom-4 left-1/4 text-2xl animate-float-medium select-none opacity-50">☀️</div>
        <div className="absolute bottom-2 right-1/4 text-2xl animate-bounce-soft select-none opacity-50">🏏</div>

        <div className="relative z-10 space-y-4">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary animate-pulse-soft">
            <Sparkles size={13} className="animate-spin-slow" />
            <span>Festival & Tournament Campaigns</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-poppins font-black text-[var(--foreground)] tracking-tight">
            Celebrate Every{' '}
            <span className="text-primary-playful drop-shadow-sm">Season</span>
            {' '}🏆
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            Special deals for tournament seasons and festive sports meets. Quality gear and trophies with express delivery in Badlapur.
          </p>
        </div>
      </section>

      {/* Festival Sections */}
      {FESTIVALS.map((fest, idx) => {
        const festProducts = getProducts(idx);
        return (
          <section key={fest.id} id={fest.id} className={`border ${fest.border} ${fest.bgLight} ${fest.bgDark} rounded-[32px] overflow-hidden card-shadow`}>

            {/* Festival Hero Banner */}
            <div className={`bg-gradient-to-r ${fest.gradient} p-8 sm:p-12 relative overflow-hidden`}>
              {/* Floating decorations */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-8 opacity-20 text-[120px] select-none">
                {fest.emoji}
              </div>
              {fest.decorEmojis.map((emoji, i) => (
                <div
                  key={i}
                  className="absolute text-2xl select-none opacity-30"
                  style={{
                    top: `${10 + (i * 17) % 80}%`,
                    left: `${5 + (i * 19) % 90}%`,
                    animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                  }}
                >
                  {emoji}
                </div>
              ))}

              <div className="relative z-10 space-y-3 max-w-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{fest.emoji}</span>
                  <div>
                    <div className="text-white/70 text-xs font-bold uppercase tracking-widest">{fest.tagline}</div>
                    <h2 className="text-3xl sm:text-4xl font-poppins font-black text-white tracking-tight">{fest.name} Specials</h2>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{fest.desc}</p>
              </div>
            </div>

            {/* Countdown + Coupon Strip */}
            <div className="px-8 py-6 border-b border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className={`text-xs font-bold uppercase tracking-wider ${fest.accent}`}>
                  <Timer size={12} className="inline mr-1" /> Sale Ends In
                </div>
                <CountdownTimer days={fest.countdownDays} />
              </div>

              <div className={`border-2 border-dashed ${fest.border} ${fest.bgLight} ${fest.bgDark} rounded-2xl p-4 flex items-center gap-4`}>
                <div className="space-y-0.5">
                  <div className={`text-[10px] font-black uppercase tracking-widest ${fest.accent}`}>Festival Coupon</div>
                  <div className="font-poppins font-black text-xl text-[var(--foreground)]">{fest.coupon}</div>
                  <div className="text-xs text-[var(--muted)]">{fest.couponDesc}</div>
                </div>
                <button
                  onClick={() => handleCopy(fest.coupon)}
                  className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap"
                >
                  {copiedCode === fest.coupon ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="p-8 space-y-5">
              <h3 className={`font-poppins font-bold text-base ${fest.accent} flex items-center space-x-2`}>
                <Gift size={16} />
                <span>Top {fest.name} Picks</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {festProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={() => {}}
                  />
                ))}
              </div>
              <div className="text-center pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                >
                  <span>Browse All {fest.name} Sports Gear</span>
                  <Star size={14} />
                </Link>
              </div>
            </div>

          </section>
        );
      })}

    </div>
  );
}
