import { type ReactNode } from 'react'

interface LiveExampleProps {
  title: string
  description?: string
  children: ReactNode
}

export default function LiveExample({ title, description, children }: LiveExampleProps) {
  return (
    <div className="my-6 rounded-xl border border-surface-700">
      <div className="bg-surface-800 px-6 py-3 border-b border-surface-700 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-3 text-sm font-mono text-surface-400">{title}</span>
      </div>
      {description && (
        <p className="px-6 py-2 text-sm text-surface-400 bg-surface-800/50 border-b border-surface-700">
          {description}
        </p>
      )}
      <div className="p-6 bg-surface-900 min-h-[120px] relative">
        {children}
      </div>
    </div>
  )
}