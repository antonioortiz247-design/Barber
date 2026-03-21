import { addDays, format, parseISO } from 'date-fns';
import Link from 'next/link';
import { SlotPicker } from '@/components/slot-picker';
import { CalendarNav } from '@/components/calendar-nav';
import { getDayData, getServices } from '@/lib/data';

export default async function BookPage({ searchParams }: { searchParams: { date?: string } }) {
  const date = searchParams.date ?? format(new Date(), 'yyyy-MM-dd');
  const services = await getServices();
  const dayData = await getDayData(date);

  const previousDay = format(addDays(parseISO(date), -1), 'yyyy-MM-dd');
  const nextDay = format(addDays(parseISO(date), 1), 'yyyy-MM-dd');

  return (
    <main className="mx-auto min-h-screen w-full max-w-md space-y-4 px-4 py-6">
      <h1 className="text-xl font-semibold">Calendario y horarios</h1>
      <CalendarNav date={date} />
      <div className="flex gap-2">
        <Link href={`/book?date=${previousDay}`} className="btn-secondary text-sm">
          Día anterior
        </Link>
        <Link href={`/book?date=${nextDay}`} className="btn-secondary text-sm">
          Día siguiente
        </Link>
      </div>
      <SlotPicker
        date={date}
        services={services}
        appointments={dayData.appointments}
        blockedSlots={dayData.blockedSlots}
        availability={dayData.availability}
      />
      <Link href="/" className="inline-block text-sm text-white/70 underline">
        Volver al inicio
      </Link>
    </main>
  );
}
