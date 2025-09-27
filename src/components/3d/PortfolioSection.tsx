import React from "react";
import { Html } from "@react-three/drei";

const portfolioLinks = [
  { label: "GitHub", url: "https://github.com/vineetson" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/vin-soni/" },
  { label: "Resume", url: "/resume.pdf" }
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

const PortfolioSection: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[4.2, 2.7, 0.2]} />
      <meshStandardMaterial color="#222" emissive="#00ff41" emissiveIntensity={0.2} />
        </mesh>
        <Html position={[0, 0.1, 0.2]} center>
          <div style={retroBoxStyle}>
            <div style={labelStyle}>Portfolio Links</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {portfolioLinks.map(link => (
                <li key={link.label} style={{ margin: "12px 0" }}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#00ff41",
                      textDecoration: "underline",
                      fontWeight: "bold",
                      fontSize: "1.1em",
                      letterSpacing: "1px"
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "12px", ...labelStyle }}>Let's Connect!</div>
          </div>
        </Html>
    </group>
  );

export default PortfolioSection;