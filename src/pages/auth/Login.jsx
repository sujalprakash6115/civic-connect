import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { toast } from 'sonner'

const DEMO_ACCOUNTS = [
  { email: 'citizen@civicconnect.demo', role: 'Citizen', password: 'demo123' },
  { email: 'officer@civicconnect.demo', role: 'Department Officer', password: 'demo123' },
  { email: 'department@civicconnect.demo', role: 'Department Admin', password: 'demo123' },
  { email: 'admin@civicconnect.demo', role: 'Super Admin', password: 'demo123' },
]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const result = login(email.trim(), password)
    setLoading(false)
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`)
      const role = result.user.role
      if (role === 'admin') navigate('/admin')
      else if (role === 'officer' || role === 'department_admin') navigate('/department')
      else navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  const quickLogin = (demoEmail) => {
    setEmail(demoEmail)
    setPassword('demo123')
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Sign in to your CivicConnect account
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPass ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-[38px] text-[var(--text-secondary)]"
                tabIndex={-1}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <div className="rounded-button bg-danger/10 border border-danger/20 px-3 py-2 text-sm text-danger">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[var(--border)]" />
                <span className="text-[var(--text-secondary)]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              <LogIn className="h-4 w-4" /> Sign in
            </Button>
          </form>
        </Card>

        <div className="mt-6">
          <p className="text-center text-xs text-[var(--text-secondary)] mb-3">
            Demo accounts (password: <code className="text-primary">demo123</code>)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.email}
                onClick={() => quickLogin(a.email)}
                className="rounded-button border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-xs hover:border-primary/40 transition-colors"
              >
                <div className="font-medium">{a.role}</div>
                <div className="text-[var(--text-secondary)] truncate">{a.email}</div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
