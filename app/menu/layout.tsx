import type { Metadata } from 'next';
import { BUSINESS_INFO } from '@/data/business';
import { ALL_MENU_ITEMS, MENU_CATEGORIES } from '@/data/menu';

export const metadata: Metadata = {
  title: 'Daftar Menu & Harga | CU@CAFE Kota Wisata',
  description:
    'Daftar menu dan harga lengkap CU@CAFE Kota Wisata Cibubur. Nikmati aneka sajian Main Signature BBQ, steak rib eye, pizza, sushi, ramen, bites, kopi, dan minuman segar.',
  keywords: [
    'Menu CU@CAFE Kota Wisata',
    'Harga Menu CU@CAFE',
    'Makanan CU@CAFE Cibubur',
    'Steak Kota Wisata',
    'Ramen Kota Wisata',
    'Pizza Kota Wisata',
    'Kopi Kota Wisata',
  ],
  openGraph: {
    title: 'Daftar Menu & Harga | CU@CAFE Kota Wisata',
    description:
      'Daftar menu dan harga lengkap CU@CAFE Kota Wisata Cibubur. Nikmati aneka sajian Main Signature BBQ, steak rib eye, pizza, sushi, ramen, bites, kopi, dan minuman segar.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'CU@CAFE Kota Wisata',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar Menu & Harga | CU@CAFE Kota Wisata',
    description:
      'Pilihan menu lengkap mulai dari hidangan utama internasional, pizza, ramen, hingga kopi dan dessert di Cluster Amsterdam, Kota Wisata Cibubur.',
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Menu structured data for enhanced SEO
  const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Menu ${BUSINESS_INFO.name}`,
    description: `Daftar menu lengkap hidangan dan minuman di ${BUSINESS_INFO.name}, Cluster Amsterdam, Kota Wisata.`,
    inLanguage: 'id',
    hasMenuSection: MENU_CATEGORIES.map((cat) => {
      const itemsInCat = ALL_MENU_ITEMS.filter((item) => item.category === cat.id);
      return {
        '@type': 'MenuSection',
        name: cat.name,
        description: cat.description,
        hasMenuItem: itemsInCat.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: item.price.replace('K', '000').split(' / ')[0],
            priceCurrency: 'IDR',
          },
        })),
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      {children}
    </>
  );
}
