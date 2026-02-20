'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/15 to-cyan-500/10" />
          <div className="absolute inset-0 border border-fuchsia-500/20 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-fuchsia-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative px-8 sm:px-16 py-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Ready to get <span className="text-gradient">more done?</span>
            </h2>
            <p className="text-foreground/50 dark:text-white/50 mb-8 max-w-md mx-auto text-sm sm:text-base">
              Join thousands of users who use TaskFlow to stay organized and ship work faster.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="h-12 px-10 bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white border-0 shadow-xl shadow-fuchsia-500/30 font-semibold group"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="mt-4 text-xs text-foreground/20 dark:text-white/20">
              No credit card · Cancel anytime · Free forever plan
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
