import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import BeforeAfter from '../components/BeforeAfter'
import ProsCons from '../components/ProsCons'
import { Tabs } from '../patterns/compound/Tabs'
import Visualization from '../components/Visualization'
import CompoundViz from '../components/visualizations/CompoundViz'

const tabsCode = `const TabsContext = createContext<{
  activeTab: string
  setActiveTab: (id: string) => void
} | null>(null)

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }) {
  return <div className="tab-bar">{children}</div>
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  )
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext)
  if (activeTab !== id) return null
  return <div>{children}</div>
}

// Attach as sub-components
Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanel = TabPanel`

const usageCode = `// Consumer code — clean and declarative
<Tabs defaultTab="overview">
  <Tabs.TabList>
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="features">Features</Tabs.Tab>
    <Tabs.Tab id="pricing">Pricing</Tabs.Tab>
  </Tabs.TabList>

  <Tabs.TabPanel id="overview">
    <p>This is the overview content.</p>
  </Tabs.TabPanel>
  <Tabs.TabPanel id="features">
    <p>Feature list here.</p>
  </Tabs.TabPanel>
  <Tabs.TabPanel id="pricing">
    <p>Pricing details here.</p>
  </Tabs.TabPanel>
</Tabs>`

const beforeCode = `// Without compound pattern — all logic in one component
function ProductTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div>
      <div className="tab-bar">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "features" ? "active" : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "pricing" ? "active" : ""}
          onClick={() => setActiveTab("pricing")}
        >
          Pricing
        </button>
      </div>
      {activeTab === "overview" && <div>Overview content...</div>}
      {activeTab === "features" && <div>Features content...</div>}
      {activeTab === "pricing" && <div>Pricing content...</div>}
    </div>
  )
}
// Problem: Adding tabs means modifying this component.
// Can't customize Tab styling per usage. State is coupled to layout.`

const afterCode = `// With compound pattern — flexible composition
<Tabs defaultTab="overview">
  <Tabs.TabList>
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="features">Features</Tabs.Tab>
    <Tabs.Tab id="pricing">Pricing</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.TabPanel id="overview">Overview content...</Tabs.TabPanel>
  <Tabs.TabPanel id="features">Features content...</Tabs.TabPanel>
  <Tabs.TabPanel id="pricing">Pricing content...</Tabs.TabPanel>
</Tabs>

// Easy to extend — just add more tabs:
<Tabs.Tab id="faq">FAQ</Tabs.Tab>
<Tabs.TabPanel id="faq">FAQ content...</Tabs.TabPanel>

// State is managed by Tabs, consumed by Tab and TabPanel.
// Consumer decides WHICH tabs and panels to render.`

export default function CompoundPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-500/20 text-accent-300 border border-accent-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Compound Components 🧩
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          Build components that work together through shared state and context. The parent manages
          internal logic while consumers compose sub-components freely — like Lego blocks for UIs.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          Imagine building a tabbed interface. You could cram everything — which tab is active,
          which panel to show, click handlers — into one component with a dozen props. But then
          every customization requires a new prop, and the API becomes a mess.
          <strong className="text-white"> The compound pattern</strong> lets the parent component
          manage shared state (which tab is active) through Context, while giving consumers full
          control over composition and styling.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo</h2>
        <p className="text-surface-400 mb-4">
          Click the tabs below. All sub-components (<code className="text-accent-400">TabList</code>,{' '}
          <code className="text-accent-400">Tab</code>, <code className="text-accent-400">TabPanel</code>)
          share the <strong className="text-white">active tab state</strong> through Context —
          no prop drilling needed.
        </p>
        <LiveExample title="Compound Tabs" description="Click tabs to see shared state in action">
          <Tabs defaultTab="overview">
            <Tabs.TabList>
              <Tabs.Tab id="overview">Overview</Tabs.Tab>
              <Tabs.Tab id="features">Features</Tabs.Tab>
              <Tabs.Tab id="pricing">Pricing</Tabs.Tab>
            </Tabs.TabList>
            <Tabs.TabPanel id="overview">
              <div className="space-y-2">
                <p className="font-medium text-white">A flexible, composable tabs component</p>
                <p>Each sub-component reads shared state from Context. Click a tab — the panel updates automatically. No props passed between Tab and TabPanel.</p>
              </div>
            </Tabs.TabPanel>
            <Tabs.TabPanel id="features">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-accent-400">✓</span> Shared state via Context — no prop drilling</li>
                <li className="flex items-start gap-2"><span className="text-accent-400">✓</span> Consumer decides which tabs to render</li>
                <li className="flex items-start gap-2"><span className="text-accent-400">✓</span> Easy to add/remove tabs without touching internals</li>
                <li className="flex items-start gap-2"><span className="text-accent-400">✓</span> Used by Radix UI, Headless UI, and more</li>
              </ul>
            </Tabs.TabPanel>
            <Tabs.TabPanel id="pricing">
              <div className="space-y-2">
                <p className="font-medium text-white">Free and open source</p>
                <p>Compound components are a pattern, not a library. Use it anywhere you need composable, stateful sub-components.</p>
              </div>
            </Tabs.TabPanel>
          </Tabs>
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Implementation</h2>
        <CodeBlock code={tabsCode} language="tsx" title="Tabs.tsx" />
        <CodeBlock code={usageCode} language="tsx" title="Usage" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Before vs After</h2>
        <BeforeAfter beforeCode={beforeCode} afterCode={afterCode} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Shared state managed internally — no prop drilling needed',
            'Flexible composition — consumers choose which sub-components to render',
            'Clean API — just <Tabs.Tab /> instead of boolean props for each tab',
            'Great for component libraries (used by Radix UI, Headless UI)',
          ]}
          cons={[
            'Slightly more complex to implement — requires Context API',
            'React.Children.map limits nesting to direct children only',
            'May be overkill for simple components with few variations',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Components share implicit state (active tab, open/close, selected)</li>
              <li>• Building UI libraries with flexible APIs</li>
              <li>• Tabs, Accordion, Select, Dropdown, Menu components</li>
              <li>• You want consumers to compose freely</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Components are simple with few props</li>
              <li>• No shared state between sub-components</li>
              <li>• Only one rendering variant needed</li>
              <li>• You're wrapping a simple utility</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Modern Alternative</h2>
        <p className="text-surface-300 leading-relaxed">
          In React 18+, the compound pattern using Context remains a recommended approach.
          For headless UI libraries, consider <strong className="text-white">Radix UI</strong> or{' '}
          <strong className="text-white">Headless UI</strong> which use this pattern internally.
          To optimize re-renders, split context into separate providers for state and dispatch.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Visualization</h2>
        <p className="text-surface-400 mb-4">
          Watch the shared <code className="text-accent-400">active tab</code> state live in the{' '}
          <code className="text-accent-400">&lt;Tabs&gt;</code> parent and flow through Context to every
          sub-component — the matching <code className="text-accent-400">&lt;TabPanel&gt;</code> lights up,
          with no props passed between them.
        </p>
        <Visualization
          title="Compound state flow"
          caption="The parent owns the state; children read it from Context."
        >
          <CompoundViz />
        </Visualization>
      </section>
    </motion.div>
  )
}