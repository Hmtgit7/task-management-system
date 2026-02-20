'use client';

import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    q: 'Is TaskFlow really free?',
    a: 'Yes! The core features — task management, categories, analytics, and more — are completely free. No credit card required.',
  },
  {
    q: 'Can I use TaskFlow on mobile?',
    a: 'Absolutely. TaskFlow is fully responsive and works great on any screen size. A native mobile app is coming soon.',
  },
  {
    q: 'How do categories work?',
    a: 'Categories are color-coded labels you assign to tasks. You can filter your task list by category to stay focused on one area at a time.',
  },
  {
    q: 'What happens to overdue tasks?',
    a: 'Overdue tasks are automatically highlighted with a visual indicator. The dashboard also shows you a dedicated overdue count in your stats.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All data is scoped per user with JWT authentication. We use bcrypt for passwords and secure HTTP-only cookies for refresh tokens.',
  },
  {
    q: 'Can I export my tasks?',
    a: 'CSV and PDF export is on our roadmap for the next release. Star us on GitHub to stay updated!',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
        open
          ? 'border-fuchsia-500/30 bg-fuchsia-500/5'
          : 'border-border dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02]'
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground dark:text-white">{q}</span>
        <span
          className={`shrink-0 h-6 w-6 flex items-center justify-center rounded-full transition-colors ${open ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-muted dark:bg-white/10 text-foreground/40 dark:text-white/40'}`}
        >
          {open ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <p className="px-5 pb-4 text-sm text-foreground/40 dark:text-white/40 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-3 block">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-foreground/40 dark:text-white/40 text-sm">
            Quick answers to common questions about TaskFlow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
