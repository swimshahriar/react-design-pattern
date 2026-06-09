import { Link } from 'react-router-dom'
import { type PatternMeta } from '../data/patterns'

interface PatternCardProps {
  pattern: PatternMeta
  index: number
}

export default function PatternCard({ pattern, index }: PatternCardProps) {
  return (
    <Link
      to={pattern.slug}
      className="group block gradient-border p-[1px] rounded-xl"
    >
      <div className="bg-surface-900 rounded-xl p-6 h-full transition-all duration-300 group-hover:bg-surface-800/80 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${pattern.colorFrom}, ${pattern.colorTo})`,
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{pattern.icon}</span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                pattern.category === 'design'
                  ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              }`}
            >
              {pattern.category === 'design' ? 'Design Pattern' : 'Rendering Pattern'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-300 transition-colors">
            {pattern.title}
          </h3>
          <p className="text-sm text-surface-400 mb-3">{pattern.subtitle}</p>
          <p className="text-sm text-surface-400 leading-relaxed">{pattern.description}</p>
          <div className="mt-4 flex items-center text-sm font-medium text-accent-400 group-hover:text-accent-300 transition-colors">
            Learn more
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}