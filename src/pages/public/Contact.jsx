import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Textarea } from '../../components/ui/Input'
import { toast } from 'sonner'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message recorded (demo only — not sent)')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-[var(--text-secondary)]">Questions about this demo platform?</p>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" required placeholder="Your name" />
          <Input label="Email" type="email" required placeholder="you@example.com" />
          <Textarea label="Message" required placeholder="How can we help?" />
          <Button type="submit" className="w-full">Send message</Button>
        </form>
        <p className="mt-4 text-xs text-center text-[var(--text-secondary)]">
          This form is for demonstration only. Messages are not delivered.
        </p>
      </Card>
    </div>
  )
}
