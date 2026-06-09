import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import LiveExample from '../components/LiveExample'
import ProsCons from '../components/ProsCons'
import { EventEmitterDemo } from '../patterns/observer/EventEmitter'

const eventEmitterCode = `// Classic EventEmitter class
class EventEmitter {
  private events: Map<string, Set<Function>> = new Map()

  subscribe(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback)
    // Return unsubscribe function
    return () => this.events.get(event)?.delete(callback)
  }

  emit(event: string, ...args: unknown[]) {
    this.events.get(event)?.forEach((cb) => cb(...args))
  }
}

// Create a global instance
const globalEmitter = new EventEmitter()`

const reactIntegrationCode = `// React hooks wrapping the EventEmitter
function useEventSubscription(event: string, callback: (msg: string) => void) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback  // always up-to-date

  useEffect(() => {
    // Subscribe on mount, unsubscribe on unmount
    return globalEmitter.subscribe(event, (...args) => {
      callbackRef.current(...args)
    })
  }, [event])
}

function useEventEmit() {
  return (event: string, ...args: unknown[]) =>
    globalEmitter.emit(event, ...args)
}

// Usage: Subscribe to events
function ChatMessageList() {
  const [messages, setMessages] = useState<string[]>([])

  useEventSubscription('chat:message', (msg) => {
    setMessages(prev => [...prev, msg])
  })

  return messages.map((msg, i) => <div key={i}>{msg}</div>)
}

// Usage: Emit events
function ChatInput() {
  const [input, setInput] = useState('')
  const emit = useEventEmit()

  const send = () => {
    emit('chat:message', input)
    setInput('')
  }

  return <input value={input} onChange={e => setInput(e.target.value)} />
}`

const pubSubCode = `// Alternative: State-based pub/sub with useSyncExternalStore
// (Better for server rendering and concurrent mode)

import { useSyncExternalStore } from 'react'

class Store<T> {
  private subscribers = new Set<() => void>()
  private state: T

  constructor(initialState: T) {
    this.state = initialState
  }

  subscribe = (callback: () => void) => {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  getSnapshot = () => this.state

  setState(updater: (prev: T) => T) {
    this.state = updater(this.state)
    this.subscribers.forEach(cb => cb())
  }
}

// Usage in React
function useStore<T>(store: Store<T>) {
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}

// Components subscribe to the store directly —
// no Context needed, no Provider nesting.`

const alternativeCode = `// Modern alternatives to manual EventEmitter:

// 1. Zustand — external store with React bindings
import { create } from 'zustand'
const useChatStore = create((set) => ({
  messages: [],
  addMessage: (msg) => set((s) => ({
    messages: [...s.messages, msg]
  })),
}))

// 2. useSyncExternalStore — built into React 18
// (shown above)

// 3. Custom event dispatching on window
window.dispatchEvent(
  new CustomEvent('chat:message', { detail: msg })
)
window.addEventListener('chat:message', handler)

// 4. State management libraries (Redux, Jotai, Recoil)
// These all implement some form of the observer pattern internally.`

export default function ObserverPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-4">
          Design Pattern
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Observer Pattern 📡
        </h1>
        <p className="text-lg text-surface-400 leading-relaxed max-w-2xl">
          Decouple producers from consumers with a pub/sub event bus.
          Components subscribe to events and react independently — no direct
          connections needed.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">The Concept</h2>
        <p className="text-surface-300 leading-relaxed">
          The Observer pattern defines a one-to-many dependency: when one object
          (the subject) changes state, all its dependents (observers) are notified
          and updated automatically. In React, we often implement this through an
          event emitter that components can subscribe to without knowing about
          each other.
        </p>
        <div className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h4 className="text-cyan-400 font-semibold mb-2">The Flow</h4>
          <div className="flex items-center gap-3 text-sm text-surface-300 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono">Emitter</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-lg bg-surface-800 text-surface-300">event</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono">EventBus</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-lg bg-surface-800 text-surface-300">notify</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono">Subscribers</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Demo</h2>
        <p className="text-surface-400 mb-4">
          Type a message and send it. The EventEmitter notifies all subscribers.
          Open multiple browser tabs — events stay local in this demo,
          but the pattern extends naturally to cross-component communication.
        </p>
        <LiveExample title="EventEmitter Chat" description="Type and send messages through the event bus">
          <EventEmitterDemo />
        </LiveExample>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Core Implementation</h2>
        <CodeBlock code={eventEmitterCode} language="tsx" title="EventEmitter.ts" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">React Integration</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          The key insight: wrap the EventEmitter in custom hooks. Use <code className="text-accent-400">useRef</code> to
          always reference the latest callback, and <code className="text-accent-400">useEffect</code> for
          automatic subscribe/unsubscribe.
        </p>
        <CodeBlock code={reactIntegrationCode} language="tsx" title="useEventSubscription & useEventEmit" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Modern Alternative: useSyncExternalStore</h2>
        <p className="text-surface-300 leading-relaxed mb-4">
          React 18's <code className="text-accent-400">useSyncExternalStore</code> gives you
          a first-class way to subscribe to external stores. It handles server rendering,
          concurrent mode, and tearing — concerns that manual EventEmitter doesn't address.
        </p>
        <CodeBlock code={pubSubCode} language="tsx" title="Store with useSyncExternalStore" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Other Alternatives</h2>
        <CodeBlock code={alternativeCode} language="tsx" title="Modern alternatives" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
        <ProsCons
          pros={[
            'Complete decoupling — components communicate without direct references',
            'Scalable for cross-component communication across the app',
            'Easy to add new subscribers without modifying existing code',
            'Can communicate across completely different component trees',
            'Familiar pattern from other ecosystems (Node.js EventEmitter, etc.)',
          ]}
          cons={[
            'Implicit data flow — hard to trace where events come from',
            'Memory leaks if subscriptions are not cleaned up properly',
            'No TypeScript type safety on event names by default',
            'Manual implementation is not concurrent-mode safe',
            'Better alternatives exist for most React use cases (Zustand, Context)',
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <h3 className="text-green-400 font-semibold mb-2">✅ Use when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• Cross-component communication without prop drilling</li>
              <li>• Event-driven architectures (notifications, analytics)</li>
              <li>• Integrating with non-React libraries that use events</li>
              <li>• Decoupling systems that should not know about each other</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="text-red-400 font-semibold mb-2">❌ Avoid when</h3>
            <ul className="space-y-1.5 text-sm text-surface-300">
              <li>• React state + Context can handle it (most cases)</li>
              <li>• You need time-travel debugging (use Redux/Zustand)</li>
              <li>• Components have a clear parent-child relationship (use props/callbacks)</li>
              <li>• You need type-safe state management (use Zustand)</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  )
}