import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointsMaterial } from "three";
import * as THREE from "three";

interface AmbientParticlesProps {
  count?: number;
  color?: string;
  area?: number;
}

export default function AmbientParticles({ 
  count = 200, 
  color = "#00ffff",
  area = 40
}: AmbientParticlesProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);

  // Generate static particle field
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in cube
      positions[i3] = (Math.random() - 0.5) * area;
      positions[i3 + 1] = (Math.random() - 0.5) * area * 0.5; // Flatter in Y
      positions[i3 + 2] = (Math.random() - 0.5) * area;
      
      sizes[i] = Math.random() * 0.05 + 0.01;
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, sizes, phases };
  }, [count, area]);

  // Create geometry with size attribute
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particleData.sizes, 1));
    return geo;
  }, [particleData]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (materialRef.current) {
      // Gentle pulsing opacity
      materialRef.current.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
    
    if (pointsRef.current) {
      // Gentle vertical drift
      pointsRef.current.rotation.y = time * 0.02;
      
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const phase = particleData.phases[i];
        
        // Subtle floating motion
        positions[i3 + 1] = particleData.positions[i3 + 1] + Math.sin(time * 0.2 + phase) * 0.5;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        color={color}
        size={0.03}
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
}