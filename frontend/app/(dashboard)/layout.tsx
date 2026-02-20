'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Navbar } from '@/components/layout/navbar';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) router.replace('/login');
  }, [isAuthenticated, router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className={cn('pt-16')}>{children}</main>
    </div>
  );
}
