import { Outlet, Link } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { useStore } from '../store/useStore'
import { Moon, Sun, Bell, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '../utils/cn'

export function AppLayout() {
  const { theme, toggleTheme, notifications, user } = useStore()
  const unread = notifications.filter((n) => !n.read).length
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main content — margin tracks sidebar width on desktop */}
      <div
        className={cn(
          'min-h-screen transition-all duration-200 ease-in-out',
          // Desktop: offset by sidebar width
          collapsed ? 'lg:ml-[76px]' : 'lg:ml-[250px]',
          // Mobile: full width
          'ml-0'
        )}
      >
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-lg px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-button p-2 text-[var(--text-secondary)] hover:bg-[var(--elevated)] lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="text-sm text-[var(--text-secondary)] truncate">
              {user?.city || user?.department || 'CivicConnect'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-button p-2 text-[var(--text-secondary)] hover:bg-[var(--elevated)]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/notifications"
              className="relative rounded-button p-2 text-[var(--text-secondary)] hover:bg-[var(--elevated)]"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </Link>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8 max-w-[1600px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
