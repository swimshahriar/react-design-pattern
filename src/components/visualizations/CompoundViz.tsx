import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VizNode, Beam } from './primitives'

const ACCENT = '#6366f1'
const tabs = ['Overview', 'Features', 'Pricing']
const panels = [
  'Product overview content…',
  'A checklist of features…',
  'Pricing tiers and plans…',
]

/** A <Tabs> parent holding shared state in Context; child Tab/TabPanel read it. */
export default function CompoundViz() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % tabs.length), 1700)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-3">
      <VizNode
        accent={ACCENT}
        active
        mono
        className="w-full"
        label="<Tabs>"
        sublabel={
          <>
            shared state via Context ·{' '}
            <span style={{ color: ACCENT }}>active = "{tabs[active]}"</span>
          </>
        }
      />
      <Beam accent={ACCENT} direction="down" length={22} />
      <div className="flex gap-2 w-full justify-center">
        {tabs.map((t, i) => (
          <VizNode key={t} accent={ACCENT} active={i === active} label={t} className="flex-1" />
        ))}
      </div>
      <Beam accent={ACCENT} direction="down" length={18} />
      <div className="w-full rounded-xl border border-surface-700 bg-surface-800/60 p-4 min-h-[68px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-surface-300 text-center"
          >
            <span className="font-mono text-xs" style={{ color: ACCENT }}>
              {'<TabPanel>'}
            </span>
            <div className="mt-1">{panels[active]}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
