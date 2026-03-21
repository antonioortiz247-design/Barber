'use client';

import { addDays, endOfMonth, format, startOfMonth, startOfWeek } from 'date-fns';
import Link from 'next/link';
import { es } from 'date-fns/locale';

export function CalendarNav({ date }: { date: string }) {
  const current = new Date(`${date}T00:00:00`);
  const firstMonthDay = startOfMonth(current);
  const firstGridDay = startOfWeek(firstMonthDay, { weekStartsOn: 1 });
  const monthEnd = endOfMonth(current);

  const days = Array.from({ length: 35 }, (_, i) => addDays(firstGridDay, i));
  const week = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(current, { weekStartsOn: 1 }), i));

  return (
    <div className="space-y-4">
      <section className="card">
        <p className="mb-3 text-sm text-white/70">Vista mensual · {format(current, 'MMMM yyyy', { locale: es })}</p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {days.map((day) => {
            const value = format(day, 'yyyy-MM-dd');
            const isCurrentMonth = day <= monthEnd && day >= firstMonthDay;
            return (
              <Link
                key={value}
                href={`/book?date=${value}`}
                className={`rounded-md px-2 py-2 ${isCurrentMonth ? 'bg-white/10' : 'bg-white/5 text-white/30'} ${value === date ? 'ring-1 ring-accent' : ''}`}
              >
                {format(day, 'd')}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="card">
        <p className="mb-3 text-sm text-white/70">Navegación por semanas</p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {week.map((day) => {
            const value = format(day, 'yyyy-MM-dd');
            return (
              <Link key={value} href={`/book?date=${value}`} className={`rounded-md bg-white/10 px-2 py-2 ${value === date ? 'ring-1 ring-accent' : ''}`}>
                <p>{format(day, 'EE', { locale: es })}</p>
                <p>{format(day, 'd')}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
