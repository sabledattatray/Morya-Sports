import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Order | Morya Sports Badlapur',
  description: 'Real-time delivery tracking for your sports gear orders in Badlapur. Enter your order ID to check your delivery status.',
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
