import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { formatDate, formatRelative } from '../../utils/format'

export default function TrackComplaint() {
  const [ref, setRef] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)
  const { getComplaint } = useStore()
  const navigate = useNavigate()

  const handleTrack = (e) => {
    e.preventDefault()
    const c = getComplaint(ref.trim().toUpperCase())
    setResult(c || null)
    setSearched(true)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Track Complaint</h1>
        <p className="page-subtitle">Enter your complaint reference number to check status</p>
      </div>

      <Card>
        <form onSubmit={handleTrack} className="flex gap-3">
          <input
            className="input flex-1 font-mono"
            placeholder="e.g. CC-2026-000124"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            required
          />
          <Button type="submit">
            <Search className="h-4 w-4" /> Track
          </Button>
        </form>
      </Card>

      {searched && !result && (
        <Card className="text-center py-10">
          <p className="font-medium">No complaint found</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Please check the reference number and try again.
          </p>
        </Card>
      )}

      {result && (
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-mono text-sm text-[var(--text-secondary)]">{result.id}</p>
              <h2 className="text-lg font-semibold mt-1">{result.title}</h2>
            </div>
            <Badge status={result.status} />
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">Submitted</dt>
              <dd>{formatDate(result.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">Department</dt>
              <dd>{result.department || 'Pending assignment'}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">Category</dt>
              <dd>{result.category}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">Location</dt>
              <dd>{result.location?.city}</dd>
            </div>
          </dl>

          <h3 className="font-semibold text-sm mb-3">Timeline</h3>
          <div className="space-y-3 mb-6">
            {(result.timeline || []).map((t, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <Badge status={t.status} />
                <div>
                  <p>{t.note}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{formatRelative(t.at)}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="secondary" onClick={() => navigate(`/complaints/${result.id}`)}>
            View full details
          </Button>
        </Card>
      )}

      <p className="text-xs text-center text-[var(--text-secondary)]">
        Public tracking does not reveal private citizen details. Demo data only.
      </p>
    </div>
  )
}
