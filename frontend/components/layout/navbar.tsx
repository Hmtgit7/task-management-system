'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckSquare, LogOut, User, Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { useAuthStore } from '@/store/auth-store';
import { logoutApi } from '@/lib/api/auth.api';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {}
    logout();
    toast.success('Signed out successfully');
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600">
            <CheckSquare className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-sm hidden sm:block">TaskFlow</span>
        </Link>

        {/* Desktop right */}
        <div className="hidden sm:flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 h-9">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <span className="text-sm font-medium max-w-[120px] truncate">
                  {user?.name ?? user?.email}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-3.5 w-3.5" /> Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-3.5 w-3.5" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile right */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white font-bold">
                  {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-destructive py-2"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
