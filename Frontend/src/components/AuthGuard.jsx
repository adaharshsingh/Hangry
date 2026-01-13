import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const AuthGuard = ({ children, protectAuthPages = false }) => {
  const { isAuthenticated, userType, loading, rememberMe, logout } = useAuth()

  // If not Remember Me and tries to access auth pages, logout
  useEffect(() => {
    if (protectAuthPages && isAuthenticated && !rememberMe) {
      logout()
    }
  }, [protectAuthPages, isAuthenticated, rememberMe, logout])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-4xl text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  // If protecting auth pages and user is authenticated with Remember Me, redirect to home
  if (protectAuthPages && isAuthenticated && rememberMe) {
    if (userType === 'user') {
      window.location.href = '/home'
    } else if (userType === 'food-partner') {
      window.location.href = '/food/profile'
    }
    return null
  }

  return children
}

export default AuthGuard
