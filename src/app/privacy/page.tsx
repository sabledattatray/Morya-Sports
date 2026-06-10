import React from 'react';
import Link from 'next/link';
import { Lock, EyeOff } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Morya Sports Badlapur',
  description: 'Privacy Policy for Morya Sports Badlapur. Learn how we collect, protect, and handle your order information, delivery coordinates, and payment data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2 text-center">
        <div className="text-xs text-[var(--muted)] font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">Privacy Policy</span>
        </div>
        <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-[var(--muted)]">How we protect your personal information at Morya Sports</p>
      </div>

      <div className="border border-[var(--border)] bg-[var(--card)] rounded-3xl p-6 sm:p-8 card-shadow space-y-8 text-sm text-[var(--foreground)] leading-relaxed">
        
        {/* Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <Lock size={24} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">Secure Data Handling</h3>
              <p className="text-xs text-[var(--muted)] mt-1">We encrypt all personal checkouts and never store complete card info on our local servers.</p>
            </div>
          </div>
          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-start space-x-3">
            <EyeOff size={24} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-poppins font-bold text-sm">No Third-Party Sharing</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Your phone number and delivery address are strictly used for delivery coordination.</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">1. Personal Information Collected</h2>
            <p>
              When you purchase products online, check out, or contact us, we collect standard customer coordinates necessary to arrange your orders and delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--muted)]">
              <li>Full Name</li>
              <li>Delivery Address in Badlapur (or outside)</li>
              <li>Phone Number (for WhatsApp transaction updates)</li>
              <li>Email Address (for order receipt and dispatch notifications)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">2. How We Use Data</h2>
            <p>
              Your coordinates are utilized solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--muted)]">
              <li>Deliver products directly to your doorstep.</li>
              <li>Coordinate return order pick-ups.</li>
              <li>Send transaction updates via WhatsApp business API integration (ERP notifications).</li>
              <li>Send discount offers or holiday event listings (with clear opt-out links).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">3. Data Integrity & Payment Protection</h2>
            <p>
              We prioritize data safety. Payments are processed securely via leading UPI gateways and payment aggregators. No financial details (PINs, card numbers, OTPs) are stored on our servers. All information travels encrypted through secure protocols.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-poppins font-bold text-base text-primary">4. Cookies Policy</h2>
            <p>
              Our website uses cookies to keep track of items saved in your Shopping Cart, Wishlist selections, and store local preferences (such as light/dark mode).
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
