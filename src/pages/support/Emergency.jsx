import { Phone, AlertTriangle, Heart, Shield, Flame, Baby } from 'lucide-react'
import { Card, CardTitle } from '../../components/ui/Card'

const contacts = [
  { name: 'Emergency Response', number: '112', icon: AlertTriangle, color: 'text-danger', desc: 'National emergency number' },
  { name: 'Ambulance', number: '108', icon: Heart, color: 'text-danger', desc: 'Medical emergency (availability varies by state)' },
  { name: 'Fire Services', number: '101', icon: Flame, color: 'text-warning', desc: 'Fire and rescue' },
  { name: 'Police', number: '100', icon: Shield, color: 'text-info', desc: 'Police emergency' },
  { name: 'Women Helpline', number: '181', icon: Heart, color: 'text-primary', desc: 'Where available' },
  { name: 'Child Helpline', number: '1098', icon: Baby, color: 'text-success', desc: 'Childline India' },
]

export default function Emergency() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="page-title">Emergency Help Center</h1>
        <p className="page-subtitle">Important contacts for emergencies in India</p>
      </div>

      <Card className="border-danger/30 bg-danger/5">
        <p className="text-sm">
          <strong>Important:</strong> CivicConnect is <em>not</em> an emergency response service.
          In a real emergency, call the official numbers below immediately. Do not rely on this app for life-threatening situations.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((c) => (
          <Card key={c.number} className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--elevated)] ${c.color}`}>
              <c.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-xs text-[var(--text-secondary)]">{c.desc}</p>
            </div>
            <a
              href={`tel:${c.number}`}
              className="flex items-center gap-1.5 rounded-button bg-primary px-3 py-2 text-sm font-bold text-white hover:bg-primary-hover"
            >
              <Phone className="h-4 w-4" /> {c.number}
            </a>
          </Card>
        ))}
      </div>

      <Card>
        <CardTitle className="mb-3">What to do in an emergency</CardTitle>
        <ol className="space-y-2 text-sm text-[var(--text-secondary)] list-decimal list-inside">
          <li>Stay calm and ensure your own safety first.</li>
          <li>Call the appropriate emergency number immediately.</li>
          <li>Provide clear location details and nature of emergency.</li>
          <li>Follow instructions from the emergency operator.</li>
          <li>Do not hang up until told to do so.</li>
        </ol>
      </Card>
    </div>
  )
}
