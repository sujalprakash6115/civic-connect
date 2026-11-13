import { useState } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../utils/cn'

const CATS = ['All', 'Government hospitals', 'Police stations', 'Fire stations', 'Public toilets', 'Blood banks', 'Public libraries', 'Community halls', 'Government offices']

export default function Facilities() {
  const { facilities } = useStore()
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = facilities.filter((f) => {
    const matchCat = cat === 'All' || f.category === cat
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Nearby Public Facilities</h1>
        <p className="page-subtitle">Find hospitals, police stations, toilets and more around Pune (demo area)</p>
      </div>

      <input
        className="input"
        placeholder="Search facilities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium',
              cat === c ? 'bg-primary text-white' : 'bg-[var(--elevated)] text-[var(--text-secondary)]'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Map placeholder */}
      <Card className="h-48 flex items-center justify-center bg-[var(--elevated)]">
        <div className="text-center text-[var(--text-secondary)]">
          <MapPin className="h-10 w-10 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Interactive map (Leaflet + OpenStreetMap)</p>
          <p className="text-xs mt-1">Demo markers for Pune area · Attribution: © OpenStreetMap contributors</p>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((f) => (
          <Card key={f.id} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm">{f.name}</h3>
              <Badge status="neutral" className="mt-1">{f.category}</Badge>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {f.address}
              </p>
              {f.phone && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {f.phone}
                </p>
              )}
              {f.hours && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {f.hours}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-center text-[var(--text-secondary)]">
        Sample facility data for Pune demo area. Not live location data. Always verify before visiting.
      </p>
    </div>
  )
}
