import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useDisableScroll = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if on auth route
    const isAuthRoute = location.pathname.includes('/user/login') || 
                        location.pathname.includes('/user/register') || 
                        location.pathname.includes('/food/login') || 
                        location.pathname.includes('/food/register')

    if (isAuthRoute) {
      // Disable scroll on body
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Re-enable scroll
        document.body.style.overflow = originalOverflow
      }
    }
  }, [location.pathname])
}
