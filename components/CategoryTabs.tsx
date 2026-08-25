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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      className="w-full border-b border-[#E5E0D8]"
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-5 sm:gap-7 overflow-x-auto touch-pan-x overscroll-x-contain hide-scrollbar py-1 scroll-smooth"
      >
        {/* 'Semua' text tab */}
        <button
          id="category-tab-all"
          type="button"
          onClick={() => handleTabClick('all')}
          className={`shrink-0 text-[13px] sm:text-sm transition-colors py-2 border-b-2 cursor-pointer select-none ${
            selectedCategory === 'all'
              ? 'text-neutral-900 font-semibold border-neutral-900'
              : 'text-neutral-500 font-normal border-transparent hover:text-neutral-900'
          }`}
        >
          Semua Menu
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
              className={`shrink-0 text-[13px] sm:text-sm transition-colors py-2 border-b-2 cursor-pointer select-none ${
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
