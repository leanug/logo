import { useNotificationStore } from '@/store/use-notification-store'
import { Notification } from '@/components/Notification/NotificationItem'

export const NotificationList = () => {
  const { notifications, removeNotification } = useNotificationStore()
  
  return (
    <ul className="flex flex-col gap-2.5">
      {
        notifications?.map((notification) => (
          <li key={notification.id} >
            <Notification 
              id={notification.id} 
              message={notification.message} 
              type={ notification.type }
              removeNotification={ removeNotification }
            />
          </li>
        ))
      }
    </ul>
  )
}