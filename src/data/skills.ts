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
        description: 'Создание интерфейсов с компонентным подходом',
        icon: LightningBoltIcon,
    },
    {
        name: 'TypeScript',
        description: 'Безопасный и масштабируемый JavaScript',
        icon: CodeIcon,
    },
    {
        name: 'Redux',
        description: 'Управление состоянием приложения',
        icon: GearIcon,
    },
    {
        name: 'Zustand',
        description: 'Минималистичное управление состоянием',
        icon: StackIcon,
    },
    {
        name: 'RTK Query',
        description: 'Запросы и кэширование на основе Redux Toolkit',
        icon: MixIcon,
    },
    {
        name: 'React Query',
        description: 'Работа с серверными данными и кэшированием',
        icon: FileTextIcon,
    },
    {
        name: 'SCSS / CSS Modules',
        description: 'Модульная стилизация и препроцессоры',
        icon: LayersIcon,
    },
    {
        name: 'Ant Design',
        description: 'Готовые UI-компоненты для бизнес-приложений',
        icon: Component1Icon,
    },
    {
        name: 'GitHub',
        description: 'Совместная разработка и контроль версий',
        icon: GitHubLogoIcon,
    },
    {
        name: 'Framer Motion',
        description: 'Анимация и плавные переходы',
        icon: FramerLogoIcon,
    },
    {
        name: 'Figma',
        description: 'Дизайн и прототипирование интерфейсов',
        icon: FigmaLogoIcon,
    },
    {
        name: 'Webpack / Vite',
        description: 'Настройка сборки с помощью современных инструментов',
        icon: RocketIcon,
    },
    {
        name: 'ESLint & Prettier',
        description: 'Форматирование и поддержка качества кода',
        icon: CheckIcon,
    },
    {
        name: 'Jest & Testing Library',
        description: 'Покрытие компонентов тестами (при необходимости)',
        icon: PlayIcon,
    },
]
