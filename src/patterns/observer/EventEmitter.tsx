import { useEffect, useRef, useState } from 'react'

type EventCallback = (...args: unknown[]) => void

class EventEmitter {
  private events: Map<string, Set<EventCallback>> = new Map()

  subscribe(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback)
    return () => this.events.get(event)?.delete(callback)
  }

  emit(event: string, ...args: unknown[]) {
    this.events.get(event)?.forEach((cb) => cb(...args))
  }
}

const globalEmitter = new EventEmitter()

export function useEventSubscription(event: string, callback: EventCallback) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const unsubscribe = globalEmitter.subscribe(event, (...args) => callbackRef.current(...args))
    return () => { unsubscribe() }
  }, [event])
}

export function useEventEmit() {
  return (event: string, ...args: unknown[]) => globalEmitter.emit(event, ...args)
}

export function EventEmitterDemo() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const emit = useEventEmit()

  useEventSubscription('chat:message', (msg: unknown) => {
    setMessages((prev) => [...prev, msg as string])
  })

  const sendMessage = () => {
    if (!input.trim()) return
    emit('chat:message', input)
    setInput('')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm text-surface-500 italic">No messages yet. Send one!</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-sm text-surface-300">
            {msg}
          </div>
        ))}
      </div>
    </div>
  )
}

export { EventEmitter }