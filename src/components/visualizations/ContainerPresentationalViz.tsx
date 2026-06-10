import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Beam } from './primitives'
import { loopT } from './transitions'

const ACCENT = '#3b82f6'

/** Container fetches data, hands it to a Presentational component via props. */
export default function ContainerPresentationalViz() {
  const [step, setStep] = useState(0) // 0 = fetching, 1 = data ready, 2 = rendered
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
      {/* Container */}
      <div className="rounded-xl border border-surface-700 bg-surface-800/60 p-3 w-[152px] min-h-[124px] flex flex-col items-center justify-center gap-2">
        <span className="text-[11px] font-mono" style={{ color: ACCENT }}>
          Container
        </span>
        <span className="text-[10px] text-surface-500">handles data</span>
        {step === 0 ? (
          <motion.span
            className="w-6 h-6 rounded-full border-2 border-surface-600"
            style={{ borderTopColor: ACCENT }}
            animate={{ rotate: 360 }}
            transition={loopT(0.8, { ease: 'linear' })}
          />
        ) : (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm font-mono"
            style={{ color: ACCENT }}
          >
            ✓ data ready
          </motion.span>
        )}
      </div>

      <Beam accent={ACCENT} direction="right" length={64} label="props" />

      {/* Presentational */}
      <div className="rounded-xl border border-surface-700 bg-surface-800/60 p-3 w-[152px] min-h-[124px] flex flex-col">
        <span className="text-[11px] font-mono mb-2" style={{ color: ACCENT }}>
          Presentational
        </span>
        <div className="flex-1 space-y-2">
          {[0, 1, 2].map((n) =>
            step === 2 ? (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: n * 0.08 }}
                className="flex items-center gap-1.5"
              >
                <span className="w-4 h-4 rounded shrink-0" style={{ background: ACCENT }} />
                <span className="h-2 rounded bg-surface-600" style={{ width: `${70 - n * 10}%` }} />
              </motion.div>
            ) : (
              <div
                key={n}
                className="h-4 rounded bg-surface-700/70 animate-pulse"
                style={{ width: `${70 - n * 10}%` }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}
