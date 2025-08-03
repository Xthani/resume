import {
  FramerLogoIcon, 
  GitHubLogoIcon, 
  CodeIcon, 
  LightningBoltIcon, 
  FigmaLogoIcon,
  GearIcon,
  LayersIcon,
  StackIcon,
  MixIcon,
  FileTextIcon,
  Component1Icon,
  RocketIcon,
  CheckIcon,
  PlayIcon
} from '@radix-ui/react-icons'

export const skills = [
    {
        name: 'React',
        description: 'Creating interfaces with component approach',
        icon: LightningBoltIcon,
    },
    {
        name: 'TypeScript',
        description: 'Safe and scalable JavaScript',
        icon: CodeIcon,
    },
    {
        name: 'Redux',
        description: 'Application state management',
        icon: GearIcon,
    },
    {
        name: 'Zustand',
        description: 'Minimalistic state management',
        icon: StackIcon,
    },
    {
        name: 'RTK Query',
        description: 'Queries and caching based on Redux Toolkit',
        icon: MixIcon,
    },
    {
        name: 'React Query',
        description: 'Working with server data and caching',
        icon: FileTextIcon,
    },
    {
        name: 'SCSS / CSS Modules',
        description: 'Modular styling and preprocessors',
        icon: LayersIcon,
    },
    {
        name: 'Ant Design',
        description: 'Ready UI components for business applications',
        icon: Component1Icon,
    },
    {
        name: 'GitHub',
        description: 'Collaborative development and version control',
        icon: GitHubLogoIcon,
    },
    {
        name: 'Framer Motion',
        description: 'Animation and smooth transitions',
        icon: FramerLogoIcon,
    },
    {
        name: 'Figma',
        description: 'Interface design and prototyping',
        icon: FigmaLogoIcon,
    },
    {
        name: 'Webpack / Vite',
        description: 'Build setup with modern tools',
        icon: RocketIcon,
    },
    {
        name: 'ESLint & Prettier',
        description: 'Code formatting and quality support',
        icon: CheckIcon,
    },
    {
        name: 'Jest & Testing Library',
        description: 'Component testing coverage (when needed)',
        icon: PlayIcon,
    },
] 