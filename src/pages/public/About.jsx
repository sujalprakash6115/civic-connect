import { Card } from '../../components/ui/Card'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">About CivicConnect</h1>
        <p className="mt-2 text-[var(--text-secondary)]">Your City. Your Voice. Your Solution.</p>
      </div>
      <Card>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          CivicConnect is a demonstration platform that shows how modern technology can help citizens
          report civic issues, discover government services and schemes, find public facilities, and
          stay informed about local announcements — all in one place.
        </p>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          This project is built for educational and portfolio purposes. It is <strong>not</strong> an
          official government product and does not submit real complaints or process official applications.
        </p>
      </Card>
      <Card>
        <h2 className="font-semibold mb-3">What this demo includes</h2>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li>• Multi-step civic issue reporting with categories tailored to Indian cities</li>
          <li>• Complaint tracking with status timelines</li>
          <li>• Government services directory with guidance</li>
          <li>• Scheme discovery</li>
          <li>• Public facility finder (sample Pune data)</li>
          <li>• Announcements and emergency contacts</li>
          <li>• Citizen, department officer and admin portals</li>
          <li>• Dark / light theme and responsive design</li>
        </ul>
      </Card>
    </div>
  )
}
