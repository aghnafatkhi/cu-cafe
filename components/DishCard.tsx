'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Globe } from 'lucide-react';
import { MenuItem } from '@/data/menu';

interface DishCardProps {
  item: MenuItem;
  isInWishlist?: boolean;
  onToggleWishlist?: (item: MenuItem) => void;
  onQuickOrder?: (item: MenuItem) => void;
  darkSurface?: boolean;
}

export default function DishCard({
  item,
  isInWishlist = false,
  onToggleWishlist,
  onQuickOrder,
  darkSurface = false,
}: DishCardProps) {
  return (
    <motion.article
      id={`dish-card-${item.id}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`p-4 sm:p-5 transition-colors duration-150 border flex flex-col justify-between ${
        darkSurface
          ? 'bg-[#292A28] border-[#383834] text-[#F7F5F0]'
          : 'bg-[#FFFFFF] border-[#E5E0D8] text-[#11110F]'
      }`}
    >
      <div>
        {/* Title and Price row */}
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3
              className={`font-sans text-base font-bold tracking-tight leading-snug ${
                darkSurface ? 'text-white' : 'text-[#11110F]'
              }`}
            >
              {item.name}
            </h3>
            {item.originBadge && (
              <span
                className={`text-[9px] uppercase font-sans font-medium px-1.5 py-0.5 border ${
                  darkSurface
                    ? 'border-neutral-600 text-neutral-300'
                    : 'border-neutral-300 text-neutral-600'
                }`}
              >
                {item.originBadge}
              </span>
            )}
          </div>

          <span
            className={`font-sans font-bold text-sm sm:text-base tracking-tight shrink-0 ${
              darkSurface ? 'text-white' : 'text-black'
            }`}
          >
            {item.priceVariants ? (
              <span className="text-xs opacity-80">
                Mulai {item.priceVariants.quarter}
              </span>
            ) : (
              item.price
            )}
          </span>
        </div>

        {/* Portion options if available */}
        {item.priceVariants && (
          <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[11px] font-sans">
            <span className="text-neutral-400 text-[10px]">Porsi:</span>
            {item.priceVariants.whole && (
              <span
                className={`px-1.5 py-0.5 border ${
                  darkSurface ? 'border-neutral-700 text-neutral-300' : 'border-neutral-200 text-neutral-700'
                }`}
              >
                Whole <strong>{item.priceVariants.whole}</strong>
              </span>
            )}
            {item.priceVariants.half && (
              <span
                className={`px-1.5 py-0.5 border ${
                  darkSurface ? 'border-neutral-700 text-neutral-300' : 'border-neutral-200 text-neutral-700'
                }`}
              >
                Half <strong>{item.priceVariants.half}</strong>
              </span>
            )}
            {item.priceVariants.quarter && (
              <span
                className={`px-1.5 py-0.5 border ${
                  darkSurface ? 'border-neutral-700 text-neutral-300' : 'border-neutral-200 text-neutral-700'
                }`}
              >
                Quarter <strong>{item.priceVariants.quarter}</strong>
              </span>
            )}
          </div>
        )}

        {/* Description (concise 1-2 lines) */}
        {item.description && (
          <p
            className={`text-xs leading-relaxed mb-3 line-clamp-2 ${
              darkSurface ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* Footer / Actions */}
      <div
        className={`pt-2.5 mt-2 border-t flex items-center justify-between gap-2 ${
          darkSurface ? 'border-[#383834]' : 'border-[#EAE5DE]'
        }`}
      >
        <span className="text-[11px] font-sans text-neutral-400">
          {item.categoryName}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {onToggleWishlist && (
            <motion.button
              id={`dish-add-btn-${item.id}`}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleWishlist(item)}
              className={`text-xs sm:text-[11px] font-semibold px-2.5 sm:px-2.5 py-1.5 sm:py-1 transition-colors flex items-center gap-1 cursor-pointer select-none ${
                isInWishlist
                  ? 'bg-black text-white'
                  : darkSurface
                  ? 'border border-neutral-600 text-neutral-300 hover:border-white hover:text-white'
                  : 'border border-neutral-300 text-neutral-800 hover:border-black'
              }`}
              title={isInWishlist ? 'Hapus dari daftar' : 'Tambah ke daftar'}
            >
              {isInWishlist ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Dipilih</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>Pilih</span>
                </>
              )}
            </motion.button>
          )}

          {onQuickOrder && (
            <motion.button
              id={`dish-order-btn-${item.id}`}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuickOrder(item)}
              className={`text-xs sm:text-[11px] font-semibold px-3 py-1.5 sm:py-1 transition-colors cursor-pointer select-none ${
                darkSurface
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              Pesan WA
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
