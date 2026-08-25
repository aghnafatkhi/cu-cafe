'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReservationModal from '@/components/ReservationModal';
import SectionTransition from '@/components/SectionTransition';
import { BUSINESS_INFO } from '@/data/business';

export default function AboutPage() {
  const [isResModalOpen, setIsResModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <Navbar onOpenReservation={() => setIsResModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. ABOUT HERO                                                             */}
        {/* ========================================================================= */}
        <SectionTransition
          id="about-hero"
          animateOnMount
          className="bg-[#1D1D1B] text-[#F7F5F0] py-10 lg:py-12 border-b border-[#383834]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-2.5">
              <span className="text-xs uppercase font-sans font-semibold tracking-wider text-neutral-400">
                Tentang CU@CAFE
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Membawa Rasa Dunia ke Meja Anda.
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed max-w-2xl">
                Destinasi casual dining di Kota Wisata dengan pilihan American BBQ, masakan Barat, kuliner Jepang, hingga menu Nusantara.
              </p>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 2. CULINARY PHILOSOPHY                                                    */}
        {/* ========================================================================= */}
        <SectionTransition
          id="about-philosophy-section"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left narrative */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs uppercase font-sans font-bold text-neutral-500 block">
                  Filosofi
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  Resep & Bahan Segar
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                  Setiap menu dibuat dengan resep original dan bahan pilihan, cocok untuk kumpul keluarga maupun teman.
                </p>

                <div className="space-y-2.5 pt-1">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 bg-white border border-[#E5E0D8] transition-shadow hover:shadow-xs"
                  >
                    <h3 className="font-sans font-bold text-sm text-black">
                      Slow-Cooked Smoked Chicken 6 Jam
                    </h3>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Dimarinasi rempah 24 jam dan diasapi dengan kayu bakar untuk kelembutan maksimal.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 bg-white border border-[#E5E0D8] transition-shadow hover:shadow-xs"
                  >
                    <h3 className="font-sans font-bold text-sm text-black">
                      Variasi Western, Japanese, & Nusantara
                    </h3>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Mulai dari Rib Eye Meltique, Tokyo Ramen, hingga Soto Betawi kaya rempah.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Right visual */}
              <div className="lg:col-span-6 space-y-2">
                <div className="relative aspect-4/3 bg-neutral-200 border border-[#E5E0D8] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80"
                    alt="CU@CAFE Culinary Craftsmanship"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs text-neutral-500 text-right">
                  Cluster Amsterdam No. 30, Kota Wisata Cibubur
                </p>
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 3. ATMOSFER & FASILITAS                                                   */}
        {/* ========================================================================= */}
        <SectionTransition
          id="about-space-experience"
          className="py-10 lg:py-12 bg-[#1D1D1B] text-[#F7F5F0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-6">
              <span className="text-xs uppercase font-sans font-semibold text-neutral-400 block mb-1">
                Suasana
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Fasilitas & Kenyamanan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -3 }}
                className="p-4.5 bg-[#292A28] border border-[#383834] space-y-1.5 transition-colors hover:border-neutral-500"
              >
                <h3 className="font-sans font-bold text-base text-white">
                  Indoor & Outdoor
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Area ber-AC yang nyaman serta area outdoor untuk bersantai.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -3 }}
                className="p-4.5 bg-[#292A28] border border-[#383834] space-y-1.5 transition-colors hover:border-neutral-500"
              >
                <h3 className="font-sans font-bold text-base text-white">
                  WiFi & Colokan
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Koneksi internet stabil dan stopkontak untuk santai maupun bekerja.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -3 }}
                className="p-4.5 bg-[#292A28] border border-[#383834] space-y-1.5 transition-colors hover:border-neutral-500"
              >
                <h3 className="font-sans font-bold text-base text-white">
                  VIP Karaoke Room
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Private room dengan sound system karaoke untuk acara rombongan.
                </p>
              </motion.div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 4. VISITING CTA                                                           */}
        {/* ========================================================================= */}
        <SectionTransition
          id="about-visit-cta"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] text-center border-t border-[#E5E0D8]"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Kunjungi Kami
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-md mx-auto">
              Buka setiap hari mulai 08.00 WIB di Cluster Amsterdam No. 30, Kota Wisata Cibubur.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsResModalOpen(true)}
                className="bg-black text-white px-6 py-2.5 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reservasi Meja
              </motion.button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/menu"
                  className="border border-neutral-400 text-black px-6 py-2.5 text-xs uppercase font-medium tracking-wider hover:border-black transition-colors inline-block"
                >
                  Lihat Menu
                </Link>
              </motion.div>
            </div>
          </div>
        </SectionTransition>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isResModalOpen}
        onClose={() => setIsResModalOpen(false)}
      />
    </div>
  );
}
