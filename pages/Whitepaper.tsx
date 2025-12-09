import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowRight } from 'lucide-react';

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
// PREVIEW CARD COMPONENT
// ──────────────────────────────────────────────────────────
interface PreviewCardProps {
  image: string;
  title: string;
  caption: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ image, title, caption }) => (
  <a
    href="/SEQWP_tex.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <div className="relative aspect-[4/3] rounded-sm border border-seq-border/30 bg-seq-panel/20 overflow-hidden transition-all duration-300 group-hover:border-seq-jade/60 group-hover:scale-[1.01]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-seq-ink/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[10px] font-mono text-seq-jade uppercase tracking-wider mb-1">{caption}</p>
        <p className="text-sm text-white font-medium">{title}</p>
      </div>
    </div>
  </a>
);

// ──────────────────────────────────────────────────────────
// TABLE OF CONTENTS DATA
// ──────────────────────────────────────────────────────────
const tocSections = [
  { num: 'I', title: 'Introduction' },
  { num: 'II', title: 'Cognitive Background' },
  { num: 'III', title: 'Temporal Coherence Framework' },
  { num: 'IV', title: 'The APC Execution Engine' },
  { num: 'V', title: 'Policy Construction Model' },
  { num: 'VI', title: 'Implementation Considerations' },
  { num: 'VII', title: 'Use Cases' },
  { num: 'VIII', title: 'Conclusion' },
];

// ──────────────────────────────────────────────────────────
// WHITEPAPER PAGE COMPONENT
// ──────────────────────────────────────────────────────────
const WhitepaperPage: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  const fadeIn = {
    initial: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <main className="min-h-screen bg-seq-ink text-seq-paper">

      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeIn}
        className="max-w-4xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16 text-center"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-seq-jade mb-4 block">
          APC EXECUTION SYSTEM — TECHNICAL WHITEPAPER
        </span>

        <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.15]">
          Temporal Coherence as Active Predictive Control
        </h1>

        <p className="text-base md:text-lg text-seq-subtext leading-relaxed font-light max-w-2xl mx-auto mb-8">
          A formal framework unifying active inference and predictive coding into a practical execution model for human operators navigating complex, uncertain environments.
        </p>

        <a
          href="/SEQWP_tex.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-seq-jade text-seq-ink text-sm font-medium hover:bg-seq-jade/90 transition-colors"
        >
          <Download size={16} />
          Download PDF
        </a>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          2. METADATA ROW
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.1 }}
        className="max-w-4xl mx-auto px-6 md:px-12 pb-16 md:pb-20"
      >
        <div className="py-5 border-y border-seq-border/20 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[11px] font-mono text-seq-subtext/70 uppercase tracking-wider">
          <span>Version 1.0</span>
          <span className="hidden sm:inline text-seq-border/40">|</span>
          <span>2025</span>
          <span className="hidden sm:inline text-seq-border/40">|</span>
          <span>Format: PDF — 24 pages</span>
          <span className="hidden sm:inline text-seq-border/40">|</span>
          <span>Authors: Sequence Architecture Team</span>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          3. ABSTRACT SECTION
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.15 }}
        className="max-w-3xl mx-auto px-6 md:px-12 pb-20 md:pb-28"
      >
        <div className="border-l-2 border-seq-jade/60 pl-6 md:pl-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-seq-jade mb-4 block">
            Abstract
          </span>
          
          <div className="space-y-5 text-[15px] md:text-base text-seq-subtext leading-[1.8] font-light">
            <p>
              This paper presents <span className="text-white">Active Predictive Control (APC)</span>, a computational framework that synthesizes principles from predictive coding and active inference into a unified execution model. APC treats human action not as reactive stimulus-response but as the continuous minimization of prediction error across nested temporal horizons.
            </p>
            <p>
              We formalize the notion of <span className="text-white">temporal coherence</span> — the alignment between an agent's current state, anticipated futures, and committed actions — as the primary objective function for effective execution. The framework introduces a hierarchical world model architecture, a policy construction mechanism based on free energy minimization, and practical implementation patterns for real-world deployment.
            </p>
            <p>
              The Sequence execution engine operationalizes these principles through discrete constructs: <span className="text-white">Future State</span> declarations, <span className="text-white">Frames</span> for temporal decomposition, <span className="text-white">Linkages</span> for causal dependency mapping, <span className="text-white">Options</span> for action generation, and <span className="text-white">Glimpses</span> for uncertainty reduction. Together, these components enable operators to maintain coherent execution trajectories in the face of environmental volatility and ambiguity.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          4. VISUAL PREVIEW GRID
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
        className="max-w-5xl mx-auto px-6 md:px-12 pb-20 md:pb-28"
      >
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-seq-subtext/60 mb-3 block">
            Document Preview
          </span>
          <h2 className="text-xl md:text-2xl font-medium text-white tracking-tight">
            Key Diagrams & Figures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <PreviewCard
            image="/whitepaper-cover.svg"
            caption="Cover"
            title="Technical Whitepaper"
          />
          <PreviewCard
            image="/whitepaper-hierarchy.svg"
            caption="Figure 2"
            title="APC World Model Hierarchy"
          />
          <PreviewCard
            image="/whitepaper-policy.svg"
            caption="Figure 4"
            title="Policy Construction Diagram"
          />
        </div>

        <p className="text-center text-[11px] font-mono text-seq-subtext/40 mt-6">
          Click any preview to open the full document
        </p>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          5. TABLE OF CONTENTS
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.25 }}
        className="max-w-3xl mx-auto px-6 md:px-12 pb-20 md:pb-28"
      >
        <div className="border border-seq-border/20 rounded-sm p-6 md:p-8 bg-seq-panel/10">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={18} className="text-seq-jade" />
            <h3 className="text-lg font-medium text-white tracking-tight">Table of Contents</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocSections.map((section) => (
              <div
                key={section.num}
                className="flex items-baseline gap-3 text-sm"
              >
                <span className="font-mono text-[11px] text-seq-jade/70 w-6 flex-shrink-0">
                  {section.num}
                </span>
                <span className="text-seq-subtext/80 font-light">
                  {section.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          6. SECONDARY CTA
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.3 }}
        className="max-w-4xl mx-auto px-6 md:px-12 pb-16 md:pb-24 text-center"
      >
        <div className="py-12 md:py-16 border-t border-seq-border/20">
          <p className="text-seq-subtext/60 text-sm mb-6 font-light">
            Ready to explore the full technical specification?
          </p>
          <a
            href="/SEQWP_tex.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-white text-seq-ink text-sm font-medium hover:bg-seq-paper transition-colors"
          >
            Download Full Whitepaper
            <ArrowRight size={16} />
          </a>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          7. FOOTER NOTE
      ═══════════════════════════════════════════════════════ */}
      <footer className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
        <div className="pt-8 border-t border-seq-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-seq-subtext/50">
          <span>Sequence Labs · 2025 · APC Execution System</span>
          <Link to="/engine" className="hover:text-seq-jade transition-colors flex items-center gap-2">
            <span>← Back to engine architecture</span>
          </Link>
        </div>
      </footer>

    </main>
  );
};

export default WhitepaperPage;
