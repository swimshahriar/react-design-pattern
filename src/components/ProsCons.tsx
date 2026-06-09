interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
        <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Pros
        </h4>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-surface-300">
              <span className="text-green-400 mt-0.5 shrink-0">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cons
        </h4>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-surface-300">
              <span className="text-red-400 mt-0.5 shrink-0">-</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}