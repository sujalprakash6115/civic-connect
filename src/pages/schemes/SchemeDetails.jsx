import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

export default function SchemeDetails() {
  const { id } = useParams()
  const { schemes } = useStore()
  const scheme = schemes.find((s) => s.id === id)

  if (!scheme) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Scheme not found</h2>
        <Link to="/schemes" className="btn-primary mt-4 inline-flex">Back to Schemes</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link to="/schemes" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Schemes
      </Link>

      <div className="flex gap-2 mb-2">
        <Badge status="primary">{scheme.type}</Badge>
        <Badge status="neutral">{scheme.category}</Badge>
        {scheme.state && <Badge status="info">{scheme.state}</Badge>}
      </div>
      <h1 className="text-2xl font-bold">{scheme.name}</h1>
      <p className="text-[var(--text-secondary)]">{scheme.description}</p>

      {scheme.benefits && (
        <Card className="border-success/30 bg-success/5">
          <p className="text-sm font-medium text-success">Benefits: {scheme.benefits}</p>
        </Card>
      )}

      <Card>
        <CardTitle className="mb-3">Eligibility</CardTitle>
        <p className="text-sm text-[var(--text-secondary)]">{scheme.eligibility}</p>
      </Card>

      <Card>
        <CardTitle className="mb-3">Required Documents</CardTitle>
        <ul className="space-y-2">
          {scheme.documents.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {d}
            </li>
          ))}
        </ul>
      </Card>

      {scheme.deadline && (
        <Card>
          <CardTitle className="mb-1 text-base">Application Deadline</CardTitle>
          <p className="text-sm">{scheme.deadline}</p>
        </Card>
      )}

      <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
        <Button>Official Portal <ExternalLink className="h-4 w-4" /></Button>
      </a>

      <div className="rounded-button border border-warning/30 bg-warning/10 p-4 text-xs text-warning">
        <strong>Disclaimer:</strong> This is illustrative information. CivicConnect does not process scheme applications.
        Eligibility is never guaranteed. Apply only through official government channels.
      </div>
    </div>
  )
}
