import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointsMaterial } from "three";
import * as THREE from "three";
import { usePortfolio } from "../../lib/stores/usePortfolio";

interface ParticleSystemProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  attraction?: boolean;
}

export default function ParticleSystem({ 
  count = 100, 
  size = 0.02, 
  color = "#00ff41",
  speed = 0.5,
  attraction = false
}: ParticleSystemProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const { currentSection } = usePortfolio();

  // Generate particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in a large sphere
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Store original positions
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }
    
    return { positions, velocities, originalPositions };
  }, [count, speed]);

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    return geo;
  }, [particleData]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Get attraction point based on current section (avoid object allocation)
    let attractX = 0, attractY = 0, attractZ = 0;
    switch (currentSection) {
      case 'about':
        attractX = -8;
        break;
      case 'projects':
        attractZ = -8;
        break;
      case 'contact':
        attractX = 8;
        break;
    }
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (attraction && currentSection !== 'hub') {
        // Attract particles to current section (scalar math)
        const px = positions[i3];
        const py = positions[i3 + 1];
        const pz = positions[i3 + 2];
        
        const dx = attractX - px;
        const dy = attractY - py;
        const dz = attractZ - pz;
        
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const force = Math.min(1 / (distance * 0.1 + 1), 0.1) * delta * 5;
        
        if (distance > 0) {
          const invDistance = 1 / distance;
          particleData.velocities[i3] += dx * invDistance * force;
          particleData.velocities[i3 + 1] += dy * invDistance * force;
          particleData.velocities[i3 + 2] += dz * invDistance * force;
        }
      } else {
        // Drift back to original positions
        const targetX = particleData.originalPositions[i3] + Math.sin(time * 0.2 + i * 0.1) * 2;
        const targetY = particleData.originalPositions[i3 + 1] + Math.cos(time * 0.15 + i * 0.1) * 1.5;
        const targetZ = particleData.originalPositions[i3 + 2] + Math.sin(time * 0.25 + i * 0.1) * 2;
        
        particleData.velocities[i3] += (targetX - positions[i3]) * delta * 0.5;
        particleData.velocities[i3 + 1] += (targetY - positions[i3 + 1]) * delta * 0.5;
        particleData.velocities[i3 + 2] += (targetZ - positions[i3 + 2]) * delta * 0.5;
      }
      
      // Apply velocity with damping
      positions[i3] += particleData.velocities[i3] * delta;
      positions[i3 + 1] += particleData.velocities[i3 + 1] * delta;
      positions[i3 + 2] += particleData.velocities[i3 + 2] * delta;
      
      // Apply damping
      particleData.velocities[i3] *= 0.99;
      particleData.velocities[i3 + 1] *= 0.99;
      particleData.velocities[i3 + 2] *= 0.99;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Animate material
    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        color={color}
        size={size}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}