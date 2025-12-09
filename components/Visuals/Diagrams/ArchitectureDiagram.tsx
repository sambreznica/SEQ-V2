import React from 'react';
import { motion } from 'framer-motion';

const ArchitectureDiagram: React.FC = () => {
  const nodes = [
    { id: 'fs', label: 'Future State', x: 200, y: 40 },
    { id: 'fr', label: 'Frames', x: 200, y: 120 },
    { id: 'lk', label: 'Linkages', x: 200, y: 200 },
    { id: 'pl', label: 'Planner', x: 350, y: 200 },
    { id: 'ac', label: 'Action', x: 350, y: 120 },
  ];

  // Define connections: startId -> endId
  const connections = [
    { from: 'fs', to: 'fr' },
    { from: 'fr', to: 'lk' },
    { from: 'lk', to: 'pl' },
    { from: 'pl', to: 'ac' },
  ];

  // Feedback loop path (Action -> Future State)
  // Approximate a curve going back up
  const feedbackPath = "M 350 120 C 350 40, 300 40, 200 40";

  return (
    <svg width="100%" height="300" viewBox="0 0 450 280" className="overflow-visible">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="16"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
        <marker
          id="arrowhead-active"
          markerWidth="10"
          markerHeight="7"
          refX="16"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#18b6a0" />
        </marker>
      </defs>

      {/* Standard Connections */}
      {connections.map((conn, i) => {
        const start = nodes.find(n => n.id === conn.from)!;
        const end = nodes.find(n => n.id === conn.to)!;
        return (
          <g key={i}>
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#333"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
          </g>
        );
      })}

      {/* Feedback Loop (Coherence Delta) */}
      <path
        d={feedbackPath}
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 4"
      />
      
      {/* Animated Feedback Signal */}
      <motion.path
        d={feedbackPath}
        stroke="#18b6a0"
        strokeWidth="2"
        fill="none"
        strokeDasharray="10 100"
        initial={{ strokeDashoffset: 110 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x - 50}
            y={node.y - 20}
            width="100"
            height="40"
            rx="6"
            fill="#0f0f0f"
            stroke="#333"
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y}
            dy="4"
            textAnchor="middle"
            fill="#e4e4e7"
            className="text-[10px] font-mono uppercase tracking-wider"
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* Feedback Label */}
      <text x="275" y="30" fill="#18b6a0" className="text-[9px] font-mono uppercase opacity-80">
        Coherence Δ Update
      </text>
    </svg>
  );
};

export default ArchitectureDiagram;


