import React from 'react';
import Link from 'next/link';
import { ChevronRight, PackageOpen } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../../../data/mockData';
import ProductCard from '../../../components/ProductCard';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = CATEGORIES.find(c => c.slug === slug);
  return {
    title: categoryData ? `${categoryData.name} Gear & Equipment | Morya Sports` : 'Category Not Found | Morya Sports',
    description: categoryData ? `${categoryData.desc} Find high-quality ${categoryData.name.toLowerCase()} products at Morya Sports Badlapur.` : 'Browse premium sports gear and accessories.',
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Find category metadata
  const categoryData = CATEGORIES.find(c => c.slug === slug);
  
  // Filter products by category matching name
  const filteredProducts = PRODUCTS.filter(p => {
    if (!categoryData) return false;
    return p.category.toLowerCase() === categoryData.name.toLowerCase();
  });

  if (!categoryData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Category Not Found</h1>
        <p className="text-[var(--muted)] mt-2">The product collection you are looking for does not exist.</p>
        <Link href="/shop" className="inline-block mt-6 px-6 py-2.5 bg-primary text-white rounded-xl font-bold">
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center text-xs text-[var(--muted)] font-semibold gap-1.5">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--foreground)]">{categoryData.name}</span>
      </div>

      {/* Category Landing Banner */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12 mb-10 card-shadow relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
        <div className="text-6xl p-6 bg-[var(--background)] rounded-3xl shadow-sm flex-shrink-0">
          {categoryData.image}
        </div>
        <div className="space-y-3 text-center md:text-left flex-grow">
          <h1 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight">
            {categoryData.name} Collection
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
            {categoryData.desc} Discover premium equipment, athletic wear, and customized team products. Free local delivery available within Badlapur.
          </p>
        </div>
      </div>

      {/* Products list grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onQuickView={() => {}} // Simple fallback
            />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[var(--border)] rounded-[32px] p-12 text-center bg-[var(--card)] flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 text-[var(--muted)] rounded-full">
            <PackageOpen size={36} />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-lg text-[var(--foreground)]">Coming Soon!</h3>
            <p className="text-xs text-[var(--muted)] mt-1 max-w-xs">We are currently stocking up our online inventory for {categoryData.name}. In the meantime, message us on WhatsApp to check store inventory!</p>
          </div>
          <a 
            href={`https://wa.me/918104812757?text=Hi%20Morya%20Sports,%20do%20you%20have%20stock%20for%20items%20in%20the%20${encodeURIComponent(categoryData.name)}%20category?`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-success hover:bg-green-600 text-white rounded-xl text-xs font-bold transition-all shadow"
          >
            WhatsApp Store Inquiry
          </a>
        </div>
      )}

    </div>
  );
}
