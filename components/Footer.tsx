import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '@/data/business';

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="bg-[#1D1D1B] text-[#F7F5F0] border-t border-[#383834] pt-10 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-8 border-b border-[#383834]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black text-xl tracking-tight text-white">
                CU@CAFE
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider px-1.5 py-0.5 border border-neutral-600 text-neutral-300">
                Kota Wisata
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Casual Dining & Global Flavors • Presented by Chicken Union
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              id="footer-wa-booking-btn"
              href={getWhatsAppLink({ type: 'reservation' })}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2.5 sm:py-2 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-200 transition-colors text-center"
            >
              Reservasi WhatsApp
            </a>
            <Link
              id="footer-menu-btn"
              href="/menu"
              className="border border-neutral-600 text-neutral-200 px-4 py-2.5 sm:py-2 text-xs uppercase font-medium tracking-wider hover:border-white hover:text-white transition-colors text-center"
            >
              Lihat Menu
            </Link>
          </div>
        </div>

        {/* 4 Column Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 py-8 border-b border-[#383834] text-xs">
          {/* Col 1: Lokasi */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Lokasi</span>
            </h4>
            <p className="text-neutral-300 font-medium">
              {BUSINESS_INFO.address.street}
            </p>
            <p className="text-neutral-400">
              {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.province}
            </p>
            <p className="text-neutral-500 text-[11px]">
              Patokan: {BUSINESS_INFO.address.landmark}
            </p>
            <a
              id="footer-maps-link"
              href={BUSINESS_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white underline inline-block pt-1"
            >
              Buka Google Maps ↗
            </a>
          </div>

          {/* Col 2: Jam Buka */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Jam Operasional</span>
            </h4>
            <ul className="space-y-1.5 text-neutral-300">
              <li className="flex justify-between">
                <span className="text-neutral-400">Senin – Jumat</span>
                <span>08.00 – 22.00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-400">Sabtu</span>
                <span>08.00 – 23.00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-400">Minggu</span>
                <span>08.00 – 22.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold uppercase tracking-wider text-white">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-neutral-300">
              <li>
                <Link id="footer-link-home" href="/" className="hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link id="footer-link-menu" href="/menu" className="hover:text-white">
                  Daftar Menu
                </Link>
              </li>
              <li>
                <Link id="footer-link-about" href="/about" className="hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link id="footer-link-events" href="/events" className="hover:text-white">
                  Private Room & Karaoke
                </Link>
              </li>
              <li>
                <Link id="footer-link-contact" href="/contact" className="hover:text-white">
                  Kontak & Lokasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Medsos */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold uppercase tracking-wider text-white">
              Kontak & Media
            </h4>
            <div className="space-y-2 text-neutral-300">
              <div>
                <span className="text-neutral-500 text-[11px] block">WhatsApp Resmi</span>
                <a
                  id="footer-whatsapp-text-link"
                  href={getWhatsAppLink({ type: 'general' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:underline"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-neutral-500 text-[11px] block">Instagram</span>
                <a
                  id="footer-instagram-link"
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{BUSINESS_INFO.instagramHandle}</span>
                </a>
              </div>
              <p className="text-neutral-400 text-[11px] pt-1">
                ⭐ 4.9 / 5.0 (3.766+ Google Reviews)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} CU@CAFE Kota Wisata. Presented by Chicken Union.</p>
          <p>Casual Dining & Coffee</p>
        </div>
      </div>
    </footer>
  );
}
