'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Share2,
  Play,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { PRODUCTS } from '../../../data/mockData';
import { useCartStore } from '../../../store/cartStore';
import ProductCard from '../../../components/ProductCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  
  // Find product by id
  const product = PRODUCTS.find((p) => p.id === id);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => state.isInWishlist(id));
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const isWishlisted = mounted ? isInWishlist : false;


  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [added, setAdded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Product Not Found</h1>
        <p className="text-[var(--muted)] mt-2">The product you are looking for does not exist or has been removed.</p>
        <Link href="/shop" className="inline-block mt-6 px-6 py-2.5 bg-primary text-white rounded-xl font-bold">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, giftWrap);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, giftWrap);
    router.push('/cart');
  };

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    if (val > product.stockCount) return;
    setQuantity(val);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(`Hello Morya Sports! I would like to inquire about this item: "${product.name}" (ID: ${product.id}). Is it available for delivery in Badlapur? Link: ${window.location.href}`);
    window.open(`https://wa.me/918104812757?text=${message}`, '_blank');
  };

  // Find related products (same category, excluding current product)
  const relatedProducts = PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <div className="mb-8 flex flex-wrap items-center text-xs text-[var(--muted)] font-semibold gap-1.5">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--foreground)] truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Gallery & Video */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="relative border border-[var(--border)] rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-950/20 aspect-square w-full flex items-center justify-center">
            {showVideo && product.videoUrl ? (
              <div className="w-full h-full relative">
                <video 
                  src={product.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow"
                >
                  Show Images
                </button>
              </div>
            ) : (
              <Image 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-300"
              />
            )}
            
            {product.videoUrl && !showVideo && (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute bottom-6 right-6 flex items-center space-x-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-900 backdrop-blur text-white rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Play size={14} fill="currentColor" />
                <span>Watch Demo Video</span>
              </button>
            )}
          </div>

          {/* Thumbnail items */}
          <div className="flex space-x-3 justify-center">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveImageIndex(index);
                  setShowVideo(false);
                }}
                className={`w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border-2 transition-all cursor-pointer relative ${
                  activeImageIndex === index && !showVideo
                    ? 'border-primary scale-105 shadow-sm'
                    : 'border-[var(--border)] opacity-70 hover:opacity-100'
                }`}
              >
                <Image 
                  src={img} 
                  alt="" 
                  fill
                  sizes="64px"
                  className="object-cover" 
                />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Details & Purchase actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-[var(--accent-light)] text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
            
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <button
                onClick={handleShare}
                className="p-2.5 border border-[var(--border)] hover:bg-[var(--card)] rounded-xl text-[var(--foreground)] transition-colors cursor-pointer"
                title="Share link"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Ratings summary */}
            <div className="flex items-center space-x-2">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    className={i < Math.floor(product.rating) ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'} 
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[var(--foreground)]">{product.rating}</span>
              <span className="text-xs text-[var(--muted)]">({product.reviewsCount} verified reviews)</span>
            </div>

            {/* Price list */}
            <div className="flex items-baseline space-x-4 pt-1">
              <span className="text-3xl font-extrabold text-[var(--foreground)]">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[var(--muted)] line-through">₹{product.originalPrice}</span>
                  <span className="text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-md">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-[var(--foreground)]">Description</h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Specifications list */}
          <div className="space-y-3 border-t border-[var(--border)] pt-5">
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-[var(--foreground)]">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="font-semibold text-[var(--muted)]">Recommended Age:</span>
                <span className="font-bold text-[var(--foreground)]">{product.ageGroup}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                <span className="font-semibold text-[var(--muted)]">Brand / Manufacturer:</span>
                <span className="font-bold text-[var(--foreground)]">{product.brand}</span>
              </div>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span className="font-semibold text-[var(--muted)]">{key}:</span>
                  <span className="font-bold text-[var(--foreground)]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Security information badges */}
          <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[var(--accent-light)] text-primary rounded-xl">
                <Truck size={16} />
              </div>
              <div>
                <div className="text-[var(--foreground)]">Fast Local Delivery</div>
                <div className="text-[var(--muted)] text-[10px]">Delivered in {product.deliveryDays} day{product.deliveryDays > 1 ? 's' : ''} in Badlapur</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 dark:bg-green-950/20 text-success rounded-xl">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div className="text-[var(--foreground)]">Quality Sports Gear</div>
                <div className="text-[var(--muted)] text-[10px]">100% authentic, high quality products</div>
              </div>
            </div>
          </div>

          {/* Availability Check */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">Status</div>
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-success animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm font-bold">
                {product.inStock ? `In Stock (Only ${product.stockCount} units remaining)` : 'Temporarily Out of Stock'}
              </span>
            </div>
          </div>

          {/* Purchase Actions Container */}
          {product.inStock ? (
            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              {/* Gift wrap choice */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="prod-wrap"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-[var(--border)]"
                />
                <label htmlFor="prod-wrap" className="text-sm font-semibold text-[var(--foreground)] select-none">
                  Add gift wrapping / customization tag (+₹30) 🎁
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Quantity Select */}
                <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--background)]">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2.5 text-[var(--foreground)] hover:bg-[var(--card)] font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-5 text-sm font-bold text-[var(--foreground)]">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2.5 text-[var(--foreground)] hover:bg-[var(--card)] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition-all cursor-pointer active:scale-95 ${
                    isWishlisted ? 'text-primary' : 'text-[var(--foreground)]'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Add / Buy Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer active:scale-95 ${
                    added 
                      ? 'bg-success text-white scale-[1.02]' 
                      : 'bg-primary hover:bg-primary-hover text-white'
                  }`}
                >
                  <ShoppingCart size={18} />
                  <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-2xl bg-secondary hover:bg-secondary-hover text-slate-900 font-extrabold flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                >
                  Buy Now
                </button>
              </div>

              {/* WhatsApp Enquiry Button */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-3.5 px-6 rounded-2xl border border-success text-success hover:bg-green-50 dark:hover:bg-green-950/20 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Product Enquiry</span>
              </button>

            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              <button
                disabled
                className="w-full py-3.5 bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold rounded-2xl cursor-not-allowed"
              >
                Out of Stock
              </button>
              
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-3.5 px-6 rounded-2xl border border-success text-success hover:bg-green-50 dark:hover:bg-green-950/20 font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>WhatsApp to Request Re-stock</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-10 border-t border-[var(--border)]">
          <h2 className="text-2xl font-poppins font-extrabold text-[var(--foreground)] tracking-tight mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onQuickView={() => {}} // Simple mock on click for related items
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
