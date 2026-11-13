import { cn } from '../../utils/cn'

const statusMap = {
  submitted: 'badge-info',
  under_review: 'badge-warning',
  assigned: 'badge-primary',
  in_progress: 'badge-primary',
  resolved: 'badge-success',
  rejected: 'badge-danger',
  on_hold: 'badge-neutral',
  reopened: 'badge-warning',
  high: 'badge-danger',
  medium: 'badge-warning',
  low: 'badge-info',
}

const labels = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  rejected: 'Rejected',
  on_hold: 'On Hold',
  reopened: 'Reopened',
}

export function Badge({ status, children, className }) {
  const variant = statusMap[status] || 'badge-neutral'
  const text = children || labels[status] || status
  return <span className={cn(variant, className)}>{text}</span>
}
