import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const [isPartner, setIsPartner] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkPartnerStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/auth/food-partner/me`, {
          withCredentials: true,
        })
        setIsPartner(!!response.data.foodPartner)
      } catch (e) { // eslint-disable-line no-unused-vars
        setIsPartner(false)
        navigate('/food/login')
      } finally {
        setLoading(false)
      }
    }

    checkPartnerStatus()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="text-4xl text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  if (!isPartner) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Only food partners can create food items. Please register as a food partner.
          </p>
          <a
            href="/food/register"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
          >
            Become a Partner
          </a>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
