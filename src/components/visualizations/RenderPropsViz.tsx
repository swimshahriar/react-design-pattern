import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VizNode, Beam } from './primitives'

const ACCENT = '#14b8a6'
const shapes = ['list', 'card', 'chart'] as const
type Shape = (typeof shapes)[number]

/** One logic source, fed through children(data) into wildly different renderings. */
export default function RenderPropsViz() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % shapes.length), 1800)
    return () => clearInterval(id)
  }, [])
  const shape: Shape = shapes[i]

  return (
    <div className="w-full flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
      <VizNode accent={ACCENT} active label="DataProvider" sublabel="owns the logic" />
      <Beam accent={ACCENT} direction="right" length={70} label="children(data)" />
      <div className="rounded-xl border border-surface-700 bg-surface-800/60 p-3 w-[156px] min-h-[120px] flex flex-col">
        <div className="text-[11px] font-mono mb-2" style={{ color: ACCENT }}>
          Consumer renders
        </div>
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={shape}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {shape === 'list' && <MiniList />}
              {shape === 'card' && <MiniCard />}
              {shape === 'chart' && <MiniChart />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-[10px] text-surface-500 text-center mt-1 font-mono">{shape}</div>
      </div>
    </div>
  )
}

function MiniList() {
  return (
    <div className="space-y-1.5">
      {[0, 1, 2].map((n) => (
        <div key={n} className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
          <span className="h-1.5 rounded bg-surface-600" style={{ width: `${70 - n * 12}%` }} />
        </div>
      ))}
    </div>
  )
}

function MiniCard() {
  return (
    <div className="rounded-lg border p-2" style={{ borderColor: `${ACCENT}66` }}>
      <div className="w-6 h-6 rounded-full mb-1.5" style={{ background: ACCENT }} />
      <div className="h-1.5 w-3/4 rounded bg-surface-600 mb-1" />
      <div className="h-1.5 w-1/2 rounded bg-surface-700" />
    </div>
  )
}

function MiniChart() {
  const bars = [40, 70, 30, 90, 55]
  return (
    <div className="flex items-end justify-center gap-1 h-[56px]">
      {bars.map((h, n) => (
        <motion.span
          key={n}
          className="w-2.5 rounded-sm"
          style={{ background: ACCENT }}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.4, delay: n * 0.05 }}
        />
      ))}
    </div>
  )
}
