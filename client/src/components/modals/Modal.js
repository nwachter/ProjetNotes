"use client"

import { useEffect, useRef } from "react"

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside)
      window.addEventListener("keydown", handleEscapeKey)

      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("keydown", handleEscapeKey)

      // Restore body scrolling when modal is closed
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 my-8 max-h-[90vh] overflow-y-auto"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-isabelline/60 hover:text-isabelline transition-colors duration-200 rounded-full"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Modal

