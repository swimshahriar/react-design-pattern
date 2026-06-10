import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import BeforeAfter from '../components/BeforeAfter'
import ProsCons from '../components/ProsCons'
import { ControlledForm, UncontrolledForm } from '../patterns/controlled/Forms'
import { useState } from 'react'
import Visualization from '../components/Visualization'
import ControlledViz from '../components/visualizations/ControlledViz'

const controlledCode = `// Controlled: the parent owns every value
function ControlledForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}              // ← React controls this
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}           // ← React controls this
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}`

const uncontrolledCode = `// Uncontrolled: the DOM owns the values, React reads via refs
function UncontrolledForm() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      email: emailRef.current?.value,     // ← read from DOM
      password: passwordRef.current?.value, // ← read from DOM
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} defaultValue="" />
      <input ref={passwordRef} type="password" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  )
}`

const comparisonCode = `// Side-by-side: when each makes sense

// ✅ Controlled is better for:
// - Real-time validation (check on every keystroke)
// - Conditional rendering based on input values
// - Disabling submit until form is valid
// - Input masking (phone, credit card formatting)
// - Integrating with state management

// ✅ Uncontrolled is better for:
// - Simple one-time form submissions
// - Performance-critical large forms (no re-renders per keystroke)
// - Integrating with non-React code
// - File inputs (can't set value programmatically)

// 💡 You can mix both in the same form!
function MixedForm() {
  const [name, setName] = useState('')       // controlled
  const bioRef = useRef<HTMLTextAreaElement>(null)  // uncontrolled

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <textarea ref={bioRef} defaultValue="" />
    </form>
  )
}`

const beforeCode = `// Without controlled pattern: hard to validate live
function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Can only validate on submit — no live feedback
    const formData = new FormData(e.target)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email.includes('@')) {
      alert('Invalid email')  // late feedback!
      return
    }
    if (password.length < 8) {
      alert('Password too short')  // late feedback!
      return
    }

    signUp({ email, password })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      {/* No live validation, no submit button state */}
      <button type="submit">Sign Up</button>
    </form>
  )
}`

const afterCode = `// With controlled pattern: real-time validation
function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailError = !email ? '' : email.includes('@') ? '' : 'Invalid email'
  const passwordError = !password ? ''
    : password.length >= 8 ? '' : 'Too short (min 8)'

  const isValid = !emailError && !passwordError && email && password

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (isValid) signUp({ email, password })
    }}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={emailError ? 'border-red-500' : 'border-gray-300'}
      />
      {emailError && <span className="error">{emailError}</span>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <span className="error">{passwordError}</span>}

      <button disabled={!isValid}>
        Sign Up
      </button>
    </form>
  )
  // Live validation ✓ | Conditional styling ✓ | Submit state ✓
}`

export default function ControlledUncontrolled() {
  const [tab, setTab] = useState<'controlled' | 'uncontrolled'>('controlled')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Controlled vs Uncontrolled 🎮
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          Should the parent or the component hold the state? Controlled components give
          the parent full control; uncontrolled components manage it internally via refs.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Core Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h4 className="text-accent-300 font-semibold mb-2">Controlled</h4>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• React state is the "single source of truth"</li>
              <li>• Every keystroke triggers onChange → setState → re-render</li>
              <li>• Parent can validate, transform, and react to values in real time</li>
              <li>• <code className="text-accent-400">value</code> + <code className="text-accent-400">onChange</code></li>
            </ul>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <h4 className="text-yellow-400 font-semibold mb-2">Uncontrolled</h4>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• The DOM is the source of truth</li>
              <li>• No re-renders per keystroke</li>
              <li>• Values read from refs on submit</li>
              <li>• <code className="text-yellow-400">defaultValue</code> + <code className="text-yellow-400">ref</code></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo</h2>
        <p className="text-surface-400 mb-4">
          Toggle between controlled and uncontrolled forms. Notice how the controlled form
          shows live character counts and validation — the uncontrolled form can't do that easily.
        </p>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab('controlled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'controlled'
                ? 'bg-accent-600 text-white'
                : 'bg-surface-800 text-surface-400 hover:text-white'
            }`}
          >
            Controlled
          </button>
          <button
            onClick={() => setTab('uncontrolled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'uncontrolled'
                ? 'bg-yellow-600 text-white'
                : 'bg-surface-800 text-surface-400 hover:text-white'
            }`}
          >
            Uncontrolled
          </button>
        </div>
        <LiveExample
          title={tab === 'controlled' ? 'Controlled Form' : 'Uncontrolled Form'}
          description={
            tab === 'controlled'
              ? 'React controls every value — live validation, conditional submit'
              : 'DOM owns the values — simpler but less interactive'
          }
        >
          {tab === 'controlled' ? <ControlledForm /> : <UncontrolledForm />}
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Code Comparison</h2>
        <CodeBlock code={controlledCode} language="tsx" title="Controlled Form" />
        <CodeBlock code={uncontrolledCode} language="tsx" title="Uncontrolled Form" />
        <CodeBlock code={comparisonCode} language="tsx" title="When to use which" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Before vs After</h2>
        <BeforeAfter beforeCode={beforeCode} afterCode={afterCode} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Controlled: Full control over validation, formatting, and conditional logic',
            'Controlled: Single source of truth — the React state',
            'Controlled: Easy to implement instant feedback (errors, character counts)',
            'Uncontrolled: No re-renders per keystroke — better for large forms',
            'Uncontrolled: Simpler for one-time submissions and non-React integrations',
          ]}
          cons={[
            'Controlled: More boilerplate (state + handler for every input)',
            'Controlled: Re-renders on every keystroke (usually fine, but not always)',
            'Controlled: Can cause performance issues with very large forms',
            'Uncontrolled: No real-time validation or conditional rendering on values',
            'Uncontrolled: Can\'t easily reset or programmatically set values',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Controlled when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Real-time validation on every keystroke</li>
              <li>• Conditional rendering based on input values</li>
              <li>• Disabling submit until form is valid</li>
              <li>• Input masking (phone, currency format)</li>
              <li>• Integrating with global state (Redux, Zustand)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <h3 className="text-yellow-400 font-semibold mb-2">⚡ Uncontrolled when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Simple one-time form submissions</li>
              <li>• Large forms where re-renders are expensive</li>
              <li>• Integrating with non-React libraries</li>
              <li>• File inputs (can't set value programmatically)</li>
              <li>• Quick prototypes where validation isn't needed</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Visualization</h2>
        <p className="text-surface-400 mb-4">
          On the left, every keystroke pushes through <code className="text-accent-400">useState</code>{' '}
          and triggers a re-render (watch the counter climb). On the right, the DOM keeps the value and
          React only reads it via a ref when you submit.
        </p>
        <Visualization
          title="Who owns the value?"
          caption="Controlled re-renders per keystroke; uncontrolled reads on submit."
        >
          <ControlledViz />
        </Visualization>
      </section>
    </motion.div>
  )
}