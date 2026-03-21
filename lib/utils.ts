import { addMinutes, format, isBefore, parseISO, set } from 'date-fns';
import { Appointment, Availability, BlockedSlot, SlotState } from '@/lib/types';

export function classNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function money(amount: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function buildSlots(params: {
  date: string;
  availability: Availability[];
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  slotInterval: 30 | 60;
}): Array<{ time: string; state: SlotState }> {
  const day = parseISO(params.date).getDay();
  const dayAvailability = params.availability.find((a) => a.day_of_week === day);
  const fallbackStart = '10:00';
  const fallbackEnd = '17:00';

  const start = dayAvailability?.start_time ?? fallbackStart;
  const end = dayAvailability?.end_time ?? fallbackEnd;

  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);

  let cursor = set(parseISO(params.date), { hours: startHour, minutes: startMin, seconds: 0, milliseconds: 0 });
  const endDate = set(parseISO(params.date), { hours: endHour, minutes: endMin, seconds: 0, milliseconds: 0 });

  const occupied = new Set(params.appointments.map((a) => a.time));
  const blocked = new Set(params.blockedSlots.map((b) => b.time));

  const now = new Date();
  const slots: Array<{ time: string; state: SlotState }> = [];

  while (isBefore(cursor, endDate)) {
    const value = format(cursor, 'HH:mm');
    let state: SlotState = 'available';

    if (occupied.has(value)) {
      state = 'occupied';
    } else if (blocked.has(value)) {
      state = 'blocked';
    } else if (isBefore(cursor, now)) {
      state = 'outside';
    }

    slots.push({ time: value, state });
    cursor = addMinutes(cursor, params.slotInterval);
  }

  return slots;
}

export function whatsappBookingMessage(serviceName: string, date: string, time: string, clientName: string): string {
  return `Hola, quiero agendar un ${serviceName} el día ${date} a las ${time}. Mi nombre es ${clientName}.`;
}
