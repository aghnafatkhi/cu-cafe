'use client';

import React, { useState, useMemo } from 'react';
import { Search, UtensilsCrossed } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryTabs from '@/components/CategoryTabs';
import ReservationModal from '@/components/ReservationModal';
import { ALL_MENU_ITEMS, MENU_CATEGORIES, MenuItem, MenuCategoryId } from '@/data/menu';

export default function MenuPage() {
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      // Specific Category filter (if filtered via search or tab)
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchCat = item.categoryName.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Group filtered items by category for structured display
  const itemsByCategory = useMemo(() => {
    const grouped: { [key in MenuCategoryId]?: MenuItem[] } = {};
    filteredItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category]?.push(item);
    });
    return grouped;
  }, [filteredItems]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-neutral-900">
      <Navbar onOpenReservation={() => setIsResModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. PAGE HEADER (with non-sticky search field)                             */}
        {/* ========================================================================= */}
        <header
          id="menu-page-header"
          className="bg-[#1D1D1B] text-[#F7F5F0] py-6 sm:py-7 border-b border-[#383834]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-xl space-y-1">
                <span className="text-xs uppercase font-sans font-semibold tracking-wider text-neutral-400">
                  CU@CAFE Kota Wisata
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Daftar Menu
                </h1>
                <p className="text-xs text-neutral-300 font-sans">
                  Pilihan hidangan, kopi, dan minuman segar untuk makan di tempat atau reservasi.
                </p>
              </div>

              {/* Simple non-sticky search field */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  id="menu-search-input"
                  type="text"
                  placeholder="Cari menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#292A28] border border-neutral-700 pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-white font-sans transition-colors min-h-[38px] sm:min-h-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white cursor-pointer p-1"
                    aria-label="Hapus pencarian"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. STICKY CATEGORY NAVIGATION (Compact single row)                        */}
        {/* ========================================================================= */}
        <div
          id="menu-sticky-category-nav"
          className="sticky top-16 sm:top-18 z-30 bg-[#F7F5F0] border-b border-[#E5E0D8]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryTabs
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MENU ITEMS CATALOG (Restaurant Menu Layout)                            */}
        {/* ========================================================================= */}
        <div
          id="menu-catalog-list"
          className="py-5 sm:py-7"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white border border-[#E5E0D8] p-6 max-w-md mx-auto space-y-3">
                <UtensilsCrossed className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="font-sans font-semibold text-base text-neutral-900">
                  Menu Tidak Ditemukan
                </h3>
                <p className="text-xs text-neutral-600">
                  Tidak ada menu dengan kata kunci “{searchQuery}”.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-colors"
                >
                  Tampilkan Semua Menu
                </button>
              </div>
            ) : (
              MENU_CATEGORIES.filter((cat) => itemsByCategory[cat.id]?.length).map(
                (category) => {
                  const items = itemsByCategory[category.id] || [];
                  return (
                    <section
                      key={category.id}
                      id={`menu-section-${category.id}`}
                      className="scroll-mt-32 sm:scroll-mt-36"
                    >
                      {/* Category Header: Clean, concise without marketing descriptions */}
                      <div className="border-b border-[#D8D3C8] pb-1 mb-2 sm:mb-2.5 flex items-baseline justify-between gap-3">
                        <h2 className="font-serif text-[19px] sm:text-[22px] font-bold tracking-tight text-neutral-900 leading-tight">
                          {category.name}
                        </h2>
                        <span className="text-[11px] sm:text-xs font-sans text-neutral-400 shrink-0 tabular-nums">
                          {items.length} menu
                        </span>
                      </div>

                      {/* Items List (Disciplined 2-column layout on desktop, full-width with clean border separator on mobile) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 divide-y md:divide-y-0 divide-[#E8E4DC]">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            id={`menu-item-${item.id}`}
                            className="py-2 md:py-1.5 md:border-b md:border-[#EAE6DE] flex flex-col justify-start"
                          >
                            {/* Line 1: Name (Left) & Price (Right) with guaranteed gap and no wrap on price */}
                            <div className="flex items-baseline justify-between gap-3 sm:gap-4">
                              <div className="flex items-baseline gap-2 min-w-0 pr-1">
                                <span className="font-sans font-medium sm:font-semibold text-neutral-900 text-[15px] sm:text-[16px] leading-snug">
                                  {item.name}
                                </span>
                                {item.featured && (
                                  <span className="text-[11px] font-sans text-neutral-500 font-normal shrink-0">
                                    · Rekomendasi
                                  </span>
                                )}
                              </div>
                              <span className="font-sans font-semibold text-neutral-900 text-[14px] sm:text-[15px] shrink-0 whitespace-nowrap tabular-nums text-right">
                                {item.price}
                              </span>
                            </div>

                            {/* Line 2: Description below name (max 2 lines, calm, legible) */}
                            {item.description && (
                              <p className="font-sans text-[13px] text-neutral-600 leading-relaxed mt-0.5 line-clamp-2 md:line-clamp-2 pr-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }
              )
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. PRE-FOOTER RESERVATION CTA (Understated & Simple)                      */}
        {/* ========================================================================= */}
        <section
          id="menu-reservation-callout"
          className="bg-[#1D1D1B] text-[#F7F5F0] py-6 sm:py-7 border-t border-[#383834]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <p className="text-sm text-neutral-200 font-sans">
              Ingin memesan meja untuk acara atau makan bersama di CU@CAFE?
            </p>
            <div>
              <button
                onClick={() => setIsResModalOpen(true)}
                className="bg-white text-neutral-900 px-5 py-2 text-xs uppercase font-semibold tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Reservasi Meja
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isResModalOpen}
        onClose={() => setIsResModalOpen(false)}
      />
    </div>
  );
}
