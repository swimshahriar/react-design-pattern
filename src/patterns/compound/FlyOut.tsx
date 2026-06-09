import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react'

const FlyOutContext = createContext<{
  open: boolean
  toggle: (value: boolean) => void
} | null>(null)

function useFlyOutContext() {
  const ctx = useContext(FlyOutContext)
  if (!ctx) throw new Error('FlyOut compound components must be used within <FlyOut>')
  return ctx
}

function FlyOut({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const toggle = (value: boolean) => setOpen(value)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      <div ref={ref} className="relative inline-block">{children}</div>
    </FlyOutContext.Provider>
  )
}

function Toggle() {
  const { open, toggle } = useFlyOutContext()
  return (
    <button
      onClick={() => toggle(!open)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-800 border border-surface-600 hover:border-accent-500/50 text-surface-300 hover:text-white transition-all text-sm"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      {open ? 'Close' : 'Actions'}
    </button>
  )
}

function List({ children }: { children: ReactNode }) {
  const { open } = useFlyOutContext()
  if (!open) return null
  return (
    <ul className="absolute right-0 mt-2 w-44 rounded-lg bg-surface-800 border border-surface-600 shadow-xl overflow-hidden z-50">
      {children}
    </ul>
  )
}

function Item({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  const { toggle } = useFlyOutContext()
  return (
    <li
      onClick={() => {
        onClick?.()
        toggle(false)
      }}
      className="px-4 py-2.5 text-sm text-surface-300 hover:bg-accent-500/20 hover:text-white cursor-pointer transition-colors"
    >
      {children}
    </li>
  )
}

FlyOut.Toggle = Toggle
FlyOut.List = List
FlyOut.Item = Item

export { FlyOut }