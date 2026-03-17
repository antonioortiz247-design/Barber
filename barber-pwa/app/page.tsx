import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Barbería Elite</h1>
      <Link href="/booking">
        <button className="mt-4 bg-black text-white px-6 py-3 rounded-xl">
          Agendar cita
        </button>
      </Link>
    </main>
  );
}