import { useState } from 'react';
import { useAudio } from '../../lib/stores/useAudio';

export default function AudioControls() {
  const { isMuted, toggleMute, backgroundMusic } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMuteToggle = () => {
    toggleMute();
    // If unmuting and background music exists, try to play it
    if (isMuted && backgroundMusic) {
      backgroundMusic.play().catch(error => {
        console.log('Background music play prevented:', error);
      });
    } else if (!isMuted && backgroundMusic) {
      backgroundMusic.pause();
    }
  };

  const audioToggleButton = (
    <div className="audio-main-button" onClick={handleMuteToggle}>
      <div className="audio-icon">
        {isMuted ? '🔇' : '🔊'}
      </div>
      <div className="audio-status">
        {isMuted ? 'MUTED' : 'AUDIO ON'}
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        background: "rgba(30,30,30,0.85)",
        borderRadius: "8px",
        padding: "8px 12px"
      }}
    >
      {/* ...your audio toggle button code... */}
      {audioToggleButton}
    </div>
  );
}