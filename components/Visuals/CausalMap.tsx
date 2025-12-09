import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d'; 

// Defining nodes for the causal map - Updated Colors
const nodes = [
  { id: 'cause', position: [-2.5, 0, 0], label: 'CAUSE', color: '#52525b' }, // Zinc 600
  { id: 'link', position: [0, 0, 0], label: 'LINKAGE', color: '#a7f3d0' },   // Mint Glass
  { id: 'effect', position: [2.5, 0, 0], label: 'EFFECT', color: '#f4f4f5' }, // Zinc 100
];

const Node = ({ position, label, color, isActive, onHover }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    // Ensure x and z remain stable as we removed the group container
    meshRef.current.position.x = position[0];
    meshRef.current.position.z = position[2];
  });

  return (
    <Sphere 
        ref={meshRef} 
        args={[0.3, 32, 32]} 
        position={position}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        {
          // @ts-ignore
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={isActive ? 0.8 : 0.2} 
            roughness={0.2} 
          />
        }
        <Html position={[0, -0.8, 0]} center>
          <div className={`font-mono text-xs tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100 text-seq-jade' : 'opacity-40 text-seq-subtext'}`}>
            {label}
          </div>
        </Html>
      </Sphere>
  );
};

const ConnectionLine = ({ start, end, isActive }: any) => {
    return (
        <Line
            points={[start, end]}
            color={isActive ? "#a7f3d0" : "#3f3f46"} /* Mint or Zinc 700 */
            lineWidth={isActive ? 2 : 1}
            transparent
            opacity={isActive ? 0.8 : 0.3}
        />
    )
}

const CausalMapScene = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Dynamic lines updating based on gentle float would be complex for this snippet,
  // so we keep lines static relative to base positions for stability.

  return (
    <>
      {
        // @ts-ignore
        <ambientLight intensity={0.5} />
      }
      {
        // @ts-ignore
        <pointLight position={[10, 10, 10]} intensity={1} />
      }
      
      {/* Connections */}
      <ConnectionLine 
        start={nodes[0].position} 
        end={nodes[1].position} 
        isActive={hoveredNode === 'cause' || hoveredNode === 'link'} 
      />
      <ConnectionLine 
        start={nodes[1].position} 
        end={nodes[2].position} 
        isActive={hoveredNode === 'link' || hoveredNode === 'effect'} 
      />

      {/* Nodes */}
      {nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          isActive={hoveredNode === node.id}
          onHover={(isHovering: boolean) => setHoveredNode(isHovering ? node.id : null)}
        />
      ))}
    </>
  );
};

const CausalMap: React.FC = () => {
  return (
    <div className="w-full h-[400px] relative rounded-lg overflow-hidden bg-seq-panel border border-seq-border">
        <div className="absolute top-4 left-4 z-10 font-mono text-xs text-seq-subtext">
            CAUSAL_SIMULATION_V2.1
        </div>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <CausalMapScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CausalMap;