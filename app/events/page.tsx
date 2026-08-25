'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Mic,
  Music,
  Calendar,
  CheckCircle2,
  Instagram,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReservationModal from '@/components/ReservationModal';
import SectionTransition from '@/components/SectionTransition';
import { BUSINESS_INFO, getWhatsAppLink } from '@/data/business';

export default function EventsPage() {
  const [isResModalOpen, setIsResModalOpen] = useState(false);

  const eventTypes = [
    {
      title: 'Ulang Tahun & Gathering',
      desc: 'Makan bareng keluarga dengan pilihan menu sharing signature.',
      capacity: 'Hingga 30+ Orang',
    },
    {
      title: 'Private Karaoke Party',
      desc: 'Private room ber-AC dengan layar TV dan sound system karaoke.',
      capacity: '8 – 20 Orang',
    },
    {
      title: 'Bridal Shower & Engagement',
      desc: 'Setup meja rapi untuk bridal shower, engagement, dan foto bersama.',
      capacity: '10 – 25 Orang',
    },
    {
      title: 'Arisan & Komunitas',
      desc: 'Tempat kumpul komunitas dengan snack bites, pizza, dan kopi pilihan.',
      capacity: '15 – 40 Orang',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <Navbar onOpenReservation={() => setIsResModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. EVENTS HERO                                                            */}
        {/* ========================================================================= */}
        <SectionTransition
          id="events-hero"
          animateOnMount
          className="bg-[#1D1D1B] text-[#F7F5F0] py-10 lg:py-12 border-b border-[#383834]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-2.5">
              <span className="text-xs uppercase font-sans font-semibold tracking-wider text-neutral-400">
                Events & Private Room
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Private Room & Live Music
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed max-w-2xl">
                Tersedia VIP karaoke room ber-AC untuk ulang tahun, gathering, serta makan malam berteman live acoustic.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="book-event-hero-btn"
                  onClick={() => setIsResModalOpen(true)}
                  className="bg-white text-black px-5 py-2.5 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservasi Acara</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neutral-500 text-white px-5 py-2.5 text-xs uppercase font-medium tracking-wider hover:border-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Jadwal Live Music</span>
                </motion.a>
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 2. PRIVATE ROOM & KARAOKE DETAILS                                         */}
        {/* ========================================================================= */}
        <SectionTransition
          id="private-karaoke-detail"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo */}
              <div className="lg:col-span-6 relative aspect-4/3 bg-neutral-200 border border-[#E5E0D8] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80"
                  alt="CU@CAFE Private Room and Ambiance"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs uppercase font-sans font-bold text-neutral-500 block">
                  Fasilitas VIP
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  VIP Karaoke Room
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                  Private room kedap suara untuk kenyamanan acara dan karaoke bersama rombongan.
                </p>

                <div className="space-y-2 pt-1 text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <span>Layar TV & koleksi lagu karaoke lengkap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <span>AC ruangan khusus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <span>Layanan pesanan makanan & minuman ke dalam ruangan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <span>Kapasitas hingga 20+ orang</span>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    id="book-karaoke-btn"
                    onClick={() => setIsResModalOpen(true)}
                    className="bg-black text-white px-5 py-2.5 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Cek Ketersediaan Room
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 3. EVENT ACCOMMODATIONS                                                   */}
        {/* ========================================================================= */}
        <SectionTransition
          id="event-packages"
          className="py-10 lg:py-12 bg-[#1D1D1B] text-[#F7F5F0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-6">
              <span className="text-xs uppercase font-sans font-semibold text-neutral-400 block mb-1">
                Untuk Berbagai Acara
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Ulang Tahun, Arisan, & Gathering
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventTypes.map((event, idx) => (
                <motion.div
                  key={event.title}
                  id={`event-type-card-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -2 }}
                  className="p-4 sm:p-5 bg-[#292A28] border border-[#383834] flex flex-col justify-between space-y-2.5 transition-colors hover:border-neutral-500"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-base text-white">
                        {event.title}
                      </h3>
                      <span className="text-[10px] uppercase px-2 py-0.5 bg-[#11110F] text-neutral-300 border border-neutral-700 font-sans">
                        {event.capacity}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {event.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#383834]">
                    <a
                      href={getWhatsAppLink({
                        type: 'event',
                        eventType: event.title,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase font-semibold text-white hover:underline inline-flex items-center gap-1"
                    >
                      <span>Info Reservasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 4. LIVE MUSIC NIGHTS                                                      */}
        {/* ========================================================================= */}
        <SectionTransition
          id="live-music-info"
          className="py-10 lg:py-12 bg-[#F7F5F0] text-[#11110F] border-t border-[#E5E0D8]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Live Acoustic Music
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 font-sans max-w-md mx-auto leading-relaxed">
              Nikmati makan malam dengan iringan live acoustic. Jadwal lengkap diumumkan di Instagram kami.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="insta-follow-btn"
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-2.5 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram @cuatcafe</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsResModalOpen(true)}
                className="border border-neutral-400 text-black px-5 py-2.5 text-xs uppercase font-medium tracking-wider hover:border-black transition-colors cursor-pointer"
              >
                Booking Meja
              </motion.button>
            </div>
          </div>
        </SectionTransition>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isResModalOpen}
        onClose={() => setIsResModalOpen(false)}
        defaultType="event"
      />
    </div>
  );
}
