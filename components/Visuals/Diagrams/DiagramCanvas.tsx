import React, { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DiagramCanvasProps {
  title: string;
  figureNum: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}

const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  title,
  figureNum,
  caption,
  children,
  className,
}) => {
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      {/* Container */}
      <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-8 relative overflow-hidden shadow-2xl shadow-black/50">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8 border-b border-[#1f1f1f] pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[#18b6a0] font-mono text-xs tracking-widest uppercase">
              FIG.{figureNum}
            </span>
            <h3 className="text-[#e4e4e7] font-sans font-medium text-lg tracking-tight">
              {title}
            </h3>
          </div>
          
          {/* Status Dot */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#18b6a0] animate-pulse shadow-[0_0_8px_#18b6a0]" />
            <span className="text-[#333] font-mono text-[9px] tracking-wider uppercase">
              LIVE_RENDER
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex justify-center min-h-[300px] items-center">
          {children}
        </div>

      </div>

      {/* Caption */}
      {caption && (
        <p className="text-[#888] text-sm text-center font-mono mt-6 max-w-[90%] mx-auto leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
};

export default DiagramCanvas;


