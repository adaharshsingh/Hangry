import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const FoodPartnerProfile = () => {
  const [profile, setProfile] = useState(null)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [activeTab, setActiveTab] = useState('reels')
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    // Fetch partner profile
    axios
      .get(`${import.meta.env.VITE_API}/api/auth/food-partner/me`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner)
        setFoods(response.data.foodPartner.items || [])
      })
      .catch(() => {
        navigate('/food/login')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/api/item/${foodId}`, { withCredentials: true })
      setFoods(foods.filter((f) => f._id !== foodId))
      setShowDeleteModal(null)
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-4xl mb-4">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        {/* Instagram-Style Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-400 to-red-400 dark:from-orange-600 dark:to-red-600 flex items-center justify-center text-6xl shadow-lg"
              >
                👨‍🍳
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                  <h1 className="text-4xl font-bold">{profile?.name}</h1>
                  <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                    <Link
                      to="/create-food"
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold flex items-center gap-2 transition-all"
                    >
                      <Plus size={20} />
                      Add Menu
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold flex items-center gap-2 transition-all"
                    >
                      <LogOut size={20} />
                      Logout
                    </motion.button>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">{profile?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{profile?.address}</p>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  className="flex gap-8 justify-center md:justify-start"
                >
                  {[
                    { label: 'Posts', value: foods.length, icon: '📸' },
                    { label: 'Total Meals', value: profile?.totalMeals || 0, icon: '🍽️' },
                    { label: 'Customers', value: profile?.customersServed || 0, icon: '👥' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-20"
        >
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-8">
            <motion.button
              onClick={() => setActiveTab('reels')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-4 font-semibold text-lg transition-all relative ${
                activeTab === 'reels'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              🎬 Reels
              {activeTab === 'reels' && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => setActiveTab('menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-4 font-semibold text-lg transition-all relative ${
                activeTab === 'menu'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              🍽️ Menu
              {activeTab === 'menu' && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto px-4 py-12"
        >
          {foods.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="text-6xl mb-4">{activeTab === 'reels' ? '🎬' : '🍽️'}</div>
              <h3 className="text-2xl font-semibold mb-2">
                {activeTab === 'reels' ? 'No Reels Yet' : 'No Menu Items Yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeTab === 'reels'
                  ? 'Start by uploading your first food reel'
                  : 'Start by adding your first food item'}
              </p>
              <Link
                to="/create-food"
                className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                {activeTab === 'reels' ? 'Upload Reel' : 'Add Menu Item'}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {foods.map((food, index) => (
                <motion.div
                  key={food._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all bg-gray-100 dark:bg-gray-800"
                >
                  {/* Video */}
                  <div className="relative w-full h-64 overflow-hidden bg-gray-300 dark:bg-gray-700">
                    <video
                      src={food.video}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                    
                    {/* Video Badge for Reels Tab */}
                    {activeTab === 'reels' && (
                      <div className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded text-xs text-white font-semibold">
                        ▶️ Reel
                      </div>
                    )}
                  </div>

                  {/* Overlay with Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate(`/edit-food/${food._id}`)}
                      title="Edit this food item"
                      className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all"
                    >
                      <Edit2 size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowDeleteModal(food._id)}
                      title="Delete this food item"
                      className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>

                  {/* Description */}
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <h3 className="font-semibold truncate">{food.description || food.name}</h3>
                    <div className="flex gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
                      <span title="Total likes">❤️ {food.likeCount || 0}</span>
                      <span title="Total saves">💾 {food.savesCount || 0}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold mb-4">Delete Item</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this food item? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default FoodPartnerProfile
