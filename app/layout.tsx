import type { Metadata } from 'next';
import './globals.css';
import { barberSettings } from '@/lib/config';

export const metadata: Metadata = {
  title: `Barbería en ${barberSettings.city} | Agenda tu cita`,
  description: `Reserva cortes y servicios premium en ${barberSettings.brandName}.`,
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.svg',
    icon: '/icons/icon-192x192.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ ['--accent' as string]: barberSettings.accentColor }}>{children}</body>
    </html>
  );
}
