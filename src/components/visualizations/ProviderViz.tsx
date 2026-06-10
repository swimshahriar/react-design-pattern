import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Beam } from './primitives'

const COLORS = ['#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b']
const leaves = ['Profile', 'Avatar', 'Settings']

/** A Provider broadcasts a value down to every consumer — at any depth, no drilling. */
export default function ProviderViz() {
  const [ci, setCi] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCi((c) => (c + 1) % COLORS.length), 1600)
    return () => clearInterval(id)
  }, [])
  const color = COLORS[ci]

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <motion.div
        className="rounded-xl border-2 px-4 py-2 flex items-center gap-2"
        animate={{ borderColor: color, boxShadow: `0 0 18px ${color}55` }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-semibold text-white font-mono">ThemeProvider</span>
        <motion.span
          className="w-4 h-4 rounded-full"
          animate={{ background: color }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <Beam accent={color} direction="down" length={20} />

      <div className="rounded-lg border border-surface-700 bg-surface-800/40 px-3 py-1 text-[11px] text-surface-500">
        Layout › Sidebar <span className="opacity-60">(passes no props)</span>
      </div>

      <div className="flex gap-3 sm:gap-5 mt-1">
        {leaves.map((l, i) => (
          <div key={l} className="flex flex-col items-center gap-2 w-[84px]">
            <Beam accent={color} direction="down" length={20} delay={i * 0.1} />
            <motion.div
              className="rounded-xl border bg-surface-800/70 px-3 py-2 flex flex-col items-center gap-1.5 w-full"
              animate={{ borderColor: color, boxShadow: `0 0 12px ${color}44` }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="text-xs text-surface-300">{l}</span>
              <motion.span
                className="w-3 h-3 rounded-full"
                animate={{ background: color }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              />
            </motion.div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-surface-500 text-center mt-1">
        Provider broadcasts to every consumer directly — no prop drilling
      </p>
    </div>
  )
}
