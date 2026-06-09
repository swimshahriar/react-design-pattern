export interface PatternMeta {
  id: string
  slug: string
  title: string
  subtitle: string
  category: 'design' | 'rendering'
  icon: string
  description: string
  colorFrom: string
  colorTo: string
}

export const patterns: PatternMeta[] = [
  {
    id: 'compound',
    slug: '/compound',
    title: 'Compound Components',
    subtitle: 'Shared state, flexible API',
    category: 'design',
    icon: '🧩',
    description:
      'Build components that work together through shared state and context. Let consumers compose sub-components freely while the parent manages internal logic.',
    colorFrom: '#6366f1',
    colorTo: '#a78bfa',
  },
  {
    id: 'hoc',
    slug: '/hoc',
    title: 'Higher-Order Components',
    subtitle: 'Wrap, enhance, reuse',
    category: 'design',
    icon: '🔌',
    description:
      'A function that takes a component and returns a new component with extra behavior. The classic cross-cutting concern pattern — still relevant in library code and legacy apps.',
    colorFrom: '#ec4899',
    colorTo: '#f472b6',
  },
  {
    id: 'render-props',
    slug: '/render-props',
    title: 'Render Props',
    subtitle: 'Logic meets layout',
    category: 'design',
    icon: '🎨',
    description:
      'Pass a function as a prop that returns JSX, letting the component own the logic while the consumer decides the rendering. The backbone of headless UI libraries.',
    colorFrom: '#14b8a6',
    colorTo: '#34d399',
  },
  {
    id: 'hooks',
    slug: '/hooks',
    title: 'Custom Hooks',
    subtitle: 'Extract, compose, reuse',
    category: 'design',
    icon: '🪝',
    description:
      'The modern answer to shared stateful logic. Custom hooks extract behavior into composable functions with zero extra tree nodes.',
    colorFrom: '#f59e0b',
    colorTo: '#fbbf24',
  },
  {
    id: 'container-presentational',
    slug: '/container-presentational',
    title: 'Container / Presentational',
    subtitle: 'Smart vs Dumb components',
    category: 'design',
    icon: '📦',
    description:
      'Separate data-fetching logic from presentation. Container components know "how things work"; presentational components know "how things look."',
    colorFrom: '#3b82f6',
    colorTo: '#60a5fa',
  },
  {
    id: 'provider',
    slug: '/provider',
    title: 'Provider / Context',
    subtitle: 'Global state, prop drilling solved',
    category: 'design',
    icon: '🌐',
    description:
      'Share state across the component tree without prop drilling. Context provides a broadcast channel; the Provider pattern adds structure and safety around it.',
    colorFrom: '#8b5cf6',
    colorTo: '#c084fc',
  },
  {
    id: 'controlled',
    slug: '/controlled',
    title: 'Controlled vs Uncontrolled',
    subtitle: 'Who owns the state?',
    category: 'design',
    icon: '🎮',
    description:
      'Should the parent or the component itself hold the state? Controlled components give the parent full control; uncontrolled components manage it internally via refs.',
    colorFrom: '#ef4444',
    colorTo: '#f87171',
  },
  {
    id: 'observer',
    slug: '/observer',
    title: 'Observer Pattern',
    subtitle: 'Publish, subscribe, react',
    category: 'design',
    icon: '📡',
    description:
      'Decouple producers from consumers with a pub/sub event bus. Components subscribe to events and react independently — no direct connections needed.',
    colorFrom: '#06b6d4',
    colorTo: '#22d3ee',
  },
]