import { usePortfolio } from "../../lib/stores/usePortfolio";
import RetroText from "./RetroText";

export default function RetroUI() {
  const { currentSection } = usePortfolio();

  return (
    <div className="retro-ui">
      {/* Enhanced top status bar */}
      <div className="retro-status-bar">
        <RetroText size="small" color="green" glow>
          PORTFOLIO.EXE - RUNNING
        </RetroText>
        <RetroText size="small" color="cyan">
          SECTION: {currentSection.toUpperCase()}
        </RetroText>
        <RetroText size="small" color="pink">
          USER: VINEET_SONI
        </RetroText>
      </div>

      {/* Enhanced instructions with retro styling */}
      <div className="retro-instructions">
        <RetroText size="small" color="white">
          USE WASD OR ARROW KEYS TO NAVIGATE
        </RetroText>
        <RetroText size="small" color="white">
          CLICK ON SECTIONS TO EXPLORE
        </RetroText>
        <RetroText size="small" color="cyan">
          PRESS ESC TO RETURN TO HUB
        </RetroText>
      </div>

      {/* Matrix-style rain effect */}
      <div className="matrix-rain">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Array.from({ length: 20 }, (_, j) => (
              <div key={j}>
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Enhanced scanlines effect */}
      <div className="scanlines"></div>
    </div>
  );
}
