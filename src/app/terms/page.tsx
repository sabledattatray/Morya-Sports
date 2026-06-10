'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2 text-center">
        <div className="text-xs text-[var(--muted)] font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">Terms of Service</span>
        </div>
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Terms of Service</h1>
        <p className="text-xs text-[var(--muted)]">Operating rules and agreements for shopping at Morya Sports</p>
      </div>

      <div className="border border-[var(--border)] bg-[var(--card)] rounded-3xl p-6 sm:p-8 card-shadow space-y-8 text-sm text-[var(--foreground)] leading-relaxed">
        
        {/* Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <Scale size={24} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">Legal Framework</h3>
              <p className="text-xs text-[var(--muted)] mt-1">These terms define the transactional rules between Morya Sports and you as a shopper.</p>
            </div>
          </div>
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <FileText size={24} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">Transparent Pricing</h3>
              <p className="text-xs text-[var(--muted)] mt-1">We strive for exact inventory values and match online bookings with our brick-and-mortar store.</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">1. Agreement to Terms</h2>
            <p>
              By accessing our website and buying products from Morya Sports, you agree to comply with and be bound by these Terms of Service. If you disagree, please do not use our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">2. Pricing & Product Accuracy</h2>
            <p>
              We sell sports equipment, sportswear, custom jerseys and trophies. While we strive to show accurate inventory levels, specifications, and prices (including discounts), typographical errors or systems delay may occur. In such events, Morya Sports reserves the right to cancel or request verification on orders before delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">3. Bulk Orders & Custom Jersey Printing</h2>
            <p>
              Orders of custom jerseys or bulk trophies require a minimum processing time of **5–7 working days**. Custom printed team jerseys cannot be canceled once design sublimation/printing has commenced.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">4. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Maharashtra, India, and any disputes shall be settled in the jurisdiction of Kalyan/Thane district courts.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
