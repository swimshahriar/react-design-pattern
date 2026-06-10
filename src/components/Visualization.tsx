import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface VisualizationProps {
  title: string
  caption?: string
  children: ReactNode
}

/**
 * A framed "stage" for an animated concept diagram. Mirrors the visual language of
 * LiveExample, but tuned for visualizations: a header with a Replay control and a
 * canvas body with a subtle dot grid. Replay remounts the children (via `key`) so the
 * looping framer-motion animations inside restart cleanly from the beginning.
 */
export default function Visualization({ title, caption, children }: VisualizationProps) {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <motion.div
      className="my-6 rounded-xl border border-surface-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between bg-surface-800 px-4 py-2 border-b border-surface-700">
        <div className="flex items-center gap-2">
          <span className="text-base">📊</span>
          <span className="text-sm font-mono text-surface-400">{title}</span>
        </div>
        <button
          onClick={() => setReplayKey((k) => k + 1)}
          className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-accent-400 transition-colors cursor-pointer"
          aria-label="Replay animation"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Replay
        </button>
      </div>
      {caption && (
        <p className="px-4 py-2 text-sm text-surface-400 bg-surface-800/50 border-b border-surface-700">
          {caption}
        </p>
      )}
      <div
        key={replayKey}
        className="relative overflow-hidden bg-surface-900 p-6 min-h-[260px] flex items-center justify-center"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
