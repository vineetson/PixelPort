import { create } from "zustand";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  color: string;
  modelType: 'cube' | 'sphere' | 'pyramid' | 'torus';
  screenshot?: string;
  github?: string;
  demo?: string;
}

interface ProjectsState {
  projects: ProjectData[];
  activeProject: string | null;
  
  // Actions
  setActiveProject: (projectId: string | null) => void;
  getProject: (id: string) => ProjectData | undefined;
}

// Sample project data
const sampleProjects: ProjectData[] = [
  {
    id: '1',
    title: 'RETRO WEB APPS',
    description: 'Full-stack web applications built with modern technologies but styled with classic 90s aesthetics. Features include user authentication, real-time data, and responsive design.',
    technologies: ['React', 'Node.js', 'Three.js', 'WebGL'],
    color: '#00ff41',
    modelType: 'cube',
    screenshot: '/textures/wood.jpg',
    github: 'https://github.com/user/retro-apps',
    demo: 'https://retro-apps.demo.com'
  },
  {
    id: '2',
    title: '3D PORTFOLIO',
    description: 'Interactive 3D portfolio website showcasing projects in an immersive environment. Built with React Three Fiber and featuring particle systems, animations, and retro effects.',
    technologies: ['Three.js', 'React', 'WebGL', 'GLSL'],
    color: '#ff00ff',
    modelType: 'sphere',
    screenshot: '/textures/asphalt.png',
    github: 'https://github.com/user/3d-portfolio',
    demo: 'https://3d-portfolio.demo.com'
  },
  {
    id: '3',
    title: 'PIXEL GAMES',
    description: 'Collection of retro-style browser games with pixel art graphics and chiptune music. Features multiplayer capabilities and high score tracking.',
    technologies: ['JavaScript', 'Canvas', 'WebSockets', 'PWA'],
    color: '#00ffff',
    modelType: 'pyramid',
    screenshot: '/textures/grass.png',
    github: 'https://github.com/user/pixel-games',
    demo: 'https://pixel-games.demo.com'
  },
  {
    id: '4',
    title: 'VR EXPERIENCES',
    description: 'Virtual reality experiences and applications built for web browsers. Includes educational content, interactive stories, and immersive art installations.',
    technologies: ['A-Frame', 'WebXR', 'Three.js', 'WebGL'],
    color: '#ffff00',
    modelType: 'torus',
    screenshot: '/textures/sky.png',
    github: 'https://github.com/user/vr-experiences',
    demo: 'https://vr-experiences.demo.com'
  }
];

export const useProjects = create<ProjectsState>()((set, get) => ({
  projects: sampleProjects,
  activeProject: null,
  
  setActiveProject: (projectId: string | null) => {
    set({ activeProject: projectId });
    console.log(`Active project set to: ${projectId}`);
  },
  
  getProject: (id: string) => {
    return get().projects.find(project => project.id === id);
  }
}));