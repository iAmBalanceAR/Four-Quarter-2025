"use client"

import * as React from "react"
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, CheckCircle, AlertTriangle, Info, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type NotificationVariant = 'default' | 'success' | 'destructive' | 'info' | 'warning'

interface NotificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  variant?: NotificationVariant
  confirmLabel?: string
  onConfirm?: () => void
  cancelLabel?: string
  onCancel?: () => void
  showCancel?: boolean
}

function getNotificationIcon(variant: NotificationVariant) {
  switch (variant) {
    case 'success':
      return <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
    case 'destructive':
      return <AlertTriangle className="h-8 w-8 text-destructive" />
    case 'warning':
      return <AlertTriangle className="h-8 w-8 text-amber-500 dark:text-amber-400" />
    case 'info':
      return <Info className="h-8 w-8 text-blue-500 dark:text-blue-400" />
    default:
      return <HelpCircle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
  }
}

function getButtonStyleForVariant(variant: NotificationVariant) {
  switch (variant) {
    case 'success':
      return "bg-green-500 hover:bg-green-600 text-white"
    case 'destructive':
      return "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
    case 'warning':
      return "bg-amber-500 hover:bg-amber-600 text-white"
    case 'info':
      return "bg-blue-500 hover:bg-blue-600 text-white"
    default:
      return "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
  }
}

export function NotificationModal({
  open,
  onOpenChange,
  title,
  description,
  variant = 'default',
  confirmLabel = 'OK',
  onConfirm,
  cancelLabel = 'Cancel',
  onCancel,
  showCancel = false
}: NotificationModalProps) {
  
  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onOpenChange(false)
  }
  
  const handleCancel = () => {
    if (onCancel) onCancel()
    onOpenChange(false)
  }
  
  const buttonClassName = getButtonStyleForVariant(variant)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent className="max-w-md rounded-lg border-2 p-6 shadow-lg">
        <DialogHeader className="flex flex-row items-center gap-4">
          <div className="flex-shrink-0">
            {getNotificationIcon(variant)}
          </div>
          <div className="flex-1">
            <DialogTitle className="text-xl font-semibold">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="mt-2 text-base">
                {description}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>
        
        <DialogFooter className="mt-6 flex gap-3">
          {showCancel && (
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              {cancelLabel}
            </Button>
          )}
          <Button 
            onClick={handleConfirm}
            className={cn("flex-1", buttonClassName)}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
        
        <button
          className="absolute right-4 top-4 rounded-sm p-1 opacity-70 hover:opacity-100 focus:outline-none"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  )
} 