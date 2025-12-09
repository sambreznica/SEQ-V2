import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ──────────────────────────────────────────────────────────
// HOOK FOR REDUCED MOTION (LOCAL)
// ──────────────────────────────────────────────────────────
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mq.matches);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
};

// ──────────────────────────────────────────────────────────
// STEP DATA
// ──────────────────────────────────────────────────────────
const PLANNER_STEPS = [
  { id: 1, title: "Ship updated narrative frame", type: "OPTION" },
  { id: 2, title: "Run Glimpse on LinkedIn hook", type: "GLIMPSE" },
  { id: 3, title: "Validate PMF signal w/ 3 calls", type: "GLIMPSE" },
  { id: 4, title: "Draft investor deck v2", type: "OPTION" },
];

type StepStatus = "ACTIVE" | "QUEUED" | "DONE";

export const PlannerDemo: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [delta, setDelta] = useState(42);
  const [deltaFlash, setDeltaFlash] = useState(false);

  const getStatus = (index: number): StepStatus => {
    if (index < activeIndex) return "DONE";
    if (index === activeIndex) return "ACTIVE";
    return "QUEUED";
  };

  const handleCommit = () => {
    // Advance to next step (wrap around)
    const nextIndex = (activeIndex + 1) % PLANNER_STEPS.length;
    setActiveIndex(nextIndex);
    
    // Bump delta by random amount
    const bump = Math.floor(Math.random() * 7) + 3; // +3 to +9
    setDelta((prev) => prev + bump);
    
    // Flash the delta
    setDeltaFlash(true);
    setTimeout(() => setDeltaFlash(false), 400);
  };

  return (
    <div className="mt-10 rounded-sm border border-seq-border/40 bg-seq-panel/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-seq-border/30 bg-seq-panel/20">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-seq-subtext/70">
          ROLLING_4_STEP_PLANNER
        </span>
        <motion.span 
          animate={!prefersReduced && deltaFlash ? { 
            scale: 1.15, 
            color: "#a7f3d0" 
          } : { 
            scale: 1, 
            color: "#a1a1aa" 
          }}
          transition={{ duration: 0.2 }}
          className="font-mono text-xs tracking-wider"
        >
          Δ <span className="text-seq-jade font-medium">+{delta}</span>
        </motion.span>
      </div>

      {/* Steps List */}
      <div className="divide-y divide-seq-border/20">
        {PLANNER_STEPS.map((step, idx) => {
          const status = getStatus(idx);
          const isActive = status === "ACTIVE";
          const isDone = status === "DONE";

          return (
            <div 
              key={step.id}
              className={`flex items-center gap-4 px-5 py-4 transition-colors duration-200 ${
                isActive 
                  ? "bg-seq-jade/5" 
                  : isDone 
                    ? "bg-seq-panel/10 opacity-60" 
                    : "hover:bg-seq-panel/20"
              }`}
            >
              {/* Index */}
              <span className={`font-mono text-[11px] tabular-nums ${
                isActive ? "text-seq-jade" : "text-seq-subtext/50"
              }`}>
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Title + Type */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${
                  isActive ? "text-white" : isDone ? "text-seq-subtext/60 line-through" : "text-seq-subtext"
                }`}>
                  {step.title}
                </p>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${
                  step.type === "GLIMPSE" ? "text-seq-jade/60" : "text-seq-subtext/40"
                }`}>
                  {step.type}
                </span>
              </div>

              {/* Status Pill */}
              <span className={`px-2 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-wider border ${
                isActive 
                  ? "border-seq-jade/40 bg-seq-jade/10 text-seq-jade" 
                  : isDone 
                    ? "border-seq-border/30 bg-seq-panel/20 text-seq-subtext/40" 
                    : "border-seq-border/30 bg-transparent text-seq-subtext/40"
              }`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-seq-border/30 bg-seq-panel/10">
        <button 
          onClick={handleCommit}
          className="w-full py-2.5 px-4 rounded-sm bg-seq-jade/10 border border-seq-jade/30 text-seq-jade font-mono text-xs uppercase tracking-wider hover:bg-seq-jade/20 hover:border-seq-jade/50 transition-colors"
        >
          Commit next step
        </button>
      </div>
    </div>
  );
};



