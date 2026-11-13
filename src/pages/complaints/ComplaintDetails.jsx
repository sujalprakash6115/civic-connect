import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, User, Building2, MessageSquare } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatDate, formatRelative } from '../../utils/format'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ComplaintDetails() {
  const { id } = useParams()
  const { getComplaint, updateComplaint, user } = useStore()
  const complaint = getComplaint(id)
  const [comment, setComment] = useState('')

  if (!complaint) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Complaint not found</h2>
        <p className="text-[var(--text-secondary)] mt-2">The reference number may be invalid.</p>
        <Link to="/my-complaints" className="btn-primary mt-4 inline-flex">Back to My Complaints</Link>
      </div>
    )
  }

  const addComment = () => {
    if (!comment.trim()) return
    updateComplaint(complaint.id, {
      comments: [
        ...(complaint.comments || []),
        { id: `c${Date.now()}`, text: comment, by: user?.name || 'Citizen', at: new Date().toISOString() },
      ],
    })
    setComment('')
    toast.success('Comment added')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Link to="/my-complaints" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to My Complaints
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm text-[var(--text-secondary)]">{complaint.id}</span>
            <Badge status={complaint.status} />
            <Badge status={complaint.priority} />
          </div>
          <h1 className="text-2xl font-bold">{complaint.title}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {complaint.category} · {complaint.subcategory}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardTitle className="mb-3">Description</CardTitle>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{complaint.description}</p>
          </Card>

          {/* Timeline */}
          <Card>
            <CardTitle className="mb-4">Status Timeline</CardTitle>
            <div className="relative space-y-0">
              {(complaint.timeline || []).map((t, i) => (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full ${i === complaint.timeline.length - 1 ? 'bg-primary' : 'bg-success'}`} />
                    {i < complaint.timeline.length - 1 && <div className="w-px flex-1 bg-[var(--border)] mt-1" />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge status={t.status} />
                      <span className="text-xs text-[var(--text-secondary)]">{formatRelative(t.at)}</span>
                    </div>
                    <p className="text-sm mt-1">{t.note}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">by {t.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments */}
          <Card>
            <CardTitle className="mb-4">Comments & Updates</CardTitle>
            {(complaint.comments || []).length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">No comments yet.</p>
            ) : (
              <div className="space-y-3 mb-4">
                {complaint.comments.map((c) => (
                  <div key={c.id} className="rounded-button bg-[var(--elevated)] p-3">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-1">
                      <User className="h-3 w-3" /> {c.by} · {formatRelative(c.at)}
                    </div>
                    <p className="text-sm">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className="input flex-1"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addComment()}
              />
              <Button onClick={addComment} size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <Card>
            <CardTitle className="mb-3 text-base">Details</CardTitle>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-[var(--text-secondary)] text-xs">Reported</dt>
                <dd>{formatDate(complaint.createdAt, 'dd MMM yyyy, HH:mm')}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-secondary)] text-xs">Last updated</dt>
                <dd>{formatRelative(complaint.updatedAt)}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-secondary)] text-xs flex items-center gap-1"><Building2 className="h-3 w-3" /> Department</dt>
                <dd>{complaint.department || 'Not yet assigned'}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-secondary)] text-xs">Officer</dt>
                <dd>{complaint.assignedOfficer || '—'}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-secondary)] text-xs">Severity</dt>
                <dd className="capitalize">{complaint.severity}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardTitle className="mb-3 text-base flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Location
            </CardTitle>
            <div className="text-sm space-y-1 text-[var(--text-secondary)]">
              {complaint.location?.street && <p>{complaint.location.street}</p>}
              {complaint.location?.landmark && <p>{complaint.location.landmark}</p>}
              <p>{complaint.location?.locality || complaint.location?.ward}</p>
              <p>{complaint.location?.city}, {complaint.location?.pincode}</p>
              <p>{complaint.location?.state}</p>
            </div>
          </Card>

          <div className="rounded-button border border-[var(--border)] bg-[var(--elevated)] p-3 text-xs text-[var(--text-secondary)]">
            Demo reference only. Not an official government complaint number.
          </div>
        </div>
      </div>
    </div>
  )
}
