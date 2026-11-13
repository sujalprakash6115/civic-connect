import { useStore } from '../../store/useStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { Bell } from 'lucide-react'
import { formatRelative } from '../../utils/format'
import { cn } from '../../utils/cn'

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore()

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Updates on your complaints and announcements</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <Button variant="secondary" size="sm" onClick={markAllNotificationsRead}>
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={cn('cursor-pointer transition-colors', !n.read && 'border-primary/30 bg-primary/5')}
              onClick={() => markNotificationRead(n.id)}
            >
              <div className="flex items-start gap-3">
                {!n.read && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
                <div className={n.read ? 'ml-4' : ''}>
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5">{n.message}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{formatRelative(n.at)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
