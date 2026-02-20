// app/(marketing)/_components/landing-footer.tsx
import Link from "next/link";
import { CheckSquare, Github, Twitter } from "lucide-react";

const links = {
  Product: ["Features", "Dashboard", "Changelog"],
  Company: ["About", "Blog", "Careers"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export function LandingFooter() {
  return (
    <footer className="border-t border-border dark:border-white/[0.06] bg-muted/5 dark:bg-white/[0.01] pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600">
                <CheckSquare className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-foreground dark:text-white">TaskFlow</span>
            </Link>
            <p className="text-xs text-foreground/30 dark:text-white/30 leading-relaxed max-w-[180px]">
              The modern task management system for productive teams.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-foreground/30 dark:text-white/30 hover:text-foreground dark:hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-foreground/30 dark:text-white/30 hover:text-foreground dark:hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-foreground/60 dark:text-white/60 uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-foreground/30 dark:text-white/30 hover:text-foreground dark:hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-border dark:border-white/[0.06]">
          <p className="text-xs text-foreground/20 dark:text-foreground/20">
            © 2026 TaskFlow. All rights reserved.
          </p>
          <p className="text-xs text-foreground/20 dark:text-foreground/20">
            Built with Next.js · TypeScript · Prisma
          </p>
        </div>
      </div>
    </footer>
  );
}
