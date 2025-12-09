import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../components/Layout/Section';
import APCEngineTour from '../components/Visuals/APCEngineTour';
import Chip from '../components/UI/Chip';

const steps = [
  {
    id: 0,
    title: "DEFINE",
    subtitle: "Name the Future State.",
    description: "Coherence begins here. We strip away the ambiguity of 'someday' and anchor into a concrete vector. The system identifies the gap between current reality and your target state.",
    badge: "STATE_01 // CHAOS"
  },
  {
    id: 1,
    title: "ALIGN",
    subtitle: "See the Causal Map.",
    description: "Noise stripped. Sequence identifies the critical path nodes required to bridge the gap. Links form between daily actions and long-term outcomes.",
    badge: "STATE_02 // STRUCTURE"
  },
  {
    id: 2,
    title: "DELIVER",
    subtitle: "Act with Certainty.",
    description: "Drift reduced. Execute the next right move with the precision of an operator. Feedback loops tighten, creating inevitable momentum (Δ).",
    badge: "STATE_03 // COHERENCE"
  }
];

const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to step index (0, 1, 2)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) setActiveStep(0);
      else if (latest < 0.66) setActiveStep(1);
      else setActiveStep(2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-seq-ink">
      
      {/* Sticky Background Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden border-b border-seq-border/20">
        
        {/* The 3D Visualization Layer */}
        <APCEngineTour phase={activeStep} />
        
        {/* Vignette Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-seq-ink/90 via-seq-ink/60 to-transparent pointer-events-none" />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
          <div className="w-full lg:w-1/2">
            
            {/* Animated Text Content */}
            <div className="space-y-8 relative min-h-[300px]">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeStep === index ? 1 : 0,
                    y: activeStep === index ? 0 : 20,
                    pointerEvents: activeStep === index ? 'auto' : 'none',
                    position: activeStep === index ? 'relative' : 'absolute',
                    top: 0, left: 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                     <Chip label={step.badge} active={activeStep === index} />
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">
                    {step.title}
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-light text-seq-jade/90">
                    {step.subtitle}
                  </h3>
                  <p className="text-lg md:text-xl text-seq-subtext leading-relaxed max-w-md">
                    {step.description}
                  </p>

                  {/* Progress Indicator Line */}
                  <div className="h-1 w-full bg-seq-border rounded-full overflow-hidden mt-8 max-w-xs">
                    <motion.div 
                        className="h-full bg-seq-jade"
                        initial={{ width: "0%" }}
                        animate={{ width: activeStep === index ? "100%" : "0%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-seq-subtext/40 animate-pulse">
            SCROLL_TO_INITIATE_SEQUENCE
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;