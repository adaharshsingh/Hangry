import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Edit2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import BottomNav from '../../components/BottomNav'
import { useAuth } from '../../contexts/AuthContext'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [savedFoods, setSavedFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('saved')
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    // Fetch user data
    axios
      .get(`${import.meta.env.VITE_API}/api/auth/user/me`, { withCredentials: true })
      .then((response) => {
        setUser(response.data.user)
      })
      .catch(() => {
        navigate('/user/login')
      })

    // Fetch saved foods
    axios
      .get(`${import.meta.env.VITE_API}/api/item/save`, { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.item._id,
          video: item.item.video,
          description: item.item.description,
          likeCount: item.item.likeCount,
          savesCount: item.item.savesCount,
          commentsCount: item.item.commentsCount,
          foodPartner: item.item.foodPartner,
        }))
        setSavedFoods(savedFoods)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  const handleLogout = async () => {
    await logout()
    navigate('/')
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors pb-20">
        {/* Logout Button - Top Right */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="fixed top-4 right-4 z-50 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold flex items-center gap-2 transition-all"
        >
          <LogOut size={20} />
          Logout
        </motion.button>

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
                👤
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                  <h1 className="text-4xl font-bold">{user?.name || 'User'}</h1>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">{user?.email}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Food enthusiast & explorer</p>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  className="flex gap-8 justify-center md:justify-start"
                >
                  {[
                    { label: 'Saved', value: savedFoods.length, icon: '💾' },
                    { label: 'Likes', value: 42, icon: '❤️' },
                    { label: 'Reviews', value: 12, icon: '⭐' },
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
              onClick={() => setActiveTab('saved')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-4 font-semibold text-lg transition-all relative ${
                activeTab === 'saved'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              💾 Saved Reels
              {activeTab === 'saved' && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => setActiveTab('activity')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-4 font-semibold text-lg transition-all relative ${
                activeTab === 'activity'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              📊 Activity
              {activeTab === 'activity' && (
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
          {activeTab === 'saved' ? (
            <>
              {savedFoods.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="text-6xl mb-4">😋</div>
                  <h3 className="text-2xl font-semibold mb-2">No Saved Reels Yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start exploring and saving your favorite foods!
                  </p>
                  <Link
                    to="/home"
                    className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-semibold"
                  >
                    Explore Reels
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.05 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {savedFoods.map((food, index) => (
                    <motion.div
                      key={food._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate('/saved', { state: { selectedReelId: food._id } })}
                      className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all bg-gray-100 dark:bg-gray-800 cursor-pointer"
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
                        <div className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded text-xs text-white font-semibold">
                          ▶️ Reel
                        </div>
                      </div>

                      {/* Overlay with Stats */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-6 text-white">
                          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                            <Heart size={28} className="mx-auto mb-2 text-red-500 fill-red-500" />
                            <p className="text-sm font-semibold">{food.likeCount}</p>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                            <span className="text-3xl mb-2 block">💾</span>
                            <p className="text-sm font-semibold">{food.savesCount}</p>
                          </motion.div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-3 bg-white dark:bg-gray-800">
                        <p className="text-sm font-semibold truncate">{food.description || food.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          by {food.foodPartner?.name || 'Unknown'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: 'Foods Saved',
                    value: savedFoods.length,
                    icon: '💾',
                    color: 'from-blue-400 to-blue-600',
                  },
                  {
                    label: 'Likes Given',
                    value: 42,
                    icon: '❤️',
                    color: 'from-red-400 to-red-600',
                  },
                  {
                    label: 'Foods Reviewed',
                    value: 12,
                    icon: '⭐',
                    color: 'from-yellow-400 to-orange-600',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-8 shadow-xl`}
                  >
                    <div className="text-6xl mb-4">{stat.icon}</div>
                    <p className="text-5xl font-bold mb-2">{stat.value}</p>
                    <p className="text-lg opacity-90">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Activity Timeline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {[
                    { action: 'Saved a reel', item: 'Spicy Paneer Wrap', time: '2 hours ago', icon: '💾' },
                    { action: 'Liked a post', item: 'Butter Chicken Biryani', time: '5 hours ago', icon: '❤️' },
                    { action: 'Saved a reel', item: 'Chocolate Lava Cake', time: '1 day ago', icon: '💾' },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex gap-4 items-start pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-3xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold">
                          {activity.action} <span className="text-orange-500">{activity.item}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      <BottomNav />
    </div>
  )
}

export default UserProfile
