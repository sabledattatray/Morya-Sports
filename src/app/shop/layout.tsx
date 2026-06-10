import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Sports Gear & Custom Wear Online | Morya Sports Badlapur',
  description: 'Shop authentic cricket kits, footballs, badminton rackets, fitness accessories, trophies, and sublimation team jerseys. Express local delivery in Badlapur.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
