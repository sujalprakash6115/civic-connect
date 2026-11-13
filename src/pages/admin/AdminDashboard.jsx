import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Users, ClipboardList, Building2, Gift, FileText, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
  const { complaints, services, schemes, user } = useStore()

  const stats = [
    { label: 'Total Complaints', value: complaints.length, icon: ClipboardList },
    { label: 'Resolved', value: complaints.filter((c) => c.status === 'resolved').length, icon: CheckCircle },
    { label: 'Services', value: services.length, icon: FileText },
    { label: 'Schemes', value: schemes.length, icon: Gift },
    { label: 'Demo Users', value: 4, icon: Users },
    { label: 'Departments', value: 3, icon: Building2 },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Admin Overview</h1>
        <p className="page-subtitle">System administration · {user?.name}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[var(--text-secondary)]">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardTitle className="mb-3">System status</CardTitle>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Platform mode</span>
            <span className="text-success font-medium">Demo / Frontend only</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Data persistence</span>
            <span>localStorage</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Authentication</span>
            <span>Demo accounts (not real auth)</span>
          </div>
        </div>
      </Card>

      <div className="rounded-button border border-[var(--border)] bg-[var(--elevated)] p-4 text-xs text-[var(--text-secondary)]">
        This is a demonstration admin panel. No real user data is processed. All actions are local to this browser session.
      </div>
    </div>
  )
}
