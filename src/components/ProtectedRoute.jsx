import { Navigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export function ProtectedRoute({ children, roles }) {
  const { user } = useStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to appropriate dashboard
    if (user.role === 'admin') return <Navigate to="/admin" replace />
    if (user.role === 'officer' || user.role === 'department_admin') return <Navigate to="/department" replace />
    return <Navigate to="/dashboard" replace />
  }

  return children
}
