import { useStore } from '../../store/useStore'
import { Card, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Profile() {
  const { user, theme, setTheme, toggleTheme } = useStore()
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    language: user?.language || 'en',
  })

  const save = () => {
    toast.success('Profile updated (demo — changes are local)')
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Profile & Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      <Card>
        <CardTitle className="mb-4">Personal details</CardTitle>
        <div className="space-y-4">
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" value={user?.email || ''} disabled />
          <Input label="Mobile" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="City" value={user?.city || ''} disabled />
            <Input label="PIN code" value={user?.pincode || ''} disabled />
          </div>
          <Select label="Preferred language" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
            <option value="en">English</option>
            <option value="mr">Marathi</option>
            <option value="hi">Hindi</option>
          </Select>
          <Button onClick={save}>Save changes</Button>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Appearance</CardTitle>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Theme</p>
            <p className="text-xs text-[var(--text-secondary)]">Currently: {theme === 'dark' ? 'Dark' : 'Light'}</p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-2">Account</CardTitle>
        <p className="text-sm text-[var(--text-secondary)] mb-1">Role: <span className="capitalize">{user?.role?.replace('_', ' ')}</span></p>
        <p className="text-xs text-[var(--text-secondary)]">Demo account — not linked to any real government identity system.</p>
      </Card>
    </div>
  )
}
