'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Phone,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCartStore } from '../store/cartStore';
import { CATEGORIES } from '../data/mockData';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const cart = useCartStore((state) => state.cart);
  const wishlist = useCartStore((state) => state.wishlist);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) setVisible(true);
      else if (currentScrollY > lastScrollY) setVisible(false);
      else setVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-[var(--border)]">
      {/* Top Banner */}
      <div className="w-full bg-slate-900 text-slate-100 px-2 sm:px-4 text-[10px] sm:text-xs flex justify-between items-center h-8 py-1.5 overflow-hidden">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <span className="flex items-center space-x-0.5 sm:space-x-1 whitespace-nowrap">
            <MapPin size={10} className="text-secondary flex-shrink-0 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Adarsh College Road, Badlapur East, MH</span>
            <span className="sm:hidden">Badlapur East</span>
          </span>
          <a href="tel:08104812757" className="flex items-center space-x-0.5 sm:space-x-1 hover:text-secondary transition-colors cursor-pointer whitespace-nowrap">
            <Phone size={10} className="text-secondary flex-shrink-0 sm:w-3.5 sm:h-3.5" />
            <span>08104812757</span>
          </a>
        </div>
        <div className="flex items-center space-x-0.5 sm:space-x-2 whitespace-nowrap flex-shrink-0">
          <Sparkles size={10} className="text-secondary animate-pulse sm:w-3.5 sm:h-3.5" />
          <span className="font-semibold text-secondary">
            <span className="hidden sm:inline">Best Quality · Best Price in Badlapur!</span>
            <span className="sm:hidden">Best Price!</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex items-center space-x-0.5">
                <span className="relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary text-white shadow font-poppins font-black text-sm sm:text-lg transform -rotate-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                  <Trophy size={12} className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-yellow-400 rotate-12 drop-shadow-md sm:w-4 sm:h-4" fill="currentColor" />
                  M
                </span>
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-secondary text-slate-900 shadow font-poppins font-black text-sm sm:text-lg transform rotate-6 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300">
                  S
                </span>
                <span className="font-poppins font-black text-xs min-[360px]:text-[13px] min-[390px]:text-sm sm:text-xl tracking-tight text-[var(--foreground)] ml-1 group-hover:text-primary transition-colors flex items-center whitespace-nowrap">
                  MORYA SPORTS
                  <Sparkles size={12} className="hidden sm:inline-block text-secondary ml-1 animate-spin-slow sm:w-4 sm:h-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search cricket, football, jerseys, trophies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-4 pr-10 rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-primary hover:scale-110 transition-all" aria-label="Submit search">
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-[var(--foreground)]">
            <Link href="/" className="hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200">Home</Link>
            
            <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
              <button className="flex items-center space-x-1 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200 py-2 cursor-pointer">
                <span>Categories</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[var(--card)] border border-[var(--border)] card-shadow rounded-[32px] p-6 grid grid-cols-12 gap-6 animate-pop-in z-50">
                  <div className="col-span-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 px-2">
                      <span className="font-poppins text-xs font-black text-[var(--muted)] uppercase tracking-wider">All Sports Categories</span>
                      <Link href="/shop" className="text-[11px] font-bold text-primary hover:underline" onClick={() => setCategoriesOpen(false)}>All Products</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {CATEGORIES.map((cat) => (
                        <Link key={cat.id} href={`/categories/${cat.slug}`}
                          className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-[var(--accent-light)] border border-transparent hover:border-primary/10 transition-all duration-200 group/item hover:translate-x-1"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          <span className="text-2xl p-2 bg-[var(--background)] rounded-xl shadow-sm group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">{cat.image}</span>
                          <div>
                            <div className="font-poppins font-bold text-xs text-[var(--foreground)] group-hover/item:text-primary transition-colors">{cat.name}</div>
                            <div className="text-[10px] text-[var(--muted)] line-clamp-1">{cat.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950/20 border border-blue-200/50 dark:border-blue-900/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-2 relative z-10">
                      <span className="inline-block px-2 py-0.5 bg-blue-200 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-[9px] font-bold uppercase tracking-wider">Custom Orders</span>
                      <h4 className="font-poppins font-black text-sm text-[var(--foreground)] flex items-center gap-1.5">
                        <span>Jersey Printing</span><span>👕</span>
                      </h4>
                      <p className="text-[11px] text-[var(--muted)] leading-relaxed">Team jerseys with your name & number. Sublimation printing in 5–7 days!</p>
                    </div>
                    <div className="space-y-3 relative z-10 pt-4 border-t border-blue-200/20">
                      <Link href="/contact" className="w-full text-center block py-2 bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary-hover text-white text-[11px] font-extrabold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95" onClick={() => setCategoriesOpen(false)}>
                        Order Now
                      </Link>
                      <div className="flex items-center space-x-2 text-[10px] text-[var(--muted)]">
                        <span>🏆</span>
                        <span className="font-medium">Trophies & Medals also available!</span>
                      </div>
                    </div>
                    <div className="absolute -right-6 -bottom-6 text-6xl opacity-10 pointer-events-none select-none rotate-12">🏆</div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/shop" className="hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200">Shop</Link>
            <Link href="/offers" className="hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-1">
              <span>Offers</span>
              <span className="bg-primary text-white text-[9px] px-1.5 py-0.5 rounded-full animate-bounce">NEW</span>
            </Link>
            <Link href="/reviews" className="hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200">Reviews</Link>
            <Link href="/about" className="hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200">About</Link>
            <Link href="/contact" className="hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200">Contact</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-0.5 sm:space-x-4">
            <button onClick={toggleTheme} className="inline-flex p-1 sm:p-2.5 rounded-full hover:bg-[var(--card)] text-[var(--foreground)] border border-transparent hover:border-[var(--border)] hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer" aria-label="Toggle dark mode">
              {!mounted ? <div className="w-[18px] h-[18px] sm:w-5 sm:h-5" /> : theme === 'light' ? <Moon size={18} className="sm:w-5 sm:h-5" /> : <Sun size={18} className="text-secondary sm:w-5 sm:h-5" />}
            </button>
            <Link href="/wishlist" className="hidden sm:inline-flex relative p-1 sm:p-2.5 rounded-full hover:bg-[var(--card)] text-[var(--foreground)] border border-transparent hover:border-[var(--border)] hover:scale-110 transition-all duration-300" aria-label="View Wishlist">
              <Heart size={18} className="hover:text-primary sm:w-5 sm:h-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">{wishlistCount}</span>
              )}
            </Link>
            <Link href="/cart" onClick={(e) => { e.preventDefault(); setCartOpen(true); }} className="relative p-1 sm:p-2.5 rounded-full hover:bg-[var(--card)] text-[var(--foreground)] border border-transparent hover:border-[var(--border)] hover:scale-110 transition-all duration-300 cursor-pointer" aria-label="View Cart">
              <ShoppingBag size={18} className="hover:text-secondary sm:w-5 sm:h-5" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-secondary text-slate-900 text-[9px] sm:text-[10px] font-extrabold rounded-full flex items-center justify-center animate-bounce">{cartItemCount}</span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1 sm:p-2.5 rounded-full hover:bg-[var(--card)] text-[var(--foreground)] transition-all duration-300 cursor-pointer" aria-label="Toggle Menu">
              {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--background)] px-4 pt-4 pb-6 space-y-3 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
            <input type="text" placeholder="Search cricket, football, jerseys..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full py-2 pl-4 pr-10 rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none" />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"><Search size={16} /></button>
          </form>
          <div className="flex flex-col space-y-2 font-semibold">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)]">Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)]">Shop All Products</Link>
            <Link href="/categories/jerseys-sportswear" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)] flex items-center justify-between">
              <span>Custom Jerseys</span>
              <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold">PRINT</span>
            </Link>
            <Link href="/categories/trophies-medals" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)]">Trophies & Medals</Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)] flex items-center justify-between">
              <span>My Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>
              )}
            </Link>
            <button 
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} 
              className="w-full text-left p-2 rounded-lg hover:bg-[var(--card)] flex items-center justify-between font-semibold cursor-pointer"
            >
              <span>Appearance</span>
              <span className="text-xs text-[var(--muted)]">{!mounted ? '' : theme === 'light' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}</span>
            </button>
            <Link href="/offers" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)] flex items-center justify-between">
              <span>Offers</span>
              <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold">HOT</span>
            </Link>
            <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)]">Customer Reviews</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)]">About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)]">Contact Us</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--card)] text-xs text-primary">Admin Panel</Link>
          </div>
        </div>
      )}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
