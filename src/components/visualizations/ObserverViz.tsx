import { motion } from 'framer-motion'
import { Beam } from './primitives'
import { loopT } from './transitions'

const ACCENT = '#06b6d4'
const subs = ['Logger', 'Toast', 'Analytics']

/** A publisher emits through an EventBus that fans out to every subscriber. */
export default function ObserverViz() {
  return (
    <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      {/* Publisher */}
      <motion.div
        className="rounded-xl border px-3 py-2 text-center"
        style={{ borderColor: ACCENT, background: `${ACCENT}14` }}
        animate={{ boxShadow: [`0 0 0px ${ACCENT}00`, `0 0 16px ${ACCENT}88`, `0 0 0px ${ACCENT}00`] }}
        transition={loopT(2)}
      >
        <div className="text-sm font-semibold text-white">Publisher</div>
        <div className="text-[10px] text-surface-400 font-mono">emit("event")</div>
      </motion.div>

      <Beam accent={ACCENT} direction="right" length={48} />

      {/* EventBus */}
      <motion.div
        className="rounded-full border px-4 py-4 font-mono text-xs text-white shrink-0"
        style={{ borderColor: ACCENT, background: `${ACCENT}22` }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={loopT(2)}
      >
        EventBus
      </motion.div>

      {/* Subscribers */}
      <div className="flex flex-col gap-2">
        {subs.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Beam accent={ACCENT} direction="right" length={34} delay={0.3 + i * 0.18} />
            <motion.div
              className="rounded-lg border px-3 py-1.5 text-xs text-surface-200 w-[98px]"
              style={{ borderColor: 'rgba(71,85,105,0.7)' }}
              animate={{
                borderColor: ['rgba(71,85,105,0.7)', ACCENT, 'rgba(71,85,105,0.7)'],
                boxShadow: [`0 0 0px ${ACCENT}00`, `0 0 12px ${ACCENT}88`, `0 0 0px ${ACCENT}00`],
              }}
              transition={{ ...loopT(2), delay: 0.3 + i * 0.18 }}
            >
              {s}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
