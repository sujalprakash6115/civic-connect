import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { formatDate, formatRelative } from '../../utils/format'
import { Megaphone } from 'lucide-react'

export default function Announcements() {
  const { announcements } = useStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Public Announcements</h1>
        <p className="page-subtitle">Local notices, utility updates and community information</p>
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <Card key={a.id} className={a.important ? 'border-danger/30' : ''}>
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.important ? 'bg-danger/15 text-danger' : 'bg-primary/15 text-primary'}`}>
                <Megaphone className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge status={a.important ? 'danger' : 'info'}>{a.category}</Badge>
                  {a.important && <Badge status="danger">Important</Badge>}
                  <span className="text-xs text-[var(--text-secondary)]">{formatRelative(a.publishedAt)}</span>
                </div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{a.content}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--text-secondary)]">
                  <span>{a.location}</span>
                  <span>·</span>
                  <span>{a.source}</span>
                  <span>·</span>
                  <span>{formatDate(a.publishedAt)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-center text-[var(--text-secondary)]">
        Sample announcements for demonstration. Not official government notices.
      </p>
    </div>
  )
}
