'use client'

import { useEffect } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useModal } from './modal-context'

export function ModalIcon({ type }: { type: string }) {
  switch (type) {
    case 'confirmation':
      return <AlertCircle className="h-6 w-6 text-amber-500" />
    case 'verification':
      return <CheckCircle className="h-6 w-6 text-green-500" />
    case 'error':
      return <AlertTriangle className="h-6 w-6 text-destructive" />
    case 'message':
    default:
      return <Info className="h-6 w-6 text-primary" />
  }
}

export function Modal() {
  const { modalState, closeModal } = useModal()
  const { isOpen, type, title, message, confirmLabel, cancelLabel, confirmAction, cancelAction } = modalState

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeModal])

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction()
    }
    closeModal()
  }

  const handleCancel = () => {
    if (cancelAction) {
      cancelAction()
    }
    closeModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className={`${type === 'error' ? 'border-destructive/20' : ''}`}>
        <DialogHeader className="flex flex-row items-center gap-2 sm:gap-4">
          <div className="flex-shrink-0">
            <ModalIcon type={type} />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-lg font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-2 whitespace-pre-line">
              {message}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-end space-x-2">
          {(type === 'confirmation' || type === 'verification') && (
            <Button variant="outline" onClick={handleCancel}>
              {cancelLabel}
            </Button>
          )}
          
          <Button 
            onClick={handleConfirm}
            variant={type === 'error' ? 'destructive' : 'default'}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 