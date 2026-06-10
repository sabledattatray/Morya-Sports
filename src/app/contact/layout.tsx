import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Store Location | Morya Sports Badlapur',
  description: 'Contact Morya Sports Badlapur at Adarsh College Road for custom jersey printing, bulk trophy orders, or directions to our flagship store. Call 08104812757.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
