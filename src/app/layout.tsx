import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const poppins = Outfit({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Morya Sports Badlapur | Best Sports Shop in Badlapur',
  description: 'Buy cricket bats, footballs, badminton rackets, custom jerseys, trophies, medals and all sports equipment at Morya Sports Badlapur. Best quality at reasonable price!',
  keywords: 'Morya Sports Badlapur, sports shop Badlapur, cricket bat Badlapur, custom jersey printing Badlapur, trophy shop Badlapur, badminton racket Badlapur, football Badlapur, sports equipment Maharashtra, Adarsh College Road Badlapur',
  metadataBase: new URL('https://moryasports.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Morya Sports Badlapur | Best Sports Shop in Badlapur',
    description: 'Cricket, football, badminton, custom jerseys, trophies & all sports equipment — best quality at reasonable price in Badlapur.',
    url: 'https://moryasports.vercel.app',
    siteName: 'Morya Sports Badlapur',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://moryasports.vercel.app/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Morya Sports Badlapur – Best Sports Shop in Badlapur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morya Sports Badlapur | Best Sports Shop in Badlapur',
    description: 'Cricket, football, badminton, custom jerseys, trophies & all sports equipment in Badlapur.',
    images: ['https://moryasports.vercel.app/og-preview.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
