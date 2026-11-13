import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Clock, IndianRupee, FileText } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

export default function ServiceDetails() {
  const { id } = useParams()
  const { services } = useStore()
  const service = services.find((s) => s.id === id)

  if (!service) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Service not found</h2>
        <Link to="/services" className="btn-primary mt-4 inline-flex">Back to Services</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Services
      </Link>

      <div>
        <Badge status="info" className="mb-2">{service.category}</Badge>
        <h1 className="text-2xl font-bold">{service.name}</h1>
        <p className="mt-2 text-[var(--text-secondary)]">{service.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="text-center py-4">
          <Clock className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-xs text-[var(--text-secondary)]">Process time</p>
          <p className="text-sm font-medium">{service.processTime}</p>
        </Card>
        <Card className="text-center py-4">
          <IndianRupee className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-xs text-[var(--text-secondary)]">Fees</p>
          <p className="text-sm font-medium">{service.fees}</p>
        </Card>
        <Card className="text-center py-4">
          <FileText className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-xs text-[var(--text-secondary)]">Department</p>
          <p className="text-sm font-medium">{service.department}</p>
        </Card>
      </div>

      <Card>
        <CardTitle className="mb-3">Eligibility</CardTitle>
        <p className="text-sm text-[var(--text-secondary)]">{service.eligibility}</p>
      </Card>

      <Card>
        <CardTitle className="mb-3">Required Documents</CardTitle>
        <ul className="space-y-2">
          {service.documents.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {d}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle className="mb-3">Application Steps</CardTitle>
        <ol className="space-y-3">
          {service.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex flex-wrap gap-3">
        <a href={service.officialUrl} target="_blank" rel="noopener noreferrer">
          <Button>
            Official Portal <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>

      <div className="rounded-button border border-warning/30 bg-warning/10 p-4 text-xs text-warning">
        <strong>Disclaimer:</strong> CivicConnect provides guidance only. This is not an official application channel.
        Always apply through the official government portal or office. Information last verified: {service.lastVerified} (sample).
      </div>
    </div>
  )
}
