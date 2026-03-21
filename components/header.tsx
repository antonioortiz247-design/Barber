import Image from 'next/image';
import { barberSettings } from '@/lib/config';

export function Header() {
  return (
    <header className="mb-6 flex items-center gap-3">
      <Image src={barberSettings.logoUrl} alt={barberSettings.brandName} width={52} height={52} className="rounded-full border border-white/20" />
      <div>
        <h1 className="text-xl font-bold">{barberSettings.brandName}</h1>
        <p className="text-sm text-white/70">Agenda premium en {barberSettings.city}</p>
      </div>
    </header>
  );
}
