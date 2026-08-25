import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
import { BUSINESS_INFO } from '@/data/business';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'CU@CAFE Kota Wisata | International Casual Dining & Modern Chill Hangout',
  description:
    'Deliver the world to your table. Restoran-kafe internasional casual dining di Cluster Amsterdam, Kota Wisata Cibubur. Nikmati menu Western, Japanese, Italian, & Nusantara, coffee shop, private karaoke room, dan live music.',
  keywords: [
    'CU@CAFE Kota Wisata',
    'Kafe Kota Wisata',
    'Restoran Cibubur',
    'Chicken Union',
    'Cluster Amsterdam Kota Wisata',
    'AEON Mall Kota Wisata Cafe',
    'Casual Dining Bogor',
    'Private Room Karaoke Kota Wisata',
    'Live Music Cafe Kota Wisata',
  ],
  authors: [{ name: 'CU@CAFE Kota Wisata presented by Chicken Union' }],
  openGraph: {
    title: 'CU@CAFE Kota Wisata — Deliver the world to your table',
    description:
      'International Casual Dining Experience di Kota Wisata Cibubur. Pilihan menu lengkap dari steak, pasta, ramen, sushi hingga artisan coffee.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'CU@CAFE Kota Wisata',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CU@CAFE Kota Wisata — Casual Dining & Chill Destination',
    description:
      'Restoran-kafe internasional casual dining di Cluster Amsterdam, Kota Wisata Cibubur.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BUSINESS_INFO.name,
    description: 'International Casual Dining Experience & Modern Chill Hangout Destination',
    servesCuisine: ['International', 'Western', 'Japanese', 'Italian', 'Indonesian'],
    priceRange: '$$',
    telephone: '+628111113446',
    url: 'https://cuatcafe.id',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Wisata Utama No. 30 Blok I1, Cluster Amsterdam',
      addressLocality: 'Gunung Putri, Kabupaten Bogor',
      addressRegion: 'Jawa Barat',
      postalCode: '16968',
      addressCountry: 'ID',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '23:00',
      },
    ],
  };

  return (
    <html lang="id" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7F5F0] text-[#11110F] font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
