import React from 'react';
import Section from '../components/Layout/Section';
import { EVIDENCE_METRICS } from '../constants';
import Sparkline from '../components/Visuals/Sparkline';
import { motion } from 'framer-motion';

const Evidence: React.FC = () => {
  return (
    <Section className="bg-seq-ink border-t border-seq-border/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header + Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
                 <div className="text-xs font-mono font-medium uppercase tracking-[0.18em] text-seq-jade">
                    Why This Works
                 </div>
                 <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">
                    The Physics of Progress.
                 </h2>
                 <div className="space-y-4 text-seq-subtext leading-relaxed">
                    <p>
                        Most systems fail because they rely on willpower (a depleting resource) rather than structure (a stable resource).
                    </p>
                    <ul className="space-y-3 pt-2">
                        <li className="flex items-center gap-3 text-sm">
                            <span className="w-1.5 h-1.5 bg-seq-jade rounded-full" />
                            Causal clarity lowers cognitive load
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                            <span className="w-1.5 h-1.5 bg-seq-jade rounded-full" />
                            Explicit linkage preserves motivation
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                            <span className="w-1.5 h-1.5 bg-seq-jade rounded-full" />
                            Tight feedback loops increase follow-through
                        </li>
                    </ul>
                 </div>
            </div>
            
            {/* The Sparkline Visual */}
            <div className="w-full h-48 md:h-64 bg-seq-panel/30 border border-seq-border rounded-sm relative overflow-hidden">
                <Sparkline />
            </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVIDENCE_METRICS.map((metric, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-seq-charcoal/50 border border-seq-border p-8 rounded-sm text-center group hover:border-seq-jade/20 transition-colors"
            >
              <div className="text-seq-subtext text-[10px] uppercase tracking-[0.2em] mb-4 group-hover:text-seq-jade transition-colors">
                {metric.label}
              </div>
              <div className="text-4xl md:text-5xl font-mono text-white mb-3 tracking-tighter">
                {metric.value}
              </div>
              <div className="inline-block px-2 py-1 bg-seq-jade/10 text-seq-jade text-xs font-mono rounded-sm border border-seq-jade/20">
                {metric.delta} Δ
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Evidence;