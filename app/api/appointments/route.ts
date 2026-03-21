import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = getSupabaseServer();
  const payload = await req.json();

  const { date, time, service_id, client_name } = payload as {
    date: string;
    time: string;
    service_id: string;
    client_name: string;
  };

  const { data: existing } = await supabase
    .from('appointments')
    .select('id')
    .eq('date', date)
    .eq('time', time)
    .neq('status', 'cancelled')
    .maybeSingle();

  if (existing) return NextResponse.json({ error: 'Horario ocupado' }, { status: 409 });

  const { data: blocked } = await supabase.from('blocked_slots').select('id').eq('date', date).eq('time', time).maybeSingle();
  if (blocked) return NextResponse.json({ error: 'Horario bloqueado' }, { status: 409 });

  const { error } = await supabase.from('appointments').insert({ date, time, service_id, client_name, status: 'pending' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
