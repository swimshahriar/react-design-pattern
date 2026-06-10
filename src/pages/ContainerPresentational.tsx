import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import BeforeAfter from '../components/BeforeAfter'
import ProsCons from '../components/ProsCons'
import { DogImages, useDogImages } from '../patterns/container-presentational/DogImages'
import Visualization from '../components/Visualization'
import ContainerPresentationalViz from '../components/visualizations/ContainerPresentationalViz'

const containerCode = `// Container Component: handles data fetching
export default class DogImagesContainer extends React.Component {
  state = { dogs: [] }

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => this.setState({ dogs: message }))
  }

  render() {
    return <DogImages dogs={this.state.dogs} />
  }
}`

const presentationalCode = `// Presentational Component: handles rendering only
export function DogImages({ dogs, loading }) {
  if (loading) return <Skeleton />
  return dogs.map((dog, i) =>
    <DogCard key={i} name={dog.name} breed={dog.breed} />
  )
}`

const hookVersionCode = `// Modern alternative: custom hook replaces the container
export function useDogImages() {
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => {
        setDogs(message)
        setLoading(false)
      })
  }, [])

  return { dogs, loading }
}

// Now the component just uses the hook
export function DogImages() {
  const { dogs, loading } = useDogImages()
  if (loading) return <Skeleton />
  return dogs.map((dog, i) =>
    <img src={dog} key={i} alt="Dog" />
  )
}`

function DogImagesDemo() {
  const { dogs, loading } = useDogImages()
  return <DogImages dogs={dogs} loading={loading} />
}

const beforeCode = `// Without separation: everything in one component
class DogImages extends React.Component {
  state = { dogs: [], loading: true }

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/3")
      .then(res => res.json())
      .then(({ message }) =>
        this.setState({ dogs: message, loading: false })
      )
  }

  render() {
    const { dogs, loading } = this.state

    if (loading) {
      return <div className="flex gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="w-32 h-32 rounded-lg bg-gray-200 animate-pulse" />
        ))}
      </div>
    }

    return <div className="flex gap-4">
      {dogs.map((dog, i) => (
        <img key={i} src={dog} alt="Dog" className="w-32 h-32 rounded-lg object-cover" />
      ))}
    </div>
  }
}
// Problem: data fetching + rendering + loading state
// all tangled together. Can't reuse the display logic.`

const afterCode = `// With Container/Presentational separation:
// Presentational: pure, testable, reusable
function DogImages({ dogs, loading }) {
  if (loading) return <Skeleton />
  return dogs.map((dog, i) =>
    <img key={i} src={dog} alt="Dog" />
  )
}

// Container: handles data, passes to presentational
function DogImagesContainer() {
  const { dogs, loading } = useDogImages()
  return <DogImages dogs={dogs} loading={loading} />
}

// Even better — just use the hook directly:
function DogImages() {
  const { dogs, loading } = useDogImages()
  if (loading) return <Skeleton />
  return dogs.map((dog, i) =>
    <img key={i} src={dog} alt="Dog" />
  )
}
// Logic and view separated — but no extra wrapper component!`

export default function ContainerPresentational() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Container / Presentational 📦
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          Separate data-fetching logic from presentation. Container components know "how
          things work"; presentational components know "how things look."
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Idea</h2>
        <p className="text-surface-300 leading-relaxed">
          In the Container/Presentational pattern, you split your components into two roles:
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
            <h4 className="text-blue-400 font-semibold mb-2">Container (Smart)</h4>
            <ul className="space-y-1 text-sm text-surface-300">
              <li>• Fetches and manages data</li>
              <li>• Contains business logic</li>
              <li>• Passes data to presentational components</li>
              <li>• Rarely has its own styling</li>
            </ul>
          </div>
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
            <h4 className="text-cyan-400 font-semibold mb-2">Presentational (Dumb)</h4>
            <ul className="space-y-1 text-sm text-surface-300">
              <li>• Receives data via props</li>
              <li>• Focuses on rendering and styling</li>
              <li>• Usually stateless (or minimal UI state)</li>
              <li>• Easily reusable and testable</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo</h2>
        <p className="text-surface-400 mb-4">
          <code className="text-accent-400">DogImages</code> is the presentational component (renders dogs).
          <code className="text-accent-400">useDogImages</code> is the data hook (fetches dogs).
        </p>
        <LiveExample title="Container/Presentational Pattern" description="Data fetching separated from rendering">
          <DogImagesDemo />
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Implementation</h2>
        <CodeBlock code={presentationalCode} language="tsx" title="DogImages.tsx (Presentational)" />
        <CodeBlock code={containerCode} language="tsx" title="DogImagesContainer.tsx (Container)" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Before vs After</h2>
        <BeforeAfter beforeCode={beforeCode} afterCode={afterCode} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Modern Alternative: Custom Hooks</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          In modern React, custom hooks often replace container components entirely. The hook handles
          data fetching, the component handles rendering — same separation, less boilerplate.
        </p>
        <CodeBlock code={hookVersionCode} language="tsx" title="useDogImages hook" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Enforces separation of concerns — data vs view',
            'Presentational components are pure functions — easy to test',
            'Easily reusable — just pass different props',
            'Designers can modify presentational components without touching logic',
          ]}
          cons={[
            'Hooks make the pattern largely unnecessary in modern React',
            'Can be overkill in smaller applications',
            'Container components add an extra layer of indirection',
            'Class-based containers are obsolete — use hooks instead',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• You need clear separation of data logic from UI</li>
              <li>• Working with a team where designers handle presentational components</li>
              <li>• Testing presentational components in isolation</li>
              <li>• Building a component library with control and display variants</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• A custom hook can replace the container (most cases)</li>
              <li>• The app is small and the pattern adds overhead</li>
              <li>• You're using class components (use hooks instead)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Visualization</h2>
        <p className="text-surface-400 mb-4">
          The <code className="text-accent-400">Container</code> fetches the data, then hands it to the{' '}
          <code className="text-accent-400">Presentational</code> component through props. One worries
          about <em>how things work</em>, the other about <em>how things look</em>.
        </p>
        <Visualization
          title="Data in, view out"
          caption="Fetching is separated from rendering."
        >
          <ContainerPresentationalViz />
        </Visualization>
      </section>
    </motion.div>
  )
}