import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type EngineSidebarProps = {
  activeStage: number; // 0–6
};

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
// STAGE DEFINITIONS
// ──────────────────────────────────────────────────────────
const STAGES = [
  { id: 0, label: "Future State", desc: "Goal vector definition" },
  { id: 1, label: "Frames", desc: "Contextual domains" },
  { id: 2, label: "Linkages", desc: "Causal dependencies" },
  { id: 3, label: "Options", desc: "Reusable policies" },
  { id: 4, label: "Glimpses", desc: "Information probes" },
  { id: 5, label: "Coherence Δ", desc: "Signal measurement" },
  { id: 6, label: "Planner", desc: "Rolling 4-step loop" },
];

export const EngineSidebar: React.FC<EngineSidebarProps> = ({ activeStage }) => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="sticky top-28 hidden lg:block w-full max-w-xs">
      <div className="relative w-full flex justify-end">
        {/* background band */}
        <div className="pointer-events-none absolute inset-y-0 right-[-40px] w-[260px] bg-gradient-to-l from-seq-ink via-seq-panel/5 to-transparent" />

        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-sm rounded-sm border border-seq-border/40 bg-seq-panel/5 px-6 py-6 backdrop-blur-sm shadow-sm"
        >
          <div className="mb-6 pb-4 border-b border-seq-border/30">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-seq-subtext/60">
                  Execution Pipeline
              </span>
          </div>
          
          <div className="relative pl-2">
              {/* Connecting Line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-seq-border/40 via-seq-border/60 to-seq-border/40 z-0" />

              <ul className="space-y-6 relative z-10">
              {STAGES.map((stage) => {
                  const isActive = stage.id === activeStage;
                  
                  return (
                  <motion.li 
                      key={stage.id}
                      initial={false}
                      animate={prefersReduced ? {} : { 
                          opacity: isActive ? 1 : 0.6,
                          x: isActive ? 4 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex items-start gap-4 group transition-colors duration-300 ${
                          isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
                      }`}
                  >
                      {/* Dot Indicator */}
                      <div className="relative flex-shrink-0 pt-1.5">
                          <motion.div
                              initial={false}
                              animate={prefersReduced ? {} : {
                                  scale: isActive ? 1.2 : 1,
                                  backgroundColor: isActive ? "#a7f3d0" : "#27272a",
                                  borderColor: isActive ? "rgba(167, 243, 208, 0.4)" : "rgba(39, 39, 42, 0.6)"
                              }}
                              className={`w-2 h-2 rounded-full border transition-colors duration-300 ${
                                  isActive 
                                      ? "bg-seq-jade border-seq-jade/40 shadow-[0_0_8px_rgba(167,243,208,0.3)]" 
                                      : "bg-seq-border border-seq-border/60 group-hover:bg-seq-subtext/40"
                              }`}
                          />
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-col gap-0.5">
                          <span className={`text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-300 ${
                              isActive ? "text-seq-jade font-medium" : "text-seq-subtext/80 group-hover:text-seq-subtext"
                          }`}>
                              {stage.label}
                          </span>
                          <span className={`text-[10px] text-seq-subtext/50 leading-tight transition-all duration-300 ${
                              isActive ? "opacity-100 h-auto mt-1" : "opacity-0 h-0 overflow-hidden"
                          }`}>
                              {stage.desc}
                          </span>
                      </div>
                  </motion.li>
                  );
              })}
              </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};
