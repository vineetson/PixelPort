import React from "react";
import { Html } from "@react-three/drei";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Three.js",
  "Zustand",
  "CSS/SCSS",
  "Node.js",
  "WebGL",
];

const certifications = [
  "AWS Certified Developer",
  "Google Professional Cloud Architect",
  "Microsoft Certified: Azure Developer Associate"
];

const retroBoxStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #222 80%, #00ff41 100%)",
  border: "2px solid #00ff41",
  borderRadius: "16px",
  boxShadow: "0 0 24px #00ff41, 0 0 8px #ff00ff inset",
  padding: "28px",
  color: "#fff",
  fontFamily: "'VT323', 'Courier New', monospace",
  fontSize: "1.25rem",
  width: "420px",
  textShadow: "0 0 2px #00ff41, 0 0 8px #ff00ff",
  letterSpacing: "1px",
};

const labelStyle: React.CSSProperties = {
  color: "#ff00ff",
  fontWeight: "bold",
  fontSize: "1.1em",
  marginBottom: "4px",
  textTransform: "uppercase",
};

const SkillsSection: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, 0],
}) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[4.2, 2.7, 0.2]} />
      <meshStandardMaterial
        color="#222"
        emissive="#00ff41"
        emissiveIntensity={0.2}
      />
    </mesh>
    <Html position={[0, 0.1, 0.2]} center>
      <div style={retroBoxStyle}>
        <div style={labelStyle}>Skills</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <div style={{ marginTop: "12px", ...labelStyle }}>Certifications</div>
        <ul style={{ margin: 0, paddingLeft: "18px" }}>
          {certifications.map(cert => <li key={cert}>{cert}</li>)}
        </ul>
      </div>
    </Html>
  </group>
);

export default SkillsSection;