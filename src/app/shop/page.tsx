'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  Grid3X3, 
  ListFilter,
  PackageCheck
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQ = searchParams.get('search') || '';

  // Filter & Sort States
  const [search, setSearch] = useState(searchQ);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync URL search parameters if changed
  useEffect(() => {
    const searchVal = searchParams.get('search') || '';
    const ageParam = searchParams.get('age') || '';
    const timer = setTimeout(() => {
      setSearch(searchVal);
      if (ageParam) {
        setSelectedAge(ageParam);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Handle resets
  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedAge('all');
    setSelectedPriceRange('all');
    setInStockOnly(false);
    setSortBy('popular');
  };

  // Filter & Sort Logic
  const getFilteredProducts = () => {
    let list = [...PRODUCTS];

    // Search Query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      const catObj = CATEGORIES.find(c => c.slug === selectedCategory);
      if (catObj) {
        list = list.filter((p) => p.category === catObj.name);
      }
    }

    // Age Group
    if (selectedAge !== 'all') {
      list = list.filter((p) => p.ageGroup.toLowerCase().includes(selectedAge.toLowerCase()) || 
                                (selectedAge === 'all-ages' && p.ageGroup.toLowerCase() === 'all ages'));
    }

    // Price Range
    if (selectedPriceRange !== 'all') {
      if (selectedPriceRange === 'under-500') {
        list = list.filter((p) => p.price < 500);
      } else if (selectedPriceRange === '500-1500') {
        list = list.filter((p) => p.price >= 500 && p.price <= 1500);
      } else if (selectedPriceRange === '1500-3000') {
        list = list.filter((p) => p.price >= 1500 && p.price <= 3000);
      } else if (selectedPriceRange === 'above-3000') {
        list = list.filter((p) => p.price > 3000);
      }
    }

    // Stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        list.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Breadcrumb & Page Title */}
      <div className="mb-8 space-y-2 text-center sm:text-left">
        <div className="text-xs text-[var(--muted)] font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">Shop</span>
        </div>
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Shop All Products</h1>
        <p className="text-xs text-[var(--muted)]">Explore premium collections and find the perfect sports gear</p>
      </div>

      {/* Grid structure: Sidebar + Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <aside className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl space-y-6 card-shadow lg:sticky lg:top-32 h-fit">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h2 className="font-poppins font-bold text-base flex items-center space-x-2 text-[var(--foreground)]">
              <SlidersHorizontal size={18} className="text-primary" />
              <span>Filters</span>
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[var(--muted)] hover:text-primary flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset All</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search matching products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">Age Group</label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none"
            >
              <option value="all">Any Player Group</option>
              <option value="children">Kids & Juniors</option>
              <option value="adults">Adults & Seniors</option>
              <option value="all ages">All Players</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">Price Range</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none"
            >
              <option value="all">Any Price</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1500">₹500 - ₹1,500</option>
              <option value="1500-3000">₹1,500 - ₹3,000</option>
              <option value="above-3000">₹3,000 & Above</option>
            </select>
          </div>

          {/* Stock Availability Toggle */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="stock-toggle"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-[var(--border)]"
            />
            <label htmlFor="stock-toggle" className="text-sm font-semibold text-[var(--foreground)] select-none">
              In stock products only
            </label>
          </div>

        </aside>

        {/* Product Catalog Column */}
        <section className="lg:col-span-3 space-y-6">
          
          {/* Top Bar for catalog statistics and sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 gap-4 card-shadow">
            <div className="text-xs font-bold text-[var(--muted)] flex items-center space-x-2">
              <Grid3X3 size={14} className="text-primary" />
              <span>Showing {filteredProducts.length} matching products</span>
            </div>
            
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <ListFilter size={14} className="text-[var(--muted)]" />
              <span className="text-xs font-semibold text-[var(--muted)]">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-semibold focus:outline-none"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Grid display */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onQuickView={setSelectedProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[var(--border)] rounded-[32px] p-12 text-center bg-[var(--card)] flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 text-[var(--muted)] rounded-full">
                <PackageCheck size={36} />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-lg text-[var(--foreground)]">No Products Found</h3>
                <p className="text-sm text-[var(--muted)] mt-1 max-w-sm">No items fit the chosen filtering combinations. Try resetting filters to browse more.</p>
              </div>
              <button 
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>

      </div>

      {/* Quick View Hook */}
      <QuickViewModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-32">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
