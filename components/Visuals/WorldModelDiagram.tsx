import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ──────────────────────────────────────────────────────────
// HOOK FOR REDUCED MOTION
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
// WORLD MODEL DIAGRAM
// ──────────────────────────────────────────────────────────
const WorldModelDiagram: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
      whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full rounded-sm border border-seq-border/40 bg-seq-panel/40 px-6 py-8 flex flex-col gap-8 relative overflow-hidden mt-10"
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* LAYER 1: FUTURE STATE */}
      <div className="flex flex-col items-center relative z-10">
        <div className="border border-seq-jade/30 bg-seq-jade/5 rounded-sm px-6 py-3 flex flex-col items-center gap-1 min-w-[200px] shadow-[0_0_15px_rgba(167,243,208,0.05)]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-seq-jade font-medium tracking-widest">FS</span>
            <span className="text-sm text-white font-medium tracking-wide">Future State</span>
          </div>
          <span className="text-[10px] text-seq-subtext/60 font-mono tracking-wide">Goal vector prior</span>
        </div>
        
        {/* Connection Lines Down */}
        <div className="h-8 w-[1px] bg-gradient-to-b from-seq-jade/30 to-seq-border/40" />
        <div className="h-[1px] w-[60%] bg-seq-border/40 relative">
            <div className="absolute left-0 top-[-2px] w-1 h-1 rounded-full bg-seq-border/60" />
            <div className="absolute right-0 top-[-2px] w-1 h-1 rounded-full bg-seq-border/60" />
            <div className="absolute left-1/2 -translate-x-1/2 top-[-2px] w-1 h-1 rounded-full bg-seq-jade/40" />
        </div>
        <div className="flex justify-between w-[60%] h-6">
            <div className="w-[1px] h-full bg-seq-border/40" />
            <div className="w-[1px] h-full bg-seq-border/40" />
            <div className="w-[1px] h-full bg-seq-border/40" />
        </div>
      </div>

      {/* LAYER 2: FRAMES */}
      <div className="grid grid-cols-3 gap-4 relative z-10">
        {["Narrative", "Demand Gen", "Product"].map((frame, i) => (
            <motion.div 
                key={frame}
                initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                className="border border-seq-border/40 bg-seq-panel/60 rounded-sm p-3 flex flex-col gap-2 hover:border-seq-border/60 transition-colors group"
            >
                <span className="font-mono text-[9px] text-seq-subtext/40 tracking-widest group-hover:text-seq-jade/60 transition-colors">
                    FR_0{i+1}
                </span>
                <span className="text-xs text-seq-text font-medium">{frame}</span>
                <div className="h-[1px] w-full bg-seq-border/20 mt-1" />
                <span className="text-[9px] text-seq-subtext/50 leading-tight">Local domain policy</span>
            </motion.div>
        ))}
      </div>

      {/* Connection Lines Down */}
      <div className="flex justify-around px-8 -my-2 relative z-0 opacity-40">
         <div className="h-8 w-[1px] bg-gradient-to-b from-seq-border/40 to-seq-jade/20" />
         <div className="h-8 w-[1px] bg-gradient-to-b from-seq-border/40 to-seq-jade/20" />
         <div className="h-8 w-[1px] bg-gradient-to-b from-seq-border/40 to-seq-jade/20" />
      </div>

      {/* LAYER 3: LINKAGES */}
      <div className="relative z-10">
        <div className="border border-seq-border/40 bg-seq-panel/30 rounded-sm px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-seq-jade/80 tracking-widest">LINKAGES</span>
                <span className="text-[11px] text-seq-subtext/60">Causal dependencies & preconditions</span>
            </div>
            
            {/* Animated Pulse Dots */}
            <div className="flex gap-2">
                {[1,2,3].map(d => (
                    <motion.div 
                        key={d}
                        animate={prefersReduced ? {} : { opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: d * 0.5, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-seq-jade"
                    />
                ))}
            </div>
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-3 right-4">
        <span className="font-mono text-[9px] text-seq-subtext/30 tracking-widest uppercase">
            HIERARCHICAL_WORLD_MODEL // FS → FRAMES → LINKAGES
        </span>
      </div>

    </motion.div>
  );
};

export default WorldModelDiagram;



