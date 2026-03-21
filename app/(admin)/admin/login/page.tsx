'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export default function LoginPage() {
  const supabase = getSupabaseBrowser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
    if (signError) {
      setError(signError.message);
      return;
    }
    router.push('/admin/dashboard');
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-6">
      <form className="card w-full space-y-3" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <input className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button type="submit" className="btn-primary w-full">Entrar</button>
      </form>
    </main>
  );
}
