import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileWarning, ClipboardList, Search, MapPin, Users,
  Building2, Gift, Megaphone, AlertTriangle, FolderOpen, Bell, User,
  Settings, LogOut, ChevronLeft, ChevronRight, HelpCircle, Calendar,
  BarChart3, Shield, Layers, FileText, Activity, X
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../utils/cn'

const citizenLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/report-issue', icon: FileWarning, label: 'Report an Issue' },
  { to: '/my-complaints', icon: ClipboardList, label: 'My Complaints' },
  { to: '/track-complaint', icon: Search, label: 'Track Complaint' },
  { to: '/facilities', icon: MapPin, label: 'Nearby Facilities' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/services', icon: Building2, label: 'Government Services' },
  { to: '/schemes', icon: Gift, label: 'Schemes & Benefits' },
  { to: '/announcements', icon: Megaphone, label: 'Announcements' },
  { to: '/emergency', icon: AlertTriangle, label: 'Emergency Help' },
  { to: '/documents', icon: FolderOpen, label: 'My Documents' },
  { to: '/reminders', icon: Calendar, label: 'Reminders' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/profile', icon: User, label: 'Profile & Settings' },
]

const departmentLinks = [
  { to: '/department', icon: LayoutDashboard, label: 'Overview' },
  { to: '/department/queue', icon: ClipboardList, label: 'Complaint Queue' },
  { to: '/department/assignments', icon: Layers, label: 'Assignments' },
  { to: '/department/workspace', icon: FileText, label: 'Officer Workspace' },
  { to: '/department/reports', icon: BarChart3, label: 'Reports' },
]

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/departments', icon: Building2, label: 'Departments' },
  { to: '/admin/complaints', icon: ClipboardList, label: 'Complaints' },
  { to: '/admin/categories', icon: Layers, label: 'Categories' },
  { to: '/admin/services', icon: FileText, label: 'Services' },
  { to: '/admin/schemes', icon: Gift, label: 'Schemes' },
  { to: '/admin/announcements', icon: Megaphone, label: 'Announcements' },
  { to: '/admin/analytics', icon: Activity, label: 'Analytics' },
  { to: '/admin/audit', icon: Shield, label: 'Audit Logs' },
  { to: '/admin/settings', icon: Settings, label: 'System Settings' },
]

export function Sidebar({ collapsed = false, onToggleCollapse, mobileOpen = false, onCloseMobile }) {
  const { user, logout } = useStore()
  const navigate = useNavigate()

  if (!user) return null

  let links = citizenLinks
  if (user.role === 'officer' || user.role === 'department_admin') links = departmentLinks
  if (user.role === 'admin') links = adminLinks

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleNavClick = () => {
    // Close mobile drawer after navigation
    if (onCloseMobile) onCloseMobile()
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[var(--border)] bg-[var(--sidebar)] transition-all duration-200 ease-in-out',
        // Desktop width
        collapsed ? 'lg:w-[76px]' : 'lg:w-[250px]',
        // Mobile: drawer — hidden off-screen unless open
        'w-[250px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Header */}
      <div className="flex h-[68px] items-center justify-between border-b border-[var(--border)] px-3 shrink-0">
        {(!collapsed || mobileOpen) && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="font-bold text-sm truncate">CivicConnect</span>
          </div>
        )}
        {collapsed && !mobileOpen && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--elevated)] shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        {/* Mobile close */}
        <button
          onClick={onCloseMobile}
          className="flex lg:hidden rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--elevated)]"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/dashboard' || l.to === '/department' || l.to === '/admin'}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'sidebar-link',
                isActive && 'active',
                collapsed && !mobileOpen && 'justify-center px-0'
              )
            }
            title={collapsed && !mobileOpen ? l.label : undefined}
          >
            <l.icon className="h-5 w-5 shrink-0" />
            {(!collapsed || mobileOpen) && <span className="truncate">{l.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--border)] p-3 space-y-1 shrink-0">
        {(!collapsed || mobileOpen) && (
          <div className="mb-2 px-2">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-[var(--text-secondary)] capitalize">
              {user.role?.replace('_', ' ')}
            </p>
          </div>
        )}
        <NavLink
          to="/help"
          onClick={handleNavClick}
          className={({ isActive }) =>
            cn('sidebar-link', isActive && 'active', collapsed && !mobileOpen && 'justify-center px-0')
          }
          title={collapsed && !mobileOpen ? 'Help & Support' : undefined}
        >
          <HelpCircle className="h-5 w-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Help & Support</span>}
        </NavLink>
        <button
          onClick={handleLogout}
          className={cn(
            'sidebar-link w-full text-danger hover:text-danger',
            collapsed && !mobileOpen && 'justify-center px-0'
          )}
          title={collapsed && !mobileOpen ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
