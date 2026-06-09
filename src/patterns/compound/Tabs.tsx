import { createContext, useContext, useState, type ReactNode } from 'react'

const TabsContext = createContext<{
  activeTab: string
  setActiveTab: (id: string) => void
} | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>')
  return ctx
}

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="flex border-b border-surface-700 mb-4">
      {children}
    </div>
  )
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === id

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium transition-all cursor-pointer border-b-2 -mb-px ${
        isActive
          ? 'border-accent-500 text-accent-300'
          : 'border-transparent text-surface-400 hover:text-white hover:border-surface-500'
      }`}
    >
      {children}
    </button>
  )
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab } = useTabsContext()
  if (activeTab !== id) return null

  return (
    <div className="py-3 text-sm text-surface-300 animate-[fadeIn_0.15s_ease-in]">
      {children}
    </div>
  )
}

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanel = TabPanel

export { Tabs }