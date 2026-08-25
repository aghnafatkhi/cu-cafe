'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Send, Trash2, ArrowRight } from 'lucide-react';
import { MenuItem } from '@/data/menu';
import { getWhatsAppLink } from '@/data/business';

interface WhatsAppWishlistFloatProps {
  wishlist: MenuItem[];
  onRemoveItem: (id: string) => void;
  onClearWishlist: () => void;
}

export default function WhatsAppWishlistFloat({
  wishlist,
  onRemoveItem,
  onClearWishlist,
}: WhatsAppWishlistFloatProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (wishlist.length === 0) return null;

  const handleSendToWhatsApp = () => {
    const dishList = wishlist.map(
      (item) => `${item.name} (${item.categoryName}) - ${item.price}`
    );
    const link = getWhatsAppLink({
      type: 'menu',
      dishes: dishList,
    });
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Pill Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      >
        <motion.button
          id="wishlist-floating-trigger"
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#11110F] text-white px-3.5 sm:px-4 py-3 shadow-2xl border border-neutral-700 flex items-center gap-2.5 sm:gap-3 hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-wider font-bold leading-tight">
              Pesanan ({wishlist.length})
            </p>
            <p className="text-[10px] text-neutral-400 hidden sm:block">
              {wishlist.length} menu dipilih · Pesan via WA
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400" />
        </motion.button>
      </motion.div>

      {/* Floating Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="wishlist-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              id="wishlist-drawer-panel"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[#1D1D1B] text-[#F7F5F0] border-t sm:border border-[#383834] w-full sm:max-w-md max-h-[85vh] flex flex-col p-4.5 sm:p-5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#383834] pb-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400">
                    Daftar Pesanan
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Pilihan Anda ({wishlist.length} Menu)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="wishlist-clear-btn"
                    onClick={onClearWishlist}
                    className="text-neutral-400 hover:text-red-400 text-xs flex items-center gap-1 p-1.5 cursor-pointer"
                    title="Hapus Semua"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Hapus</span>
                  </button>
                  <button
                    id="wishlist-close-btn"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                    aria-label="Tutup"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="overflow-y-auto flex-1 space-y-2 pr-1 divide-y divide-[#292A28] max-h-[50vh] sm:max-h-[55vh]">
                {wishlist.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pt-2 first:pt-0 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-xs font-bold text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        {item.categoryName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-sans text-xs font-semibold text-[#E5E0D8]">
                        {item.price}
                      </span>
                      <button
                        id={`wishlist-remove-${item.id}`}
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-2 cursor-pointer"
                        title="Hapus item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 mt-3 border-t border-[#383834] space-y-2">
                <button
                  id="wishlist-submit-wa-btn"
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full bg-white text-black py-3 sm:py-2.5 px-4 font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke WhatsApp</span>
                </button>
                <p className="text-[10px] text-neutral-400 text-center">
                  Daftar menu otomatis terformat di chat WhatsApp CU@CAFE.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
