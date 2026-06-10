import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import ProsCons from '../components/ProsCons'
import { useState } from 'react'
import { useLocalStorage, useDebounce } from '../patterns/hooks/customHooks'
import Visualization from '../components/Visualization'
import HooksViz from '../components/visualizations/HooksViz'

const customHookCode = `// useLocalStorage — mirrors state to localStorage
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial
    const stored = window.localStorage.getItem(key)
    return stored !== null ? (JSON.parse(stored) as T) : initial
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// useMediaQuery — reactive CSS media query matching
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

// useDebounce — delay value changes
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}`

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '')
  return (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-sm text-surface-400 mb-1">Name (persisted)</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
          placeholder="Type your name..."
        />
      </div>
      <p className="text-xs text-surface-500">
        This value is saved to localStorage. <button onClick={() => setName('')} className="text-accent-400 hover:text-accent-300 underline">Clear</button>. Refresh the page — it persists!
      </p>
    </div>
  )
}

function DebounceDemo() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  return (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <label className="block text-sm text-surface-400 mb-1">Search (debounced 500ms)</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
          placeholder="Start typing..."
        />
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div>
          <span className="text-surface-500">Raw:</span>{' '}
          <span className="text-yellow-400">{search || '...'}</span>
        </div>
        <div>
          <span className="text-surface-500">Debounced:</span>{' '}
          <span className="text-green-400">{debouncedSearch || '...'}</span>
        </div>
      </div>
    </div>
  )
}

const rulesCode = `// The two rules of hooks:
// 1. Only call hooks at the top level — never in loops, conditions, or nested functions
// 2. Only call hooks from React functions — components or other hooks

// ✅ Correct
function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => { document.body.classList.toggle('dark', isDark) }, [isDark])
  return [isDark, setIsDark] as const
}

// ❌ Wrong — hook inside a condition
function Avatar({ user }) {
  if (user) {
    const [hovered, setHovered] = useState(false) // breaks rule 1!
  }
}`

const effectPitfallsCode = `// ❌ Anti-pattern: computing derived state in an effect
const [fullName, setFullName] = useState("")
useEffect(() => {
  setFullName(\`\${first} \${last}\`)  // extra render!
}, [first, last])

// ✅ Fix: just compute it
const fullName = \`\${first} \${last}\`

// ❌ Anti-pattern: handling user actions in an effect
useEffect(() => {
  if (justSubmitted) postOrder(values)  // not what effects are for
}, [justSubmitted])

// ✅ Fix: do it in the event handler
const onSubmit = (e) => {
  e.preventDefault()
  postOrder(values)
}`

export default function HooksPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Custom Hooks 🪝
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          The modern answer to shared stateful logic. Custom hooks extract behavior into
          composable functions with zero extra tree nodes. If you're writing React in 2025+,
          this is your go-to pattern.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Two Rules</h2>
        <CodeBlock code={rulesCode} language="tsx" title="Rules of Hooks" />
        <div className="mt-4 rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
          <p className="text-sm text-surface-300">
            <strong className="text-accent-300">Lint rule:</strong> Install{' '}
            <code className="text-accent-400">eslint-plugin-react-hooks</code> on day one.
            It enforces both rules and catches bugs before they ship.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo: useLocalStorage</h2>
        <p className="text-surface-400 mb-4">
          Type your name below. The value persists to localStorage — refresh the page to verify.
        </p>
        <LiveExample title="useLocalStorage" description="Value persists across page refreshes">
          <LocalStorageDemo />
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo: useDebounce</h2>
        <p className="text-surface-400 mb-4">
          Type in the search box. Notice the "Debounced" value updates 500ms after you stop typing —
          perfect for API calls.
        </p>
        <LiveExample title="useDebounce" description="Type to see the delay">
          <DebounceDemo />
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Implementation</h2>
        <CodeBlock code={customHookCode} language="tsx" title="customHooks.ts" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">useEffect Pitfalls</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          The single most common hook mistake: using <code className="text-accent-400">useEffect</code> for
          things that aren't side effects. React's docs are emphatic — if there's no external system
          involved, you probably don't need an effect.
        </p>
        <CodeBlock code={effectPitfallsCode} language="tsx" title="Effect pitfalls vs fixes" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Zero extra tree nodes — just a function call',
            'Composable — hooks can call other hooks',
            'Full TypeScript inference, no generic gymnastics',
            'Easier to test than HOCs or render props',
            'Recommended by React team for all new code',
          ]}
          cons={[
            'Stale closures — every render captures its own snapshot',
            'Effect overuse — developers reach for useEffect too often',
            'Hidden ordering rules — must be called at top level',
            'Can\'t be called conditionally (enforced by linter)',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Sharing stateful logic between components (most cases)</li>
              <li>• Encapsulating browser API interactions (geolocation, media, storage)</li>
              <li>• Replacing class lifecycle methods</li>
              <li>• Extracting verbs from fat components (useScrollPosition, useDebouncedSearch)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• You need to own a subtree (use render props)</li>
              <li>• You need to wrap any component shape (use HOCs for library code)</li>
              <li>• Logic is purely stateless — just use a regular function</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Visualization</h2>
        <p className="text-surface-400 mb-4">
          Three unrelated components all call the same{' '}
          <code className="text-accent-400">useToggle()</code> hook. They share the <em>logic</em>, but
          each call keeps its own independent state — and the hook adds no extra nodes to the tree.
        </p>
        <Visualization
          title="Reusing one hook"
          caption="Shared logic, independent state, zero wrapper nodes."
        >
          <HooksViz />
        </Visualization>
      </section>
    </motion.div>
  )
}