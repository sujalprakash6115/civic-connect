import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Input, Select } from '../../components/ui/Input'
import { EmptyState } from '../../components/ui/EmptyState'
import { ClipboardList } from 'lucide-react'
import { formatDate, formatRelative } from '../../utils/format'

export default function MyComplaints() {
  const { getMyComplaints } = useStore()
  const complaints = getMyComplaints()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = complaints.filter((c) => {
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">My Complaints</h1>
        <p className="page-subtitle">Track and manage all your reported issues</p>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
            <input
              className="input pl-10"
              placeholder="Search by ID, title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-48">
            <option value="all">All statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No complaints found"
            description={complaints.length === 0 ? "You haven't reported any issues yet." : 'Try adjusting your filters.'}
            action={
              complaints.length === 0 && (
                <Link to="/report-issue" className="btn-primary">Report an Issue</Link>
              )
            }
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to={`/complaints/${c.id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-button border border-[var(--border)] p-4 hover:border-primary/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[var(--text-secondary)]">{c.id}</span>
                    <Badge status={c.status} />
                    <Badge status={c.priority} />
                  </div>
                  <h3 className="font-medium text-sm truncate">{c.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {c.category} · {c.location?.locality || c.location?.city} · {formatRelative(c.createdAt)}
                  </p>
                </div>
                <div className="text-xs text-[var(--text-secondary)] shrink-0">
                  {formatDate(c.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
