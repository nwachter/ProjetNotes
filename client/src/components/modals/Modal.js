import React, { useEffect, useRef } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target)
          ) {
            onClose();
          }
        };
    
        if (isOpen) {
          window.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          window.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen, onClose]);
    
      if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex min-h-[100%] min-w-[100%] min-w-full items-center justify-center overflow-y-auto  bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="px-auto py-auto flex h-fit w-fit items-center justify-center bg-opacity-0"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal