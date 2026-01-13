import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {
  const [isMenuOpen] = useState(false)

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
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-screen flex flex-col items-center justify-center px-4 py-6"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 left-10 text-6xl opacity-10 dark:opacity-5"
            >
              🍕
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute bottom-40 right-10 text-6xl opacity-10 dark:opacity-5"
            >
              🍔
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 right-20 text-6xl opacity-10 dark:opacity-5"
            >
              🍜
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="w-full max-w-2xl">
            {/* Card Container */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  Welcome to
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex justify-center mb-4"
                >
                  <img src="/logo.png" alt="Crave Logo" className="h-20 w-20 sm:h-24 sm:w-24 object-contain" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-300"
                >
                  Choose your role to get started
                </motion.p>
              </div>

              {/* Options Grid */}
              <div className="space-y-4 mb-8">
                {/* User Option */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/user/register"
                    className="block p-6 rounded-xl border-2 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/20 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity"
                      animate={{ x: [0, 100, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                      <span className="text-4xl">👤</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">I'm a Food Lover</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Discover, save, and share your favorite foods
                        </p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl"
                      >
                        →
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>

                {/* Food Partner Option */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/food/register"
                    className="block p-6 rounded-xl border-2 border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-900/20 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity"
                      animate={{ x: [0, -100, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="relative z-10 flex items-center gap-4">
                      <span className="text-4xl">👨‍🍳</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">I'm a Food Partner</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Showcase your food business and grow your audience
                        </p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl"
                      >
                        →
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Sign In Link */}
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Already have an account?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/user/login"
                    className="px-6 py-2 rounded-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-semibold"
                  >
                    User Sign In
                  </Link>
                  <Link
                    to="/food/login"
                    className="px-6 py-2 rounded-lg border-2 border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all font-semibold"
                  >
                    Partner Sign In
                  </Link>
                </div>
              </motion.div>

              {/* Back to Home */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <span>←</span> Back to Home
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChooseRegister;