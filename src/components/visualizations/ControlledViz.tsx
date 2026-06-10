import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { loopT } from './transitions'

const CTRL = '#ef4444'
const UNCTRL = '#f59e0b'

/** Controlled: state drives a re-render on every keystroke. Uncontrolled: DOM owns
 * the value, read once on submit. */
export default function ControlledViz() {
  const [renders, setRenders] = useState(1)
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setRenders((r) => (r % 6) + 1), 700)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setSubmit(true)
      setTimeout(() => setSubmit(false), 600)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Controlled */}
      <div
        className="rounded-xl border p-3 flex flex-col items-center gap-2.5"
        style={{ borderColor: `${CTRL}55` }}
      >
        <span className="text-xs font-semibold" style={{ color: CTRL }}>
          Controlled
        </span>
        <div className="flex items-center gap-2">
          <Box label="input" />
          <Arrow accent={CTRL} dir="right" label="onChange" />
          <Box label="useState" accent={CTRL} active />
        </div>
        <Arrow accent={CTRL} dir="down" label="re-render" />
        <motion.div
          key={renders}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          className="text-[11px] font-mono px-2 py-1 rounded"
          style={{ color: CTRL, background: `${CTRL}14` }}
        >
          renders: {renders}
        </motion.div>
        <span className="text-[10px] text-surface-500 text-center">
          every keystroke → state → re-render
        </span>
      </div>

      {/* Uncontrolled */}
      <div
        className="rounded-xl border p-3 flex flex-col items-center gap-2.5"
        style={{ borderColor: `${UNCTRL}55` }}
      >
        <span className="text-xs font-semibold" style={{ color: UNCTRL }}>
          Uncontrolled
        </span>
        <Box label="input" sub="DOM owns value" />
        <motion.button
          className="text-[11px] font-semibold px-3 py-1 rounded text-white cursor-default"
          animate={{
            background: submit ? UNCTRL : '#475569',
            boxShadow: submit ? `0 0 14px ${UNCTRL}` : '0 0 0px #00000000',
          }}
          transition={{ duration: 0.2 }}
        >
          Submit
        </motion.button>
        <Arrow accent={UNCTRL} dir="down" label="ref.read()" pulse={submit} />
        <motion.div
          className="text-[11px] font-mono px-2 py-1 rounded"
          style={{ color: UNCTRL, background: `${UNCTRL}14` }}
          animate={{ opacity: submit ? 1 : 0.4 }}
        >
          renders: 1
        </motion.div>
        <span className="text-[10px] text-surface-500 text-center">
          reads the value only on submit
        </span>
      </div>
    </div>
  )
}

function Box({
  label,
  sub,
  accent,
  active,
}: {
  label: string
  sub?: string
  accent?: string
  active?: boolean
}) {
  const on = active && accent
  return (
    <span
      className="rounded border px-2 py-1 flex flex-col items-center font-mono text-[11px]"
      style={{
        borderColor: on ? accent : 'rgba(71,85,105,0.7)',
        background: on ? `${accent}14` : 'rgba(30,41,59,0.6)',
      }}
    >
      <span style={{ color: on ? accent : '#cbd5e1' }}>{label}</span>
      {sub && <span className="text-[9px] text-surface-500">{sub}</span>}
    </span>
  )
}

function Arrow({
  accent,
  label,
  dir = 'down',
  pulse,
}: {
  accent: string
  label?: string
  dir?: 'down' | 'right'
  pulse?: boolean
}) {
  const isPulseControlled = pulse !== undefined
  return (
    <div className={`flex items-center gap-1 ${dir === 'down' ? 'flex-col' : 'flex-row'}`}>
      {label && <span className="text-[9px] font-mono text-surface-500">{label}</span>}
      <motion.span
        style={{ color: accent }}
        animate={isPulseControlled ? { opacity: pulse ? 1 : 0.3 } : { opacity: [0.3, 1, 0.3] }}
        transition={isPulseControlled ? { duration: 0.3 } : loopT(1.4)}
      >
        {dir === 'right' ? '→' : '↓'}
      </motion.span>
    </div>
  )
}
