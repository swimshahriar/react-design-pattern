import { Link, useLocation } from 'react-router-dom'
import { patterns } from '../data/patterns'
import { useState } from 'react'
import { Menu, X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Sidebar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    ...patterns.map((p) => ({
      path: p.slug,
      label: p.title,
      icon: p.icon,
    })),
  ]

  const sidebar = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                : 'text-surface-400 hover:text-white hover:bg-surface-800 border border-transparent'
            }`}
          >
            <span className="text-base shrink-0">{item.icon}</span>
            <span className={`truncate transition-all duration-200 ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      <aside className={`hidden lg:flex ${collapsed ? 'w-16' : 'w-64'} shrink-0 flex-col border-r border-surface-800 bg-surface-950/50 h-screen sticky top-0 overflow-y-auto overflow-x-hidden transition-all duration-300`}>
        <div className="flex items-center justify-between px-3 py-6">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <BookOpen className="w-6 h-6 text-accent-400 shrink-0" />
            <span className={`text-lg font-bold gradient-text whitespace-nowrap transition-all duration-300 ${collapsed ? 'lg:opacity-0 lg:w-0' : 'lg:opacity-100'}`}>
              React Patterns
            </span>
          </Link>
        </div>
        <div className="flex-1 px-3">
          {sidebar}
        </div>
        <div className="px-3 py-3 border-t border-surface-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-lg text-surface-500 hover:text-white hover:bg-surface-800 transition-all cursor-pointer"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            <span className={`ml-2 text-sm transition-all duration-300 ${collapsed ? 'lg:hidden' : ''}`}>
              {collapsed ? 'Expand' : 'Collapse'}
            </span>
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface-950/95 backdrop-blur border-b border-surface-800 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-400" />
          <span className="font-bold gradient-text text-sm">React Patterns</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-surface-400 hover:text-white transition-colors cursor-pointer"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-surface-950/95 backdrop-blur pt-16 overflow-y-auto px-4 py-6">
          {sidebar}
        </div>
      )}
    </>
  )
}