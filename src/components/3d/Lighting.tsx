import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DirectionalLight } from "three";

export default function Lighting() {
  const lightRef = useRef<DirectionalLight>(null);

  useFrame((state) => {
    // Animated lighting for retro feel
    if (lightRef.current) {
      lightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <>
      {/* Main directional light */}
      <directionalLight
        ref={lightRef}
        position={[10, 10, 5]}
        intensity={1}
        color="#00ff41"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Ambient light */}
      <ambientLight intensity={0.3} color="#ff00ff" />
      
      {/* Point lights for atmosphere */}
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#ff0080" />
    </>
  );
}
