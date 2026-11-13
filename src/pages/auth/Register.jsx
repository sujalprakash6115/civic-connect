import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { toast } from 'sonner'

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    pincode: '',
    ward: '',
    language: 'en',
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useStore()
  const navigate = useNavigate()

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Mobile number is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Enter valid 10-digit Indian mobile'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.pincode) e.pincode = 'PIN code is required'
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit PIN'
    if (!form.terms) e.terms = 'You must accept the terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const result = register(form)
    setLoading(false)
    if (result.success) {
      toast.success('Account created successfully!')
      navigate('/dashboard')
    }
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthLabel = ['', 'Weak', 'Medium', 'Strong'][strength]
  const strengthColor = ['', 'bg-danger', 'bg-warning', 'bg-success'][strength]

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Join CivicConnect and start making a difference
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full name" name="fullName" value={form.fullName} onChange={update('fullName')} error={errors.fullName} required placeholder="Priya Sharma" />
            <Input label="Email address" type="email" name="email" value={form.email} onChange={update('email')} error={errors.email} required placeholder="you@example.com" />
            <Input label="Mobile number" name="phone" value={form.phone} onChange={update('phone')} error={errors.phone} required placeholder="9876543210" />
            
            <div>
              <Input label="Password" type="password" name="password" value={form.password} onChange={update('password')} error={errors.password} required />
              {form.password && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--elevated)] overflow-hidden">
                    <div className={`h-full transition-all ${strengthColor}`} style={{ width: `${strength * 33.3}%` }} />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">{strengthLabel}</span>
                </div>
              )}
            </div>
            <Input label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={update('confirmPassword')} error={errors.confirmPassword} required />

            <div className="grid grid-cols-2 gap-3">
              <Select label="State" name="state" value={form.state} onChange={update('state')}>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Delhi</option>
                <option>Gujarat</option>
                <option>Tamil Nadu</option>
              </Select>
              <Input label="District" name="district" value={form.district} onChange={update('district')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" name="city" value={form.city} onChange={update('city')} />
              <Input label="PIN code" name="pincode" value={form.pincode} onChange={update('pincode')} error={errors.pincode} required placeholder="411001" />
            </div>
            <Input label="Ward / Locality" name="ward" value={form.ward} onChange={update('ward')} placeholder="Ward 12 - Kothrud" />

            <Select label="Preferred language" name="language" value={form.language} onChange={update('language')}>
              <option value="en">English</option>
              <option value="mr">Marathi</option>
              <option value="hi">Hindi</option>
            </Select>

            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.terms} onChange={update('terms')} className="mt-1 rounded" />
              <span className="text-[var(--text-secondary)]">
                I agree to the Terms of Service and Privacy Policy. I understand this is a demo platform and not an official government service.
              </span>
            </label>
            {errors.terms && <p className="text-xs text-danger">{errors.terms}</p>}

            <Button type="submit" className="w-full" loading={loading}>
              Create account
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
