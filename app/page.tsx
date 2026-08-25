'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Calendar,
  Phone,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Star,
  Quote,
  Mic,
  Music,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReservationModal from '@/components/ReservationModal';
import WhatsAppWishlistFloat from '@/components/WhatsAppWishlistFloat';
import DishCard from '@/components/DishCard';
import SectionTransition from '@/components/SectionTransition';
import { ALL_MENU_ITEMS, MenuItem } from '@/data/menu';
import { BUSINESS_INFO, getWhatsAppLink, getCurrentOpenStatus } from '@/data/business';

export default function HomePage() {
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const status = getCurrentOpenStatus();

  const handleToggleWishlist = (item: MenuItem) => {
    setWishlist((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleQuickOrder = (item: MenuItem) => {
    const link = getWhatsAppLink({
      type: 'menu',
      dishes: [`${item.name} (${item.categoryName}) - ${item.price}`],
    });
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // 6 curated highlight dishes for Home
  const homeFeatured = ALL_MENU_ITEMS.filter((item) =>
    [
      'american-smoked-chicken',
      'rib-eyed-steak-meltique',
      'beef-negi-ramen',
      'dynamite-rolls',
      'beef-mushroom-pesto-pizza',
      'classic-betawie-soup',
    ].includes(item.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <Navbar onOpenReservation={() => setIsResModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Clean, Focused, Food First)                             */}
        {/* ========================================================================= */}
        <SectionTransition
          id="hero-section"
          animateOnMount
          className="bg-[#1D1D1B] text-[#F7F5F0] border-b border-[#383834]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
              {/* Left: Headline & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="lg:col-span-7 space-y-5"
              >
                <div className="inline-flex items-center gap-2 text-xs uppercase font-sans tracking-wider text-neutral-400">
                  <span>Kota Wisata Cibubur</span>
                  <span>•</span>
                  <span>Pilihan Menu</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  Deliver the world <br />
                  <span className="italic font-normal text-[#E5E0D8]">
                    to your table.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed max-w-xl">
                  Casual dining dengan aneka hidangan American BBQ smoked chicken, steak, ramen, hingga kuliner Nusantara.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1.5">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                    <Link
                      id="hero-view-menu-btn"
                      href="/menu"
                      className="bg-white text-black px-6 py-3 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 w-full text-center"
                    >
                      <span>Lihat Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>

                  <motion.button
                    id="hero-book-table-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsResModalOpen(true)}
                    className="border border-neutral-500 text-white px-6 py-3 text-xs uppercase font-medium tracking-wider hover:border-white transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservasi Meja</span>
                  </motion.button>
                </div>

                {/* Quick Info Strip */}
                <div className="pt-5 sm:pt-6 border-t border-[#383834] grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 text-xs font-sans text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Jam Buka</p>
                      <p className="text-neutral-400 text-[11px]">08.00 – 22.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Lokasi</p>
                      <p className="text-neutral-400 text-[11px]">Cluster Amsterdam</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Rating 4.9 / 5.0</p>
                      <p className="text-neutral-400 text-[11px]">3.700+ Ulasan</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Clean Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="lg:col-span-5"
              >
                <div className="relative aspect-4/3 sm:aspect-16/11 bg-neutral-900 border border-[#383834] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                    alt="Signature Steak and Smoked Chicken CU@CAFE"
                    fill
                    priority
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#11110F]/90 text-white text-[11px] font-sans px-2.5 py-1 border border-neutral-700">
                    Signature Smoked Chicken & Steak Meltique
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 2. CUISINE PILLARS (Clean, scannable)                                     */}
        {/* ========================================================================= */}
        <SectionTransition
          id="world-cuisine-section"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-6">
              <span className="text-xs uppercase font-sans font-bold text-neutral-500 block mb-1">
                Kategori Menu
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Pilihan Rasa Favorit
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  code: '01 · BBQ',
                  title: 'Smoked Chicken',
                  desc: 'Ayam asap slow-cooked dengan aroma kayu bakar khas.',
                },
                {
                  code: '02 · Western',
                  title: 'Steak & Pizza',
                  desc: 'Meltique Rib Eye lembut dan pizza sourdough panggang.',
                },
                {
                  code: '03 · Japanese',
                  title: 'Ramen & Sushi',
                  desc: 'Tokyo ramen gurih dan aneka sushi roll pilihan.',
                },
                {
                  code: '04 · Nusantara',
                  title: 'Soto & Kopi',
                  desc: 'Soto Betawi rempah dan es kopi artisan.',
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -3 }}
                  className="bg-white p-4.5 border border-[#E5E0D8] space-y-1.5 transition-shadow hover:shadow-xs"
                >
                  <span className="text-[11px] font-bold uppercase font-sans text-neutral-400 block">
                    {pillar.code}
                  </span>
                  <h3 className="font-sans font-bold text-base text-black">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 3. FEATURED DISHES GRID                                                   */}
        {/* ========================================================================= */}
        <SectionTransition
          id="featured-dishes-section"
          className="py-10 lg:py-14 bg-[#1D1D1B] text-[#F7F5F0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#383834] gap-4">
              <div>
                <span className="text-xs uppercase font-sans font-semibold text-neutral-400 block mb-1">
                  Menu Unggulan
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Pilihan Rekomendasi
                </h2>
              </div>
              <Link
                id="view-full-catalog-link"
                href="/menu"
                className="text-xs uppercase font-semibold text-white hover:underline flex items-center gap-1.5"
              >
                <span>Lihat Semua Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Grid 6 items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {homeFeatured.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col"
                >
                  {item.image && (
                    <div className="relative aspect-16/10 bg-neutral-800 border-t border-x border-[#383834] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <DishCard
                    item={item}
                    darkSurface
                    isInWishlist={wishlist.some((i) => i.id === item.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickOrder={handleQuickOrder}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#292A28] border border-[#383834] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-sans font-bold text-sm text-white">
                  Ingin info menu atau reservasi?
                </p>
                <p className="text-xs text-neutral-400 font-sans">
                  Staf kami siap membantu via WhatsApp.
                </p>
              </div>
              <motion.a
                id="featured-wa-chat-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={getWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-200 transition-colors shrink-0"
              >
                Chat WhatsApp
              </motion.a>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 4. FASILITAS, PRIVATE ROOM & LIVE MUSIC                                   */}
        {/* ========================================================================= */}
        <SectionTransition
          id="facilities-section"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-6">
              <span className="text-xs uppercase font-sans font-bold text-neutral-500 block mb-1">
                Fasilitas
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Ruang Privat & Hiburan
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Private Room Karaoke */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -2 }}
                className="p-5 bg-[#11110F] text-white space-y-3 transition-transform"
              >
                <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase font-sans">
                  <Mic className="w-4 h-4 text-white" />
                  <span>VIP Karaoke Room</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-white">
                  Ruang Privat (Kapasitas s.d. 20+ Orang)
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Sound system karaoke jernih, AC privat, dan layanan menu langsung. Ideal untuk ulang tahun, gathering, dan arisan.
                </p>
                <div className="pt-1">
                  <Link
                    id="home-events-link"
                    href="/events"
                    className="text-xs uppercase font-semibold text-white underline hover:opacity-80 inline-flex items-center gap-1"
                  >
                    <span>Info Ruang Acara</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>

              {/* Live Music Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -2 }}
                className="p-5 bg-white border border-[#E5E0D8] space-y-3 transition-transform"
              >
                <div className="flex items-center gap-2 text-xs text-neutral-600 uppercase font-sans">
                  <Music className="w-4 h-4 text-black" />
                  <span>Live Music</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-black">
                  Musik Akustik Akhir Pekan
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  Suasana santai santap malam bersama musisi pilihan. Cek jadwal live music di Instagram @cuatcafe.
                </p>
                <div className="pt-1">
                  <a
                    id="home-insta-livemusic-link"
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold text-black underline hover:opacity-80 inline-flex items-center gap-1"
                  >
                    <span>Instagram @cuatcafe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 5. TESTIMONIALS (Clean & high trust)                                     */}
        {/* ========================================================================= */}
        <SectionTransition
          id="social-proof-section"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-4 p-5 bg-white border border-[#E5E0D8] space-y-1.5"
              >
                <span className="text-xs uppercase font-sans font-bold text-neutral-500 block">
                  Ulasan Tamu
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-3xl font-bold text-black">4.9</span>
                  <span className="text-neutral-400 text-xs">/ 5.0</span>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 font-sans pt-0.5">
                  Berdasarkan <strong>3.700+ ulasan</strong> Google Maps.
                </p>
              </motion.div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {BUSINESS_INFO.testimonials.map((t, idx) => (
                  <motion.div
                    key={idx}
                    id={`testimonial-quote-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    className="p-4 bg-white border border-[#E5E0D8] space-y-2"
                  >
                    <p className="text-xs text-neutral-700 font-sans italic leading-relaxed">
                      “{t.quote}”
                    </p>
                    <div className="border-t border-neutral-100 pt-1.5 text-[11px]">
                      <p className="font-bold text-black">{t.author}</p>
                      <p className="text-neutral-500">{t.occasion}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 6. BOTTOM RESERVATION CTA                                                 */}
        {/* ========================================================================= */}
        <SectionTransition
          id="reservation-cta-section"
          className="py-10 lg:py-12 bg-[#1D1D1B] text-[#F7F5F0] text-center"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Reservasi Meja
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-md mx-auto">
              Buka setiap hari mulai 08.00 WIB. Hubungi kami untuk pesan meja atau ruang privat.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                id="cta-open-res-modal-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsResModalOpen(true)}
                className="w-full sm:w-auto bg-white text-black px-6 py-2.5 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Sekarang</span>
              </motion.button>
              <motion.a
                id="cta-direct-wa-call-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={getWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-neutral-500 text-white px-6 py-2.5 text-xs uppercase font-medium tracking-wider hover:border-white transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {BUSINESS_INFO.phone}</span>
              </motion.a>
            </div>
          </div>
        </SectionTransition>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isResModalOpen}
        onClose={() => setIsResModalOpen(false)}
      />

      <WhatsAppWishlistFloat
        wishlist={wishlist}
        onRemoveItem={(id) => setWishlist((prev) => prev.filter((i) => i.id !== id))}
        onClearWishlist={() => setWishlist([])}
      />
    </div>
  );
}
