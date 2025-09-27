import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import Scene from "./components/3d/Scene";
import AudioManager from "./components/audio/AudioManager";
import AudioControls from "./components/ui/AudioControls";
import RetroUI from "./components/ui/RetroUI";
import CRTEffect from "./components/ui/CRTEffect";
import Navigation from "./components/ui/Navigation";
import RetroPortfolio2D from "./components/ui/RetroPortfolio2D";
import RetroText from "./components/ui/RetroText";
import { isWebGLSupported, getWebGLErrorMessage } from "./lib/webgl-detection";
import "./styles/retro.css";

// Define control keys for navigation
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "interact", keys: ["KeyE", "Space"] },
  { name: "escape", keys: ["Escape"] },
];

function App() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [showWebGLError, setShowWebGLError] = useState(false);
  const [use2DFallback, setUse2DFallback] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const supported = isWebGLSupported();
    setWebglSupported(supported);

    if (!supported) {
      setShowWebGLError(true);
      // Auto-switch to 2D fallback after 3 seconds
      setTimeout(() => {
        setShowWebGLError(false);
        setUse2DFallback(true);
      }, 3000);
    }
  }, []);

  const handleFallbackClick = () => {
    setShowWebGLError(false);
    setUse2DFallback(true);
  };

  if (webglSupported === null) {
    return (
      <div className="app-container">
        <CRTEffect />
        <div className="webgl-error-message">
          <RetroText size="large" color="green" glow typing>
            INITIALIZING PORTFOLIO.EXE...
          </RetroText>
          <div className="retro-spinner" style={{ margin: "20px auto" }}></div>
          <RetroText size="small" color="cyan" typing delay={1}>
            LOADING RETRO ENVIRONMENT...
          </RetroText>
        </div>
      </div>
    );
  }

  if (showWebGLError) {
    return (
      <div className="app-container">
        <CRTEffect />
        <div className="webgl-error-message">
          <RetroText size="large" color="green" glow>
            ⚠ SYSTEM WARNING ⚠
          </RetroText>
          <br /><br />
          <RetroText size="medium" color="white">
            {getWebGLErrorMessage()}
          </RetroText>
          <br /><br />
          <button onClick={handleFallbackClick} className="nav-button">
            <RetroText size="small" color="cyan">
              [ENTER] ACTIVATE 2D MODE
            </RetroText>
          </button>
          <br /><br />
          <RetroText size="small" color="pink">
            AUTO-SWITCHING IN 3 SECONDS...
          </RetroText>
        </div>
      </div>
    );
  }

  if (use2DFallback || !webglSupported) {
    return (
      <div className="app-container">
        <AudioManager />
        <AudioControls />
        <CRTEffect />
        <RetroPortfolio2D />
      </div>
    );
  }

  return (
    <div className="app-container">
      <AudioManager />
      <AudioControls />
      <CRTEffect />
      <KeyboardControls map={controls}>
        <Canvas
          shadows
          camera={{
            position: [0, 5, 10],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: false, // Disable for pixelated look
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false
          }}
          onCreated={({ gl }) => {
            console.log('WebGL context created successfully');
          }}
          onError={(error) => {
            console.error('Canvas error:', error);
            setUse2DFallback(true);
          }}
        >
          <color attach="background" args={["#0a0a0a"]} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
        <RetroUI />
        <Navigation />
      </KeyboardControls>
    </div>
  );
}

export default App;
