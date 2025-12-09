import React from 'react';
import { motion } from 'framer-motion';

const CoherenceChart: React.FC = () => {
  // Data points for Coherence Delta over time
  const data = [20, 25, 22, 30, 35, 32, 40, 45, 42, 50, 55, 60];
  const width = 300;
  const height = 150;
  const padding = 20;

  // Calculate path string
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((val / 100) * (height - padding * 2)) - padding;
    return `${x},${y}`;
  }).join(' L ');

  const pathD = `M ${points}`;
  const areaD = `M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="coherenceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18b6a0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#18b6a0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area Fill */}
        <motion.path
          d={areaD}
          fill="url(#coherenceGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Line Chart */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#18b6a0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#333" strokeWidth="1" />

        {/* Labels */}
        <text x={padding - 10} y={padding} fill="#555" className="text-[8px] font-mono">100</text>
        <text x={padding - 10} y={height - padding} fill="#555" className="text-[8px] font-mono">0</text>
        <text x={width - padding} y={height - 5} textAnchor="end" fill="#555" className="text-[8px] font-mono">TIME →</text>

      </svg>
    </div>
  );
};

export default CoherenceChart;


