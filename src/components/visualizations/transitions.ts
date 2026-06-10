import type { Transition } from 'framer-motion'

/** Transition factory for the looping animations the visualizations are built from. */
export function loopT(duration: number, opts: Partial<Transition> = {}): Transition {
  return { duration, repeat: Infinity, ease: 'easeInOut', ...opts }
}
