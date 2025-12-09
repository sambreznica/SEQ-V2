import { StepData } from './types';

export const HERO_CONTENT = {
  headline: "Structure the path. Reduce the noise. Deliver results.",
  subheadline: "Sequence turns goals into coherent, stepwise plans — explicitly mapping cause → linkage → effect so action feels obvious.",
  cta: "Join the Founding Cohort",
  subcta: "Your future state is not a dream. It’s a system you can execute."
};

export const HOW_IT_WORKS_STEPS: StepData[] = [
  {
    id: 1,
    title: "DEFINE",
    subtitle: "Name the future state.",
    description: "Coherence begins. We strip away the ambiguity of 'someday' and anchor into a concrete vector."
  },
  {
    id: 2,
    title: "ALIGN",
    subtitle: "See the causal map.",
    description: "Noise stripped. We identify the critical path nodes required to bridge the gap between current state and target."
  },
  {
    id: 3,
    title: "DELIVER",
    subtitle: "Act with certainty.",
    description: "Drift reduced. Execute the next right move with the precision of an operator, not the anxiety of a dreamer."
  }
];

export const EVIDENCE_METRICS = [
  { label: "Drift Reduction", value: "94%", delta: "+12%" },
  { label: "Causal Clarity", value: "100%", delta: "MAX" },
  { label: "Execution Velocity", value: "3.5x", delta: "+0.8x" },
];

export const NODE_POSITIONS = [
  { x: -2, y: 1, z: 0, label: "Current", type: 'cause' },
  { x: 0, y: 0, z: 0, label: "Linkage", type: 'linkage' },
  { x: 2, y: -1, z: 0, label: "Future", type: 'effect' },
] as const;