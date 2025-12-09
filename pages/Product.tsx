import React from 'react';

// ──────────────────────────────────────────────────────────
// SHARED COMPONENTS (INTERNAL)
// ──────────────────────────────────────────────────────────

const ProductSection: React.FC<{
  kicker: string;
  title: string;
  children: React.ReactNode;
}> = ({ kicker, title, children }) => (
  <section className="py-16 md:py-20 border-b border-seq-border/30">
    <div className="max-w-5xl mx-auto px-6 md:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-seq-jade">{kicker}</span>
          <h2 className="text-3xl font-medium tracking-tight text-white">{title}</h2>
        </div>
        <div className="text-sm md:text-base text-seq-subtext leading-relaxed font-light max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  </section>
);

const VisualPlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <div className="mt-6 h-48 rounded-sm border border-seq-border/40 bg-seq-panel/40 flex items-center justify-center text-[11px] font-mono uppercase tracking-[0.16em] text-seq-subtext/60">
    {label}
  </div>
);

// ──────────────────────────────────────────────────────────
// PAGE COMPONENT
// ──────────────────────────────────────────────────────────

const ProductPage: React.FC = () => {
  return (
    <div className="bg-seq-ink min-h-screen w-full text-seq-text font-sans selection:bg-seq-jade/20 selection:text-seq-jade pt-20">
      <main>
        
        {/* SECTION 1 — SYSTEM OVERVIEW */}
        <ProductSection kicker="SYSTEM OVERVIEW" title="The engine that keeps you aligned with your future state.">
          <p>
            Sequence runs a continuous planning loop.
          </p>
          <p className="mt-4">
            It predicts what should happen next, compares that prediction with reality, and adjusts your path.
          </p>
          <p className="mt-4">
            You move with intention, not reaction.
          </p>
        </ProductSection>

        {/* SECTION 2 — EXECUTION CANVAS */}
        <ProductSection kicker="EXECUTION CANVAS" title="One place. One path. Always current.">
          <p>
            Your canvas shows the actions that matter this week, the linkages that justify them, and the evidence that improves the system.
          </p>
          <p className="mt-4">
            It is a real-time model of your direction—compact, coherent, and always updated.
          </p>
          <VisualPlaceholder label="Execution Canvas Visual" />
        </ProductSection>

        {/* SECTION 3 — GLIMPSE SCHEDULER */}
        <ProductSection kicker="GLIMPSES" title="Reduce uncertainty before you commit effort.">
          <p>
            A Glimpse is a minimal probe.
          </p>
          <p className="mt-4">
            It reveals what you need to know, fast.
          </p>
          <p className="mt-4">
            Sequence ranks Glimpses by expected information gain, so you discover more while doing less.
          </p>
          
          {/* Grid Layout for Cards */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-lg border border-seq-border/40 bg-seq-panel/40 px-4 py-5 hover:border-seq-jade/60 transition-colors flex flex-col gap-3">
              <h3 className="text-sm font-medium text-white">Information-gain first</h3>
              <p className="text-xs text-seq-subtext leading-relaxed">
                Sequence selects actions that maximize what you will learn—not what looks impressive.
              </p>
            </div>
            <div className="rounded-lg border border-seq-border/40 bg-seq-panel/40 px-4 py-5 hover:border-seq-jade/60 transition-colors flex flex-col gap-3">
              <h3 className="text-sm font-medium text-white">Fast Δ acceleration</h3>
              <p className="text-xs text-seq-subtext leading-relaxed">
                Every Glimpse is engineered to shift Δ quickly by resolving key causal unknowns.
              </p>
            </div>
            <div className="rounded-lg border border-seq-border/40 bg-seq-panel/40 px-4 py-5 hover:border-seq-jade/60 transition-colors flex flex-col gap-3">
              <h3 className="text-sm font-medium text-white">Energy discipline</h3>
              <p className="text-xs text-seq-subtext leading-relaxed">
                Short probes prevent wasteful over-commitment and preserve operator attention.
              </p>
            </div>
          </div>
        </ProductSection>

        {/* SECTION 4 — ROLLING 4-STEP PLANNER */}
        <ProductSection kicker="PLANNER" title="A horizon that moves with you.">
          <p>
            The planner proposes four steps.
          </p>
          <p className="mt-4">
            You commit to one.
          </p>
          <p className="mt-4">
            When you act, the system recalculates the next best move based on updated evidence.
          </p>
          <p className="mt-4">
            No long-range fantasies.
          </p>
          <p className="mt-4">
            Just steady, reliable momentum.
          </p>
          <VisualPlaceholder label="4-step planner diagram" />
        </ProductSection>

        {/* SECTION 5 — COHERENCE Δ */}
        <ProductSection kicker="COHERENCE" title="Progress you can see—and trust.">
          <p>
            Every action is scored.
          </p>
          <p className="mt-4">
            Sequence measures how much it reduced uncertainty, aligned with your future state, or closed a critical linkage.
          </p>
          <p className="mt-4">
            The Δ curve becomes the objective story of your growth.
          </p>
          <VisualPlaceholder label="Δ sparkline / meter" />
        </ProductSection>

        {/* SECTION 6 — EVIDENCE MODE */}
        <ProductSection kicker="EVIDENCE" title="A traceable record of why your plan works.">
          <p>
            Each action becomes an evidence card:
          </p>
          <p className="mt-4">
            Prediction → Observation → Δ → Why.
          </p>
          <p className="mt-4">
            Your reasoning is captured.
          </p>
          <p className="mt-4">
            Your progress becomes tangible.
          </p>
          <p className="mt-4">
            You can show your work—or keep it for yourself.
          </p>
          <VisualPlaceholder label="Evidence panel preview" />
        </ProductSection>

      </main>
    </div>
  );
};

export default ProductPage;
