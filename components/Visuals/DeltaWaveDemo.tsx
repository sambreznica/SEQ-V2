import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

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
// DELTA WAVE DEMO
// ──────────────────────────────────────────────────────────
const DeltaWaveDemo: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<'chaos' | 'coherent'>('chaos');
  
  // Motion values for smooth number transition
  const deltaValue = useMotionValue(42);
  const roundedDelta = useTransform(deltaValue, Math.round);

  // Paths
  const chaosPath = "M0 50 Q 20 10, 40 50 T 80 50 T 120 80 T 160 20 T 200 50 T 240 50 T 280 90 T 320 50 T 360 10 T 400 50";
  const coherentPath = "M0 50 Q 100 45, 200 50 T 400 50"; 

  const toggleMode = () => {
    const nextMode = mode === 'chaos' ? 'coherent' : 'chaos';
    setMode(nextMode);

    if (!prefersReduced) {
      animate(deltaValue, nextMode === 'coherent' ? 68 : 42, {
        duration: 1.5,
        ease: "easeInOut"
      });
    } else {
        deltaValue.set(nextMode === 'coherent' ? 68 : 42);
    }
  };

  return (
    <div className="w-full rounded-sm border border-seq-border/40 bg-seq-panel/40 px-5 py-6 flex flex-col gap-5 mt-10 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${mode === 'coherent' ? 'text-seq-jade' : 'text-seq-subtext/70'}`}>
                COHERENCE_DELTA_WAVEFORM
            </span>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-seq-ink border border-seq-border/50">
            <span className="font-mono text-xs text-seq-subtext/60">Δ</span>
            <motion.span className="font-mono text-sm font-medium text-white min-w-[2ch] text-center">
                {roundedDelta}
            </motion.span>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="h-32 w-full relative bg-seq-ink/20 rounded-sm border border-seq-border/20 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 px-0 opacity-10 pointer-events-none">
            <div className="w-full h-[1px] bg-seq-border" />
            <div className="w-full h-[1px] bg-seq-border" />
            <div className="w-full h-[1px] bg-seq-border" />
        </div>

        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
            <motion.path
                d={mode === 'chaos' ? chaosPath : coherentPath}
                stroke="#18b6a0" // seq-jade hex
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={false}
                animate={{ d: mode === 'chaos' ? chaosPath : coherentPath }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            
            {/* Traveling Dot - Only if not reduced motion */}
            {!prefersReduced && (
                <motion.circle 
                    r="3" 
                    fill="#a7f3d0"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ 
                        duration: mode === 'chaos' ? 4 : 2, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    style={{ offsetPath: `path('${mode === 'chaos' ? chaosPath : coherentPath}')` }}
                />
            )}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-end">
        <button 
            onClick={toggleMode}
            className="text-[10px] font-mono uppercase tracking-wider py-2 px-4 border border-seq-border/40 hover:border-seq-jade/40 hover:text-seq-jade hover:bg-seq-jade/5 rounded-sm transition-all"
        >
            {mode === 'chaos' ? 'Run one week of execution' : 'Reset Simulation'}
        </button>
      </div>

    </div>
  );
};

export default DeltaWaveDemo;



