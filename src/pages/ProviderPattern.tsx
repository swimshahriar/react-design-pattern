import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import ProsCons from '../components/ProsCons'
import { useState } from 'react'
import { ThemeProvider, useTheme } from '../patterns/provider/providers'

const providerCode = `import { createContext, useContext, useState } from 'react'

// 1. Create the context
const ThemeContext = createContext<{
  theme: { mode: 'light' | 'dark'; primary: string }
  setTheme: (theme: { mode: 'light' | 'dark'; primary: string }) => void
} | null>(null)

// 2. Create the Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    mode: 'dark',
    primary: '#6366f1',
  })

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Create a custom hook for consumption
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}`

const usageCode = `// Wrap your app (or a subtree) with the Provider
function App() {
  return (
    <ThemeProvider>
      <ThemedCard />
    </ThemeProvider>
  )
}

// Any component in the tree can access the theme
function ThemedCard() {
  const { theme, setTheme } = useTheme()

  return (
    <div style={{ background: theme.mode === 'dark' ? '#111' : '#fff' }}>
      <p>Current mode: {theme.mode}</p>
      <button onClick={() => setTheme({
        ...theme,
        mode: theme.mode === 'dark' ? 'light' : 'dark'
      })}>
        Toggle theme
      </button>
    </div>
  )
}`

const authCode = `// Auth Provider — another common use case
const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (name, email) => setUser({ name, email })
  const logout = () => setUser(null)
  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}`

function ThemeDemo() {
  const { theme, setTheme } = useTheme()
  const isDark = theme.mode === 'dark'
  const colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6']

  return (
    <div className="w-full space-y-4">
      <div
        className="rounded-xl p-6 transition-all duration-300"
        style={{ background: isDark ? '#1e293b' : '#f1f5f9' }}
      >
        <p className="text-sm mb-1" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
          Current mode
        </p>
        <p className="text-xl font-bold" style={{ color: isDark ? '#fff' : '#0f172a' }}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </p>
        <p className="text-sm mt-2" style={{ color: theme.primary }}>
          Primary color applied
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme({ ...theme, mode: isDark ? 'light' : 'dark' })}
          className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-600 hover:border-accent-500/50 text-white text-sm font-medium transition-all"
        >
          Toggle {isDark ? 'Light' : 'Dark'}
        </button>

        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setTheme({ ...theme, primary: color })}
              className="w-7 h-7 rounded-full border-2 transition-all"
              style={{
                background: color,
                borderColor: theme.primary === color ? '#fff' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const propDrillingCode = `// ❌ Without Context: prop drilling through 3 levels
function App() {
  const [user, setUser] = useState(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />
}

function Sidebar({ user, setUser }) {
  return <UserProfile user={user} setUser={setUser} />
  // Every intermediate component passes props it doesn't use!
}

// ✅ With Context: any component can access directly
function App() {
  return (
    <AuthProvider>
      <Layout />  {/* Layout doesn't need to know about auth */}
    </AuthProvider>
  )
}

function UserProfile() {
  const { user, login, logout } = useAuth()  // direct access!
  // ...
}`

export default function ProviderPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Provider / Context 🌐
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          Share state across the component tree without prop drilling. Context provides a broadcast
          channel; the Provider pattern adds structure and safety around it.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Problem: Prop Drilling</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          When deeply nested components need the same data (user, theme, locale),
          passing props through every intermediate level becomes painful. Context solves this
          by providing a "broadcast channel" — any component in the tree can subscribe.
        </p>
        <CodeBlock code={propDrillingCode} language="tsx" title="Prop drilling vs Context" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo</h2>
        <p className="text-surface-400 mb-4">
          Toggle between dark/light mode and pick a primary color. The theme state is shared
          through <code className="text-accent-400">ThemeProvider</code> context.
        </p>
        <LiveExample title="ThemeProvider Demo" description="Context in action">
          <ThemeProvider>
            <ThemeDemo />
          </ThemeProvider>
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Implementation</h2>
        <CodeBlock code={providerCode} language="tsx" title="ThemeProvider.tsx" />
        <CodeBlock code={usageCode} language="tsx" title="Usage" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Auth Provider</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          Another extremely common use case: authentication state. Every app needs it,
          and it touches dozens of components — the perfect candidate for Context.
        </p>
        <CodeBlock code={authCode} language="tsx" title="AuthProvider.tsx" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h4 className="text-accent-300 font-semibold mb-2">1. Always create a custom hook</h4>
            <p className="text-sm text-surface-300">
              Don't use <code className="text-accent-400">useContext(MyContext)</code> directly.
              Create a <code className="text-accent-400">useTheme()</code> or <code className="text-accent-400">useAuth()</code> hook
              that throws a helpful error if used outside the Provider.
            </p>
          </div>
          <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h4 className="text-accent-300 font-semibold mb-2">2. Split context for performance</h4>
            <p className="text-sm text-surface-300">
              If only part of your context changes frequently, create separate contexts
              for state <code className="text-accent-400">ThemeStateContext</code> and
              dispatch <code className="text-accent-400">ThemeDispatchContext</code>.
              This prevents unnecessary re-renders.
            </p>
          </div>
          <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h4 className="text-accent-300 font-semibold mb-2">3. Co-locate Provider scope</h4>
            <p className="text-sm text-surface-300">
              Don't wrap the entire app in every provider. Place providers as close to
              their consumers as possible. A theme provider might wrap the app, but a
              modal provider only needs to wrap the layout.
            </p>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Re-render warning</h4>
            <p className="text-sm text-surface-300">
              Every consumer re-renders when the context value changes. If your context holds
              a large object, consider splitting it or memoizing the value with <code className="text-accent-400">useMemo</code>.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Eliminates prop drilling completely',
            'Clean API with custom hooks (useTheme, useAuth)',
            'Scales well for global state (theme, auth, locale)',
            'Works great with TypeScript generics',
            'Built into React — no external dependencies',
          ]}
          cons={[
            'Every consumer re-renders on context value change',
            'Can cause performance issues if not scoped correctly',
            'Harder to trace data flow than explicit props',
            'Provider nesting can get deep (Theme → Auth → Router → ...)',
            'Not suitable for high-frequency updates (use Zustand/Jotai instead)',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Global app state (theme, auth, locale, feature flags)</li>
              <li>• Data needed by many components at different depths</li>
              <li>• Prop drilling becomes unwieldy (3+ levels)</li>
              <li>• Building component libraries (Popover, Modal contexts)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Data only needed by parent and 1-2 children (just use props)</li>
              <li>• High-frequency state updates (ドラッグ位置, scroll, etc.)</li>
              <li>• State is local to a single component (use useState)</li>
              <li>• You need time-travel debugging (use Redux or Zustand)</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  )
}