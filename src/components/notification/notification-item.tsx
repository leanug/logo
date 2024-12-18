'use client'

import React, { useEffect } from 'react'

import { FaInfoCircle } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

export const Notification: React.FC<any> = ({
  id, 
  message, 
  type, 
  removeNotification 
}) => {
  let alertModifier

  if (type === 'error') {
    alertModifier = 'alert-error'
  } else if (type === 'info') {
    alertModifier = 'alert-info'
  } else if (type === 'success') {
    alertModifier = 'alert-success'
  } else if (type === 'warning') {
    alertModifier = 'alert-warning'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatically close the notification after a few seconds
      removeNotification(id)
    }, 5000) // Adjust the duration as needed

    return () => clearTimeout(timer)
  }, [id, removeNotification])

  const handleClose = () => {
    // Close the notification when the close button is clicked
    removeNotification(id)
  }

  return (
    <div role="alert" className={`alert shadow-lg ${alertModifier}`}>
      <FaInfoCircle size={18} />
      <div>
        <span>{message}</span>
      </div>
      <button className="btn btn-sm btn-ghost" onClick={handleClose}>
        <FaXmark size={18} />
      </button>
    </div>
  )
}
