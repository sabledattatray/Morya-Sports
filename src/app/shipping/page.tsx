'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Clock } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2 text-center">
        <div className="text-xs text-[var(--muted)] font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">Shipping Policy</span>
        </div>
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Shipping & Delivery Policy</h1>
        <p className="text-xs text-[var(--muted)]">Fast and secure local delivery services across Badlapur</p>
      </div>

      <div className="border border-[var(--border)] bg-[var(--card)] rounded-3xl p-6 sm:p-8 card-shadow space-y-8 text-sm text-[var(--foreground)] leading-relaxed">
        
        {/* Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <Truck size={24} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">Free Local Delivery</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Free delivery inside Badlapur for orders above ₹999. Flat ₹50 for orders below.</p>
            </div>
          </div>
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <Clock size={24} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">Express Timelines</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Delivered to your doorstep in 24 to 48 hours within Badlapur East & West.</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">1. Local Delivery in Badlapur</h2>
            <p>
              As Badlapur&apos;s favorite sports shop, we operate our own direct home delivery network to serve local athletes and clubs quickly. We deliver to all areas across Badlapur East, Badlapur West, Katrap, Belavali, Shirgaon, and Kharvai.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">2. Shipping Charges</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--muted)]">
              <li><strong>Orders Above ₹999:</strong> FREE Delivery anywhere within Badlapur limit.</li>
              <li><strong>Orders Below ₹999:</strong> A flat delivery charge of ₹50 applies.</li>
              <li><strong>Store Pickup:</strong> Always free. You can choose &quot;Store Self Pickup&quot; at checkout and collect your pre-packed order in 4 hours from Bebika Palace, Adarsh College Road, Badlapur East.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">3. Delivery Timings & Schedule</h2>
            <p>
              Orders are dispatched twice daily (12:00 PM and 6:00 PM). Local orders are generally delivered within 24 to 48 hours. If you require urgent same-day delivery for a match or tournament, please contact us directly on WhatsApp after placing your order, and we will do our best to accommodate.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">4. Order Tracking via WhatsApp ERP</h2>
            <p>
              Our store is integrated with a custom WhatsApp ERP system. Once your order is dispatched, you will receive automated status notifications on your registered WhatsApp number, including the delivery executive&apos;s contact details.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
