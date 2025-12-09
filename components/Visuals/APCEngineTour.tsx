import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

interface TourProps {
  phase: number; // 0, 1, or 2
}

// Utils for visual generation
const COUNT = 60;
const RADIUS = 4;

const useReducedMotion = () => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMatches(mediaQuery.matches);
    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return matches;
};

// The core brain-space scene
const BrainScene: React.FC<{ phase: number; reducedMotion: boolean }> = ({ phase, reducedMotion }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<any>(null);
  
  // -- Geometry Generation --
  // We generate 3 sets of positions for the same nodes to interpolate between
  const { chaosPos, alignPos, coherentPos, connections } = useMemo(() => {
    const chaos = new Float32Array(COUNT * 3);
    const align = new Float32Array(COUNT * 3);
    const coherent = new Float32Array(COUNT * 3);
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      // 1. Chaos: Random spherical cloud
      const r = RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      chaos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      chaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      chaos[i * 3 + 2] = r * Math.cos(phi);

      // 2. Alignment: Organized into 3 clusters (Cause, Link, Effect)
      // Cause (-x), Link (center), Effect (+x)
      const type = i % 3; // 0=Cause, 1=Link, 2=Effect
      const baseX = (type - 1) * 2.5; // -2.5, 0, 2.5
      
      align[i * 3] = baseX + (Math.random() - 0.5) * 1.5;
      align[i * 3 + 1] = (Math.random() - 0.5) * 2;
      align[i * 3 + 2] = (Math.random() - 0.5) * 2;

      // 3. Coherence: Tight, linear stream (The Delta Wave)
      // All aligned on Y axis, streaming along X
      const t = i / COUNT; // 0 to 1
      const waveX = (t - 0.5) * 8;
      // Slight sine wave for aesthetic
      const waveY = Math.sin(t * 10) * 0.2; 
      
      coherent[i * 3] = waveX;
      coherent[i * 3 + 1] = waveY;
      coherent[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Very tight Z depth

      points.push(new THREE.Vector3(chaos[i * 3], chaos[i * 3 + 1], chaos[i * 3 + 2]));
    }

    // Generate stable connections for the lines
    const conns: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
       // Connect to nearest neighbor logically
       const next = (i + 1) % COUNT;
       conns.push(points[i]);
       conns.push(points[next]);
    }

    return { chaosPos: chaos, alignPos: align, coherentPos: coherent, connections: conns };
  }, []);

  // -- Animation Loop --
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Determine target positions based on phase
    // Phase is continuous (e.g. 0.5 is halfway between 0 and 1) if we wanted smooth scrub,
    // but here we get discrete integers 0, 1, 2. We interpolate manually.
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speed = reducedMotion ? 1 : 3 * delta; // Snap if reduced motion, else lerp

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      let tx, ty, tz;

      if (phase === 0) {
        tx = chaosPos[idx]; ty = chaosPos[idx+1]; tz = chaosPos[idx+2];
      } else if (phase === 1) {
        tx = alignPos[idx]; ty = alignPos[idx+1]; tz = alignPos[idx+2];
      } else {
        tx = coherentPos[idx]; ty = coherentPos[idx+1]; tz = coherentPos[idx+2];
      }

      // Lerp current position to target
      positions[idx] += (tx - positions[idx]) * speed;
      positions[idx+1] += (ty - positions[idx+1]) * speed;
      positions[idx+2] += (tz - positions[idx+2]) * speed;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate entire group slowly for "drift"
    if (!reducedMotion) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.z += 0.0005;
    }
  });

  return (
    // @ts-ignore
    <group>
      {/* The Nodes */}
      <Points ref={pointsRef} positions={chaosPos} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={phase === 2 ? "#a7f3d0" : "#e4e4e7"} // Turn Jade in phase 2 (Coherence)
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* The Filaments (Background Lattice) */}
      <Line
        points={connections}
        color={phase === 0 ? "#27272a" : "#a7f3d0"} // Dark zinc in chaos, mint in structure
        opacity={phase === 0 ? 0.1 : 0.3}
        transparent
        lineWidth={1}
      />
    </group>
  );
};

const APCEngineTour: React.FC<TourProps> = ({ phase }) => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          {
            // @ts-ignore
            <fog attach="fog" args={['#09090b', 5, 20]} />
          }
          
          <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.2}>
            <BrainScene phase={phase} reducedMotion={reducedMotion} />
          </Float>

          {/* Dynamic Lighting based on phase */}
          {
            // @ts-ignore
            <ambientLight intensity={0.2} />
          }
          {
            // @ts-ignore
            <pointLight 
                position={[10, 10, 10]} 
                color={phase === 2 ? "#a7f3d0" : "#ffffff"} 
                intensity={phase === 2 ? 1 : 0.5} 
            />
          }
        </Suspense>
      </Canvas>
    </div>
  );
};

export default APCEngineTour;