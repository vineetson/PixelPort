import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useTexture } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";
import { useAudio } from "../../lib/stores/useAudio";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  color: string;
  modelType: 'cube' | 'sphere' | 'pyramid' | 'torus';
  screenshot?: string;
  github?: string;
  demo?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  position: [number, number, number];
  isActive?: boolean;
  onActivate?: () => void;
}

export default function ProjectCard({ 
  project, 
  position, 
  isActive = false, 
  onActivate 
}: ProjectCardProps) {
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Mesh>(null);
  const cardRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [buttonHover, setButtonHover] = useState<string | null>(null);
  const { playHit, playSuccess } = useAudio();
  
  // Load screenshot texture if available
  let screenshotTexture = null;
  try {
    screenshotTexture = project.screenshot ? useTexture(project.screenshot) : null;
  } catch (error) {
    console.warn('Failed to load texture:', project.screenshot);
    screenshotTexture = null;
  }

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.1;
      
      if (isActive) {
        // Active project gets more dramatic floating
        groupRef.current.position.y += Math.sin(time * 3) * 0.2;
      }
    }

    if (modelRef.current) {
      // Rotate the 3D model
      modelRef.current.rotation.y += delta * (hovered ? 2 : 0.8);
      modelRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Scale animation on hover
      const targetScale = hovered || isActive ? 1.3 : 1;
      modelRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale }, 
        delta * 4
      );
    }

    if (cardRef.current && isActive) {
      // Pulsing glow effect for active project
      cardRef.current.scale.setScalar(1 + Math.sin(time * 4) * 0.05);
    }
  });

  const renderModel = () => {
    const size = 0.8;
    const material = (
      <meshStandardMaterial
        color={project.color}
        emissive={project.color}
        emissiveIntensity={hovered || isActive ? 0.6 : 0.3}
        wireframe={!isActive}
        transparent
        opacity={0.9}
      />
    );

    switch (project.modelType) {
      case 'sphere':
        return (
          <mesh ref={modelRef}>
            <sphereGeometry args={[size]} />
            {material}
          </mesh>
        );
      case 'pyramid':
        return (
          <mesh ref={modelRef}>
            <coneGeometry args={[size, size * 1.5, 4]} />
            {material}
          </mesh>
        );
      case 'torus':
        return (
          <mesh ref={modelRef}>
            <torusGeometry args={[size, size * 0.4, 8, 16]} />
            {material}
          </mesh>
        );
      default:
        return (
          <mesh ref={modelRef}>
            <boxGeometry args={[size, size, size]} />
            {material}
          </mesh>
        );
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onActivate}
    >
      {/* Main 3D model */}
      {renderModel()}

      {/* Project title */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.json"
      >
        {project.title}
      </Text>

      {/* Detail card when active */}
      {isActive && (
        <group ref={cardRef} position={[0, 0, 1.5]}>
          {/* Background plane */}
          <mesh>
            <planeGeometry args={[5, 4]} />
            <meshBasicMaterial
              color="#000000"
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Border */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[5.1, 4.1]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={0.4}
              wireframe
            />
          </mesh>

          {/* Screenshot */}
          {screenshotTexture && (
            <>
              <mesh position={[0, 1, 0.02]}>
                <planeGeometry args={[2.4, 1.35]} />
                <meshBasicMaterial
                  map={screenshotTexture}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              {/* Screenshot frame */}
              <mesh position={[0, 1, 0.01]}>
                <planeGeometry args={[2.5, 1.4]} />
                <meshBasicMaterial
                  color={project.color}
                  transparent
                  opacity={0.3}
                  wireframe
                />
              </mesh>
            </>
          )}

          {/* Project description */}
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={4.5}
            font="/fonts/inter.json"
          >
            {project.description}
          </Text>

          {/* Technologies */}
          <Text
            position={[0, -0.8, 0.02]}
            fontSize={0.1}
            color={project.color}
            anchorX="center"
            anchorY="middle"
            maxWidth={4.5}
            font="/fonts/inter.json"
          >
            TECH: {project.technologies.join(' • ')}
          </Text>

          {/* Interactive buttons */}
          <mesh 
            position={[-1.2, -1.5, 0.02]}
            onPointerEnter={(e) => {
              e.stopPropagation();
              setButtonHover('github');
              document.body.style.cursor = 'pointer';
              playHit();
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              setButtonHover(null);
              document.body.style.cursor = 'default';
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (project.github) {
                playSuccess();
                window.open(project.github, '_blank');
              }
            }}
          >
            <planeGeometry args={[1, 0.4]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={buttonHover === 'github' ? 0.8 : 0.5}
            />
          </mesh>
          <Text
            position={[-1.2, -1.5, 0.03]}
            fontSize={0.08}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter.json"
          >
            VIEW CODE
          </Text>

          <mesh 
            position={[1.2, -1.5, 0.02]}
            onPointerEnter={(e) => {
              e.stopPropagation();
              setButtonHover('demo');
              document.body.style.cursor = 'pointer';
              playHit();
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              setButtonHover(null);
              document.body.style.cursor = 'default';
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (project.demo) {
                playSuccess();
                window.open(project.demo, '_blank');
              }
            }}
          >
            <planeGeometry args={[1, 0.4]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={buttonHover === 'demo' ? 0.8 : 0.5}
            />
          </mesh>
          <Text
            position={[1.2, -1.5, 0.03]}
            fontSize={0.08}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter.json"
          >
            LIVE DEMO
          </Text>
        </group>
      )}

      {/* Hover indicator */}
      {hovered && !isActive && (
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 8]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}