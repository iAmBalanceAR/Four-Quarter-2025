"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  getIconForVariant
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const IconComponent = props.variant ? getIconForVariant(props.variant) : null;
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-3">
              {IconComponent && (
                <IconComponent className={cn(
                  "h-5 w-5",
                  props.variant === "success" && "text-green-600 dark:text-green-400",
                  props.variant === "error" && "text-red-600 dark:text-red-400",
                  props.variant === "warning" && "text-yellow-600 dark:text-yellow-400",
                  props.variant === "info" && "text-blue-600 dark:text-blue-400"
                )} />
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
} 