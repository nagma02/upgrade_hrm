import React from 'react'
import Sidebar from '@/components/navigation/Sidebar'
import Header from '@/components/navigation/Header'
import { Outlet } from 'react-router-dom'

export default function AppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <div className="app-shell__main">
        <header className="header">
          <Header />
        </header>

        <main className="app-shell__content">{children ?? <Outlet />}</main>
      </div>
    </div>
  )
}
