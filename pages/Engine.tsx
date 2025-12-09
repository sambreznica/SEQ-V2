import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EngineBrain } from '../components/Visuals/EngineBrain';
import { EngineSidebar } from '../components/Visuals/EngineSidebar';
import { PlannerDemo } from '../components/Visuals/PlannerDemo';
import WorldModelDiagram from '../components/Visuals/WorldModelDiagram';
import DeltaWaveDemo from '../components/Visuals/DeltaWaveDemo';

// ──────────────────────────────────────────────────────────
// STAGE INDEX MAPPING
// ──────────────────────────────────────────────────────────

const ENGINE_STAGE = {
  HERO: 0,        // Future State
  WORLD_MODEL: 2, // Linkages
  POLICY: 4,      // Glimpses
  PLANNER: 6,     // Planner
  DELTA: 5,       // Coherence Δ
  TRANSFER: 6,    // Planner / downstream
} as const;

// ──────────────────────────────────────────────────────────
// HOOKS
// ──────────────────────────────────────────────────────────

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mq.matches);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
};

// ──────────────────────────────────────────────────────────
// INTERNAL COMPONENTS
// ──────────────────────────────────────────────────────────

const EngineSection: React.FC<{
  kicker: string;
  title: string;
  children: React.ReactNode;
}> = ({ kicker, title, children }) => {
  const prefersReduced = usePrefersReducedMotion();
  
  return (
    <motion.section 
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 md:py-28 border-b border-seq-border/30"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-seq-jade">{kicker}</span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-snug">{title}</h2>
        </div>
        <div className="text-[15px] md:text-base text-seq-subtext leading-[1.8] font-light space-y-5">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

const VisualPlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <div className="mt-10 h-56 md:h-64 rounded-sm border border-seq-border/40 bg-seq-panel/30 flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.18em] text-seq-subtext/50">
    {label}
  </div>
);

const FeatureCard: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    }}
    className="rounded-sm border border-seq-border/40 bg-seq-panel/30 p-5 md:p-6 flex flex-col gap-3 hover:border-seq-jade/40 hover:-translate-y-1 transition-all duration-300"
  >
    <h3 className="text-sm font-medium text-white">{title}</h3>
    <p className="text-xs text-seq-subtext leading-relaxed">{body}</p>
  </motion.div>
);

const ComparisonColumn: React.FC<{ title: string; items: string[]; accent?: boolean }> = ({ title, items, accent }) => (
  <motion.div 
    whileHover={accent ? { scale: 1.01, borderColor: 'rgba(167, 243, 208, 0.6)' } : { scale: 0.98, filter: 'blur(0.5px)' }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className={`rounded-sm border p-6 flex flex-col gap-4 ${accent ? 'border-seq-jade/40 bg-seq-jade/5' : 'border-seq-border/40 bg-seq-panel/30'}`}
  >
    <h4 className={`text-xs font-mono uppercase tracking-[0.15em] ${accent ? 'text-seq-jade' : 'text-seq-subtext'}`}>{title}</h4>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-seq-subtext leading-relaxed flex gap-2">
          <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${accent ? 'bg-seq-jade' : 'bg-seq-subtext/40'}`} />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

// ──────────────────────────────────────────────────────────
// PAGE COMPONENT
// ──────────────────────────────────────────────────────────

const EnginePage: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const pipeline = ["Future State", "Frames", "Linkages", "Options", "Glimpses", "Δ", "Planner"];
  
  // Scroll tracking refs (ordered top → bottom)
  const heroRef = useRef<HTMLElement | null>(null);
  const worldModelRef = useRef<HTMLDivElement | null>(null);
  const policyRef = useRef<HTMLDivElement | null>(null);
  const plannerRef = useRef<HTMLDivElement | null>(null);
  const deltaRef = useRef<HTMLDivElement | null>(null);
  const transferRef = useRef<HTMLDivElement | null>(null);

  const [activeStage, setActiveStage] = React.useState<number>(ENGINE_STAGE.HERO);

  // Deterministic scroll-based stage tracking
  useEffect(() => {
    const sectionRefs = [
      { ref: heroRef, stage: ENGINE_STAGE.HERO },
      { ref: worldModelRef, stage: ENGINE_STAGE.WORLD_MODEL },
      { ref: policyRef, stage: ENGINE_STAGE.POLICY },
      { ref: plannerRef, stage: ENGINE_STAGE.PLANNER },
      { ref: deltaRef, stage: ENGINE_STAGE.DELTA },
      { ref: transferRef, stage: ENGINE_STAGE.TRANSFER },
    ];

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.3; // 30% from top

      let currentStage = ENGINE_STAGE.HERO;

      for (const section of sectionRefs) {
        const el = section.ref.current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is "active" if its top has moved above the 30% line
        if (rect.top - threshold <= 0) {
          currentStage = section.stage;
        }
      }

      setActiveStage(currentStage);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-seq-ink min-h-screen w-full text-seq-text font-sans selection:bg-seq-jade/20 selection:text-seq-jade">
      
      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <header ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-seq-border/30 bg-seq-ink overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <EngineBrain intensity="high" className="w-full h-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-seq-ink/40 via-seq-ink/70 to-seq-ink" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-8 max-w-3xl"
          >
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-seq-jade">
              ENGINE // APC EXECUTION CORE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              Execution as active predictive control.
            </h1>
            <div className="text-base md:text-lg text-seq-subtext leading-relaxed font-light space-y-4 max-w-3xl">
              <p>
                Sequence treats work the way predictive-processing systems treat perception and action: as a continual loop of model → prediction → experiment → update.
              </p>
              <p>
                The engine maintains a hierarchical world model around your Future State, proposes short-horizon moves, and updates itself with every observation.
              </p>
              <p>
                The result is an execution system that adapts as fast as your environment changes.
              </p>
            </div>
            <div className="pt-4">
              <motion.div className="text-[11px] font-mono text-seq-subtext/60 flex flex-wrap gap-2">
                {pipeline.map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.4, delay: 0.3 + idx * 0.08 }}
                    className="uppercase tracking-[0.18em]"
                  >
                    {item}
                    {idx < pipeline.length - 1 && <span className="mx-1 text-seq-subtext/40">→</span>}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:grid lg:grid-cols-[minmax(0,2.4fr)_minmax(260px,0.9fr)] lg:gap-16 items-start py-20 md:py-24">
        
        {/* Left Column: Main Content */}
        <div className="flex flex-col">

            {/* ═══════════════════════════════════════════════════════
                SECTION 1 — THEORY
            ═══════════════════════════════════════════════════════ */}
            <EngineSection 
            kicker="APC + ACTIVE INFERENCE" 
            title="A predictive engine for decision-making under uncertainty."
            >
            <p>
                Active Predictive Coding and Active Inference describe intelligence as the minimization of prediction error.
            </p>
            <p>
                Higher levels encode goals; lower levels predict what should happen next. Surprise updates the model. Action is chosen to reduce future uncertainty.
            </p>
            <p>
                Sequence adapts this architecture for operators. Instead of proprioception and motor commands, the engine works with markets, messaging, demand curves, proof, channels, and experiments.
            </p>
            <p>
                It maintains a structured hypothesis of "what must be true" for your Future State to become real — and selects actions that either reduce that gap or reduce the uncertainty that surrounds it.
            </p>
            <WorldModelDiagram />
            </EngineSection>

            {/* ═══════════════════════════════════════════════════════
                SECTION 2 — WORLD MODEL
            ═══════════════════════════════════════════════════════ */}
            <div ref={worldModelRef}>
                <EngineSection 
                kicker="WORLD MODEL" 
                title="Future State → Frames → Linkages."
                >
                <p>
                    The engine's generative model begins with your Future State — a time-bound goal that acts as a directional prior.
                </p>
                <p>
                    It factorizes this model into Frames, each representing a local domain where policies can be learned independently and reused across contexts.
                </p>
                <p>
                    Within each Frame, it maintains Linkages: causal hypotheses describing the conditions that must move to make progress real.
                </p>
                <p>
                    Every recommendation, every Glimpse, and every Δ score is justified against this structure.
                </p>
                
                <motion.div 
                    className="grid gap-4 md:grid-cols-3 mt-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                    }}
                >
                    <FeatureCard 
                    title="Future State Compiler" 
                    body="Encodes directionality and conditions all downstream inference."
                    />
                    <FeatureCard 
                    title="Frame Graph" 
                    body="Separates domains so learning is sample-efficient."
                    />
                    <FeatureCard 
                    title="Linkage Model" 
                    body="Represents 'what must be true' as explicit causal structure."
                    />
                </motion.div>
                
                <VisualPlaceholder label="Layered Causal Diagram — FS → Frames → Linkages" />
                </EngineSection>
            </div>

            {/* ═══════════════════════════════════════════════════════
                SECTION 3 — POLICY LAYER
            ═══════════════════════════════════════════════════════ */}
            <div ref={policyRef}>
                <EngineSection 
                kicker="POLICY STRUCTURE" 
                title="Options and Glimpses — abstract policies and active probes."
                >
                <p>
                    Policies are not tasks. They are Options: structured, reusable plays with parameters, rationale, and observed Δ.
                </p>
                <p>
                    When an Option works in one Frame, the engine can adapt and transfer it to another.
                </p>
                <p>
                    Glimpses are epistemic actions — short probes designed to reduce uncertainty before committing resources. A Glimpse is scored on expected Δ, information gain, and effort.
                </p>
                <p>
                    This is how the engine substitutes "guessing" with controlled, efficient inquiry.
                </p>
                
                <motion.blockquote 
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-10 py-6 border-l-2 border-seq-jade/40 pl-6"
                >
                    <p className="text-base md:text-lg text-white font-light italic">
                    Every week becomes an experiment, not a gamble.
                    </p>
                </motion.blockquote>
                </EngineSection>
            </div>

            {/* ═══════════════════════════════════════════════════════
                SECTION 4 — SHORT-HORIZON PLANNING
            ═══════════════════════════════════════════════════════ */}
            <div ref={plannerRef}>
                <EngineSection 
                kicker="MPC" 
                title="A rolling 4-step planner that never hallucinates certainty."
                >
                <p>
                    Long-range planning collapses under uncertainty.
                </p>
                <p>
                    Sequence uses a short-horizon control loop inspired by Model Predictive Control: the engine generates four plausible moves, you commit to one, observe reality, and it re-plans.
                </p>
                <p>
                    This avoids fantasy planning and ensures each step is conditioned on fresh evidence.
                </p>
                
                {/* Live Planner Demo */}
                <PlannerDemo />
                </EngineSection>
            </div>

            {/* ═══════════════════════════════════════════════════════
                SECTION 5 — MEASUREMENT LAYER
            ═══════════════════════════════════════════════════════ */}
            <div ref={deltaRef}>
                <EngineSection 
                kicker="PREDICTION ERROR" 
                title="Coherence Δ — progress, decomposed."
                >
                <p>
                    Δ is the engine's scalar estimate of how much an action reduced the gap between your present state and your Future State.
                </p>
                <p>
                    It is derived from three components:
                </p>
                
                <ul className="space-y-3 mt-2">
                    <li className="flex gap-3 items-baseline group">
                    <span className="font-mono text-[10px] text-seq-jade tracking-wider">50%</span>
                    <span><strong className="text-white font-medium group-hover:text-seq-jade transition-colors">Coverage</strong> — Did the action touch the causal linkages that matter?</span>
                    </li>
                    <li className="flex gap-3 items-baseline group">
                    <span className="font-mono text-[10px] text-seq-jade tracking-wider">35%</span>
                    <span><strong className="text-white font-medium group-hover:text-seq-jade transition-colors">Prediction Fit</strong> — Did reality behave as expected?</span>
                    </li>
                    <li className="flex gap-3 items-baseline group">
                    <span className="font-mono text-[10px] text-seq-jade tracking-wider">15%</span>
                    <span><strong className="text-white font-medium group-hover:text-seq-jade transition-colors">Time-to-Signal</strong> — How quickly did we learn?</span>
                    </li>
                </ul>
                
                <p className="mt-6">
                    Δ is not a mood metric. It is a principled estimate of prediction-error reduction, grounded in the same variational logic that underpins Active Inference.
                </p>
                
                {/* Live Delta Wave Demo */}
                <DeltaWaveDemo />
                </EngineSection>
            </div>

            {/* ═══════════════════════════════════════════════════════
                SECTION 6 — TRANSFER MEMORY
            ═══════════════════════════════════════════════════════ */}
            <div ref={transferRef}>
                <EngineSection 
                kicker="TRANSFER GRAPH" 
                title="A library that gets more intelligent with use."
                >
                <p>
                    The engine tracks which Options consistently produce positive Δ and which should be retired.
                </p>
                <p>
                    Across Frames, it learns where structure can be reused. This forms the Transfer Graph — a memory of what worked, under what conditions, and why.
                </p>
                <p>
                    Opening a new Frame no longer means starting from zero. The engine can infer what is likely to succeed before you act.
                </p>
                
                <div className="mt-10 flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.15em] text-seq-subtext/60">
                    <span className="hover:text-seq-jade transition-colors cursor-default">PROVENANCE</span>
                    <span className="text-seq-jade/40">//</span>
                    <span className="hover:text-seq-jade transition-colors cursor-default">REUSE</span>
                    <span className="text-seq-jade/40">//</span>
                    <span className="hover:text-seq-jade transition-colors cursor-default">CONTEXTUAL ADAPTATION</span>
                </div>
                </EngineSection>
            </div>

            {/* ═══════════════════════════════════════════════════════
                SECTION 7 — DIFFERENTIATION
            ═══════════════════════════════════════════════════════ */}
            <motion.section 
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="py-20 md:py-28 border-b border-seq-border/30"
            >
                <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-seq-jade">DIFFERENTIATION</span>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-snug max-w-3xl">
                    Not a chat agent. A predictive-control system.
                    </h2>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 mt-4">
                    <ComparisonColumn 
                    title="Most AI Tools"
                    items={[
                        "Generate endless suggestions ungrounded in causal structure",
                        "Optimize for language plausibility, not real-world coherence",
                        "Forget everything between sessions",
                        "Cannot explain why an action should produce a result"
                    ]}
                    />
                    <ComparisonColumn 
                    title="Sequence Engine"
                    accent
                    items={[
                        "Maintains an explicit world model (Future State → Frames → Linkages)",
                        "Chooses actions to reduce Δ, not generate content",
                        "Learns reusable Options across domains",
                        "Explains every move: Prediction → Observation → Δ → Why"
                    ]}
                    />
                </div>
                
                <div className="mt-8 pt-8 border-t border-seq-border/20">
                    <p className="text-base md:text-lg text-white font-light">
                    This is not prompt engineering.<br />
                    <span className="text-seq-jade">It is predictive control for work.</span>
                    </p>
                </div>
                </div>
            </motion.section>

        </div>
        
        {/* Right Column: Sticky Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">
          <EngineSidebar activeStage={activeStage} />
        </aside>

      </main>
    </div>
  );
};

export default EnginePage;
