'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, X, Phone, Calendar, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO, getCurrentOpenStatus, getWhatsAppLink } from '@/data/business';

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState({
    isOpen: true,
    statusText: 'Buka 08:00 - 22:00 WIB',
    closingSoon: false,
  });

  useEffect(() => {
    const checkStatus = () => {
      const current = getCurrentOpenStatus();
      setStatus({
        isOpen: current.isOpen,
        statusText: current.statusText,
        closingSoon: current.closingSoon,
      });
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/menu', label: 'Daftar Menu' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/events', label: 'Events & Private Room' },
    { href: '/contact', label: 'Lokasi & Kontak' },
  ];

  const isHome = pathname === '/';

  return (
    <>
      {/* Top announcement bar - informative and clean */}
      <div
        id="top-notification-bar"
        className="bg-[#11110F] text-[#F7F5F0] text-xs py-1.5 px-4 border-b border-[#292A28]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
              }`}
            />
            <span className="font-medium text-neutral-200">{status.statusText}</span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <span className="hidden md:inline text-neutral-400">
              Cluster Amsterdam, Kota Wisata Cibubur
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              id="top-instagram-link"
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              @{BUSINESS_INFO.instagramHandle}
            </a>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <a
              id="top-wa-phone-link"
              href={getWhatsAppLink({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-neutral-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <header
        id="main-navbar-header"
        className={`sticky top-0 z-50 transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#1D1D1B]/95 backdrop-blur-md text-[#F7F5F0] shadow-sm border-b border-[#383834]'
            : isHome
            ? 'bg-[#1D1D1B] text-[#F7F5F0] border-b border-[#292A28]'
            : 'bg-[#F7F5F0] text-[#11110F] border-b border-[#E5E0D8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Clean, Refined Brand Logo */}
            <Link
              id="navbar-brand-logo"
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-black text-xl tracking-tight leading-none">
                    CU@CAFE
                  </span>
                  <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-1.5 py-0.5 border border-current opacity-75">
                    Kota Wisata
                  </span>
                </div>
                <span className="text-[9px] tracking-wider uppercase font-sans text-neutral-400 mt-0.5">
                  By Chicken Union
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              id="desktop-navigation-links"
              className="hidden lg:flex items-center gap-7 text-xs uppercase font-sans font-medium tracking-wider"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    id={`nav-link-${link.href.replace('/', '') || 'home'}`}
                    href={link.href}
                    className={`py-1 transition-colors ${
                      isActive
                        ? 'font-bold underline underline-offset-8 decoration-2'
                        : isScrolled || isHome
                        ? 'text-neutral-300 hover:text-white'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                id="navbar-menu-btn"
                href="/menu"
                className={`text-xs uppercase font-semibold tracking-wider px-3.5 py-2 border transition-colors ${
                  isScrolled || isHome
                    ? 'border-neutral-600 text-neutral-200 hover:border-white hover:text-white'
                    : 'border-neutral-300 text-neutral-800 hover:border-black hover:text-black'
                }`}
              >
                Menu
              </Link>
              {onOpenReservation ? (
                <button
                  id="navbar-reservation-btn"
                  onClick={onOpenReservation}
                  className={`text-xs uppercase font-semibold tracking-wider px-4 py-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isScrolled || isHome
                      ? 'bg-[#F7F5F0] text-[#1D1D1B] hover:bg-white'
                      : 'bg-[#11110F] text-[#F7F5F0] hover:bg-black'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservasi</span>
                </button>
              ) : (
                <a
                  id="navbar-reservation-wa-btn"
                  href={getWhatsAppLink({ type: 'reservation' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs uppercase font-semibold tracking-wider px-4 py-2 transition-colors flex items-center gap-1.5 ${
                    isScrolled || isHome
                      ? 'bg-[#F7F5F0] text-[#1D1D1B] hover:bg-white'
                      : 'bg-[#11110F] text-[#F7F5F0] hover:bg-black'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reservasi</span>
                </a>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              {onOpenReservation && (
                <button
                  id="mobile-nav-quick-res-btn"
                  onClick={onOpenReservation}
                  className={`text-[11px] uppercase tracking-wider px-2.5 py-1.5 font-bold transition-transform active:scale-95 ${
                    isScrolled || isHome
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                  }`}
                >
                  Reservasi
                </button>
              )}
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 focus:outline-none relative transition-transform active:scale-90 ${
                  isScrolled || isHome ? 'text-white' : 'text-black'
                }`}
                aria-label={mobileMenuOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
              >
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: mobileMenuOpen ? -90 : 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <MenuIcon className="w-6 h-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#1D1D1B] text-[#F7F5F0] flex flex-col justify-between p-6 overflow-y-auto"
          >
            {/* Top brand header inside mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              className="flex items-center justify-between border-b border-[#383834] pb-4"
            >
              <div>
                <span className="font-sans text-xl font-bold uppercase tracking-tight text-white">
                  CU@CAFE
                </span>
                <p className="text-[11px] tracking-wider text-neutral-400">
                  Kota Wisata · By Chicken Union
                </p>
              </div>
              <motion.button
                id="close-mobile-menu-btn"
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-neutral-700 text-neutral-200 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Navigation links with staggered slide-in */}
            <div className="py-6 space-y-3">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + idx * 0.045,
                        duration: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        id={`mobile-nav-${link.href.replace('/', '') || 'home'}`}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center justify-between text-base py-3 border-b border-[#292A28] transition-all duration-150 active:translate-x-1 ${
                          isActive
                            ? 'text-white font-bold pl-2 border-white/40'
                            : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        <span className="group-hover:translate-x-1.5 transition-transform duration-150">
                          {link.label}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-150 group-hover:translate-x-1 ${
                            isActive ? 'text-white' : 'text-neutral-500'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom info and quick actions with delayed slide-up */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.25, ease: 'easeOut' }}
              className="border-t border-[#383834] pt-4 space-y-3"
            >
              <div className="text-xs text-neutral-400">
                <p className="text-neutral-300 font-medium">Cluster Amsterdam No. 30, Kota Wisata</p>
                <p>WhatsApp: {BUSINESS_INFO.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.a
                  id="mobile-drawer-wa-btn"
                  whileTap={{ scale: 0.97 }}
                  href={getWhatsAppLink({ type: 'reservation' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black py-2.5 text-center text-xs uppercase tracking-wider font-semibold block transition-colors hover:bg-neutral-200"
                >
                  Chat WhatsApp
                </motion.a>
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    id="mobile-drawer-menu-btn"
                    href="/menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border border-neutral-600 text-white py-2.5 text-center text-xs uppercase tracking-wider font-medium block transition-colors hover:border-white"
                  >
                    Lihat Menu
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
