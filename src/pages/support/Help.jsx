import { Card, CardTitle } from '../../components/ui/Card'

const faqs = [
  {
    q: 'Is CivicConnect an official government website?',
    a: 'No. This is a demonstration / portfolio project. It does not submit real complaints or process official applications.',
  },
  {
    q: 'How do I report a civic issue?',
    a: 'Log in as a citizen, go to "Report an Issue", and follow the multi-step form: category → details → location → evidence → contact → review.',
  },
  {
    q: 'Can I track my complaint without logging in?',
    a: 'Yes. Use the "Track Complaint" page and enter your reference number (e.g. CC-2026-000124). Private details are not shown on public tracking.',
  },
  {
    q: 'What are the demo accounts?',
    a: 'citizen@civicconnect.demo, officer@civicconnect.demo, department@civicconnect.demo, admin@civicconnect.demo — password for all: demo123',
  },
  {
    q: 'Is my data secure?',
    a: 'This demo stores non-sensitive data in your browser localStorage only. Do not enter real Aadhaar, bank details or other sensitive information.',
  },
]

export default function Help() {
  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Help & Support</h1>
        <p className="page-subtitle">Frequently asked questions about this demo</p>
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <Card key={f.q}>
            <CardTitle className="text-base mb-2">{f.q}</CardTitle>
            <p className="text-sm text-[var(--text-secondary)]">{f.a}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
