'use client';

import React, { useRef } from 'react';
import { MENU_CATEGORIES } from '@/data/menu';

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (id: string) => {
    onSelectCategory(id);
    if (id === 'all') {
      const catalogEl = document.getElementById('menu-catalog-list');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(`menu-section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      id="category-navigation-tabs"
      aria-label="Kategori Menu"
      className="w-full h-11 sm:h-12 flex items-center"
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-5 sm:gap-6 overflow-x-auto whitespace-nowrap touch-pan-x overscroll-x-contain hide-scrollbar h-full scroll-smooth"
      >
        {/* 'Semua Menu' text tab */}
        <button
          id="category-tab-all"
          type="button"
          onClick={() => handleTabClick('all')}
          className={`shrink-0 h-full flex items-center text-[13px] sm:text-sm transition-colors border-b-2 cursor-pointer select-none pb-0.5 ${
            selectedCategory === 'all'
              ? 'text-neutral-900 font-semibold border-neutral-900'
              : 'text-neutral-500 font-normal border-transparent hover:text-neutral-900'
          }`}
        >
          Semua
        </button>

        {/* Individual category text tabs */}
        {MENU_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`category-tab-${cat.id}`}
              type="button"
              onClick={() => handleTabClick(cat.id)}
              className={`shrink-0 h-full flex items-center text-[13px] sm:text-sm transition-colors border-b-2 cursor-pointer select-none pb-0.5 ${
                isActive
                  ? 'text-neutral-900 font-semibold border-neutral-900'
                  : 'text-neutral-500 font-normal border-transparent hover:text-neutral-900'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

