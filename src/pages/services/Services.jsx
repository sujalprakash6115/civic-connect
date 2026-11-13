import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../utils/cn'

const CATS = [
  'All',
  'IDENTITY AND DOCUMENTS',
  'EDUCATION',
  'HEALTH',
  'EMPLOYMENT',
  'HOUSING',
  'MUNICIPAL SERVICES',
  'TRANSPORT',
  'WELFARE',
]

export default function Services() {
  const { services, savedServices, toggleSaveService } = useStore()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = services.filter((s) => {
    const matchCat = cat === 'All' || s.category === cat
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Government Services</h1>
        <p className="page-subtitle">
          Browse and get guidance on public services. Always verify on official portals.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
          <input
            className="input pl-10"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              cat === c
                ? 'bg-primary text-white'
                : 'bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {c === 'All' ? 'All' : c.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const saved = savedServices.includes(s.id)
          return (
            <Card key={s.id} className="flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <Badge status="info">{s.category.split(' ')[0]}</Badge>
                <button
                  onClick={() => toggleSaveService(s.id)}
                  className="text-[var(--text-secondary)] hover:text-primary"
                  aria-label={saved ? 'Unsave' : 'Save'}
                >
                  {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2 flex-1">{s.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>{s.processTime}</span>
                <Link to={`/services/${s.id}`} className="text-primary font-medium hover:underline">
                  View details →
                </Link>
              </div>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-secondary)] py-12">No services match your search.</p>
      )}

      <p className="text-xs text-center text-[var(--text-secondary)]">
        Sample data for demonstration. Fees, eligibility and process times are illustrative. Always confirm on official government websites.
      </p>
    </div>
  )
}
