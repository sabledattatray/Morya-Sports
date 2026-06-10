'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  MapPin, 
  Truck, 
  Gift, 
  Star, 
  PhoneCall, 
  ShieldCheck, 
  Award, 
  MessageCircle,
  Map,
  ArrowRight,
  Trophy,
  Zap,
  Printer,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, REVIEWS, Product } from '../data/mockData';
import { getStoreStatus, TimingsStatus } from '../utils/timings';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import SportsGearFinderWizard from '../components/SportsGearFinderWizard';

// Category card styling configuration mapping for an ultra-premium athletic brand layout
const CATEGORY_STYLES: Record<string, {
  borderHover: string;
  glowColor: string;
  radialGlow: string;
  badgeBg: string;
  badgeBorder: string;
  topGlowDot: string;
  itemCountBg: string;
  arrowAccent: string;
}> = {
  cricket: {
    borderHover: 'group-hover:border-amber-500/50 dark:group-hover:border-amber-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_60%)]',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    badgeBorder: 'border-amber-500/20 dark:border-amber-500/40',
    topGlowDot: 'bg-amber-500',
    itemCountBg: 'bg-amber-500/5 text-amber-700 dark:text-amber-400 border-amber-500/10 dark:border-amber-500/20',
    arrowAccent: 'text-amber-500 group-hover:text-amber-600 dark:group-hover:text-amber-400',
  },
  football: {
    borderHover: 'group-hover:border-emerald-500/50 dark:group-hover:border-emerald-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_60%)]',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeBorder: 'border-emerald-500/20 dark:border-emerald-500/40',
    topGlowDot: 'bg-emerald-500',
    itemCountBg: 'bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 border-emerald-500/10 dark:border-emerald-500/20',
    arrowAccent: 'text-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
  },
  badminton: {
    borderHover: 'group-hover:border-blue-500/50 dark:group-hover:border-blue-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.12),transparent_60%)]',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    badgeBorder: 'border-blue-500/20 dark:border-blue-500/40',
    topGlowDot: 'bg-blue-500',
    itemCountBg: 'bg-blue-500/5 text-blue-700 dark:text-blue-400 border-blue-500/10 dark:border-blue-500/20',
    arrowAccent: 'text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  'jerseys-sportswear': {
    borderHover: 'group-hover:border-rose-500/50 dark:group-hover:border-rose-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(244,63,94,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.12),transparent_60%)]',
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    badgeBorder: 'border-rose-500/20 dark:border-rose-500/40',
    topGlowDot: 'bg-rose-500',
    itemCountBg: 'bg-rose-500/5 text-rose-700 dark:text-rose-400 border-rose-500/10 dark:border-rose-500/20',
    arrowAccent: 'text-rose-500 group-hover:text-rose-600 dark:group-hover:text-rose-400',
  },
  'kabaddi-wrestling': {
    borderHover: 'group-hover:border-red-500/50 dark:group-hover:border-red-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(239,68,68,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.12),transparent_60%)]',
    badgeBg: 'bg-red-500/10 dark:bg-red-500/20',
    badgeBorder: 'border-red-500/20 dark:border-red-500/40',
    topGlowDot: 'bg-red-500',
    itemCountBg: 'bg-red-500/5 text-red-700 dark:text-red-400 border-red-500/10 dark:border-red-500/20',
    arrowAccent: 'text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400',
  },
  'athletics-running': {
    borderHover: 'group-hover:border-cyan-500/50 dark:group-hover:border-cyan-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.12),transparent_60%)]',
    badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    badgeBorder: 'border-cyan-500/20 dark:border-cyan-500/40',
    topGlowDot: 'bg-cyan-500',
    itemCountBg: 'bg-cyan-500/5 text-cyan-700 dark:text-cyan-400 border-cyan-500/10 dark:border-cyan-500/20',
    arrowAccent: 'text-cyan-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
  },
  'trophies-medals': {
    borderHover: 'group-hover:border-yellow-500/50 dark:group-hover:border-yellow-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(234,179,8,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.12),transparent_60%)]',
    badgeBg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
    badgeBorder: 'border-yellow-500/20 dark:border-yellow-500/40',
    topGlowDot: 'bg-yellow-500',
    itemCountBg: 'bg-yellow-500/5 text-yellow-700 dark:text-yellow-400 border-yellow-500/10 dark:border-yellow-500/20',
    arrowAccent: 'text-yellow-500 group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
  },
  'gym-fitness': {
    borderHover: 'group-hover:border-indigo-500/50 dark:group-hover:border-indigo-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_60%)]',
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    badgeBorder: 'border-indigo-500/20 dark:border-indigo-500/40',
    topGlowDot: 'bg-indigo-500',
    itemCountBg: 'bg-indigo-500/5 text-indigo-700 dark:text-indigo-400 border-indigo-500/10 dark:border-indigo-500/20',
    arrowAccent: 'text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
  },
  'outdoor-sports': {
    borderHover: 'group-hover:border-teal-500/50 dark:group-hover:border-teal-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.12),transparent_60%)]',
    badgeBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    badgeBorder: 'border-teal-500/20 dark:border-teal-500/40',
    topGlowDot: 'bg-teal-500',
    itemCountBg: 'bg-teal-500/5 text-teal-700 dark:text-teal-400 border-teal-500/10 dark:border-teal-500/20',
    arrowAccent: 'text-teal-500 group-hover:text-teal-600 dark:group-hover:text-teal-400',
  },
  'school-sports': {
    borderHover: 'group-hover:border-violet-500/50 dark:group-hover:border-violet-500/60',
    glowColor: 'group-hover:shadow-[0_15px_30px_-10px_rgba(139,92,246,0.25)]',
    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_60%)]',
    badgeBg: 'bg-violet-500/10 dark:bg-violet-500/20',
    badgeBorder: 'border-violet-500/20 dark:border-violet-500/40',
    topGlowDot: 'bg-violet-500',
    itemCountBg: 'bg-violet-500/5 text-violet-700 dark:text-violet-400 border-violet-500/10 dark:border-violet-500/20',
    arrowAccent: 'text-violet-500 group-hover:text-violet-600 dark:group-hover:text-violet-400',
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'best' | 'new' | 'trend' | 'offer'>('best');
  const [storeStatus, setStoreStatus] = useState<TimingsStatus | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStoreStatus(getStoreStatus()), 0);
    const interval = setInterval(() => setStoreStatus(getStoreStatus()), 30000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'best': return PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
      case 'new': return PRODUCTS.filter(p => p.isNew).slice(0, 4);
      case 'trend': return PRODUCTS.filter(p => p.isTrending).slice(0, 4);
      case 'offer': return PRODUCTS.filter(p => p.isOffer).slice(0, 4);
      default: return PRODUCTS.slice(0, 4);
    }
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Morya+Sports+Bebika+Palace+Adarsh+College+Road+Badlapur+East', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── HERO SECTION ── */}
      <section className="relative bg-slate-50 dark:bg-slate-950 py-20 lg:py-28 overflow-hidden">
        {/* BG Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl" />

        {/* Floating Sports Emojis */}
        <div className="absolute top-[15%] left-[5%] text-4xl animate-float-slow select-none pointer-events-none opacity-40">🏏</div>
        <div className="absolute top-[60%] left-[8%] text-3xl animate-float-medium select-none pointer-events-none opacity-30">⚽</div>
        <div className="absolute top-[20%] right-[10%] text-4xl animate-float-slow select-none pointer-events-none opacity-30">🏆</div>
        <div className="absolute top-[75%] right-[15%] text-3xl animate-float-medium select-none pointer-events-none opacity-40">🏸</div>
        <div className="absolute top-[40%] right-[5%] text-2xl animate-wiggle select-none pointer-events-none opacity-25">👕</div>
        <div className="absolute bottom-[10%] left-[30%] text-3xl animate-wiggle select-none pointer-events-none opacity-30">🥇</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary animate-pulse-soft">
                <Trophy size={14} className="animate-spin-slow text-secondary" fill="currentColor" />
                <span>Cricket · Football · Badminton · Custom Jerseys · Trophies</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-poppins font-black tracking-tight leading-none text-slate-900 dark:text-white uppercase italic">
                <span className="text-slate-900 dark:text-white">Badlapur&apos;s Best</span><br />
                <span className="text-primary drop-shadow-md inline-block hover:scale-105 transition-transform">Sports</span>{' '}
                <span className="text-secondary drop-shadow-md">Shop</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed mx-auto lg:mx-0">
                All sports equipment, custom printed jerseys, trophies & medals — best quality at the most reasonable price in Badlapur. Trusted by schools, colleges and clubs!
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link href="/shop" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold shadow-lg shadow-primary/20 text-center hover:scale-105 active:scale-95 transition-all cursor-pointer hover:animate-wobble-hover">
                  Shop Now
                </Link>
                <button onClick={() => setWizardOpen(true)} className="px-8 py-4 bg-[var(--card)] hover:bg-[var(--accent-light)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl font-bold flex items-center justify-center space-x-2 text-center hover:scale-105 active:scale-95 transition-all cursor-pointer">
                  <Gift size={18} className="text-primary animate-bounce" />
                  <span>Find Your Gear</span>
                </button>
              </div>

              {/* Live Store Status */}
              {storeStatus && (
                <div className="flex items-center justify-center lg:justify-start space-x-3 pt-4">
                  <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold ${storeStatus.isOpen ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-success animate-pulse' : 'bg-red-500'}`} />
                    <span>{storeStatus.statusMessage}</span>
                  </div>
                  <span className="text-xs text-[var(--muted)] font-medium">({storeStatus.countdownText})</span>
                </div>
              )}
            </div>

            {/* Right: Hero Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 card-shadow bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80"
                  alt="Sports equipment at Morya Sports Badlapur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs font-bold text-secondary flex items-center space-x-1">
                      <Star size={12} fill="currentColor" />
                      <span>5.0 / 5 — Loved by Badlapur athletes</span>
                    </div>
                    <h2 className="font-poppins font-bold text-base leading-tight">All sports gear at Adarsh College Road, Badlapur East</h2>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-[var(--border)] mt-16 text-center">
            {[
              { icon: <Trophy className="text-secondary animate-bounce-soft" size={24} fill="currentColor" />, title: 'Trophies & Medals', desc: 'For all school & club events' },
              { icon: <Printer className="text-primary" size={24} />, title: 'Jersey Printing', desc: 'Custom sublimation in 5–7 days' },
              { icon: <ShieldCheck className="text-green-500" size={24} />, title: 'Branded Products', desc: 'SG, Nivia, Yonex, Cosco & more' },
              { icon: <Zap className="text-amber-500 animate-pulse" size={24} />, title: 'Urgent Delivery', desc: 'Fast delivery for urgent needs' }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] card-shadow hover:scale-105 hover:border-primary/20 transition-all duration-300">
                <div className="p-3 bg-[var(--background)] rounded-full shadow-sm">{f.icon}</div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">{f.title}</h3>
                <p className="text-xs text-[var(--muted)]">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-[var(--background)] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.47,26.7,188.75,51.52,263.8,67.23,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ── SHOP BY SPORT ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-secondary/15 border border-secondary/20 rounded-full text-xs font-bold text-secondary-hover animate-pulse-soft">
            <Sparkles size={12} className="text-secondary" />
            <span>Shop by Sport</span>
          </span>
          <h2 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Find Your Sport</h2>
          <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">From cricket to kabaddi, athletics to gym — we have every sport covered</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {[
            { href: '/categories/cricket', label: 'Cricket', icon: '🏏', bg: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30' },
            { href: '/categories/football', label: 'Football', icon: '⚽', bg: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30' },
            { href: '/categories/badminton', label: 'Badminton', icon: '🏸', bg: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30' },
            { href: '/categories/jerseys-sportswear', label: 'Custom Jersey', icon: '👕', bg: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30' },
            { href: '/categories/trophies-medals', label: 'Trophies', icon: '🏆', bg: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-900/30' },
            { href: '/categories/gym-fitness', label: 'Gym & Fitness', icon: '🏋️', bg: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30' },
          ].map((item, idx) => (
            <Link key={idx} href={item.href}
              className={`flex flex-col items-center justify-center w-28 h-28 rounded-full border shadow-sm transition-all duration-500 hover:scale-110 active:scale-95 hover:rotate-3 cursor-pointer ${item.bg}`}
            >
              <span className="text-3xl animate-bounce-soft" style={{ animationDelay: `${idx * 0.15}s` }}>{item.icon}</span>
              <span className="text-[10.5px] font-black mt-1.5 text-center leading-tight tracking-wide uppercase px-2">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight">Explore Our Categories</h2>
          <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">Cricket, football, badminton, gym, kabaddi, custom jerseys, trophies and more — all in one place</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => {
            const productCount = PRODUCTS.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
            const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES['cricket'];
            return (
              <Link key={cat.id} href={`/categories/${cat.slug}`}
                className={`group relative border border-[var(--border)] bg-[var(--card)] rounded-2xl p-5 flex flex-col justify-between items-start text-left overflow-hidden cursor-pointer shadow-sm transition-all duration-300 h-52 hover:-translate-y-1.5 ${style.borderHover} ${style.glowColor}`}
              >
                {/* Background Sport-Specific Accent Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${style.radialGlow} rounded-full blur-2xl group-hover:scale-125 transition-all duration-500`} />
                
                {/* Diagonal subtle line pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none" 
                     style={{
                       backgroundImage: 'repeating-linear-gradient(45deg, var(--foreground) 0px, var(--foreground) 1px, transparent 1px, transparent 10px)'
                     }}
                />

                {/* Oversized Background Emoji Watermark */}
                <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 select-none pointer-events-none">
                  {cat.image}
                </div>

                {/* Corner Crosshair Blueprint Accents */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--border)] group-hover:border-primary/40 transition-colors" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[var(--border)] group-hover:border-primary/40 transition-colors" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[var(--border)] group-hover:border-primary/40 transition-colors" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[var(--border)] group-hover:border-primary/40 transition-colors" />

                {/* Top Section: Icon Pill & count badge */}
                <div className="w-full flex justify-between items-center z-10">
                  <span className={`text-3xl p-3 bg-[var(--accent-light)] rounded-xl border group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center shadow-sm ${style.badgeBg} ${style.badgeBorder}`}>
                    {cat.image}
                  </span>
                  
                  {/* Premium Count Pill */}
                  <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border flex items-center space-x-1 ${style.itemCountBg} backdrop-blur-sm transition-colors duration-300`}>
                    <span className={`w-1 h-1 rounded-full ${style.topGlowDot} animate-pulse-soft`} />
                    <span>{productCount > 0 ? `${productCount} Items` : '0 Items'}</span>
                  </span>
                </div>

                {/* Bottom Section: Text & Explore */}
                <div className="w-full space-y-1.5 pt-4 z-10">
                  <h3 className="font-poppins font-black text-sm sm:text-base text-[var(--foreground)] uppercase tracking-wide leading-tight italic">
                    {cat.name}
                  </h3>
                  
                  <div className={`flex items-center space-x-1.5 text-[9px] font-black uppercase tracking-widest ${style.arrowAccent}`}>
                    <span className="opacity-95">Explore</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="relative py-28 bg-slate-50 dark:bg-slate-950/40">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px] rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] text-[var(--background)] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.47,26.7,188.75,51.52,263.8,67.23,321.39,56.44Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight">Featured Products</h2>
              <p className="text-sm text-[var(--muted)]">Top-rated sports gear loved by athletes and teams in Badlapur</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl self-center md:self-auto">
              {([
                { id: 'best', label: '⭐ Best Sellers' },
                { id: 'new', label: '🆕 New Arrivals' },
                { id: 'trend', label: '🔥 Trending' },
                { id: 'offer', label: '🏷️ Special Offers' }
              ] as const).map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {getFilteredProducts().map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center space-x-2 text-sm font-bold text-primary hover:underline hover:text-primary-hover group">
              <span>Browse All Sports Equipment</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] text-[var(--background)] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.47,26.7,188.75,51.52,263.8,67.23,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ── JERSEY PRINTING + TROPHIES BANNER ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] premium-gradient text-white overflow-hidden relative p-8 sm:p-16 card-shadow">
          <div className="absolute right-[-10%] bottom-[-20%] w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-secondary">
                <Printer size={12} />
                <span>Custom Team Jerseys · School Kits · Tournament Trophies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-poppins font-black leading-none tracking-tight">
                Ordering for Your Team<br />or School Event?
              </h2>
              <p className="text-sm text-white/90 max-w-xl mx-auto lg:mx-0">
                We handle bulk orders for cricket, football, kabaddi teams and school sports days. Custom sublimation jerseys, branded packaging, trophies, medals, and shields — call or WhatsApp us!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact" className="px-8 py-3.5 bg-secondary hover:bg-secondary-hover text-slate-900 font-extrabold rounded-2xl text-sm transition-transform hover:scale-105 active:scale-95 text-center shadow-lg shadow-black/10">
                  Get Bulk Quote
                </Link>
                <a href="https://wa.me/918104812757?text=Hello%20Morya%20Sports!%20I%20want%20to%20order%20custom%20jerseys%20or%20trophies%20for%20my%20team." target="_blank" rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl text-sm transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-black/10"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden bg-white/10 rounded-3xl border border-white/20">
                <Image src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80" alt="Sports trophies and medals" fill sizes="(max-width: 768px) 256px, 320px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE MORYA SPORTS ── */}
      <section className="relative py-24 bg-slate-50 dark:bg-slate-950/30">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px] rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] text-[var(--background)] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.47,26.7,188.75,51.52,263.8,67.23,321.39,56.44Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight">Why Choose Morya Sports?</h2>
            <p className="text-sm text-[var(--muted)]">Quality gear, honest pricing and fast service — trusted by Badlapur for years</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              { icon: '🏆', title: 'All Branded Products', desc: 'We stock SG, Nivia, Yonex, Cosco and other top sports brands — 100% genuine products at competitive prices.' },
              { icon: '👕', title: 'Custom Jersey Printing', desc: 'Sublimation printed jerseys with your team name, number and logo. Minimum 10 pieces. Delivered in 5–7 days.' },
              { icon: '📍', title: 'Trusted Badlapur Shop', desc: 'Located at Adarsh College Road, trusted by hundreds of schools, colleges and sports clubs across Badlapur for years.' }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-[var(--border)] bg-[var(--card)] rounded-3xl card-shadow">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-poppins font-bold text-lg mb-2 text-[var(--foreground)]">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] text-[var(--background)] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.47,26.7,188.75,51.52,263.8,67.23,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight">Customer Reviews</h2>
            <p className="text-sm text-[var(--muted)]">Real Google reviews from our happy customers in Badlapur</p>
          </div>
          <Link href="/reviews" className="text-xs font-bold text-primary hover:underline self-center md:self-auto">View All Reviews →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.slice(0, 4).map((rev) => (
            <div key={rev.id} className="p-6 border border-[var(--border)] bg-[var(--card)] rounded-3xl card-shadow flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image src={rev.avatar} alt={rev.author} width={40} height={40} className="rounded-full object-cover border border-[var(--border)]" />
                    <div>
                      <h4 className="font-bold text-sm text-[var(--foreground)]">{rev.author}</h4>
                      <span className="text-[10px] text-[var(--muted)]">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={14} fill={idx < rev.rating ? 'currentColor' : 'none'} className={idx < rev.rating ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
              </div>
              {rev.response && (
                <div className="mt-4 p-3 bg-[var(--accent-light)] rounded-xl border border-[var(--border)] text-xs text-[var(--foreground)]">
                  <span className="font-bold text-primary">Response from Morya Sports: </span>
                  {rev.response}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION MAP ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight">Visit Our Shop</h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              We&apos;re located at Bebika Palace, Adarsh College Road, Badlapur East. Come visit us for the best sports gear, custom jerseys and trophies in Badlapur!
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">Shop No 15, Bebika Palace,<br />Adarsh College Road,<br />Badlapur East, Maharashtra 421503</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneCall size={18} className="text-secondary flex-shrink-0" />
                <a href="tel:08104812757" className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">08104812757</a>
              </div>
            </div>
            <button onClick={handleDirections} className="flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md transition-all self-start cursor-pointer hover:scale-105 active:scale-95">
              <Map size={16} />
              <span>Get Directions on Google Maps</span>
            </button>
          </div>

          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[350px] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-lg relative bg-slate-100 dark:bg-slate-900">
            <iframe
              title="Morya Sports Badlapur Location Map"
              src="https://maps.google.com/maps?q=Adarsh+College+Road+Badlapur+East+Maharashtra&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[350px] border-0 dark:invert-[90%] dark:hue-rotate-[180deg] dark:brightness-[90%] dark:contrast-[110%] transition-all duration-500"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <SportsGearFinderWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />

    </div>
  );
}
