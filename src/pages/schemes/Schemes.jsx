import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bookmark, BookmarkCheck } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../utils/cn'

const CATS = ['All', 'Students', 'Farmers', 'Women', 'Senior citizens', 'Housing', 'Healthcare', 'Education']

export default function Schemes() {
  const { schemes, savedSchemes, toggleSaveScheme } = useStore()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = schemes.filter((s) => {
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
        <h1 className="page-title">Government Schemes & Benefits</h1>
        <p className="page-subtitle">Discover central and state schemes that may apply to you</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
        <input
          className="input pl-10"
          placeholder="Search schemes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              cat === c ? 'bg-primary text-white' : 'bg-[var(--elevated)] text-[var(--text-secondary)]'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((s) => {
          const saved = savedSchemes.includes(s.id)
          return (
            <Card key={s.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-2">
                  <Badge status="primary">{s.type}</Badge>
                  <Badge status="neutral">{s.category}</Badge>
                </div>
                <button onClick={() => toggleSaveScheme(s.id)} className="text-[var(--text-secondary)] hover:text-primary">
                  {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">{s.description}</p>
              {s.benefits && (
                <p className="text-xs text-success mt-2 font-medium">{s.benefits}</p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[var(--text-secondary)]">
                  {s.deadline ? `Deadline: ${s.deadline}` : 'Ongoing'}
                </span>
                <Link to={`/schemes/${s.id}`} className="text-sm text-primary font-medium hover:underline">
                  Details →
                </Link>
              </div>
            </Card>
          )
        })}
      </div>

      <p className="text-xs text-center text-[var(--text-secondary)]">
        Sample scheme data for demonstration. Eligibility is never guaranteed. Always verify on official portals.
      </p>
    </div>
  )
}
