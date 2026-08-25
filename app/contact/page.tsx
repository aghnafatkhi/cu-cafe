'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Instagram, Send, Navigation, ZoomIn, Lock, Unlock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReservationModal from '@/components/ReservationModal';
import SectionTransition from '@/components/SectionTransition';
import { BUSINESS_INFO, getCurrentOpenStatus } from '@/data/business';

export default function ContactPage() {
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [status, setStatus] = useState({
    isOpen: true,
    statusText: 'Buka · 08:00 – 22:00 WIB',
    closingSoon: false,
  });
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formSubject, setFormSubject] = useState('Pertanyaan Umum / Info Menu');
  const [formMessage, setFormMessage] = useState('');
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  useEffect(() => {
    const update = () => {
      const live = getCurrentOpenStatus();
      setStatus({
        isOpen: live.isOpen,
        statusText: live.statusText,
        closingSoon: live.closingSoon,
      });
      setCurrentDayIndex(live.currentDaySchedule.dayIndex);
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted =
      `Halo CU@CAFE Kota Wisata,\n\n` +
      `• Nama: ${formName || '-'}\n` +
      `• Topik: ${formSubject}\n` +
      `• Pesan: ${formMessage}\n\n` +
      `Terima kasih!`;

    const link = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(formatted)}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <Navbar onOpenReservation={() => setIsResModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. CONTACT HERO                                                           */}
        {/* ========================================================================= */}
        <SectionTransition
          id="contact-hero"
          animateOnMount
          className="bg-[#1D1D1B] text-[#F7F5F0] py-10 lg:py-12 border-b border-[#383834]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs uppercase font-sans font-semibold tracking-wider text-neutral-400">
                Kontak & Lokasi
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Hubungi & Kunjungi Kami
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-lg">
                Cluster Amsterdam No. 30, Kota Wisata Cibubur. Hubungi kami untuk reservasi atau pertanyaan seputar menu.
              </p>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 2. SCHEDULE & CONTACT DETAILS                                            */}
        {/* ========================================================================= */}
        <SectionTransition
          id="contact-details-grid"
          className="py-10 lg:py-14 bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Col: Info & Schedule */}
              <div className="lg:col-span-7 space-y-6">
                {/* Live Status Card */}
                <div className="p-5 bg-white border border-[#E5E0D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-sans font-bold text-neutral-500">
                      Status Operasional
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-sans font-semibold ${
                        status.isOpen
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          status.isOpen ? 'bg-emerald-600' : 'bg-neutral-500'
                        }`}
                      />
                      <span>{status.isOpen ? 'Buka' : 'Tutup'}</span>
                    </span>
                  </div>
                  <p className="font-sans font-bold text-lg text-black">
                    {status.statusText}
                  </p>
                </div>

                {/* Weekly Operating Hours */}
                <div className="p-5 bg-white border border-[#E5E0D8] space-y-3">
                  <h3 className="font-sans font-bold text-base text-black flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span>Jadwal Operasional Lengkap</span>
                  </h3>
                  <div className="divide-y divide-[#E5E0D8] text-xs font-sans">
                    {BUSINESS_INFO.operatingSchedule.map((item) => {
                      const isToday = currentDayIndex !== null && item.dayIndex === currentDayIndex;
                      return (
                        <div
                          key={item.dayName}
                          className={`py-2 flex items-center justify-between transition-colors ${
                            isToday ? 'bg-neutral-100 px-2.5 font-bold text-black' : 'text-neutral-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{item.dayName}</span>
                            {isToday && (
                              <span className="text-[10px] uppercase bg-black text-white px-1.5 py-0.2">
                                Hari Ini
                              </span>
                            )}
                          </span>
                          <span>{item.openTime} – {item.closeTime} WIB</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Address & Direction */}
                <div className="p-5 bg-white border border-[#E5E0D8] space-y-3">
                  <h3 className="font-sans font-bold text-base text-black flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span>Alamat & Lokasi</span>
                  </h3>
                  <div className="text-xs text-neutral-700 space-y-1 font-sans">
                    <p className="font-bold text-black">{BUSINESS_INFO.address.street}</p>
                    <p>{BUSINESS_INFO.address.area}</p>
                    <p>{BUSINESS_INFO.address.province}</p>
                    <p className="text-neutral-500 pt-1">
                      Patokan: <strong>{BUSINESS_INFO.address.landmark}</strong>
                    </p>
                  </div>
                  <div className="pt-2">
                    <motion.a
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      id="contact-open-gmaps-btn"
                      href={BUSINESS_INFO.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-3.5 py-2 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Buka Google Maps</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Right Col: WhatsApp Form */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-5 sm:p-6 bg-[#1D1D1B] text-[#F7F5F0] border border-[#383834] space-y-4">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-white">
                      Kirim Pesan WhatsApp
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans mt-0.5">
                      Chat langsung dengan tim kami.
                    </p>
                  </div>

                  <form onSubmit={handleSendMessage} className="space-y-3.5 text-xs font-sans">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">
                        Nama Anda
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors text-sm sm:text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">
                        Topik Pesan
                      </label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer text-sm sm:text-xs"
                      >
                        <option value="Pertanyaan Umum / Info Menu">Pertanyaan Umum / Info Menu</option>
                        <option value="Reservasi Meja Makan">Reservasi Meja Makan</option>
                        <option value="Booking Private Room Karaoke">Booking Private Room Karaoke</option>
                        <option value="Info Acara / Gathering / Birthday">Info Acara / Gathering / Birthday</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">
                        Pesan
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tuliskan pertanyaan atau rencana kunjungan"
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 resize-none transition-colors text-sm sm:text-xs"
                      />
                    </div>

                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      type="submit"
                      className="w-full bg-white text-black py-3 sm:py-2.5 px-4 font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer min-h-[44px]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim ke WhatsApp</span>
                    </motion.button>
                  </form>
                </div>

                {/* Social Card */}
                <div className="p-5 bg-white border border-[#E5E0D8] space-y-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span className="font-sans font-bold text-sm text-black">
                      Instagram Resmi
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-sans">
                    Ikuti update menu baru & jadwal live music di <strong>@{BUSINESS_INFO.instagramHandle}</strong>.
                  </p>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold underline text-black block pt-1 hover:text-neutral-700"
                  >
                    Buka Instagram ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* ========================================================================= */}
        {/* 3. GOOGLE MAPS EMBED                                                     */}
        {/* ========================================================================= */}
        <SectionTransition
          id="google-maps-embed-section"
          className="bg-white border-b border-[#E5E0D8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="font-serif text-xl font-bold text-black">
                  Peta Lokasi Google Maps
                </h3>
                <p className="text-xs text-neutral-500">
                  Cluster Amsterdam, Kota Wisata Cibubur
                </p>
              </div>
              <a
                href={BUSINESS_INFO.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase font-semibold underline text-black"
              >
                Buka di Maps ↗
              </a>
            </div>

            <div
              id="google-maps-container"
              className="w-full h-80 sm:h-96 bg-neutral-200 border border-[#E5E0D8] relative overflow-hidden group select-none"
              onMouseLeave={() => setIsMapInteractive(false)}
            >
              {/* The Google Maps Iframe */}
              <iframe
                id="google-maps-iframe"
                title="Peta Lokasi CU@CAFE Kota Wisata"
                src="https://maps.google.com/maps?q=Cluster+Amsterdam+Kota+Wisata+Ciangsana+Gunung+Putri&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className={`w-full h-full transition-opacity duration-200 ${
                  isMapInteractive ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Click-to-activate overlay when inactive to prevent accidental page scroll hijacking */}
              {!isMapInteractive && (
                <button
                  id="map-interaction-overlay-btn"
                  type="button"
                  onClick={() => setIsMapInteractive(true)}
                  className="absolute inset-0 w-full h-full bg-black/10 hover:bg-black/20 backdrop-blur-[1px] transition-all flex flex-col items-center justify-center cursor-pointer p-4 text-center group focus:outline-none"
                  aria-label="Aktifkan peta Google Maps"
                >
                  <div className="bg-white/95 text-neutral-900 shadow-md border border-neutral-300 px-4 py-2.5 flex items-center gap-2 transition-transform group-hover:-translate-y-0.5">
                    <ZoomIn className="w-4 h-4 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Aktifkan Peta
                    </span>
                  </div>
                </button>
              )}

              {/* Active mode indicator & lock controls */}
              {isMapInteractive && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2 animate-in fade-in duration-200">
                  <div className="bg-white/95 backdrop-blur-sm border border-neutral-300 px-3 py-1.5 text-[11px] font-semibold text-neutral-800 shadow-sm flex items-center gap-1.5">
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zoom & Geser Aktif</span>
                  </div>
                  <button
                    id="map-lock-scroll-btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMapInteractive(false);
                    }}
                    className="bg-black text-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider shadow-sm hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Kunci Gulir</span>
                  </button>
                </div>
              )}
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
