'use client';

import { useMemo, useState } from 'react';
import { Appointment, Availability, BlockedSlot, Service } from '@/lib/types';
import { money } from '@/lib/utils';

type DashboardProps = {
  today: string;
  todayAppointments: Appointment[];
  totalAppointments: number;
  estimatedIncome: number;
  services: Service[];
  availability: Availability[];
  blockedSlots: BlockedSlot[];
};

export function AdminDashboard(props: DashboardProps) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('10:00');
  const [serviceId, setServiceId] = useState(props.services[0]?.id ?? '');

  const serviceOptions = useMemo(() => props.services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>), [props.services]);

  async function createManualAppointment() {
    await fetch('/api/admin/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: props.today, time, client_name: name, service_id: serviceId })
    });
    window.location.reload();
  }

  async function cancelAppointment(id: string) {
    await fetch(`/api/admin/appointments?id=${id}`, { method: 'DELETE' });
    window.location.reload();
  }

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-3 gap-2">
        <article className="card"><p className="text-xs text-white/70">Citas del día</p><p className="text-xl font-bold">{props.todayAppointments.length}</p></article>
        <article className="card"><p className="text-xs text-white/70">Total citas</p><p className="text-xl font-bold">{props.totalAppointments}</p></article>
        <article className="card"><p className="text-xs text-white/70">Ingresos</p><p className="text-xl font-bold">{money(props.estimatedIncome)}</p></article>
      </section>

      <section className="card space-y-2">
        <h2 className="font-semibold">Crear cita manual</h2>
        <input className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" placeholder="Nombre cliente" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" value={time} onChange={(e) => setTime(e.target.value)} />
        <select className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>{serviceOptions}</select>
        <button type="button" className="btn-primary w-full" onClick={createManualAppointment}>Guardar</button>
      </section>

      <section className="card">
        <h2 className="mb-2 font-semibold">Gestión de citas</h2>
        <div className="space-y-2">
          {props.todayAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
              <div>
                <p className="font-medium">{appointment.time} · {appointment.client_name}</p>
                <p className="text-xs text-white/60">{appointment.status}</p>
              </div>
              <button className="btn-secondary text-xs" onClick={() => cancelAppointment(appointment.id)} type="button">Cancelar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold">Disponibilidad configurada</h2>
        {props.availability.map((row) => (
          <p key={row.id} className="text-sm text-white/80">Día {row.day_of_week}: {row.start_time} - {row.end_time}</p>
        ))}
        <h3 className="mt-3 font-semibold">Bloqueos</h3>
        {props.blockedSlots.map((row) => (
          <p key={row.id} className="text-sm text-white/80">{row.date} {row.time}</p>
        ))}
      </section>
    </div>
  );
}
