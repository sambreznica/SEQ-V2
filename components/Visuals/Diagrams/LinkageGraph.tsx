import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LinkageGraph: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const nodes = [
    { id: 'start', x: 50, y: 100 },
    { id: 'mid1', x: 150, y: 50 },
    { id: 'mid2', x: 150, y: 150 },
    { id: 'goal', x: 250, y: 100, isTarget: true },
  ];

  const links = [
    { from: 'start', to: 'mid1' },
    { from: 'start', to: 'mid2' },
    { from: 'mid1', to: 'goal' },
    { from: 'mid2', to: 'goal' },
  ];

  return (
    <svg width="100%" height="200" viewBox="0 0 300 200" className="overflow-visible">
      {/* Links */}
      {links.map((link, i) => {
        const start = nodes.find(n => n.id === link.from)!;
        const end = nodes.find(n => n.id === link.to)!;
        return (
          <motion.line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={isHovered ? "#18b6a0" : "#333"}
            strokeWidth={isHovered ? 2 : 1}
            initial={false}
            animate={{
              stroke: isHovered ? "#18b6a0" : "#333",
              strokeWidth: isHovered ? 2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.isTarget ? 8 : 5}
          fill={node.isTarget ? (isHovered ? "#18b6a0" : "#0f0f0f") : "#0f0f0f"}
          stroke={node.isTarget ? "#18b6a0" : "#333"}
          strokeWidth={2}
          onMouseEnter={() => node.isTarget && setIsHovered(true)}
          onMouseLeave={() => node.isTarget && setIsHovered(false)}
          className="cursor-pointer transition-colors duration-300"
          whileHover={node.isTarget ? { scale: 1.2 } : {}}
        />
      ))}

      {/* Goal Label */}
      <text
        x={250}
        y={130}
        textAnchor="middle"
        fill={isHovered ? "#18b6a0" : "#555"}
        className="text-[10px] font-mono uppercase transition-colors duration-300"
      >
        Target State
      </text>
    </svg>
  );
};

export default LinkageGraph;


