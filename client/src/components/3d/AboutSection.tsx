import React from "react";
import { Html } from "@react-three/drei";

const aboutMe = {
  name: "Vineet Soni",
  place: "Bangalore, India",
  profile: "Software Engineer",
  interests: ["Retro Gaming", "Synthwave Music", "3D Graphics", "AI"]
};

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
  letterSpacing: "1px"
};

const labelStyle: React.CSSProperties = {
  color: "#ff00ff",
  fontWeight: "bold",
  fontSize: "1.1em",
  marginBottom: "4px",
  textTransform: "uppercase"
};

const AboutSection: React.FC<{ position?: [number, number, number] }> = ({ position = [-8, 0, 0] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[4.2, 2.7, 0.2]} />
      <meshStandardMaterial color="#222" emissive="#00ff41" emissiveIntensity={0.2} />
    </mesh>
    <Html position={[0, 0.1, 0.2]} center>
      <div style={retroBoxStyle}>
        <div style={labelStyle}>About Me</div>
        <div><span style={labelStyle}>Name:</span> {aboutMe.name}</div>
        <div><span style={labelStyle}>Place:</span> {aboutMe.place}</div>
        <div><span style={labelStyle}>Profile:</span> {aboutMe.profile}</div>
        <div style={{ marginTop: "12px", ...labelStyle }}>Interests</div>
        <ul style={{ margin: 0, paddingLeft: "18px" }}>
          {aboutMe.interests.map(i => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </Html>
  </group>
);

export default AboutSection;
