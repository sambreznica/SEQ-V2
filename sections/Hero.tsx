import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Activity, Radio, Cpu } from 'lucide-react';
import { EngineBrain } from '../components/Visuals/EngineBrain';
import Button from '../components/UI/Button';
import Chip from '../components/UI/Chip';
import { HERO_CONTENT } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-seq-ink border-b border-seq-border">
      
      {/* Background Layer: Causal Brain-Space */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <EngineBrain intensity="low" className="w-full h-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-seq-ink/60 via-seq-ink/80 to-seq-ink" />
      </div>

      {/* Vignette Overlay - Lighter/Warmer Fade for Neutral tone */}
      <div className="absolute inset-0 bg-gradient-to-r from-seq-ink/90 via-seq-ink/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-seq-ink via-transparent to-transparent z-10 pointer-events-none" />

      {/* Grid Layout Container */}
      <div className="relative z-20 flex-grow flex flex-col max-w-[1600px] mx-auto w-full px-6 md:px-12 pt-32 pb-12">
        
        {/* Top Region: System Status & Branding - Stronger Form/Border */}
        <div className="flex justify-between items-start border-b border-seq-border pb-8 mb-12">
            <div className="flex gap-2 items-center text-xs font-mono text-seq-jade bg-seq-jade/10 px-3 py-1 rounded-sm border border-seq-jade/20">
                <Radio size={12} className="animate-pulse" />
                <span>SYSTEM_ONLINE // V2.1</span>
            </div>
            <div className="hidden md:flex gap-8 text-xs font-mono text-seq-subtext/60">
                <span>LAT: 40.7128° N</span>
                <span>LNG: 74.0060° W</span>
                <span>SEQ_ID: 882-A</span>
            </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-seq-border flex-grow items-center">
            
            {/* Left Column: Primary Typography (Span 8) */}
            <div className="lg:col-span-8 space-y-12 lg:pr-12">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 >
                    {/* Massive Architectural Headline */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] text-seq-text -ml-1">
                        Structure <br />
                        <span className="text-seq-subtext opacity-50">the Path.</span>
                    </h1>
                 </motion.div>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="max-w-xl border-l border-seq-border pl-6"
                 >
                    <p className="text-xl md:text-2xl text-seq-subtext font-light leading-relaxed">
                        {HERO_CONTENT.subheadline}
                    </p>
                 </motion.div>

                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="flex flex-wrap gap-4 pt-4"
                 >
                    <Button variant="primary" icon={<ArrowRight size={16} />}>
                        {HERO_CONTENT.cta}
                    </Button>
                    <Button variant="secondary">
                        View Documentation
                    </Button>
                 </motion.div>
            </div>

            {/* Right Column: System Readout / Structure (Span 4) */}
            <div className="lg:col-span-4 h-full flex flex-col justify-end lg:pl-12 pt-12 lg:pt-0">
                 
                 <div className="space-y-8 mb-12">
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-widest text-seq-subtext/60 font-mono">Current State</div>
                        {/* Form Line */}
                        <div className="h-[1px] w-full bg-seq-border" />
                        <div className="flex items-center gap-3 pt-1">
                             <Chip label="Noise" />
                             <span className="text-seq-subtext text-sm">High Entropy</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-widest text-seq-subtext/60 font-mono">Process</div>
                        <div className="h-[1px] w-full bg-seq-border" />
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-xs font-mono text-seq-jade">CAUSE</span>
                            <div className="h-[1px] w-8 bg-seq-jade/30" />
                            <span className="text-xs font-mono text-seq-jade">LINK</span>
                            <div className="h-[1px] w-8 bg-seq-jade/30" />
                            <span className="text-xs font-mono text-seq-text">EFFECT</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-widest text-seq-subtext/60 font-mono">Target State</div>
                        <div className="h-[1px] w-full bg-seq-border" />
                        <div className="flex items-center gap-3 pt-1">
                             <Chip label="Coherence" active />
                             <span className="text-seq-jade text-sm flex items-center gap-2">
                                <Activity size={14} /> Delta Max
                             </span>
                        </div>
                    </div>
                 </div>

                 <div className="p-6 border border-seq-border bg-seq-panel/50 backdrop-blur-sm rounded-sm">
                    <div className="flex items-start gap-4">
                        <Cpu className="text-seq-subtext mt-1" size={20} />
                        <div>
                            <h3 className="text-sm font-medium text-seq-text mb-1">Founding Cohort</h3>
                            <p className="text-xs text-seq-subtext leading-relaxed">
                                {HERO_CONTENT.subcta}
                            </p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-8 z-20 pointer-events-none">
        <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            <ChevronDown size={24} className="text-seq-subtext/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;