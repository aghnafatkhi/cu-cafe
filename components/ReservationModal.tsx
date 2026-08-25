'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, MapPin, Send } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '@/data/business';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'reservation' | 'event';
}

export default function ReservationModal({
  isOpen,
  onClose,
  defaultType = 'reservation',
}: ReservationModalProps) {
  const [resType, setResType] = useState<'reservation' | 'event'>(defaultType);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [guests, setGuests] = useState('2-4 Orang');
  const [area, setArea] = useState('Indoor (AC, Nyaman)');
  const [eventType, setEventType] = useState('Ulang Tahun / Birthday');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = getWhatsAppLink({
      type: resType,
      name: name || undefined,
      date: date || undefined,
      time: time || undefined,
      guests: guests || undefined,
      area: area || undefined,
      eventType: resType === 'event' ? eventType : undefined,
      customMessage: notes || undefined,
    });
    window.open(link, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="reservation-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            id="reservation-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-[#1D1D1B] text-[#F7F5F0] border border-[#383834] max-w-lg w-full max-h-[92vh] overflow-y-auto p-4.5 sm:p-7 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#383834] pb-3.5 mb-4 sm:mb-5">
              <div>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400">
                  CU@CAFE KOTA WISATA
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mt-0.5">
                  {resType === 'reservation'
                    ? 'Reservasi Meja Restoran'
                    : 'Booking Acara & Private Room'}
                </h3>
              </div>
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="p-2 -mr-2 -mt-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Dialog Reservasi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switch */}
            <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-5">
              <button
                type="button"
                onClick={() => setResType('reservation')}
                className={`text-xs uppercase tracking-wider py-2.5 px-3 font-semibold transition-colors border text-center cursor-pointer min-h-[42px] ${
                  resType === 'reservation'
                    ? 'bg-white text-black border-white'
                    : 'border-neutral-700 text-neutral-400 hover:text-white'
                }`}
              >
                Reservasi Meja
              </button>
              <button
                type="button"
                onClick={() => setResType('event')}
                className={`text-xs uppercase tracking-wider py-2.5 px-3 font-semibold transition-colors border text-center cursor-pointer min-h-[42px] ${
                  resType === 'event'
                    ? 'bg-white text-black border-white'
                    : 'border-neutral-700 text-neutral-400 hover:text-white'
                }`}
              >
                Private Room / Event
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 text-xs font-sans">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Nama Lengkap
                </label>
                <input
                  id="res-input-name"
                  type="text"
                  required
                  placeholder="Contoh: Sarah / Bpk. Hendra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 text-sm sm:text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Tanggal Kunjungan
                  </label>
                  <input
                    id="res-input-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white focus:outline-none focus:border-neutral-400 text-sm sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Jam Kunjungan
                  </label>
                  <input
                    id="res-input-time"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white focus:outline-none focus:border-neutral-400 text-sm sm:text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Jumlah Orang
                  </label>
                  <select
                    id="res-select-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white focus:outline-none focus:border-neutral-400 text-sm sm:text-xs"
                  >
                    <option value="1-2 Orang">1-2 Orang</option>
                    <option value="3-5 Orang">3-5 Orang</option>
                    <option value="6-10 Orang">6-10 Orang</option>
                    <option value="11-20 Orang">11-20 Orang (Group)</option>
                    <option value="20+ Orang (Private Event)">20+ Orang (Private Event)</option>
                  </select>
                </div>

                {resType === 'reservation' ? (
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Preferensi Area
                    </label>
                    <select
                      id="res-select-area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white focus:outline-none focus:border-neutral-400 text-sm sm:text-xs"
                    >
                      <option value="Indoor (AC & Nyaman)">Indoor (AC & Nyaman)</option>
                      <option value="Outdoor (Asri / Smoking)">Outdoor (Asri / Smoking)</option>
                      <option value="Bebas / Meja Terbaik">Bebas / Meja Terbaik</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Jenis Acara
                    </label>
                    <select
                      id="res-select-event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2.5 sm:py-2 text-white focus:outline-none focus:border-neutral-400 text-sm sm:text-xs"
                    >
                      <option value="Private Karaoke Gathering">Private Karaoke Gathering</option>
                      <option value="Ulang Tahun / Birthday Party">Ulang Tahun / Birthday Party</option>
                      <option value="Bridal Shower / Baby Shower">Bridal Shower / Baby Shower</option>
                      <option value="Lamaran / Engagement Session">Lamaran / Engagement Session</option>
                      <option value="Corporate / Komunitas Gathering">Corporate / Komunitas Gathering</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Catatan Khusus (Opsional)
                </label>
                <textarea
                  id="res-input-notes"
                  rows={2}
                  placeholder="Contoh: Butuh baby chair, dekat colokan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#292A28] border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 resize-none text-sm sm:text-xs"
                />
              </div>

              <div className="pt-2 border-t border-[#383834]">
                <button
                  id="submit-res-to-wa-btn"
                  type="submit"
                  className="w-full bg-white text-black py-3 sm:py-2.5 px-4 font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                </button>
                <p className="text-[11px] text-neutral-400 text-center mt-2">
                  Pesan terformat otomatis dikirim ke WhatsApp resmi (+628111113446).
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
