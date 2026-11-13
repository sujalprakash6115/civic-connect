import { Outlet } from 'react-router-dom'
import { PublicNavbar } from '../components/layout/PublicNavbar'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--border)] bg-[var(--sidebar)]">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <span className="font-bold">CivicConnect</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Your City. Your Voice. Your Solution. A unified platform connecting citizens with government services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="/services" className="hover:text-primary">Services</a></li>
                <li><a href="/schemes" className="hover:text-primary">Schemes</a></li>
                <li><a href="/explore-issues" className="hover:text-primary">Explore Issues</a></li>
                <li><a href="/emergency" className="hover:text-primary">Emergency</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="/help" className="hover:text-primary">Help Center</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                <li><a href="/about" className="hover:text-primary">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Important</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                This is a demonstration platform. It does not submit real government complaints or process official applications. Always use official government portals for actual services.
              </p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--text-secondary)]">
            © 2026 CivicConnect Demo. Built for educational and portfolio purposes. Not an official government product.
          </div>
        </div>
      </footer>
    </div>
  )
}
