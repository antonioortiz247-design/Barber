import { getDashboardData, getDayData, getServices } from '@/lib/data';
import { AdminDashboard } from '@/components/admin-dashboard';

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const services = await getServices();
  const dayData = await getDayData(dashboard.today);

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Panel Admin</h1>
      <AdminDashboard
        today={dashboard.today}
        todayAppointments={dashboard.dayAppointments}
        totalAppointments={dashboard.totalAppointments}
        estimatedIncome={dashboard.estimatedIncome}
        services={services}
        availability={dayData.availability}
        blockedSlots={dayData.blockedSlots}
      />
    </main>
  );
}
