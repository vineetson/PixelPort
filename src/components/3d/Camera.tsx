import React, { useRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { usePortfolio } from "../../lib/stores/usePortfolio";
import * as THREE from "three";

const sectionPositions = {
  hub: new THREE.Vector3(0, 5, 10),
  about: new THREE.Vector3(-8, 3, 8),
  projects: new THREE.Vector3(0, 3, 0),
  contact: new THREE.Vector3(8, 3, 8),
};

interface PortfolioSectionProps {
  position: [number, number, number];
  title: string;
  sectionId: string;
  color: string;
  children?: React.ReactNode;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  position,
  title,
  sectionId,
  color,
  children,
}) => {
  const { camera } = useThree();
  const { currentSection } = usePortfolio();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    // Set target position based on current section
    const target = sectionPositions[currentSection] || sectionPositions.hub;
    targetPosition.current.copy(target);

    // Look at the corresponding section
    switch (currentSection) {
      case "about":
        targetLookAt.current.set(-8, 0, 0);
        break;
      case "projects":
        targetLookAt.current.set(0, 0, -8);
        break;
      case "contact":
        targetLookAt.current.set(8, 0, 0);
        break;
      default:
        targetLookAt.current.set(0, 0, 0);
    }
  }, [currentSection]);

  useFrame((state, delta) => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, delta * 2);

    // Smooth camera look-at
    const lookAtTarget = new THREE.Vector3();
    lookAtTarget.lerpVectors(
      new THREE.Vector3(0, 0, 0),
      targetLookAt.current,
      1
    );
    camera.lookAt(lookAtTarget);
  });

  const isActive = currentSection === sectionId;

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[3.7, 2.7, 0.2]} />
        <meshStandardMaterial
          color="#222"
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Html position={[0, 1.5, 0]} center>
        <div
          style={{
            color: color,
            fontWeight: "bold",
            fontSize: "1.5em",
            textTransform: "uppercase",
            textShadow: "0 0 8px #00ff41",
            fontFamily: "'VT323', 'Courier New', monospace",
          }}
        >
          {title}
        </div>
      </Html>
      {isActive && children && (
        <Html position={[0, 0.1, 0.2]} center>
          {children}
        </Html>
      )}
    </group>
  );
};

const Portfolio = () => {
  const { currentSection } = usePortfolio();

  return (
    <>
      {currentSection === "portfolio" && (
        <PortfolioSection
          position={[0, 0, 0]}
          title="PORTFOLIO"
          sectionId="portfolio"
          color="#00ff41"
        >
          <div
            style={{
              background: "linear-gradient(135deg, #222 80%, #00ff41 100%)",
              border: "2px solid #00ff41",
              borderRadius: "16px",
              boxShadow: "0 0 24px #00ff41, 0 0 8px #ff00ff inset",
              padding: "28px",
              color: "#fff",
              fontFamily: "'VT323', 'Courier New', monospace",
              fontSize: "1.25rem",
              width: "370px",
              textShadow: "0 0 2px #00ff41, 0 0 8px #ff00ff",
              letterSpacing: "1px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#ff00ff",
                fontWeight: "bold",
                fontSize: "1.1em",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              Portfolio Links
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ margin: "12px 0" }}>
                <a
                  href="https://github.com/vineetson"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#00ff41",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    letterSpacing: "1px",
                  }}
                >
                  GitHub
                </a>
              </li>
              <li style={{ margin: "12px 0" }}>
                <a
                  href="https://www.linkedin.com/in/vin-soni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#00ff41",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    letterSpacing: "1px",
                  }}
                >
                  LinkedIn
                </a>
              </li>
              <li style={{ margin: "12px 0" }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#00ff41",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    letterSpacing: "1px",
                  }}
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </PortfolioSection>
      )}
    </>
  );
};

export default Portfolio;
