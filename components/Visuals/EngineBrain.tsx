import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ──────────────────────────────────────────────────────────
// HOOKS
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
// SCENE COMPONENTS
// ──────────────────────────────────────────────────────────

interface BrainProps {
  intensity: 'low' | 'high';
  prefersReduced: boolean;
}

const SynapticNetwork: React.FC<BrainProps> = ({ intensity, prefersReduced }) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Configuration
  const nodeCount = intensity === 'high' ? 60 : 40;
  const connectionThreshold = 2.5;
  const rotationSpeed = prefersReduced ? 0 : (intensity === 'high' ? 0.05 : 0.02);

  // Generate nodes
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 4 + Math.random() * 2;
      
      temp.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        pulseOffset: Math.random() * 100,
      });
    }
    return temp;
  }, [nodeCount]);

  // Generate initial connections
  const [connections] = useState(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    let idx = 0;

    nodes.forEach((nodeA, i) => {
      nodes.forEach((nodeB, j) => {
        if (i >= j) return;
        const dist = nodeA.position.distanceTo(nodeB.position);
        if (dist < connectionThreshold) {
          positions.push(...nodeA.position.toArray(), ...nodeB.position.toArray());
          indices.push(idx, idx + 1);
          idx += 2;
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  });

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current || prefersReduced) return;

    // Gentle rotation
    groupRef.current.rotation.y += rotationSpeed * 0.01;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

    // Subtle drift
    if (intensity === 'high') {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial 
            color="#e4e4e7" 
            emissive="#a7f3d0"
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Connections */}
      <lineSegments geometry={connections}>
        <lineBasicMaterial 
          color="#18b6a0" 
          transparent 
          opacity={0.15} 
          depthWrite={false}
        />
      </lineSegments>

      {/* Active Pulses (Simplified) */}
      {!prefersReduced && nodes.slice(0, 5).map((node, i) => (
        <mesh key={`pulse-${i}`} position={node.position}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial 
            color="#a7f3d0" 
            transparent 
            opacity={0.1 + Math.sin(i + Date.now() * 0.001) * 0.1} 
          />
        </mesh>
      ))}
    </group>
  );
};

// ──────────────────────────────────────────────────────────
// EXPORTED COMPONENT
// ──────────────────────────────────────────────────────────

export const EngineBrain: React.FC<{ 
  intensity?: "low" | "high"; 
  className?: string;
}> = ({ 
  intensity = "low", 
  className = "" 
}) => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a7f3d0" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#27272a" />
        
        <SynapticNetwork 
          intensity={intensity} 
          prefersReduced={prefersReduced} 
        />
        
        <fog attach="fog" args={['#09090b', 8, 25]} />
      </Canvas>
    </div>
  );
};



