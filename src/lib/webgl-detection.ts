// WebGL detection utility
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

export function getWebGLErrorMessage(): string {
  const messages = [
    'Your browser does not support WebGL.',
    'WebGL is required for 3D graphics.',
    'Falling back to 2D retro mode...'
  ];
  
  return messages.join(' ');
}