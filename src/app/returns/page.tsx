'use client';

import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck } from 'lucide-react';

export default function ReturnsRefundsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2 text-center">
        <div className="text-xs text-[var(--muted)] font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">Returns & Refunds</span>
        </div>
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Returns & Refunds Policy</h1>
        <p className="text-xs text-[var(--muted)]">Easy returns and quick refunds for our local customers</p>
      </div>

      <div className="border border-[var(--border)] bg-[var(--card)] rounded-3xl p-6 sm:p-8 card-shadow space-y-8 text-sm text-[var(--foreground)] leading-relaxed">
        
        {/* Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <RotateCcw size={24} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">7-Day Easy Return</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Return unused sports products in their original packaging within 7 days of delivery.</p>
            </div>
          </div>
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <ShieldCheck size={24} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">Defect Protection</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Got a defective product or missing parts? We will replace it instantly with zero questions.</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">1. Return Eligibility Window</h2>
            <p>
              We want you to love your sports gear! If you change your mind, we accept returns on items within <strong>7 days</strong> of purchase/delivery, provided the item is unused, and in its original packaging with all parts intact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">2. Non-Returnable Items</h2>
            <p>
              Certain categories are non-returnable once opened or custom-made:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--muted)]">
              <li>Custom printed team jerseys and customized trophies.</li>
              <li>Items showing clear signs of physical play (e.g. used cricket bats, worn shoes).</li>
              <li>Products with broken tags or original packaging missing.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">3. Return Process</h2>
            <p>
              You can return items in two convenient ways:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--muted)]">
              <li><strong>In-Store Drop:</strong> Bring the item directly to our store (Shop No 15, Bebika Palace, Adarsh College Road, Badlapur East) along with the bill. This is the fastest method, and exchanges can be processed instantly.</li>
              <li><strong>Local Pickup:</strong> Request a local courier pickup through WhatsApp. A pickup charge of ₹50 may apply.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">4. Refunds Timeline</h2>
            <p>
              Once your returned item is inspected at our store, refunds are processed within <strong>3 to 5 business days</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--muted)]">
              <li><strong>Card/Online Payments:</strong> Refund will be credited back to your bank account.</li>
              <li><strong>Cash on Delivery (COD) / UPI:</strong> Refund will be sent to your Google Pay, PhonePe, or Paytm account.</li>
              <li><strong>Store Credit:</strong> You can also choose to receive store credit coupons with lifetime validity.</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}
