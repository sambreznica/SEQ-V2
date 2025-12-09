import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { submitEarlyAccess } from '../lib/earlyAccess';

type StatusState = 'idle' | 'loading' | 'success' | 'error';

type Status = {
  state: StatusState;
  message?: string;
};

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EarlyAccess: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [futureState, setFutureState] = useState('');
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const loading = status.state === 'loading';

  useEffect(() => {
    if (status.state === 'success') {
      const timer = setTimeout(
        () => setStatus({ state: 'idle' }),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [status.state]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!email.trim() || !emailRegex.test(email.trim())) {
      setStatus({
        state: 'error',
        message: 'Enter a valid email so we can reach you.',
      });
      return;
    }

    setStatus({ state: 'loading' });

    try {
      await submitEarlyAccess({
        email: email.trim(),
        role: role.trim() || undefined,
        future_state: futureState.trim() || undefined,
        source: 'early-access-page',
      });

      setEmail('');
      setRole('');
      setFutureState('');
      setStatus({
        state: 'success',
        message:
          "You're in the queue. We’ll reach out when the founding cohort opens.",
      });
    } catch (err: any) {
      console.error('[EarlyAccess] Unexpected error:', err);
      setStatus({
        state: 'error',
        message:
          err.message ||
          'Unexpected error while saving your request. Please try again.',
      });
    }
  };

  const Wrapper: React.ComponentType<React.HTMLAttributes<HTMLElement>> =
    prefersReducedMotion ? 'section' : (motion.section as any);

  return (
    <Wrapper
      className="min-h-screen bg-seq-ink text-seq-text"
      {...(!prefersReducedMotion
        ? {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: 'easeOut' },
          }
        : {})}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <header className="mb-10">
          <p className="text-xs font-mono tracking-[0.2em] text-seq-jade uppercase mb-3">
            EARLY ACCESS // FOUNDING COHORT
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
            Be first into the Sequence engine.
          </h1>
          <p className="text-sm md:text-base text-seq-subtext max-w-xl leading-relaxed">
            We are opening a small founding cohort for operators and founders
            who want to run their future state through the Sequence execution
            engine. Share your details below and we&apos;ll review your fit
            for the first wave.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-seq-charcoal/40 border border-seq-border/60 rounded-sm p-6 md:p-8"
        >
          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-[0.18em] uppercase text-seq-subtext">
              Email<span className="text-seq-jade"> *</span>
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-seq-border/60 bg-seq-panel/40 px-3 py-2 text-sm text-seq-text placeholder:text-seq-subtext/60 focus:outline-none focus:border-seq-jade"
              placeholder="you@domain.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-[0.18em] uppercase text-seq-subtext">
              Role / context
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-sm border border-seq-border/60 bg-seq-panel/40 px-3 py-2 text-sm text-seq-text placeholder:text-seq-subtext/60 focus:outline-none focus:border-seq-jade"
              placeholder="Founder, operator, IC, etc."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-[0.18em] uppercase text-seq-subtext">
              Future state
            </label>
            <p className="text-[11px] text-seq-subtext/70 mb-1">
              In one or two sentences: who are you trying to become in the next
              12–24 months?
            </p>
            <textarea
              value={futureState}
              onChange={(e) => setFutureState(e.target.value)}
              rows={4}
              className="w-full rounded-sm border border-seq-border/60 bg-seq-panel/40 px-3 py-2 text-sm text-seq-text placeholder:text-seq-subtext/60 focus:outline-none focus:border-seq-jade resize-none"
              placeholder="e.g. &quot;A founder with a repeatable demand system and proof that I can ship complex products.&quot;"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-sm border border-seq-border bg-white px-5 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-seq-ink hover:bg-seq-jade hover:text-seq-ink disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving…' : 'Join the founding cohort →'}
            </button>
            <p className="text-[10px] font-mono text-seq-subtext/60 uppercase tracking-[0.16em]">
              No spam. Direct only, encrypted.
            </p>
          </div>

          {status.state === 'success' && status.message && (
            <p className="text-[11px] font-mono text-seq-jade mt-2">
              {status.message}
            </p>
          )}

          {status.state === 'error' && status.message && (
            <p className="text-[11px] font-mono text-red-400 mt-2">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </Wrapper>
  );
};

export default EarlyAccess;
