import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors">
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
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="hover:text-orange-500 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="hover:text-orange-500 transition-colors">
                  How it Works
                </a>
                <a href="#about" className="hover:text-orange-500 transition-colors">
                  About
                </a>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Login Button */}
                <Link
                  to="/choose"
                  className="hidden md:block px-6 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  Login
                </Link>
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
                <a href="#features" className="block hover:text-orange-500">
                  Features
                </a>
                <a href="#how-it-works" className="block hover:text-orange-500">
                  How it Works
                </a>
                <a href="#about" className="block hover:text-orange-500">
                  About
                </a>
                <Link to="/choose" className="block text-orange-500">
                  Login
                </Link>
              </motion.div>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover Your{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Next Favorite
                </span>{' '}
                Food
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Crave connects food lovers with incredible local restaurants and food partners. Discover new flavors,
                save your favorites, and support local businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/user/register"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Get Started as User
                </Link>
                <Link
                  to="/food/register"
                  className="px-8 py-3 rounded-lg border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
                >
                  Join as Food Partner
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.img 
                src="/logo.png" 
                alt="Crave Logo" 
                className="h-56 w-56 md:h-64 md:w-64 object-contain hover:opacity-60 transition-opacity duration-200"
                whileTap={{ scale: 0.95 }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 dark:bg-gray-800 py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Hangry?</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: '🔍',
                  title: 'Discover',
                  description: 'Find amazing food from local restaurants and food partners in your area',
                },
                {
                  icon: '❤️',
                  title: 'Save Favorites',
                  description: 'Save your favorite dishes and restaurants for quick access later',
                },
                {
                  icon: '⭐',
                  title: 'Reviews & Ratings',
                  description: 'Read authentic reviews and ratings from other food enthusiasts',
                },
                {
                  icon: '📱',
                  title: 'Easy to Use',
                  description: 'Intuitive interface designed for food lovers of all ages',
                },
                {
                  icon: '🚀',
                  title: 'Connect',
                  description: 'Connect with food partners and get exclusive deals and offers',
                },
                {
                  icon: '🌟',
                  title: 'Support Local',
                  description: 'Support local businesses and help communities grow',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {[
              { step: 1, title: 'Sign Up', description: 'Create your account as a food lover or food partner' },
              { step: 2, title: 'Explore', description: 'Browse amazing food options from local restaurants' },
              { step: 3, title: 'Discover', description: 'Find your favorite dishes and save them for later' },
              { step: 4, title: 'Connect', description: 'Support local businesses and get exclusive offers' },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="flex gap-8 items-center">
                <div className="hidden sm:flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  {index < 3 && <div className="w-1 h-24 bg-orange-300 mx-4"></div>}
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Crave?</h2>
            <p className="text-xl opacity-90">Join thousands of food lovers and local restaurants on Crave today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/user/register"
                className="px-8 py-3 rounded-lg bg-white text-orange-500 font-semibold hover:shadow-lg transition-all"
              >
                Register as User
              </Link>
              <Link
                to="/food/register"
                className="px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
              >
                Register as Partner
              </Link>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="flex justify-center"
            >
              <span className="text-8xl">🍜</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">About Crave</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Crave is a community-driven platform that connects food enthusiasts with local restaurants and food
                partners. We believe in the power of good food to bring people together and support local communities.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Whether you're looking to discover new flavors or promote your food business, Crave is your go-to
                platform for all things food.
              </p>
              <ul className="space-y-3">
                {['Community-Driven', 'Local Support', 'Easy to Use', 'Secure & Safe'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🍔</span>
                  <span className="text-xl font-bold">Crave</span>
                </div>
                <p className="text-gray-400">Discover your next favorite food.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition-colors">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Get Started</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to="/user/register" className="hover:text-white transition-colors">
                      User Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/login" className="hover:text-white transition-colors">
                      User Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/food/register" className="hover:text-white transition-colors">
                      Partner Register
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">&copy; 2026 Crave. All rights reserved.</p>
              <div className="flex gap-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Landing
