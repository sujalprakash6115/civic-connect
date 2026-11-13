import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    toast.success('If this were a real system, a recovery link would be sent.')
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Enter your email to receive recovery instructions (demo)
          </p>
        </div>
        <Card>
          {sent ? (
            <div className="text-center py-4">
              <p className="font-medium">Check your inbox</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                This is a demo. No email was sent. Use the demo login accounts instead.
              </p>
              <Link to="/login" className="btn-primary mt-4 inline-flex">Back to login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email or phone" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
              <Button type="submit" className="w-full">Send recovery link</Button>
            </form>
          )}
        </Card>
        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="text-primary hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
