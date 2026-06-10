import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Wishlist | Morya Sports Badlapur',
  description: 'View and manage your saved sports equipment, customized apparel, and tournament awards at Morya Sports Badlapur.',
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
