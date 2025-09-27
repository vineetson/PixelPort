import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import Lighting from "./Lighting";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ConnectSection from "./ConnectSection";
import ParticleSystem from "./ParticleSystem";
import TrailEffect from "./TrailEffect";
import AmbientParticles from "./AmbientParticles";
import { usePortfolio } from "../../lib/stores/usePortfolio";
import { Html } from "@react-three/drei";

const MOVE_SPEED = 0.1;

const projectsList = [
  { name: "PixelPort", tech: "React, Three.js, Zustand" },
  { name: "Retro Portfolio", tech: "TypeScript, CSS, WebGL" },
  { name: "Synthwave Blog", tech: "Next.js, Tailwind" }
];

const retroBoxStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 255, 65, 0.2)"
};

const labelStyle = {
  color: "#00ff41",
  fontWeight: "bold",
  fontSize: "1.2em",
  marginBottom: "10px",
  textAlign: "center"
};

const Scene: React.FC = () => {
  const cameraRef = useRef<any>();
  const { currentSection } = usePortfolio();

  return (
    <>
      {/* Attach ref to your camera */}
      <perspectiveCamera ref={cameraRef} makeDefault position={[0, 1, 5]} />
      <Lighting />

      {/* Particle systems */}
      <AmbientParticles count={150} color="#00ffff" area={60} />
      <ParticleSystem
        count={80}
        size={0.03}
        color="#00ff41"
        speed={0.3}
        attraction={true}
      />
      <ParticleSystem
        count={60}
        size={0.02}
        color="#ff00ff"
        speed={0.2}
        attraction={false}
      />
      <TrailEffect />

      {/* Main scene content */}
      <group>
        {/* Grid floor for retro aesthetic */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[50, 50, 10, 10]} />
          <meshBasicMaterial
            color="#00ff41"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* About section centered */}
        {currentSection === "about" && <AboutSection position={[0, 0, 0]} />}

        {/* Projects section */}
        {currentSection === "projects" && (
          <ProjectsSection position={[0, 0, 0]} />
        )}

        {/* Skills section */}
        {currentSection === "skills" && <SkillsSection />}

        {/* Connect section */}
        {currentSection === "connect" && <ConnectSection position={[0, 0, 0]} />}

        {/* Central hub */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </>
  );
};

export default Scene;
