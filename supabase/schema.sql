create extension if not exists "uuid-ossp";

create table if not exists barbershops (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city text not null,
  logo_url text,
  accent_color text default '#d4af37',
  whatsapp_number text not null,
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references barbershops(id) on delete cascade,
  name text not null,
  duration int not null check (duration in (30, 60, 90, 120)),
  price numeric(10,2) not null,
  created_at timestamptz default now()
);

create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references barbershops(id) on delete cascade,
  date date not null,
  time text not null,
  service_id uuid not null references services(id),
  client_name text not null,
  status text not null check (status in ('pending', 'confirmed', 'cancelled')) default 'pending',
  created_at timestamptz default now(),
  unique(shop_id, date, time, status)
);

create table if not exists availability (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references barbershops(id) on delete cascade,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time text not null,
  end_time text not null,
  unique(shop_id, day_of_week)
);

create table if not exists blocked_slots (
  id uuid primary key default uuid_generate_v4(),
  shop_id uuid not null references barbershops(id) on delete cascade,
  date date not null,
  time text not null,
  unique(shop_id, date, time)
);

alter table barbershops enable row level security;
alter table services enable row level security;
alter table appointments enable row level security;
alter table availability enable row level security;
alter table blocked_slots enable row level security;

create policy "public read services" on services for select using (true);
create policy "public read availability" on availability for select using (true);
create policy "public read blocked slots" on blocked_slots for select using (true);
create policy "public create appointments" on appointments for insert with check (true);

create policy "admin full services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full appointments" on appointments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full availability" on availability for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full blocked slots" on blocked_slots for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
