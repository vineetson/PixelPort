import { useState } from "react";
import { usePortfolio } from "../../lib/stores/usePortfolio";
import RetroText from "./RetroText";

export default function RetroPortfolio2D() {
  const { currentSection, setCurrentSection } = usePortfolio();
  const [animating, setAnimating] = useState(false);

  const handleSectionClick = (section: any) => {
    setAnimating(true);
    setCurrentSection(section);
    setTimeout(() => setAnimating(false), 500);
  };

  const sections = [
    { id: 'about', title: 'ABOUT', color: 'green', content: 'SOFTWARE ENGINEER\nBASED IN BANGALORE, INDIA\n\nPASSIONATE ABOUT:\n• RETRO GAMING\n• SYNTHWAVE MUSIC\n• 3D GRAPHICS\n• AI TECHNOLOGY' },
    { id: 'projects', title: 'PROJECTS', color: 'pink', content: 'PROJECT 1: PIXELPORT\nPROJECT 2: RETRO PORTFOLIO\nPROJECT 3: SYNTHWAVE BLOG' },
    { id: 'skills', title: 'SKILLS', color: 'cyan', content: 'TECHNICAL SKILLS:\n• JAVASCRIPT, TYPESCRIPT\n• REACT, THREE.JS\n• NODE.JS, WEBGL\n\nCERTIFICATIONS:\n• AWS CERTIFIED DEVELOPER\n• GOOGLE CLOUD ARCHITECT' },
    { id: 'connect', title: 'CONNECT', color: 'green', content: 'GET IN TOUCH\n\nEMAIL:\nvs.iiitmg@gmail.com\n\nGITHUB:\ngithub.com/vineetson\n\nLINKEDIN:\nlinkedin.com/in/vin-soni\n\nLET\'S BUILD SOMETHING AMAZING!' }
  ];

  return (
    <div className="retro-portfolio-2d">
      {/* Header */}
      <div className="retro-header">
        <RetroText size="xl" color="green" glow typing>
          ███ PORTFOLIO.EXE ███
        </RetroText>
        <RetroText size="small" color="white" typing delay={1}>
          CLASSIC 90s MODE - WEBGL FALLBACK
        </RetroText>
        <RetroText size="small" color="cyan" typing delay={2}>
          USER: VINEET_SONI | LOCATION: BANGALORE, INDIA
        </RetroText>
      </div>

      {/* Main content area */}
      <div className="retro-main-content">
        {/* Section navigation */}
        <div className="retro-sections-grid">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`retro-section-card ${currentSection === section.id ? 'active' : ''} ${animating ? 'animating' : ''}`}
              onClick={() => handleSectionClick(section.id)}
            >
              <div className="section-border">
                <RetroText size="large" color={section.color as any} glow>
                  [{section.title}]
                </RetroText>
                <div className="section-pixel-art">
                  {section.color === 'green' && '██▓▒░'}
                  {section.color === 'pink' && '▓█▓█▓'}
                  {section.color === 'cyan' && '░▒▓██'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content display */}
        {currentSection !== 'hub' && (
          <div className="retro-content-display">
            <div className="content-window">
              <div className="window-header">
                <RetroText size="small" color="green">
                  ▶ {sections.find(s => s.id === currentSection)?.title}.TXT
                </RetroText>
              </div>
              <div className="window-content">
                <RetroText size="medium" color="white">
                  {sections.find(s => s.id === currentSection)?.content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </RetroText>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="retro-status-footer">
        <RetroText size="small" color="cyan">
          STATUS: {currentSection.toUpperCase()} | MODE: 2D FALLBACK | PRESS ESC TO RETURN
        </RetroText>
      </div>
    </div>
  );
}