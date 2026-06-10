import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Offers & Tournament Deals | Morya Sports Badlapur',
  description: 'Explore active discounts, seasonal deals, and team order coupon codes on genuine sports gear, custom jerseys, and trophies at Morya Sports Badlapur.',
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
