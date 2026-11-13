import { Link } from 'react-router-dom'
import {
  FileWarning, CheckCircle, Clock, AlertCircle, Building2, Gift,
  MapPin, Search, Bell, ArrowRight, Plus
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { getGreeting, formatDate, formatRelative } from '../../utils/format'

export default function Dashboard() {
  const { user, getMyComplaints, announcements, schemes, notifications } = useStore()
  const complaints = getMyComplaints()
  const resolved = complaints.filter((c) => c.status === 'resolved').length
  const pending = complaints.filter((c) => !['resolved', 'rejected'].includes(c.status)).length
  const inProgress = complaints.filter((c) => c.status === 'in_progress').length
  const unread = notifications.filter((n) => !n.read).length

  const quickActions = [
    { to: '/report-issue', icon: FileWarning, label: 'Report a Problem', color: 'text-danger' },
    { to: '/services', icon: Building2, label: 'Find a Service', color: 'text-info' },
    { to: '/track-complaint', icon: Search, label: 'Track Complaint', color: 'text-primary' },
    { to: '/schemes', icon: Gift, label: 'Discover Schemes', color: 'text-success' },
    { to: '/facilities', icon: MapPin, label: 'Nearby Facilities', color: 'text-warning' },
    { to: '/notifications', icon: Bell, label: 'Notifications', color: 'text-primary' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Citizen'}
          </h1>
          <p className="page-subtitle">
            {user?.ward || user?.city || 'Pune'}, {formatDate(new Date(), 'EEEE, dd MMMM yyyy')}
          </p>
        </div>
        <Link to="/report-issue">
          <Button>
            <Plus className="h-4 w-4" /> Report an Issue
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Complaints', value: complaints.length, icon: FileWarning, color: 'text-primary' },
          { label: 'Resolved', value: resolved, icon: CheckCircle, color: 'text-success' },
          { label: 'Pending', value: pending, icon: Clock, color: 'text-warning' },
          { label: 'In Progress', value: inProgress, icon: AlertCircle, color: 'text-info' },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--elevated)] ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[var(--text-secondary)]">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <CardTitle className="mb-4">Quick Actions</CardTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="flex flex-col items-center gap-2 rounded-button border border-[var(--border)] bg-[var(--elevated)] p-4 text-center hover:border-primary/40 transition-colors"
            >
              <a.icon className={`h-6 w-6 ${a.color}`} />
              <span className="text-xs font-medium">{a.label}</span>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent complaints */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>My Recent Complaints</CardTitle>
            <Link to="/my-complaints" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {complaints.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)] py-8 text-center">
              No complaints yet.{' '}
              <Link to="/report-issue" className="text-primary hover:underline">Report your first issue</Link>
            </p>
          ) : (
            <div className="space-y-3">
              {complaints.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  to={`/complaints/${c.id}`}
                  className="flex items-start justify-between gap-3 rounded-button border border-[var(--border)] p-3 hover:border-primary/30 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{c.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {c.id} · {formatRelative(c.createdAt)}
                    </p>
                  </div>
                  <Badge status={c.status} />
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Announcements */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Important Announcements</CardTitle>
            <Link to="/announcements" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="rounded-button border border-[var(--border)] p-3"
              >
                <div className="flex items-start gap-2">
                  {a.important && (
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-danger shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{a.content}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{formatRelative(a.publishedAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommended schemes */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Recommended Schemes</CardTitle>
          <Link to="/schemes" className="text-sm text-primary hover:underline flex items-center gap-1">
            Explore all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.slice(0, 3).map((s) => (
            <Link
              key={s.id}
              to={`/schemes/${s.id}`}
              className="rounded-button border border-[var(--border)] p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge status="info">{s.type}</Badge>
                <span className="text-xs text-[var(--text-secondary)]">{s.category}</span>
              </div>
              <h4 className="font-medium text-sm">{s.name}</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">{s.description}</p>
            </Link>
          ))}
        </div>
      </Card>

      {unread > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">You have {unread} unread notification{unread > 1 ? 's' : ''}</p>
                <p className="text-xs text-[var(--text-secondary)]">Stay updated on your complaints and announcements</p>
              </div>
            </div>
            <Link to="/notifications">
              <Button size="sm" variant="secondary">View</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
