import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import { usePortfolio, PortfolioSection } from "../../lib/stores/usePortfolio";
import { useAudio } from "../../lib/stores/useAudio";
import RetroText from "./RetroText";

enum Controls {
  forward = 'forward',
  backward = 'backward',
  leftward = 'leftward',
  rightward = 'rightward',
  interact = 'interact',
  escape = 'escape'
}

const sections = [
  { name: "About", key: "about" },
  { name: "Projects", key: "projects" },
  { name: "Skills", key: "skills" },
  { name: "Connect", key: "connect" },
];

export default function Navigation() {
  const [subscribe, getState] = useKeyboardControls<Controls>();
  const { currentSection, setCurrentSection } = usePortfolio();
  const { playHit, playSuccess } = useAudio();

  useEffect(() => {
    const unsubscribeEscape = subscribe(
      state => state.escape,
      pressed => {
        if (pressed) {
          setCurrentSection('hub');
          playSuccess();
        }
      }
    );

    const unsubscribeInteract = subscribe(
      state => state.interact,
      pressed => {
        if (pressed) {
          // Cycle through sections on space/enter
          const currentIndex = sections.findIndex(section => section.key === currentSection);
          const nextIndex = (currentIndex + 1) % sections.length;
          setCurrentSection(sections[nextIndex].key);
          playSuccess();
        }
      }
    );

    // Cleanup subscriptions
    return () => {
      unsubscribeEscape();
      unsubscribeInteract();
    };
  }, [subscribe, currentSection, setCurrentSection]);

  return (
    <div className="navigation-ui">
      <div className="nav-section">
        <RetroText size="small" color="green">
          NAVIGATION
        </RetroText>
        <div className="nav-buttons">
          {sections.map(section => (
            <button
              key={section.key}
              className="retro-button nav-button"
              onClick={() => {
                setCurrentSection(section.key);
                playSuccess();
              }}
              onMouseEnter={() => playHit()}
            >
              <RetroText size="small" color={currentSection === section.key ? 'pink' : 'white'}>
                [{section.name.charAt(0).toUpperCase()}] {section.name.toUpperCase()}
              </RetroText>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
