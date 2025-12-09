import React from 'react';
import Section from '../components/Layout/Section';
import { motion } from 'framer-motion';
import { Users, Zap } from 'lucide-react';

const WhoItsFor: React.FC = () => {
  return (
    <Section className="border-t border-seq-border/30 bg-seq-charcoal/30">
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h2 className="text-3xl font-medium text-white mb-4">The Operating System for High Agency.</h2>
        <p className="text-seq-subtext">This is not a task list. This is an engine for becoming who you said you would become.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Persona 1: Individuals */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative p-8 bg-seq-ink border border-seq-border rounded-sm hover:border-seq-jade/30 transition-colors duration-500"
        >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-seq-jade/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Zap className="text-seq-jade mb-6 opacity-80" size={24} strokeWidth={1.5} />
            
            <h3 className="text-xl font-medium text-white mb-2">High-Agency Individuals</h3>
            <p className="text-seq-subtext text-sm italic mb-6">"You're done drifting..."</p>
            
            <div className="h-[1px] w-12 bg-seq-border mb-6" />
            
            <p className="text-sm text-seq-subtext/80 leading-relaxed">
                For those who understand that hope is not a strategy. You need a system that respects your ambition by giving it a concrete architecture, stripping away the noise of daily entropy.
            </p>
        </motion.div>

        {/* Persona 2: Founders/Operators */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative p-8 bg-seq-ink border border-seq-border rounded-sm hover:border-seq-jade/30 transition-colors duration-500"
        >
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-seq-jade/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <Users className="text-seq-jade mb-6 opacity-80" size={24} strokeWidth={1.5} />
            
            <h3 className="text-xl font-medium text-white mb-2">Founders & Operators</h3>
            <p className="text-seq-subtext text-sm italic mb-6">"You're carrying outcomes that matter..."</p>
            
            <div className="h-[1px] w-12 bg-seq-border mb-6" />

            <p className="text-sm text-seq-subtext/80 leading-relaxed">
                Complexity is the enemy of execution. Sequence provides the command-line interface for your life's work. Align temporal inputs (time) with scalar outputs (goals).
            </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default WhoItsFor;