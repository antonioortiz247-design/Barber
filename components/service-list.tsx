import { Service } from '@/lib/types';
import { money } from '@/lib/utils';

export function ServiceList({ services }: { services: Service[] }) {
  return (
    <section className="card">
      <h2 className="mb-3 text-lg font-semibold">Servicios</h2>
      <div className="space-y-2">
        {services.map((service) => (
          <article key={service.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-xs text-white/60">{service.duration} min</p>
            </div>
            <p className="font-semibold text-accent">{money(service.price)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
