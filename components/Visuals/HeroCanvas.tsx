import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line, Float, Cloud } from '@react-three/drei';
import * as THREE from 'three';

// --- Utils ---
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

// --- Causal Filaments & Nodes ---
const SynapticNetwork = ({ count = 60, radius = 4 }) => {
  const pointsRef = useRef<THREE.Group>(null);
  const linesRef = useRef<any>(null);
  const reducedMotion = useReducedMotion();

  // Generate random node positions
  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const points: THREE.Vector3[] = [];
    
    // Create nodes in a spherical distribution
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      points.push(new THREE.Vector3(x, y, z));
    }

    // Create connections based on distance
    const conns: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 2.5) { // Connection threshold
          conns.push(points[i]);
          conns.push(points[j]);
        }
      }
    }

    return { positions: pos, connections: conns };
  }, [count, radius]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    
    // Slow drift rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;

    // Pulse effect on lines (if ref exists)
    if (linesRef.current && linesRef.current.material) {
        linesRef.current.material.dashOffset -= 0.01;
    }
  });

  return (
    // @ts-ignore
    <group ref={pointsRef}>
      {/* Linkages (Filaments) - Updated to Mint #a7f3d0 */}
      <Line
        ref={linesRef}
        points={connections}
        color="#a7f3d0"
        transparent
        opacity={0.1}
        lineWidth={1}
        dashed
        dashScale={50}
        dashSize={0.5}
        gapSize={0.5}
      />

      {/* Cause Nodes (Neutral Gray) */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#71717a" /* Zinc 500 */
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>

      {/* Effect Nodes (Soft Mint) */}
      <Points positions={positions.slice(0, 30)} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a7f3d0" /* Mint Glass */
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// --- Volumetric Uncertainty (Dust) ---
const DustField = () => {
    const reducedMotion = useReducedMotion();
    const count = 500;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for(let i=0; i<count; i++) {
            pos[i*3] = (Math.random() - 0.5) * 15;
            pos[i*3+1] = (Math.random() - 0.5) * 15;
            pos[i*3+2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    const ref = useRef<THREE.Points>(null);
    useFrame((state) => {
        if (!ref.current || reducedMotion) return;
        ref.current.rotation.y -= 0.02 * 0.05; // Very slow counter-rotation
    });

    return (
        // @ts-ignore
        <Points ref={ref} positions={positions}>
            <PointMaterial 
                transparent
                color="#e4e4e7" /* Neutral Zinc */
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.05}
            />
        </Points>
    )
}

const HeroCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Updated Fog to match #09090b Zinc 950 */}
          {
            // @ts-ignore
            <fog attach="fog" args={['#09090b', 5, 20]} />
          }
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
             <SynapticNetwork />
          </Float>
          
          <DustField />
          
          {/* Subtle lighting to create depth */}
          {
            // @ts-ignore
            <ambientLight intensity={0.4} />
          }
          {
            // @ts-ignore
            <pointLight position={[10, 10, 10]} color="#a7f3d0" intensity={0.4} distance={20} />
          }
          {
            // @ts-ignore
            <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={0.1} />
          }
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroCanvas;