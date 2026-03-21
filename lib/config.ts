import { BarberSettings } from '@/lib/types';

export const barberSettings: BarberSettings = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Barber Prime',
  city: process.env.NEXT_PUBLIC_CITY ?? 'Madrid',
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL ?? '/icons/icon-192x192.svg',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34111222333',
  accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR ?? '#d4af37',
  slotInterval: Number(process.env.NEXT_PUBLIC_SLOT_INTERVAL ?? 30) === 60 ? 60 : 30
};
