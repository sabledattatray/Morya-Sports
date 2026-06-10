import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Morya Sports Badlapur',
  description: 'Review items in your shopping cart and proceed to secure checkout for express local delivery in Badlapur.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
