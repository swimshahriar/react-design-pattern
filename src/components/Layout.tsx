import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-surface-950">
      <Sidebar />
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="px-6 py-8 lg:py-12 lg:px-10 xl:px-16">
          <Outlet />
        </div>
      </main>
    </div>
  )
}