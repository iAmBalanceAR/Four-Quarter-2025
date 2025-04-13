'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type ModalType = 'confirmation' | 'verification' | 'error' | 'message'

interface ModalState {
  isOpen: boolean
  type: ModalType
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  confirmAction?: () => void
  cancelAction?: () => void
  data?: any
}

interface ModalContextValue {
  modalState: ModalState
  openConfirmation: (title: string, message: string, confirmAction: () => void, options?: Partial<ModalState>) => void
  openVerification: (title: string, message: string, confirmAction: () => void, options?: Partial<ModalState>) => void
  openError: (title: string, message: string, options?: Partial<ModalState>) => void
  openMessage: (title: string, message: string, options?: Partial<ModalState>) => void
  closeModal: () => void
}

const initialModalState: ModalState = {
  isOpen: false,
  type: 'message',
  title: '',
  message: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>(initialModalState)

  const openConfirmation = (
    title: string,
    message: string,
    confirmAction: () => void,
    options?: Partial<ModalState>
  ) => {
    setModalState({
      ...initialModalState,
      isOpen: true,
      type: 'confirmation',
      title,
      message,
      confirmAction,
      confirmLabel: options?.confirmLabel || 'Confirm',
      cancelLabel: options?.cancelLabel || 'Cancel',
      cancelAction: options?.cancelAction,
      data: options?.data,
    })
  }

  const openVerification = (
    title: string,
    message: string,
    confirmAction: () => void,
    options?: Partial<ModalState>
  ) => {
    setModalState({
      ...initialModalState,
      isOpen: true,
      type: 'verification',
      title,
      message,
      confirmAction,
      confirmLabel: options?.confirmLabel || 'Verify',
      cancelLabel: options?.cancelLabel || 'Cancel',
      cancelAction: options?.cancelAction,
      data: options?.data,
    })
  }

  const openError = (
    title: string,
    message: string,
    options?: Partial<ModalState>
  ) => {
    setModalState({
      ...initialModalState,
      isOpen: true,
      type: 'error',
      title,
      message,
      confirmLabel: options?.confirmLabel || 'OK',
      confirmAction: options?.confirmAction || closeModal,
      data: options?.data,
    })
  }

  const openMessage = (
    title: string,
    message: string,
    options?: Partial<ModalState>
  ) => {
    setModalState({
      ...initialModalState,
      isOpen: true,
      type: 'message',
      title,
      message,
      confirmLabel: options?.confirmLabel || 'OK',
      confirmAction: options?.confirmAction || closeModal,
      data: options?.data,
    })
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <ModalContext.Provider
      value={{
        modalState,
        openConfirmation,
        openVerification,
        openError,
        openMessage,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
} 