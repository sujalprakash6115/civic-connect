import { Link } from 'react-router-dom'
import {
  ArrowRight, MapPin, FileWarning, Building2, Gift, Users, Shield,
  CheckCircle, Search, Zap, Globe, Heart
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useStore } from '../../store/useStore'

const stats = [
  { label: 'Issues Reported', value: '12,400+' },
  { label: 'Resolved', value: '9,800+' },
  { label: 'Services Listed', value: '150+' },
  { label: 'Citizens Helped', value: '45,000+' },
]

const howItWorks = [
  { step: '1', title: 'Report or Discover', desc: 'Report civic issues with photos and location, or discover government services and schemes.' },
  { step: '2', title: 'Track Progress', desc: 'Get real-time status updates as departments review and resolve your requests.' },
  { step: '3', title: 'Stay Informed', desc: 'Receive local announcements, utility notices and community updates in one place.' },
]

const categories = [
  { icon: FileWarning, title: 'Report Issues', desc: 'Potholes, streetlights, garbage, drainage and more.', to: '/report-issue' },
  { icon: Building2, title: 'Government Services', desc: 'Certificates, licenses, tax payments and guidance.', to: '/services' },
  { icon: Gift, title: 'Schemes & Benefits', desc: 'Scholarships, pensions, housing and welfare schemes.', to: '/schemes' },
  { icon: MapPin, title: 'Nearby Facilities', desc: 'Hospitals, police, toilets, libraries and more.', to: '/facilities' },
]

export default function Landing() {
  const { user } = useStore()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-900/10 pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
              <Zap className="h-3.5 w-3.5" />
              Demo platform for civic engagement
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Your City Deserves Better.{' '}
              <span className="text-primary">Let's Make It Happen.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Report civic problems, access public services, discover government schemes and stay connected with your community — all from one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={user ? '/dashboard' : '/register'}>
                <Button size="lg">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg">Explore Services</Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> Free to use</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> Mobile friendly</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> Accessible design</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="text-center py-6">
                <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section className="mx-auto max-w-[1600px] px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">What can you do?</h2>
          <p className="mt-2 text-[var(--text-secondary)]">Everything you need for civic engagement in one place</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.title} to={c.to}>
              <Card className="h-full hover:border-primary/40 transition-colors group cursor-pointer">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{c.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--sidebar)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">How CivicConnect works</h2>
            <p className="mt-2 text-[var(--text-secondary)]">Simple steps to make your city better</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((h) => (
              <div key={h.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg mb-4">
                  {h.step}
                </div>
                <h3 className="font-semibold text-lg">{h.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-xs mx-auto">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1600px] px-4 md:px-8 py-16">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Built for every citizen</h2>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
              From senior citizens needing large text and simple forms, to students looking for scholarships, to municipal officers managing workloads — CivicConnect is designed for everyone.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Multi-step guided complaint reporting',
                'Real-time status tracking with timeline',
                'Government service directory with guidance',
                'Scheme eligibility discovery',
                'Local announcements and utility notices',
                'Accessibility-first design',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, title: 'Transparent', desc: 'Track every status change' },
              { icon: Globe, title: 'Inclusive', desc: 'Designed for accessibility' },
              { icon: Users, title: 'Community', desc: 'Upvote and follow issues' },
              { icon: Heart, title: 'Citizen-first', desc: 'Built around real needs' },
            ].map((f) => (
              <Card key={f.title} className="text-center py-6">
                <f.icon className="h-7 w-7 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-sm">{f.title}</h4>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-4 md:px-8 py-16">
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-purple-900/20 border-primary/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to improve your city?</h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-lg mx-auto">
            Join thousands of citizens using CivicConnect to report issues, access services and stay informed.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button size="lg">Create free account</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">Try demo login</Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-[var(--text-secondary)]">
            Demo accounts available — no real registration required
          </p>
        </Card>
      </section>
    </div>
  )
}
