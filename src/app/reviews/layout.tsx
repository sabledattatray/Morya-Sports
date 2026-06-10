import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials | Morya Sports Badlapur',
  description: 'Read real customer ratings and testimonials about Morya Sports. Learn why school coaches, clubs, and local players rate us 5.0 out of 5 for quality sports gear.',
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
