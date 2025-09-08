// src/hooks/use-is-mac.jsx
import { useEffect, useState } from 'react'

export const useIsMac = () => {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    // We check the user agent string for "Mac"
    setIsMac(/mac/i.test(navigator.userAgent))
  }, [])

  return isMac
}
