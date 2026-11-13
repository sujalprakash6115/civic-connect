import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Link } from 'react-router-dom'
import { formatRelative } from '../../utils/format'
import { ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function DepartmentDashboard() {
  const { complaints, user } = useStore()
  const total = complaints.length
  const pending = complaints.filter((c) => ['submitted', 'under_review'].includes(c.status)).length
  const inProgress = complaints.filter((c) => ['assigned', 'in_progress'].includes(c.status)).length
  const resolved = complaints.filter((c) => c.status === 'resolved').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Department Overview</h1>
        <p className="page-subtitle">{user?.department || 'Municipal Department'} · {user?.name}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Assigned', value: total, icon: ClipboardList, color: 'text-primary' },
          { label: 'Pending Review', value: pending, icon: Clock, color: 'text-warning' },
          { label: 'In Progress', value: inProgress, icon: AlertCircle, color: 'text-info' },
          { label: 'Resolved', value: resolved, icon: CheckCircle, color: 'text-success' },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--elevated)] ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-[var(--text-secondary)]">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Recent Complaints Queue</CardTitle>
          <Link to="/department/queue" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {complaints.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              to={`/complaints/${c.id}`}
              className="flex items-center justify-between gap-3 rounded-button border border-[var(--border)] p-3 hover:border-primary/30"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{c.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{c.id} · {c.category} · {formatRelative(c.createdAt)}</p>
              </div>
              <Badge status={c.status} />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
