import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Beam } from './primitives'
import { loopT } from './transitions'

const ACCENT = '#f59e0b'
const comps = ['Toolbar', 'Sidebar', 'Modal']

/** One custom hook, reused by several components — each call owns its own state. */
export default function HooksViz() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 650)
    return () => clearInterval(id)
  }, [])
  const isOn = (i: number) => (tick + i) % 4 < 2

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex gap-3 sm:gap-6">
        {comps.map((c, i) => (
          <div key={c} className="flex flex-col items-center gap-1">
            <div className="rounded-xl border border-surface-700 bg-surface-800/70 px-3 py-2 flex flex-col items-center gap-1.5 w-[86px]">
              <span className="text-xs font-medium text-surface-300">{c}</span>
              <motion.span
                className="w-3 h-3 rounded-full"
                animate={{
                  background: isOn(i) ? ACCENT : '#334155',
                  boxShadow: isOn(i) ? `0 0 10px ${ACCENT}` : '0 0 0px #00000000',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <Beam accent={ACCENT} direction="down" length={24} delay={i * 0.15} />
          </div>
        ))}
      </div>

      <motion.div
        className="rounded-full border px-5 py-2 font-mono text-sm"
        style={{ borderColor: ACCENT, color: ACCENT, background: `${ACCENT}14` }}
        animate={{ boxShadow: [`0 0 0px ${ACCENT}00`, `0 0 16px ${ACCENT}55`, `0 0 0px ${ACCENT}00`] }}
        transition={loopT(2)}
      >
        useToggle()
      </motion.div>

      <p className="text-[11px] text-surface-500 text-center max-w-xs">
        One hook, reused everywhere — each call gets its own state, with zero extra nodes in the tree.
      </p>
    </div>
  )
}
