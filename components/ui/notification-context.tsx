"use client"

import * as React from "react"
import { NotificationModal, NotificationVariant } from "@/components/ui/notification-modal"

interface NotificationContextProps {
  showNotification: (props: NotificationProps) => void
  hideNotification: () => void
}

interface NotificationProps {
  title: React.ReactNode
  description?: React.ReactNode
  variant?: NotificationVariant
  confirmLabel?: string
  onConfirm?: () => void
}

const NotificationContext = React.createContext<NotificationContextProps | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [notificationProps, setNotificationProps] = React.useState<NotificationProps>({
    title: "",
  })

  const showNotification = (props: NotificationProps) => {
    setNotificationProps(props)
    setOpen(true)
  }

  const hideNotification = () => {
    setOpen(false)
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <NotificationModal
        open={open}
        onOpenChange={setOpen}
        {...notificationProps}
      />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = React.useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
} 