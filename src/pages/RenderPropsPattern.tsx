import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import ProsCons from '../components/ProsCons'
import { useState } from 'react'
import { FormValidator } from '../patterns/render-props/FormValidator'
import Visualization from '../components/Visualization'
import RenderPropsViz from '../components/visualizations/RenderPropsViz'

const renderPropsCode = `// The component encapsulates logic but delegates rendering
type RenderProp<T> = (value: T) => React.ReactNode

function FormValidator<T>({
  initialValues,
  validate,
  onSubmit,
  children,  // children-as-function variant
}: Props<T>) {
  const [values, setValues] = useState(initialValues)
  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const setField = (key, value) =>
    setValues(prev => ({ ...prev, [key]: value }))

  const submit = () => {
    if (isValid) onSubmit(values)
  }

  // The consumer decides what the UI looks like!
  return <>{children({ values, errors, isValid, setField, submit })}</>
}`

const usageCode = `// Consumer: full control over the rendering
<FormValidator
  initialValues={{ email: "", password: "" }}
  validate={(v) => ({
    email: v.email.includes("@") ? undefined : "Not an email",
    password: v.password.length >= 8 ? undefined : "Too short",
  })}
  onSubmit={(v) => signIn(v)}
>
  {({ values, errors, isValid, setField, submit }) => (
    <form onSubmit={(e) => { e.preventDefault(); submit() }}>
      <TextField
        value={values.email}
        error={errors.email}
        onChange={(v) => setField("email", v)}
      />
      <PrimaryButton disabled={!isValid}>
        Sign in
      </PrimaryButton>
    </form>
  )}
</FormValidator>`

const multipleSlotsCode = `// Multiple render props on one component — a "slots" API
function List<T>({
  items,
  renderItem,
  renderEmpty,
  renderHeader,
}: ListProps<T>) {
  if (items.length === 0) return <>{renderEmpty?.()}</>
  return (
    <section>
      {renderHeader?.()}
      <ul>{items.map((it, i) => <li key={i}>{renderItem(it, i)}</li>)}</ul>
    </section>
  )
}`

const hookAlternativeCode = `// Same logic, but as a custom hook — flatter, no extra node
function useGeolocation() {
  const [state, setState] = useState({ status: "pending" })

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => setState({
        status: "ok",
        coords: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
      }),
      (err) => setState({ status: "error", error: err }),
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return state
}

// Usage: just a hook call — no wrapper component
function NearbyStores() {
  const geo = useGeolocation()
  if (geo.status === "pending") return <Spinner />
  if (geo.status === "error") return <PermissionPrompt />
  return <StoreMap lat={geo.coords.lat} lng={geo.coords.lng} />
}`

function InteractiveForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="w-full max-w-sm">
      {submitted ? (
        <div className="text-center p-4">
          <div className="text-2xl mb-2">&#10003;</div>
          <p className="text-green-400 font-medium">Form submitted!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-3 text-sm text-accent-400 hover:text-accent-300 underline"
          >
            Reset
          </button>
        </div>
      ) : (
        <FormValidator
          initialValues={{ email: '', password: '' }}
          validate={(v) => ({
            email: v.email.includes('@') ? undefined : 'Not a valid email',
            password: v.password.length >= 6 ? undefined : 'Too short (min 6 chars)',
          })}
          onSubmit={() => setSubmitted(true)}
        >
          {({ values, errors, isValid, setField, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-sm text-surface-400 mb-1">Email</label>
                <input
                  value={values.email as string}
                  onChange={(e) => setField('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm text-surface-400 mb-1">Password</label>
                <input
                  type="password"
                  value={values.password as string}
                  onChange={(e) => setField('password', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
                  placeholder="Min 6 characters"
                />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isValid
                    ? 'bg-accent-600 hover:bg-accent-500 text-white'
                    : 'bg-surface-700 text-surface-500 cursor-not-allowed'
                }`}
              >
                Sign In
              </button>
            </form>
          )}
        </FormValidator>
      )}
    </div>
  )
}

export default function RenderPropsPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Render Props 🎨
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          Pass a function as a prop that returns JSX. The component owns the logic;
          the consumer owns the rendering. The backbone of headless UI libraries.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Concept</h2>
        <p className="text-surface-300 leading-relaxed">
          A render prop is a function-valued prop that returns JSX. The parent component
          runs the logic and calls the function with the data. The consumer decides what the
          UI looks like. The prop doesn't have to be called <code className="text-accent-400">render</code> —
          <code className="text-accent-400"> children</code>, <code className="text-accent-400">renderItem</code>,
          or any function prop qualifies.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo</h2>
        <p className="text-surface-400 mb-4">
          This form uses the render props pattern. <code className="text-accent-400">FormValidator</code> handles
          all the validation logic — the consumer decides what the inputs look like.
        </p>
        <LiveExample title="FormValidator with Render Props" description="Type to see live validation">
          <InteractiveForm />
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Implementation</h2>
        <CodeBlock code={renderPropsCode} language="tsx" title="FormValidator.tsx" />
        <CodeBlock code={usageCode} language="tsx" title="Usage" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Multiple Render Props</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          A component can expose multiple render props — a "slots" API. Each slot handles
          a different piece of the UI. This pattern is used by React Native's <code className="text-accent-400">FlatList</code> and
          headless libraries like Downshift.
        </p>
        <CodeBlock code={multipleSlotsCode} language="tsx" title="Slots API" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When Render Props Still Shine</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h4 className="text-accent-300 font-semibold mb-2">🎯 Headless UI Libraries</h4>
            <p className="text-sm text-surface-300">
              Downshift, React Aria, and TanStack Table use render props to ship behavior
              (a11y, keyboard handling, focus) without dictating markup.
            </p>
          </div>
          <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h4 className="text-accent-300 font-semibold mb-2">🎯 Drag & Drop / Animation</h4>
            <p className="text-sm text-surface-300">
              Libraries like react-beautiful-dnd and Framer Motion need to wrap JSX
              in boundary elements. Hook calls can't do that — render props can.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Modern Alternative: Custom Hooks</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          For pure data sharing, a custom hook is almost always clearer. No extra tree node,
          no callback closures, flat and debuggable.
        </p>
        <CodeBlock code={hookAlternativeCode} language="tsx" title="useGeolocation hook" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'No naming collisions — data passed as explicit function arguments',
            'Maximum flexibility — consumer controls the rendering entirely',
            'Great TypeScript inference with generics',
            'Perfect for headless libraries that cannot dictate markup',
          ]}
          cons={[
            'Callback pyramids — nesting multiple render props gets hard to read',
            'Re-render cost — fresh inline function on every parent render',
            'One more concept — contributors must learn that children can be functions',
            'Most use cases replaced by hooks in modern React',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Building headless UI libraries</li>
              <li>• The wrapper needs to own a subtree (drag-drop, animation)</li>
              <li>• Rendering needs to vary wildly between consumers</li>
              <li>• You need slots (renderItem, renderEmpty, renderHeader)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Only sharing data (use a custom hook)</li>
              <li>• Nesting multiple render-prop components (callback hell)</li>
              <li>• Every consumer renders the same thing (use regular props)</li>
              <li>• The wrapper only calls children(data) (make it a hook)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Visualization</h2>
        <p className="text-surface-400 mb-4">
          A single <code className="text-accent-400">DataProvider</code> owns the logic and passes its
          data through <code className="text-accent-400">children(data)</code>. The consumer is free to
          render it any way — a list, a card, or a chart — while the logic stays identical.
        </p>
        <Visualization
          title="Logic in, any UI out"
          caption="One render prop feeds many different renderings."
        >
          <RenderPropsViz />
        </Visualization>
      </section>
    </motion.div>
  )
}