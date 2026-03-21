'use client';

import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment, BlockedSlot, Service, SlotState, Availability } from '@/lib/types';
import { barberSettings } from '@/lib/config';
import { buildSlots, classNames, whatsappBookingMessage } from '@/lib/utils';

const stateLabel: Record<SlotState, string> = {
  available: 'Disponible',
  occupied: 'Ocupado',
  blocked: 'No disponible',
  outside: 'No disponible'
};

export function SlotPicker({
  date,
  services,
  appointments,
  blockedSlots,
  availability
}: {
  date: string;
  services: Service[];
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  availability: Availability[];
}) {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? '');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');

  const slots = useMemo(
    () =>
      buildSlots({
        date,
        availability,
        appointments,
        blockedSlots,
        slotInterval: barberSettings.slotInterval
      }),
    [appointments, availability, blockedSlots, date]
  );

  const service = services.find((item) => item.id === selectedServiceId);
  const whatsappLink = useMemo(() => {
    if (!service || !selectedTime || !clientName) {
      return '#';
    }

    const message = whatsappBookingMessage(service.name, date, selectedTime, clientName);
    return `https://wa.me/${barberSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [clientName, date, selectedTime, service]);

  return (
    <section className="card">
      <p className="text-sm text-white/70">{format(parseISO(date), "EEEE d 'de' MMMM", { locale: es })}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            onClick={() => slot.state === 'available' && setSelectedTime(slot.time)}
            className={classNames(
              'rounded-lg px-2 py-2 text-xs',
              slot.state === 'available' && 'border border-emerald-400/40 bg-emerald-400/20',
              slot.state === 'occupied' && 'bg-red-900/40 text-red-200',
              slot.state !== 'available' && slot.state !== 'occupied' && 'bg-zinc-800 text-zinc-400',
              selectedTime === slot.time && 'ring-2 ring-accent'
            )}
          >
            <div>{slot.time}</div>
            <div className="text-[10px]">{stateLabel[slot.state]}</div>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <select
          className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
          value={selectedServiceId}
          onChange={(event) => setSelectedServiceId(event.target.value)}
        >
          {services.map((item) => (
            <option key={item.id} value={item.id} className="bg-black">
              {item.name} · {item.duration} min
            </option>
          ))}
        </select>

        <input
          className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
          placeholder="Tu nombre"
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
        />

        <a
          href={whatsappLink}
          className={classNames('btn-primary block text-center', whatsappLink === '#' && 'pointer-events-none opacity-40')}
          target="_blank"
          rel="noreferrer"
        >
          Confirmar por WhatsApp
        </a>
      </div>
    </section>
  );
}
