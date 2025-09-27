import React from "react";
import { Html } from "@react-three/drei";

const projects = [
  { name: "PixelPort", tech: "React, Three.js, Zustand" },
  { name: "Retro Portfolio", tech: "TypeScript, CSS, WebGL" },
  { name: "Synthwave Blog", tech: "Next.js, Tailwind" }
];

const retroBoxStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #222 80%, #ff00ff 100%)",
  border: "2px solid #ff00ff",
  borderRadius: "16px",
  boxShadow: "0 0 24px #ff00ff, 0 0 8px #00ff41 inset",
  padding: "28px",
  color: "#fff",
  fontFamily: "'VT323', 'Courier New', monospace",
  fontSize: "1.25rem",
  width: "420px",
  textShadow: "0 0 2px #ff00ff, 0 0 8px #00ff41",
  letterSpacing: "1px",
};

const labelStyle: React.CSSProperties = {
  color: "#00ff41",
  fontWeight: "bold",
  fontSize: "1.1em",
  marginBottom: "4px",
  textTransform: "uppercase",
};

const ProjectsSection: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[4.2, 2.7, 0.2]} />
      <meshStandardMaterial color="#222" emissive="#ff00ff" emissiveIntensity={0.2} />
    </mesh>
        <Html position={[0, 0.1, 0.2]} center>
          <div style={retroBoxStyle}>
            <div style={labelStyle}>Projects</div>
            <ul style={{ margin: 0, paddingLeft: "18px" }}>
              {projects.map(project => (
                <li key={project.name}>
                  <span style={labelStyle}>{project.name}:</span> {project.tech}
                </li>
              ))}
            </ul>
        <div style={{ marginTop: "12px", ...labelStyle }}>Interactive Showcase</div>
          </div>
        </Html>
      </group>
  );

export default ProjectsSection;