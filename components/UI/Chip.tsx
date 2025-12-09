import React from 'react';

interface ChipProps {
  label: string;
  active?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, active = false }) => {
  return (
    <span className={`
      inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-wider font-mono border rounded-full
      ${active 
        ? 'border-seq-jade/30 text-seq-jade bg-seq-jade/5 shadow-[0_0_10px_rgba(45,212,191,0.1)]' 
        : 'border-seq-border text-seq-subtext bg-seq-panel'}
    `}>
      {label}
    </span>
  );
};

export default Chip;