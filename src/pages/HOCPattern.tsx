import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import ProsCons from '../components/ProsCons'
import { useState, type ReactNode } from 'react'

const hocCode = `// A Higher-Order Component is a function that takes
// a component and returns a new component with extra behavior.

function withAnalytics<P extends object>(
  Wrapped: React.ComponentType<P>,
  eventName: string,
) {
  function WithAnalytics(props: P) {
    useEffect(() => {
      track(eventName, { path: window.location.pathname })
    }, [])
    return <Wrapped {...props} />
  }
  WithAnalytics.displayName = \`withAnalytics(\${Wrapped.displayName})\`
  return WithAnalytics
}`

const featureFlagCode = `// HOC for feature flags — switches between two components
function withFeatureFlag<P extends object>(
  flagKey: string,
  Treatment: React.ComponentType<P>,
  Control: React.ComponentType<P>,
) {
  return function WithFeatureFlag(props: P) {
    const enabled = useFlag(flagKey)
    return enabled
      ? <Treatment {...props} />
      : <Control {...props} />
  }
}

// Usage:
export const PricingPage = withFeatureFlag(
  "pricing_redesign_2025",
  PricingPageNew,
  PricingPageLegacy,
)`

const modernHookCode = `// Modern alternative: custom hook
function PricingPage(props: PricingPageProps) {
  const showRedesign = useFlag("pricing_redesign_2025")
  return showRedesign
    ? <PricingPageNew {...props} />
    : <PricingPageLegacy {...props} />
}

// Differences:
// ✅ No wrapper component, no extra tree node
// ✅ Logic is visible inside the component body
// ✅ TypeScript inference is automatic
// ✅ Better for React Compiler optimization`

function FeatureFlagDemo() {
  const [flag, setFlag] = useState(false)

  function ProductCardNew() {
    return (
      <div className="w-64 rounded-xl border-2 border-accent-500/50 bg-accent-500/10 p-4 text-center">
        <div className="text-2xl mb-2">✨</div>
        <div className="font-semibold text-white mb-1">New Design</div>
        <p className="text-xs text-accent-300 mb-3">Fresh look with gradient border</p>
        <div className="flex items-center justify-center gap-1 text-sm">
          <span className="text-accent-400 font-bold">$29</span>
          <span className="text-surface-500 line-through">$49</span>
        </div>
      </div>
    )
  }

  function ProductCardLegacy() {
    return (
      <div className="w-64 rounded-xl border border-surface-600 bg-surface-800 p-4 text-center">
        <div className="text-2xl mb-2">📦</div>
        <div className="font-semibold text-white mb-1">Legacy Design</div>
        <p className="text-xs text-surface-400 mb-3">Standard card layout</p>
        <div className="text-sm text-surface-400">$49</div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 justify-center">
        <span className="text-sm text-surface-400">flag:</span>
        <span className="text-sm font-mono text-surface-300">{flag ? 'true' : 'false'}</span>
        <button
          onClick={() => setFlag(!flag)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            flag
              ? 'bg-accent-600 text-white'
              : 'bg-surface-700 text-surface-300 hover:bg-surface-600'
          }`}
        >
          Toggle Feature Flag
        </button>
      </div>
      <div className="flex justify-center">
        {flag ? <ProductCardNew /> : <ProductCardLegacy />}
      </div>
    </div>
  )
}

const composeCode = `// Composing HOCs — powerful but can get unwieldy
export default withErrorBoundary(
  withAuthorization(
    withAnalytics(CheckoutPage, "checkout_viewed"),
    { requiredRole: "customer" },
  ),
  { fallback: <SomethingWentWrong /> },
)

// Cleaner: pipe-style composition
const compose = (...hocs) => (Component) =>
  hocs.reduceRight((acc, hoc) => hoc(acc), Component)

export default compose(
  withErrorBoundary({ fallback: <SomethingWentWrong /> }),
  withAuthorization({ requiredRole: "customer" }),
  withAnalyticsEvent("checkout_viewed"),
)(CheckoutPage)`

export default function HOCPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Higher-Order Components 🔌
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          A function that takes a component and returns a new component with extra behavior.
          The classic cross-cutting concern pattern — still found in libraries like React Router,
          Redux, and i18next.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Core Idea</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          An HOC doesn't modify the original component. It <strong className="text-white">wraps</strong> it
          in a new component that adds behavior — analytics, auth, feature flags, theming. The wrapped
          component stays untouched. Think of it like a decorator for React components.
        </p>
        <CodeBlock code={hocCode} language="tsx" title="withAnalytics.tsx" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo: Feature Flags</h2>
        <p className="text-surface-400 mb-4">
          A <code className="text-accent-400">withFeatureFlag</code> HOC switches between two components
          based on a flag value. Toggle the flag below to see the HOC swap the entire UI —
          <strong className="text-white"> the component is replaced, not just hidden</strong>.
        </p>
        <LiveExample title="HOC Feature Flag Toggle" description="Toggle the flag to see which component the HOC renders">
          <FeatureFlagDemo />
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Feature Flag Implementation</h2>
        <CodeBlock code={featureFlagCode} language="tsx" title="withFeatureFlag.tsx" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Composing HOCs</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          HOCs are just functions — they compose. But nesting three or four creates "wrapper hell."
          Two common cleanup approaches:
        </p>
        <CodeBlock code={composeCode} language="tsx" title="Composing HOCs" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pitfalls</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <h4 className="text-yellow-400 font-semibold mb-2">⚡ Prop Name Collisions</h4>
            <p className="text-sm text-surface-300">
              If an HOC injects a prop with the same name as one the parent passes, someone loses.
              Use namespaced props (<code className="text-accent-400">{'analytics={{}}'}</code> instead of <code className="text-accent-400">trackingId</code>).
            </p>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <h4 className="text-yellow-400 font-semibold mb-2">⚡ Wrapper Hell</h4>
            <p className="text-sm text-surface-300">
              Every HOC adds a node. Three to four is fine; ten makes DevTools look like Russian dolls.
              Custom hooks add zero nodes to the tree.
            </p>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <h4 className="text-yellow-400 font-semibold mb-2">⚡ Static Methods Don't Pass Through</h4>
            <p className="text-sm text-surface-300">
              Wrapping creates a new component. Static methods and refs need extra handling
              (<code className="text-accent-400">hoist-non-react-statics</code>, <code className="text-accent-400">React.forwardRef</code>).
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Modern Alternative: Custom Hooks</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          In most cases, custom hooks are now preferred. They add zero tree nodes, have better
          TypeScript inference, and are easier to debug. But HOCs still earn their keep for:
        </p>
        <CodeBlock code={modernHookCode} language="tsx" title="Hook equivalent" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Reusable cross-cutting logic — write once, wrap anywhere',
            'Does not modify the original component — pure composition',
            'Works with class components (hooks do not)',
            'Composable — HOCs can be piped together',
            'Still widely used in libraries (React Router, i18next, Redux connect)',
          ]}
          cons={[
            'Wrapper hell — each HOC adds a node to the tree',
            'Prop name collisions between HOCs',
            'Static methods and refs do not pass through automatically',
            'Harder to debug — stack traces get deep',
            'Custom hooks are usually clearer for new code',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Cross-cutting concerns (analytics, auth, error boundaries)</li>
              <li>• Library APIs that need to wrap any component shape</li>
              <li>• Class components in legacy codebases</li>
              <li>• Feature flag switches between two components</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Logic needs per-call-site customization (use a hook)</li>
              <li>• Only needed in one or two places (just inline it)</li>
              <li>• Just wrapping for styling (use composition with children)</li>
              <li>• Sharing state (use Context + custom hook)</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  )
}