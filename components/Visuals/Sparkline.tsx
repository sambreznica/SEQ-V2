import React from 'react';
import { motion } from 'framer-motion';

const Sparkline: React.FC = () => {
  // Path 1: Chaos (High entropy, jagged, noisy)
  const chaosPath = "M0 50 C 10 10, 20 90, 30 30 C 40 80, 50 10, 60 70 C 70 20, 80 90, 90 40 C 100 80, 110 20, 120 70 C 130 30, 140 90, 150 20 C 160 80, 170 40, 180 60 L 200 50";

  // Path 2: Coherence (Structure, aligned, smooth sigmoid to straight)
  const coherencePath = "M0 50 C 20 50, 40 50, 60 50 C 80 50, 100 50, 120 50 C 140 50, 160 50, 180 50, 200 50";
  
  // Path 3: The Pulse (Alive but controlled)
  const pulsePath = "M0 50 C 20 50, 40 50, 60 48, 80 45 C 100 35, 120 45, 140 48 C 160 50, 180 50, 200 50";

  return (
    <div className="w-full h-full flex items-center justify-center relative">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(167, 243, 208, 0)" />
                <stop offset="50%" stopColor="#a7f3d0" /> {/* Mint Glass */}
                <stop offset="100%" stopColor="rgba(167, 243, 208, 0)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Background Grid Line */}
        <line x1="0" y1="50" x2="200" y2="50" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />

        {/* The Causal Waveform - Morphing from Chaos to Coherence */}
        <motion.path
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ d: chaosPath, opacity: 0.5 }}
            whileInView={{ 
                d: [chaosPath, chaosPath, coherencePath, pulsePath], 
                opacity: [0.5, 0.8, 1, 1] 
            }}
            transition={{ 
                duration: 4, 
                times: [0, 0.2, 0.7, 1],
                ease: "easeInOut" 
            }}
            viewport={{ once: true, margin: "-100px" }}
        />

        {/* The Delta Particle - Travels the line representing execution */}
        <motion.circle
            r="3"
            fill="#a7f3d0"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            whileInView={{ offsetDistance: "100%", opacity: 1 }}
            transition={{ 
                duration: 3, 
                ease: "linear", 
                repeat: Infinity,
                repeatDelay: 1,
                delay: 2 // Wait for coherence
            }}
            style={{ 
                offsetPath: `path("${pulsePath}")`,
                offsetRotate: "0deg"
            }}
        />
        
        {/* Particle Trail/Ghost */}
        <motion.circle
            r="6"
            fill="#a7f3d0"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            whileInView={{ offsetDistance: "100%", opacity: [0, 0.3, 0] }}
            transition={{ 
                duration: 3, 
                ease: "linear", 
                repeat: Infinity,
                repeatDelay: 1,
                delay: 2
            }}
            style={{ 
                offsetPath: `path("${pulsePath}")`
            }}
        />
        </svg>
        
        <div className="absolute bottom-0 right-0 text-[10px] font-mono text-seq-jade opacity-60 tracking-widest">
            Δ COHERENCE_VISUALIZER
        </div>
    </div>
  );
};

export default Sparkline;