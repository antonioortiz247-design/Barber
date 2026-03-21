import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = getSupabaseServer();
  const payload = await req.json();
  const { error } = await supabase.from('services').insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const supabase = getSupabaseServer();
  const payload = await req.json();
  const { id, ...rest } = payload;
  const { error } = await supabase.from('services').update(rest).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const supabase = getSupabaseServer();
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
