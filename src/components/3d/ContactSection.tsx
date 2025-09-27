import React from "react";
import { Html } from "@react-three/drei";

const contactDetails = [
  { label: "Email", value: "vs.iiitmg@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/vin-soni" },
  { label: "GitHub", value: "github.com/vineetson" },
];

const retroBoxStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #222 80%, #00ffff 100%)",
  border: "2px solid #00ffff",
  borderRadius: "16px",
  boxShadow: "0 0 24px #00ffff, 0 0 8px #ff00ff inset",
  padding: "28px",
  color: "#fff",
  fontFamily: "'VT323', 'Courier New', monospace",
  fontSize: "1.25rem",
  width: "420px",
  textShadow: "0 0 2px #00ffff, 0 0 8px #ff00ff",
  letterSpacing: "1px",
};

const labelStyle: React.CSSProperties = {
  color: "#ff00ff",
  fontWeight: "bold",
  fontSize: "1.1em",
  marginBottom: "4px",
  textTransform: "uppercase",
};

const ContactSection: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[4.2, 2.7, 0.2]} />
      <meshStandardMaterial color="#222" emissive="#00ffff" emissiveIntensity={0.2} />
    </mesh>
    <Html position={[0, 0.1, 0.2]} center>
      <div style={retroBoxStyle}>
        <div style={labelStyle}>Contact</div>
        <ul style={{ margin: 0, paddingLeft: "18px" }}>
          {contactDetails.map((info) => (
            <li key={info.label}>
              <span style={labelStyle}>{info.label}:</span> {info.value}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "12px", ...labelStyle }}>Let's Connect!</div>
      </div>
    </Html>
  </group>
);

export default ContactSection;
