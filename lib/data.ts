import { addDays, format } from 'date-fns';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Appointment, Availability, BlockedSlot, Service } from '@/lib/types';

export async function getServices(): Promise<Service[]> {
  const supabase = getSupabaseServer();
  const { data } = await supabase.from('services').select('*').order('price');
  return data ?? [];
}

export async function getDayData(date: string): Promise<{
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  availability: Availability[];
}> {
  const supabase = getSupabaseServer();

  const [{ data: appointments }, { data: blockedSlots }, { data: availability }] = await Promise.all([
    supabase.from('appointments').select('*').eq('date', date).neq('status', 'cancelled'),
    supabase.from('blocked_slots').select('*').eq('date', date),
    supabase.from('availability').select('*')
  ]);

  return {
    appointments: appointments ?? [],
    blockedSlots: blockedSlots ?? [],
    availability: availability ?? []
  };
}

export async function getDashboardData() {
  const supabase = getSupabaseServer();
  const today = format(new Date(), 'yyyy-MM-dd');

  const { data: dayAppointments } = await supabase
    .from('appointments')
    .select('*, service:services(price,name)')
    .eq('date', today)
    .neq('status', 'cancelled')
    .order('time');

  const { count: totalCount } = await supabase.from('appointments').select('*', { head: true, count: 'exact' });

  const estimatedIncome = (dayAppointments ?? []).reduce((sum, item) => {
    const servicePrice = Number((item as { service?: { price?: number } }).service?.price ?? 0);
    return sum + servicePrice;
  }, 0);

  return {
    today,
    dayAppointments: dayAppointments ?? [],
    totalAppointments: totalCount ?? 0,
    estimatedIncome
  };
}

export async function getWeekDates(start = new Date()): Promise<string[]> {
  return Array.from({ length: 7 }, (_, idx) => format(addDays(start, idx), 'yyyy-MM-dd'));
}
