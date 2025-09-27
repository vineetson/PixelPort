import { useEffect } from 'react';
import { useAudio } from '../../lib/stores/useAudio';

export default function AudioManager() {
  const { setBackgroundMusic, setHitSound, setSuccessSound, backgroundMusic, isMuted } = useAudio();

  useEffect(() => {
    // Initialize audio files with enhanced retro sounds
    const loadAudio = () => {
      // Background music - 90s ambient retro music
      const bgMusic = new Audio('/sounds/background.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.2; // Reduced volume for better UX
      bgMusic.preload = 'auto';
      setBackgroundMusic(bgMusic);

      // Hit sound for hover effects - more retro
      const hitAudio = new Audio('/sounds/hit.mp3');
      hitAudio.volume = 0.15;
      hitAudio.preload = 'auto';
      setHitSound(hitAudio);

      // Success sound for clicks and interactions - enhanced
      const successAudio = new Audio('/sounds/success.mp3');
      successAudio.volume = 0.3;
      successAudio.preload = 'auto';
      setSuccessSound(successAudio);

      console.log('🎵 Retro audio system initialized - Synthwave mode activated');
    };

    loadAudio();
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  // Auto-start background music when not muted with user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (backgroundMusic && !isMuted) {
        backgroundMusic.play().catch(error => {
          console.log('Background music auto-play prevented by browser:', error);
        });
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };

    if (backgroundMusic && !isMuted) {
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [backgroundMusic, isMuted]);

  return null; // This component just manages audio, no render
}