import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useStore } from './store/useStore'
import { PublicLayout } from './layouts/PublicLayout'
import { AppLayout } from './layouts/AppLayout'
import { SmartLayout } from './layouts/SmartLayout'
import { ProtectedRoute } from './components/ProtectedRoute'

import Landing from './pages/public/Landing'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/citizen/Dashboard'
import Notifications from './pages/citizen/Notifications'
import Profile from './pages/citizen/Profile'
import ReportIssue from './pages/complaints/ReportIssue'
import MyComplaints from './pages/complaints/MyComplaints'
import ComplaintDetails from './pages/complaints/ComplaintDetails'
import TrackComplaint from './pages/complaints/TrackComplaint'
import Services from './pages/services/Services'
import ServiceDetails from './pages/services/ServiceDetails'
import Schemes from './pages/schemes/Schemes'
import SchemeDetails from './pages/schemes/SchemeDetails'
import Facilities from './pages/facilities/Facilities'
import Announcements from './pages/support/Announcements'
import Emergency from './pages/support/Emergency'
import Help from './pages/support/Help'
import Community from './pages/community/Community'
import DepartmentDashboard from './pages/department/DepartmentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

function ThemeInit() {
  const { theme, setTheme } = useStore()
  useEffect(() => {
    setTheme(theme)
  }, [])
  return null
}

function Placeholder({ title }) {
  return (
    <div className="text-center py-20">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-[var(--text-secondary)] mt-2">This section is available in the full roadmap.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeInit />
      <Toaster
        position="top-right"
        theme="system"
        toastOptions={{
          className: 'bg-[var(--card)] border border-[var(--border)] text-[var(--text-primary)]',
        }}
      />
      <Routes>
        {/* Pure public pages (always top navbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Shared pages: sidebar when logged in, public navbar when not */}
        <Route element={<SmartLayout />}>
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/explore-issues" element={<Community />} />
          <Route path="/track-complaint" element={<TrackComplaint />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/help" element={<Help />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/community" element={<Community />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
        </Route>

        {/* Citizen-only */}
        <Route
          element={
            <ProtectedRoute roles={['citizen']}>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documents" element={<Placeholder title="My Documents" />} />
          <Route path="/reminders" element={<Placeholder title="Reminders" />} />
        </Route>

        {/* Department */}
        <Route
          element={
            <ProtectedRoute roles={['officer', 'department_admin']}>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/department" element={<DepartmentDashboard />} />
          <Route path="/department/queue" element={<DepartmentDashboard />} />
          <Route path="/department/assignments" element={<Placeholder title="Assignments" />} />
          <Route path="/department/workspace" element={<Placeholder title="Officer Workspace" />} />
          <Route path="/department/reports" element={<Placeholder title="Reports" />} />
        </Route>

        {/* Admin */}
        <Route
          element={
            <ProtectedRoute roles={['admin']}>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Placeholder title="User Management" />} />
          <Route path="/admin/departments" element={<Placeholder title="Department Management" />} />
          <Route path="/admin/complaints" element={<Placeholder title="Complaints Management" />} />
          <Route path="/admin/categories" element={<Placeholder title="Category Management" />} />
          <Route path="/admin/services" element={<Placeholder title="Service Management" />} />
          <Route path="/admin/schemes" element={<Placeholder title="Scheme Management" />} />
          <Route path="/admin/announcements" element={<Placeholder title="Announcements CMS" />} />
          <Route path="/admin/analytics" element={<Placeholder title="Analytics" />} />
          <Route path="/admin/audit" element={<Placeholder title="Audit Logs" />} />
          <Route path="/admin/settings" element={<Placeholder title="System Settings" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
