import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VizNode, Beam } from './primitives'

const ACCENT = '#ec4899'

/** A plain component gets wrapped by withAuth(...) which injects extra behavior. */
export default function HOCViz() {
  const [wrapped, setWrapped] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setWrapped((w) => !w), 1900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
        <VizNode accent={ACCENT} label="Profile" sublabel="plain component" />

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-mono mb-1" style={{ color: ACCENT }}>
            withAuth( )
          </span>
          <Beam accent={ACCENT} direction="right" length={56} />
        </div>

        <div className="relative">
          <AnimatePresence>
            {wrapped && (
              <motion.div
                className="absolute -inset-3 rounded-2xl border-2 border-dashed pointer-events-none"
                style={{ borderColor: ACCENT }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
          <VizNode
            accent={ACCENT}
            active={wrapped}
            label="Profile"
            sublabel={wrapped ? 'enhanced' : 'unwrapped'}
          />
          <AnimatePresence>
            {wrapped && (
              <motion.div
                className="absolute -top-3 -right-3 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                🔒 auth
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-xs font-mono text-surface-400 text-center">
        {wrapped
          ? 'withAuth(Profile) → adds behavior, forwards the same props'
          : 'Profile → the original component, untouched'}
      </div>
    </div>
  )
}
