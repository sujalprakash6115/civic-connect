import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Link } from 'react-router-dom'
import { formatRelative } from '../../utils/format'
import { ThumbsUp, MapPin } from 'lucide-react'

export default function Community() {
  const { complaints } = useStore()
  // Show all non-anonymous as public community issues
  const publicIssues = complaints.filter((c) => !c.isAnonymous)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Community Issues</h1>
        <p className="page-subtitle">Explore civic issues reported by citizens in your area</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="text-center py-4">
          <div className="text-2xl font-bold text-primary">{publicIssues.length}</div>
          <div className="text-xs text-[var(--text-secondary)]">Public reports</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl font-bold text-success">{publicIssues.filter((c) => c.status === 'resolved').length}</div>
          <div className="text-xs text-[var(--text-secondary)]">Resolved</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl font-bold text-warning">{publicIssues.reduce((a, c) => a + (c.upvotes || 0), 0)}</div>
          <div className="text-xs text-[var(--text-secondary)]">Total upvotes</div>
        </Card>
      </div>

      <div className="space-y-3">
        {publicIssues.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge status={c.status} />
                  <Badge status={c.priority} />
                </div>
                <Link to={`/complaints/${c.id}`} className="font-medium hover:text-primary">
                  {c.title}
                </Link>
                <p className="text-xs text-[var(--text-secondary)] mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {c.location?.locality || c.location?.city} · {c.category} · {formatRelative(c.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)] shrink-0">
                <ThumbsUp className="h-4 w-4" /> {c.upvotes || 0}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-center text-[var(--text-secondary)]">
        Community reports are from demo data. Verified vs unverified is indicated in a production system.
      </p>
    </div>
  )
}
