'use client'
import { useEffect } from 'react'

export default function AuthDone() {
  useEffect(() => {
    // Notify the parent window that authentication is complete
    if (window.opener) {
      window.opener.postMessage('auth_complete', window.location.origin)
      window.close() // Close the popup window automatically
    }
  }, [])

  return <p>Authentication successful! You may close this window.</p>
}
