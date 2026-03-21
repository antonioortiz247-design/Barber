import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function PUT(req: Request) {
  const supabase = getSupabaseServer();
  const payload = await req.json();
  const { id, ...rest } = payload;
  const query = id ? supabase.from('availability').update(rest).eq('id', id) : supabase.from('availability').insert(rest);
  const { error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
