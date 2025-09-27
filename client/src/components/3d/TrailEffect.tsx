import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "../../lib/stores/usePortfolio";

export default function TrailEffect() {
  const lineRef = useRef<any>(null);
  const materialRef = useRef<any>(null);
  const { currentSection } = usePortfolio();
  const previousSection = useRef(currentSection);
  const fromSection = useRef(currentSection);
  const trailProgress = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  // Section positions
  const sectionPositions = useMemo(() => ({
    hub: [0, 0, 0] as [number, number, number],
    about: [-8, 0, 0] as [number, number, number],
    projects: [0, 0, -8] as [number, number, number],
    contact: [8, 0, 0] as [number, number, number],
  }), []);

  // Generate trail points
  const trailPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      points.push(new THREE.Vector3(0, 0, 0));
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (currentSection !== previousSection.current) {
      // Capture from section before updating
      fromSection.current = previousSection.current;
      previousSection.current = currentSection;
      
      // Start trail animation
      trailProgress.current = 0;
      setIsVisible(true);
    }

    if (isVisible) {
      trailProgress.current += delta * 2; // Animation speed
      
      if (trailProgress.current >= 1) {
        trailProgress.current = 1;
        // Hide trail after a delay
        setTimeout(() => setIsVisible(false), 500);
      }

      // Calculate trail path using proper from/to sections
      const startPos = sectionPositions[fromSection.current];
      const endPos = sectionPositions[currentSection];
      
      // Create curved path with pre-calculated vectors
      const defaultPos = [0, 0, 0];
      const safeStartPos = startPos ?? defaultPos;
      const safeEndPos = endPos ?? defaultPos;

      const midX = (safeStartPos[0] + safeEndPos[0]) * 0.5;
      const midY = Math.max(safeStartPos[1], safeEndPos[1]) + 3;
      const midZ = (safeStartPos[2] + safeEndPos[2]) * 0.5;
      
      for (let i = 0; i < trailPoints.length; i++) {
        const t = (i / (trailPoints.length - 1)) * trailProgress.current;
        if (t <= 1) {
          const invT = 1 - t;
          // Use safeStartPos and safeEndPos everywhere
          const p1x = safeStartPos[0] * invT + midX * t;
          const p1y = safeStartPos[1] * invT + midY * t;
          const p1z = safeStartPos[2] * invT + midZ * t;

          const p2x = midX * invT + safeEndPos[0] * t;
          const p2y = midY * invT + safeEndPos[1] * t;
          const p2z = midZ * invT + safeEndPos[2] * t;

          trailPoints[i].set(
            p1x * invT + p2x * t,
            p1y * invT + p2y * t,
            p1z * invT + p2z * t
          );
        }
      }
      
      if (lineRef.current && lineRef.current.geometry) {
        lineRef.current.geometry.setFromPoints(trailPoints);
      }
      
      // Fade out material
      if (materialRef.current) {
        materialRef.current.opacity = isVisible ? Math.max(0, 1 - trailProgress.current * 0.5) : 0;
      }
    }
  });

  return (
    <>
      <Line
        ref={lineRef}
        points={trailPoints}
        color="#ff00ff"
        lineWidth={3}
        transparent
        opacity={isVisible ? 0.8 : 0}
      />
    </>
  );
}