'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Product } from '../../data/mockData';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCartStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);


  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    toggleWishlist(product); // Remove from wishlist
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-32">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="inline-flex p-6 bg-slate-100 dark:bg-slate-800 text-[var(--muted)] rounded-full">
          <Heart size={48} />
        </div>
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-[var(--foreground)]">Your Wishlist is Empty</h1>
          <p className="text-sm text-[var(--muted)] mt-2">Tap the heart on products you love to save them here.</p>
        </div>
        <Link href="/shop" className="inline-block px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all shadow-md">
          Find Gear to Add
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Saved Wishlist</h1>
        <p className="text-xs text-[var(--muted)]">Manage your favorite products and move them to cart anytime</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div 
            key={product.id}
            className="group border border-[var(--border)] rounded-3xl overflow-hidden bg-[var(--card)] hover-lift flex flex-col h-full card-shadow"
          >
            {/* Image Link */}
            <Link href={`/shop/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-slate-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <button
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm text-primary rounded-full shadow border border-[var(--border)] transition-all"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </Link>

            {/* Info */}
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">{product.category}</div>
                <Link href={`/shop/${product.id}`}>
                  <h3 className="font-poppins font-bold text-sm text-[var(--foreground)] group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <div className="text-base font-extrabold text-[var(--foreground)] pt-1">₹{product.price}</div>
              </div>

              {/* Action */}
              <div className="border-t border-[var(--border)] pt-4 mt-4">
                {product.inStock ? (
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow cursor-pointer active:scale-95"
                  >
                    <ShoppingCart size={14} />
                    <span>Move to Cart</span>
                  </button>
                ) : (
                  <span className="block text-center text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 py-2 rounded-xl border border-red-200 dark:border-red-900/30">
                    Out of stock
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
