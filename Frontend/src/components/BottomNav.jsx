import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const BottomNav = () => {
  const [userType, setUserType] = useState(null) // 'user', 'partner', or null

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
      } catch {
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
      } catch {
        // not a partner
      }

      setUserType(null)
    }

    checkUserType()
  }, [])

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40" role="navigation" aria-label="Bottom">
      <div className="flex justify-around items-center h-20 px-4">
        <NavLink to="/home" end className={({ isActive }) => `flex flex-col items-center gap-1 px-4 py-2 transition-colors ${isActive ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
          <span className="w-6 h-6" aria-hidden="true">
            {/* home icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5"/>
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
            </svg>
          </span>
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        {/* Profile Link - Only show if user is authenticated */}
        {userType && (
          <NavLink 
            to={userType === 'partner' ? '/food/profile' : '/user/profile'} 
            className={({ isActive }) => `flex flex-col items-center gap-1 px-4 py-2 transition-colors ${isActive ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            <span className="w-6 h-6" aria-hidden="true">
              {/* profile icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/>
              </svg>
            </span>
            <span className="text-xs font-medium">Profile</span>
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default BottomNav