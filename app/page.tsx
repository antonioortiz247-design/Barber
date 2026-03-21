import Link from 'next/link';
import { format } from 'date-fns';
import { Header } from '@/components/header';
import { ServiceList } from '@/components/service-list';
import { getServices } from '@/lib/data';

export default async function HomePage() {
  const services = await getServices();
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-4 py-6">
      <Header />
      <Link className="btn-primary mb-4 block text-center" href={`/book?date=${today}`}>
        Agendar cita
      </Link>
      <ServiceList services={services} />
      <Link href="/admin/login" className="mt-6 inline-block text-sm text-white/50 underline">
        Acceso administrador
      </Link>
    </main>
  );
}
