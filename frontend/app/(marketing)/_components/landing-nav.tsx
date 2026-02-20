// app/(marketing)/_components/landing-nav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 dark:bg-[#080810]/90 backdrop-blur-xl border-b border-border dark:border-white/5 py-3"
          : "py-5",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/25 group-hover:shadow-fuchsia-500/40 transition-shadow">
            <CheckSquare className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-foreground dark:text-white">TaskFlow</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="[&_svg]:text-foreground/70 dark:[&_svg]:text-white/70 [&_button]:hover:bg-muted dark:[&_button]:hover:bg-white/10">
            <ThemeToggle />
          </div>
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white border-0 shadow-lg shadow-fuchsia-500/25"
            >
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white p-2"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 dark:bg-[#080810]/95 backdrop-blur-xl border-b border-border dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-border dark:border-white/10">
                <div className="flex items-center justify-between px-1 py-1">
                  <span className="text-sm text-foreground/60 dark:text-white/60">Theme</span>
                  <div className="[&_svg]:text-foreground/70 dark:[&_svg]:text-white/70 [&_button]:hover:bg-muted dark:[&_button]:hover:bg-white/10">
                    <ThemeToggle />
                  </div>
                </div>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white border-0">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
