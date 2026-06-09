import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const codeSnippets = [
  { text: 'const [state, setState] = useState()', x: '8%', y: '20%', delay: 0 },
  { text: 'useEffect(() => { ... }, [])', x: '65%', y: '15%', delay: 0.5 },
  { text: 'return <Component {...props} />', x: '75%', y: '70%', delay: 1 },
  { text: 'export default withHOC(App)', x: '10%', y: '75%', delay: 1.5 },
  { text: '<Context.Provider value={...}>', x: '45%', y: '85%', delay: 2 },
]

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-accent-950/20 to-surface-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />

      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:block text-sm font-mono text-surface-600 select-none pointer-events-none ${
            i % 2 === 0 ? 'float-animation' : 'float-animation-delay-1'
          }`}
          style={{ left: snippet.x, top: snippet.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: snippet.delay, duration: 1 }}
        >
          {snippet.text}
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-300 text-sm font-medium mb-6">
            <span className="mr-2">&#9889;</span>
            Interactive Examples &middot; Code Walkthroughs &middot; Decision Frameworks
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="gradient-text">React Design</span>
          <br />
          <span className="text-white">Patterns</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Master the essential patterns that make React code scalable, maintainable, and elegant.
          From compound components to custom hooks — learn when, why, and how.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            to="/compound"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
          >
            Start Learning
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/hooks"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-surface-600 hover:border-surface-500 text-surface-300 hover:text-white font-semibold transition-all duration-200"
          >
            Jump to Hooks
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center justify-center gap-8 text-surface-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-xs uppercase tracking-wider">Patterns</div>
          </div>
          <div className="w-px h-8 bg-surface-700" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Live</div>
            <div className="text-xs uppercase tracking-wider">Examples</div>
          </div>
          <div className="w-px h-8 bg-surface-700" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">TypeScript</div>
            <div className="text-xs uppercase tracking-wider">Code</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}