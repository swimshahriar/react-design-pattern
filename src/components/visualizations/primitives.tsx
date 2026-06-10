import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Shared building blocks for the pattern visualizations so every diagram speaks the
 * same visual language. Each accepts an `accent` (a 6-digit hex like "#6366f1") so the
 * diagram picks up its pattern's signature color. Hex-alpha suffixes (e.g. `${accent}1f`)
 * rely on the accents being 6-digit hex. The looping transition helper lives in
 * `./transitions` so this file only exports components (keeps fast-refresh happy).
 */

interface VizNodeProps {
  label: ReactNode
  sublabel?: ReactNode
  accent: string
  active?: boolean
  mono?: boolean
  className?: string
  style?: CSSProperties
}

/** A labeled rounded box. Glows with the accent color when `active`. */
export function VizNode({
  label,
  sublabel,
  accent,
  active = false,
  mono = false,
  className = '',
  style,
}: VizNodeProps) {
  return (
    <motion.div
      className={`rounded-xl border px-3 py-2 text-center ${className}`}
      style={style}
      animate={{
        borderColor: active ? accent : 'rgba(71,85,105,0.7)',
        boxShadow: active ? `0 0 18px ${accent}66` : '0 0 0px rgba(0,0,0,0)',
        backgroundColor: active ? `${accent}1f` : 'rgba(30,41,59,0.7)',
      }}
      transition={{ duration: 0.35 }}
    >
      <div
        className={`text-sm font-semibold ${mono ? 'font-mono' : ''}`}
        style={{ color: active ? '#ffffff' : '#cbd5e1' }}
      >
        {label}
      </div>
      {sublabel && <div className="text-[11px] text-surface-400 mt-0.5">{sublabel}</div>}
    </motion.div>
  )
}

interface BeamProps {
  accent: string
  direction?: 'right' | 'down'
  length?: number
  duration?: number
  delay?: number
  label?: ReactNode
  className?: string
}

/**
 * A connector line with a glowing packet that travels along it on a loop —
 * the "data flowing from A to B" primitive. Animates `x`/`y` transforms (cheap),
 * not layout props.
 */
export function Beam({
  accent,
  direction = 'right',
  length = 64,
  duration = 1.6,
  delay = 0,
  label,
  className = '',
}: BeamProps) {
  const horizontal = direction === 'right'
  return (
    <div
      className={`relative ${className}`}
      style={{ width: horizontal ? length : 8, height: horizontal ? 8 : length }}
    >
      <div
        className="absolute rounded-full"
        style={{
          background: 'rgba(71,85,105,0.55)',
          width: horizontal ? length : 2,
          height: horizontal ? 2 : length,
          left: horizontal ? 0 : 3,
          top: horizontal ? 3 : 0,
        }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          left: 0,
          top: 0,
          background: accent,
          boxShadow: `0 0 10px ${accent}`,
        }}
        animate={horizontal ? { x: [0, length - 8] } : { y: [0, length - 8] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay, repeatDelay: 0.25 }}
      />
      {label && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-surface-500 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  )
}
