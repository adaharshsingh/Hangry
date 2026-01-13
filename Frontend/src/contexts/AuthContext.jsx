import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

// Suppress 401 errors - they're expected when not logged in
const axiosInstance = axios.create()
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && (
      error.config?.url?.includes('/api/auth/user/me') || 
      error.config?.url?.includes('/api/auth/food-partner/me')
    )) {
      return Promise.reject(error) // Silent reject for auth check endpoints
    }
    return Promise.reject(error)
  }
)

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

const TOKEN_EXPIRY_TIME = 30 * 60 * 1000 // 30 minutes in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'user' or 'food-partner'
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  let tokenExpiryTimer = null

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Set token expiry timer only if remember me is true
  useEffect(() => {
    if (isAuthenticated && rememberMe) {
      // Clear existing timer
      if (tokenExpiryTimer) {
        clearTimeout(tokenExpiryTimer)
      }
      // Set new timer - 30 minutes
      tokenExpiryTimer = setTimeout(() => {
        logout()
      }, TOKEN_EXPIRY_TIME)
    }
    return () => {
      if (tokenExpiryTimer) {
        clearTimeout(tokenExpiryTimer)
      }
    }
  }, [isAuthenticated, rememberMe])

  const checkAuthStatus = useCallback(async () => {
    try {
      // Check if remember me was set
      const wasRemembered = localStorage.getItem('rememberMe') === 'true'
      setRememberMe(wasRemembered)

      // Try to get user data
      const userResponse = await axiosInstance.get(
        `${import.meta.env.VITE_API}/api/auth/user/me`,
        { withCredentials: true }
      )
      
      setUser(userResponse.data.user)
      setUserType('user')
      setIsAuthenticated(true)
      setLoading(false)
      return
    } catch (err) {
      // If user fetch fails, try food partner
      try {
        const wasRemembered = localStorage.getItem('rememberMe') === 'true'
        setRememberMe(wasRemembered)

        const partnerResponse = await axiosInstance.get(
          `${import.meta.env.VITE_API}/api/auth/food-partner/me`,
          { withCredentials: true }
        )
        
        setUser(partnerResponse.data.foodPartner)
        setUserType('food-partner')
        setIsAuthenticated(true)
        setLoading(false)
        return
      } catch (err2) {
        // No auth found
        setUser(null)
        setUserType(null)
        setIsAuthenticated(false)
        setRememberMe(false)
        setLoading(false)
      }
    }
  }, [])

  const login = useCallback((userData, type, remember = false) => {
    setUser(userData)
    setUserType(type)
    setIsAuthenticated(true)
    setRememberMe(remember)

    if (remember) {
      localStorage.setItem('rememberMe', 'true')
    } else {
      localStorage.removeItem('rememberMe')
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
    } catch (err) {
      console.error('Logout API error:', err)
    } finally {
      // Clear state regardless of API success
      setUser(null)
      setUserType(null)
      setIsAuthenticated(false)
      setRememberMe(false)
      localStorage.removeItem('rememberMe')
      if (tokenExpiryTimer) {
        clearTimeout(tokenExpiryTimer)
      }
    }
  }, [])

  const value = {
    user,
    userType,
    loading,
    isAuthenticated,
    rememberMe,
    login,
    logout,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
