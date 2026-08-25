export interface OperatingHoursDay {
  dayName: string;
  shortDay: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  openTime: string;
  closeTime: string;
  openHour: number;
  closeHour: number;
}

export const BUSINESS_INFO = {
  name: 'CU@CAFE Kota Wisata',
  tagline: 'Deliver the world to your table',
  subTagline: 'Casual Dining Experience · Modern & Chill Hangout Destination',
  presenter: 'Presented by Chicken Union',
  phone: '0811-1113-446',
  whatsappNumber: '628111113446',
  instagramHandle: '@cuatcafe',
  instagramUrl: 'https://instagram.com/cuatcafe',
  address: {
    street: 'Jl. Wisata Utama No. 30 Blok I1, Cluster Amsterdam',
    area: 'Ciangsana, Kec. Gunung Putri, Kabupaten Bogor',
    province: 'Jawa Barat 16968',
    landmark: 'Dekat AEON Mall Kota Wisata Cibubur',
    googleMapsUrl: 'https://maps.google.com/?q=CU@CAFE+Kota+Wisata+Amsterdam',
  },
  priceRange: 'Rp50.000 – Rp75.000 / orang (Regular) · ±Rp100.000+ (Steak & Signatures)',
  operatingSchedule: [
    { dayName: 'Senin', shortDay: 'Sen', dayIndex: 1, openTime: '08:00', closeTime: '22:00', openHour: 8, closeHour: 22 },
    { dayName: 'Selasa', shortDay: 'Sel', dayIndex: 2, openTime: '08:00', closeTime: '22:00', openHour: 8, closeHour: 22 },
    { dayName: 'Rabu', shortDay: 'Rab', dayIndex: 3, openTime: '08:00', closeTime: '22:00', openHour: 8, closeHour: 22 },
    { dayName: 'Kamis', shortDay: 'Kam', dayIndex: 4, openTime: '08:00', closeTime: '22:00', openHour: 8, closeHour: 22 },
    { dayName: 'Jumat', shortDay: 'Jum', dayIndex: 5, openTime: '08:00', closeTime: '22:00', openHour: 8, closeHour: 22 },
    { dayName: 'Sabtu', shortDay: 'Sab', dayIndex: 6, openTime: '08:00', closeTime: '23:00', openHour: 8, closeHour: 23 },
    { dayName: 'Minggu', shortDay: 'Min', dayIndex: 0, openTime: '08:00', closeTime: '22:00', openHour: 8, closeHour: 22 },
  ] as OperatingHoursDay[],
  facilities: [
    { title: 'Indoor & Outdoor Seating', desc: 'Area ber-AC yang nyaman dan teras outdoor untuk kumpul santai' },
    { title: 'Private Room & Karaoke', desc: 'Private room ber-AC dengan fasilitas karaoke untuk gathering dan acara khusus' },
    { title: 'Live Music Session', desc: 'Musik akustik berkala saat makan malam (jadwal di Instagram)' },
    { title: 'High-Speed WiFi & Power Outlets', desc: 'Koneksi internet stabil dan colokan listrik di area duduk untuk WFC' },
    { title: 'Musholla Nyaman', desc: 'Tempat ibadah bersih dan terawat di dalam area kafe' },
    { title: 'Akses Kursi Roda & Parkir Luas', desc: 'Aksesibilitas ramah keluarga serta area parkir mobil dan motor' },
    { title: 'Booking Acara & Gathering', desc: 'Fasilitas reservasi ulang tahun, bridal shower, lamaran, dan reuni' },
    { title: 'Dine-In & Takeaway', desc: 'Layanan makan di tempat atau bungkus dengan kemasan higienis' },
  ],
};

export function getWhatsAppLink(params: {
  type: 'reservation' | 'event' | 'menu' | 'general';
  name?: string;
  date?: string;
  time?: string;
  guests?: string;
  area?: string;
  eventType?: string;
  dishes?: string[];
  customMessage?: string;
}): string {
  const baseUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}`;
  let text = '';

  if (params.type === 'reservation') {
    text = `Halo CU@CAFE Kota Wisata, saya ingin reservasi meja:\n\n` +
      `• Nama: ${params.name || '-'}\n` +
      `• Tanggal: ${params.date || '-'}\n` +
      `• Waktu: ${params.time || '-'}\n` +
      `• Jumlah Orang: ${params.guests || '-'}\n` +
      `• Area Pilihan: ${params.area || 'Indoor / Bebas'}\n\n` +
      `Mohon info ketersediaan meja. Terima kasih!`;
  } else if (params.type === 'event') {
    text = `Halo CU@CAFE Kota Wisata, saya ingin informasi booking acara / private room:\n\n` +
      `• Nama: ${params.name || '-'}\n` +
      `• Jenis Acara: ${params.eventType || 'Private Gathering / Karaoke'}\n` +
      `• Perkiraan Tanggal: ${params.date || '-'}\n` +
      `• Jumlah Tamu: ${params.guests || '-'}\n` +
      `• Catatan Khusus: ${params.customMessage || '-'}\n\n` +
      `Mohon info paket menu dan ketersediaan ruangan. Terima kasih!`;
  } else if (params.type === 'menu' && params.dishes && params.dishes.length > 0) {
    text = `Halo CU@CAFE Kota Wisata, saya tertarik dengan menu berikut:\n\n` +
      params.dishes.map((dish) => `• ${dish}`).join('\n') +
      `\n\nSaya ingin menanyakan ketersediaan / pre-order. Terima kasih!`;
  } else {
    text = params.customMessage || `Halo CU@CAFE Kota Wisata, saya ingin bertanya seputar menu dan reservasi. Terima kasih!`;
  }

  return `${baseUrl}?text=${encodeURIComponent(text)}`;
}

export function getCurrentOpenStatus(): {
  isOpen: boolean;
  closingSoon: boolean;
  statusText: string;
  currentDaySchedule: OperatingHoursDay;
} {
  // Use Jakarta timezone (WIB, UTC+7)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const jakartaTime = new Date(utc + 3600000 * 7);

  const currentDayIndex = jakartaTime.getDay();
  const currentHour = jakartaTime.getHours();
  const currentMinute = jakartaTime.getMinutes();
  const timeInMinutes = currentHour * 60 + currentMinute;

  const currentSchedule =
    BUSINESS_INFO.operatingSchedule.find((s) => s.dayIndex === currentDayIndex) ||
    BUSINESS_INFO.operatingSchedule[0];

  const openMinutes = currentSchedule.openHour * 60;
  const closeMinutes = currentSchedule.closeHour * 60;

  const isOpen = timeInMinutes >= openMinutes && timeInMinutes < closeMinutes;
  const closingSoon = isOpen && closeMinutes - timeInMinutes <= 45;

  let statusText = '';
  if (isOpen) {
    if (closingSoon) {
      statusText = `Buka · Tutup pkl ${currentSchedule.closeTime} WIB (segera tutup)`;
    } else {
      statusText = `Buka · ${currentSchedule.openTime} – ${currentSchedule.closeTime} WIB`;
    }
  } else {
    statusText = `Tutup · Buka kembali pkl ${currentSchedule.openTime} WIB`;
  }

  return {
    isOpen,
    closingSoon,
    statusText,
    currentDaySchedule: currentSchedule,
  };
}
