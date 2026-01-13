import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, User, LogOut } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import axios from 'axios'
import { motion } from 'framer-motion'

const Navbar = ({ showAuthButtons = true }) => {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userType, setUserType] = useState(null) // 'user', 'partner', or null
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const hideTimerRef = useRef(null)
  const location = useLocation()

  // Determine if we're on an auth route
  const isAuthRoute = location.pathname.includes('/user/login') || 
                      location.pathname.includes('/user/register') || 
                      location.pathname.includes('/food/login') || 
                      location.pathname.includes('/food/register')

  useEffect(() => {
    // Check if user is logged in
    const checkUserType = async () => {
      try {
        const userRes = await axios.get(`${import.meta.env.VITE_API}/api/auth/user/me`, {
          withCredentials: true,
        })
        if (userRes.data.user) {
          setUserType('user')
          return
        }
      } catch (e) { // eslint-disable-line no-unused-vars
        // not a user
      }

      try {
        const partnerRes = await axios.get(`${import.meta.env.VITE_API}/api/auth/food-partner/me`, {
          withCredentials: true,
        })
        if (partnerRes.data.foodPartner) {
          setUserType('partner')
          return
        }
      } catch (e) { // eslint-disable-line no-unused-vars
        // not a partner
      }

      setUserType(null)
    }

    checkUserType()
  }, [location])

  // Auto-hide navbar on auth routes with 3 second delay if no mouse movement
  useEffect(() => {
    if (!isAuthRoute) {
      setIsVisible(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      return
    }

    // Show navbar initially
    setIsVisible(true)
    
    // Hide after 3 seconds on auth routes (only if no mouse movement)
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isAuthRoute])

  // Handle mouse move on auth routes - show navbar and hide after 2 seconds of inactivity
  useEffect(() => {
    if (!isAuthRoute) return

    const handleMouseMove = () => {
      setIsVisible(true)
      
      // Clear existing timer
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      
      // Set new timer to hide after 2 seconds of no movement
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isAuthRoute])

  // Determine navbar styling and buttons based on current page
  const getNavbarConfig = () => {
    if (location.pathname.includes('/user/register')) {
      return {
        title: 'Create Account',
        actionLabel: 'Partener Sign Up',
        actionLink: '/food/register',
        actionStyle: 'border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20',
        theme: 'user'
      }
    }
    if (location.pathname.includes('/user/login')) {
      return {
        title: 'Sign In',
        actionLabel: 'Partner SignIn',
        actionLink: '/food/login',
        actionStyle: 'bg-orange-500 text-white hover:bg-orange-600',
        theme: 'user'
      }
    }
    if (location.pathname.includes('/food/register')) {
      return {
        title: 'Partner Registration',
        actionLabel: 'user Register',
        actionLink: '/user/register',
        actionStyle: 'border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20',
        theme: 'partner'
      }
    }
    if (location.pathname.includes('/food/login')) {
      return {
        title: 'Partner Sign In',
        actionLabel: 'User SignIn',
        actionLink: '/user/login',
        actionStyle: 'bg-teal-500 text-white hover:bg-teal-600',
        theme: 'partner'
      }
    }
    if (location.pathname.includes('/home') || location.pathname.includes('/saved')) {
      return {
        title: 'Feed',
        actionLabel: 'Create',
        actionLink: '/create-food',
        actionStyle: 'bg-orange-500 text-white hover:bg-orange-600',
        theme: 'user'
      }
    }
    if (location.pathname.includes('/create-food')) {
      return {
        title: 'Create Food',
        actionLabel: 'Back',
        actionLink: '/home',
        actionStyle: 'border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20',
        theme: 'partner'
      }
    }
    if (location.pathname.includes('/food/') && location.pathname.includes('id')) {
      return {
        title: 'Profile',
        actionLabel: 'Home',
        actionLink: '/home',
        actionStyle: 'bg-orange-500 text-white hover:bg-orange-600',
        theme: 'user'
      }
    }
    if (location.pathname.includes('/user/profile')) {
      return {
        title: 'Profile',
        actionLabel: 'Home',
        actionLink: '/home',
        actionStyle: 'bg-orange-500 text-white hover:bg-orange-600',
        theme: 'user'
      }
    }
    if (location.pathname.includes('/food/profile')) {
      return {
        title: 'Profile',
        actionLabel: 'Home',
        actionLink: '/home',
        actionStyle: 'bg-teal-500 text-white hover:bg-teal-600',
        theme: 'partner'
      }
    }
    // Default (Landing or Choose page)
    return {
      title: 'Crave',
      actionLabel: 'Get Started',
      actionLink: '/choose',
      actionStyle: 'bg-orange-500 text-white hover:bg-orange-600',
      theme: 'default'
    }
  }

  const navConfig = getNavbarConfig()

  // Get navbar background based on theme - match page gradients
  const getNavbarBackground = () => {
    if (isAuthRoute) {
      if (location.pathname.includes('/user/login')) {
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 shadow-2xl border-b border-slate-700'
      }
      if (location.pathname.includes('/user/register')) {
        return 'bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl border-b border-orange-200 dark:border-gray-700'
      }
      if (location.pathname.includes('/food/login')) {
        return 'bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-950 shadow-2xl border-b border-teal-700'
      }
      if (location.pathname.includes('/food/register')) {
        return 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 shadow-2xl border-b border-purple-700'
      }
    }
    return 'bg-white dark:bg-gray-800 shadow-md'
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API}/api/auth/logout`, {}, {
        withCredentials: true,
      })
      setUserType(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <motion.header 
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`${isAuthRoute ? 'fixed' : 'sticky'} top-0 z-50 w-full ${getNavbarBackground()} transition-colors`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <Link to="/" className="flex items-center hover:opacity-60 transition-opacity duration-200">
                <motion.img 
                  src="/logo.png" 
                  alt="Crave Logo" 
                  className="h-12 w-12 md:h-14 md:w-14 object-contain"
                  whileTap={{ scale: 0.95 }}
                />
              </Link>
            </motion.div>


            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Cross-promote link on auth routes */}
              {isAuthRoute && navConfig.crossLink && (
                <Link
                  to={navConfig.crossLink}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    location.pathname.includes('/user/') 
                      ? 'border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20'
                      : 'border-2 border-slate-400 text-slate-300 hover:bg-slate-500/20'
                  }`}
                >
                  {navConfig.crossLabel}
                </Link>
              )}

              {/* Profile & Logout for Authenticated Users (NOT on auth routes) */}
              {userType && !isAuthRoute && (
                <>
                  <Link
                    to={userType === 'partner' ? '/food/profile' : '/user/profile'}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                  >
                    <User size={18} />
                    <span className="font-semibold">Profile</span>
                  </Link>
                  <button
                    onClick={() => handleLogout()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="font-semibold">Logout</span>
                  </button>
                </>
              )}

              {/* Action Button for Unauthenticated Users (NOT on auth routes) */}
              {showAuthButtons && !userType && !isAuthRoute && (
                <Link
                  to={navConfig.actionLink}
                  className={`px-6 py-2 rounded-lg border-2 font-semibold transition-all ${navConfig.actionStyle}`}
                >
                  {navConfig.actionLabel}
                </Link>
              )}

              {/* Auth routes action button */}
              {isAuthRoute && !userType && (
                <Link
                  to={navConfig.actionLink}
                  className={`px-6 py-2 rounded-lg border-2 font-semibold transition-all ${
                    location.pathname.includes('/user/')
                      ? 'border-slate-400 text-slate-300 hover:bg-slate-500/20'
                      : 'border-purple-400 text-purple-300 hover:bg-purple-500/20'
                  }`}
                >
                  {navConfig.actionLabel}
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 md:hidden space-y-3 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              {/* Cross-promote link on auth routes */}
              {isAuthRoute && navConfig.crossLink && (
                <Link
                  to={navConfig.crossLink}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-semibold transition-all text-center ${
                    location.pathname.includes('/user/') 
                      ? 'border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20'
                      : 'border-2 border-slate-400 text-slate-300 hover:bg-slate-500/20'
                  }`}
                >
                  {navConfig.crossLabel}
                </Link>
              )}

              {/* Profile & Logout for Authenticated Users (NOT on auth routes) */}
              {userType && !isAuthRoute && (
                <>
                  <Link
                    to={userType === 'partner' ? '/food/profile' : '/user/profile'}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                  >
                    <User size={18} />
                    <span className="font-semibold">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="font-semibold">Logout</span>
                  </button>
                </>
              )}

              {/* Action Button for Unauthenticated Users (NOT on auth routes) */}
              {showAuthButtons && !userType && !isAuthRoute && (
                <Link
                  to={navConfig.actionLink}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-center font-semibold transition-all"
                  style={{ 
                    background: navConfig.actionLink.includes('register') ? 'transparent' : '#f97316',
                    color: navConfig.actionLink.includes('register') ? '#f97316' : 'white',
                    border: navConfig.actionLink.includes('register') ? '2px solid #f97316' : 'none'
                  }}
                >
                  {navConfig.actionLabel}
                </Link>
              )}

              {/* Auth routes action button */}
              {isAuthRoute && !userType && (
                <Link
                  to={navConfig.actionLink}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-center font-semibold transition-all ${
                    location.pathname.includes('/user/')
                      ? 'border-2 border-slate-400 text-slate-300 hover:bg-slate-500/20'
                      : 'border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20'
                  }`}
                >
                  {navConfig.actionLabel}
                </Link>
              )}
            </motion.div>
          )}
        </nav>
      </motion.header>
    )
}

export default Navbar
