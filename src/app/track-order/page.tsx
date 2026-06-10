'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Package, CheckCircle2, Truck, MapPin,
  Clock, ShoppingBag, Phone, MessageCircle, Star,
  ChevronRight, RefreshCw, Copy, Check
} from 'lucide-react';
import { useTrackingStore, TrackedOrder, TrackingStatus } from '../../store/trackingStore';

/* ── Status config ─────────────────────────────────────────── */
const STATUS_CONFIG: Record<TrackingStatus, { icon: React.ReactNode; color: string; bg: string; ring: string }> = {
  placed: {
    icon: <ShoppingBag size={18} />,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/40',
    ring: 'ring-blue-400',
  },
  confirmed: {
    icon: <CheckCircle2 size={18} />,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-950/40',
    ring: 'ring-violet-400',
  },
  packed: {
    icon: <Package size={18} />,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/40',
    ring: 'ring-amber-400',
  },
  out_for_delivery: {
    icon: <Truck size={18} />,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/40',
    ring: 'ring-orange-400',
  },
  delivered: {
    icon: <CheckCircle2 size={18} />,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-950/40',
    ring: 'ring-green-400',
  },
};

/* ── Helper: format timestamp ──────────────────────────────── */
function fmtTime(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

/* ── Progress bar percentage ───────────────────────────────── */
const STATUS_STEPS: TrackingStatus[] = ['placed', 'confirmed', 'packed', 'out_for_delivery', 'delivered'];
function progressPct(status: TrackingStatus) {
  return (STATUS_STEPS.indexOf(status) / (STATUS_STEPS.length - 1)) * 100;
}

/* ── OrderResult component ─────────────────────────────────── */
function OrderResult({ order }: { order: TrackedOrder }) {
  const cfg = STATUS_CONFIG[order.currentStatus];
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Hi Morya Sports! I want to enquire about my order *${order.orderId}*. Customer: ${order.customerName}. Please share the latest update. 🙏`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-pop-in">

      {/* Order ID + Status Banner */}
      <div className={`p-5 rounded-3xl border ${cfg.bg} ${cfg.ring.replace('ring-', 'border-')} border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
        <div className="space-y-1">
          <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest">Order ID</div>
          <div className="flex items-center gap-2">
            <span className="font-poppins font-black text-xl text-[var(--foreground)]">{order.orderId}</span>
            <button onClick={handleCopy} title="Copy order ID" className="text-[var(--muted)] hover:text-primary transition-colors cursor-pointer">
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            </button>
          </div>
          <div className="text-xs text-[var(--muted)]">Placed on {mounted ? fmtTime(order.placedAt) : '—'}</div>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl ${cfg.bg} ${cfg.color} font-bold text-sm`}>
          {cfg.icon}
          <span className="capitalize">{order.currentStatus.replace(/_/g, ' ')}</span>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-6">
        <h3 className="font-poppins font-bold text-sm text-[var(--foreground)]">Shipment Progress</h3>

        {/* Progress bar */}
        <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-2 bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPct(order.currentStatus)}%` }}
          />
        </div>

        {/* Steps */}
        <ol className="relative space-y-0">
          {order.events.map((event, idx) => {
            const eCfg = STATUS_CONFIG[event.status];
            const isLast = idx === order.events.length - 1;
            const isCurrent = event.status === order.currentStatus;
            return (
              <li key={event.status} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Vertical connector line */}
                {!isLast && (
                  <div className={`absolute left-4 top-8 w-0.5 h-full -translate-x-1/2 ${event.done ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
                )}

                {/* Icon */}
                <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-2 ${
                  event.done
                    ? `${eCfg.bg} ${eCfg.color} ${eCfg.ring}`
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 ring-slate-200 dark:ring-slate-700'
                } ${isCurrent ? 'animate-pulse-soft' : ''}`}>
                  {event.done ? eCfg.icon : <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0 pt-0.5">
                  <div className={`font-bold text-sm ${event.done ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                    {event.label}
                    {isCurrent && (
                      <span className="ml-2 text-[9px] font-black text-primary uppercase tracking-wide border border-primary/30 rounded px-1.5 py-0.5 animate-pulse">
                        Current
                      </span>
                    )}
                  </div>
                  <div className={`text-xs mt-0.5 ${event.done ? 'text-[var(--muted)]' : 'text-slate-400'}`}>
                    {event.description}
                  </div>
                  {event.done && event.timestamp && mounted && (
                    <div className="text-[10px] text-[var(--muted)] mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {fmtTime(event.timestamp)}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Order Details Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Delivery Info */}
        <div className="border border-[var(--border)] bg-[var(--card)] p-5 rounded-3xl card-shadow space-y-3">
          <h4 className="font-bold text-xs text-[var(--muted)] uppercase tracking-widest flex items-center gap-1.5">
            <MapPin size={12} className="text-primary" /> Delivery Details
          </h4>
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-[var(--foreground)]">{order.customerName}</div>
            <div className="text-[var(--muted)] text-xs leading-relaxed">{order.customerAddress}</div>
            <div className="text-[var(--muted)] text-xs flex items-center gap-1">
              <Phone size={10} /> {order.customerPhone}
            </div>
            <div className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block bg-primary/10 text-primary">
              {order.shippingMethod === 'pickup' ? '🏪 Store Pickup' : '🚚 Home Delivery'}
            </div>
          </div>
        </div>

        {/* Items Ordered */}
        <div className="border border-[var(--border)] bg-[var(--card)] p-5 rounded-3xl card-shadow space-y-3">
          <h4 className="font-bold text-xs text-[var(--muted)] uppercase tracking-widest flex items-center gap-1.5">
            <Package size={12} className="text-primary" /> Items Ordered
          </h4>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[var(--foreground)] font-semibold text-xs truncate max-w-[160px]">{item.name} ×{item.qty}</span>
                <span className="font-bold text-[var(--foreground)]">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="border-t border-[var(--border)] pt-2 flex justify-between font-poppins font-extrabold text-sm">
              <span>Total Paid</span>
              <span className="text-primary">₹{order.grandTotal}</span>
            </div>
            <div className="text-[10px] text-[var(--muted)] font-semibold">
              Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay (UPI/Card)'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/918104812757?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-sm transition-all shadow-md hover:scale-[1.02]"
        >
          <MessageCircle size={16} />
          WhatsApp Morya Sports
        </a>
        {order.currentStatus === 'delivered' && (
          <a
            href="https://www.google.com/search?q=Morya+Sports+Badlapur+East+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-sm transition-all shadow-md hover:scale-[1.02]"
          >
            <Star size={16} />
            Leave a Google Review
          </a>
        )}
        <Link
          href="/shop"
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-2xl font-bold text-sm hover:bg-[var(--card)] transition-all"
        >
          <ShoppingBag size={16} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────── */
export default function TrackOrderPage() {
  const { getOrder } = useTrackingStore();
  const [inputId, setInputId] = useState('');
  const [searched, setSearched] = useState('');
  const [order, setOrder] = useState<TrackedOrder | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = inputId.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    setSearched(id);
    setTimeout(() => {
      setOrder(getOrder(id) ?? null);
      setLoading(false);
    }, 800); // brief simulated lookup delay
  };

  const handleReset = () => {
    setInputId('');
    setSearched('');
    setOrder(undefined);
  };

  // Demo order IDs for quick testing
  const DEMO_IDS = ['MS-482910', 'MS-103948', 'MS-504938'];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full">
          <Package size={36} className="animate-bounce-soft" />
        </div>
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">
          Track Your Order
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Enter your Order ID to get real-time delivery status, timeline, and updates from Morya Sports Badlapur.
        </p>
      </div>

      {/* Search Form */}
      <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              value={inputId}
              onChange={e => setInputId(e.target.value.toUpperCase())}
              placeholder="Enter Order ID — e.g. MS-482910"
              maxLength={12}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-bold tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !inputId.trim()}
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              'Track'
            )}
          </button>
        </form>

        {/* Demo IDs hint */}
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-[10px] text-[var(--muted)] font-semibold uppercase tracking-wide mb-2">Try Demo Order IDs:</p>
          <div className="flex flex-wrap gap-2">
            {DEMO_IDS.map(id => (
              <button
                key={id}
                onClick={() => setInputId(id)}
                className="px-3 py-1.5 text-xs font-bold border border-[var(--border)] bg-[var(--background)] hover:bg-primary/10 hover:border-primary hover:text-primary rounded-xl transition-all cursor-pointer"
              >
                {id} <ChevronRight size={10} className="inline" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Area */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[var(--muted)]">Fetching order details…</p>
        </div>
      )}

      {!loading && order === null && searched && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-8 rounded-3xl text-center space-y-4 animate-pop-in">
          <div className="text-4xl">🔍</div>
          <h3 className="font-poppins font-bold text-lg text-[var(--foreground)]">Order Not Found</h3>
          <p className="text-sm text-[var(--muted)] max-w-sm mx-auto">
            We couldn&apos;t find order <strong className="text-[var(--foreground)]">{searched}</strong>. Double-check your Order ID from the confirmation message or email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              Try Again
            </button>
            <a
              href="https://wa.me/918104812757?text=Hi%20Morya%20Sports!%20I%20need%20help%20tracking%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-green-500 text-green-600 dark:text-green-400 rounded-xl font-bold text-sm hover:bg-green-50 dark:hover:bg-green-950/20 transition-all"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      )}

      {!loading && order && <OrderResult order={order} />}

      {/* Help note at bottom */}
      {order === undefined && !loading && (
        <div className="text-center space-y-3 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: '📧', title: 'Check Your Email', desc: 'Your Order ID is in your order confirmation email from Morya Sports.' },
              { icon: '💬', title: 'WhatsApp Confirmation', desc: 'We send your Order ID via WhatsApp after checkout.' },
              { icon: '👤', title: 'My Account', desc: 'Logged-in users can find all orders under My Account → Order History.' },
            ].map((tip, i) => (
              <div key={i} className="border border-[var(--border)] bg-[var(--card)] p-4 rounded-2xl card-shadow space-y-1.5">
                <div className="text-xl">{tip.icon}</div>
                <div className="font-bold text-sm text-[var(--foreground)]">{tip.title}</div>
                <div className="text-xs text-[var(--muted)] leading-relaxed">{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
