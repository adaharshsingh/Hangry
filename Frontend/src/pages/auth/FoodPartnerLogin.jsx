import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/auth/food/login`,
        { email, password },
        { withCredentials: true }
      );

      // Always remember user - store preference
      localStorage.setItem('rememberMe', 'true');

      // Update auth context with remember me always true
      login(response.data.foodPartner, 'food-partner', true);

      navigate('/food/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-950 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="fixed top-0 -left-32 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, delay: 3 }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 mb-3 shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">🍽️</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-1">Partner Portal</h1>
          <p className="text-teal-200 text-sm">Manage your restaurant & grow</p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-emerald-800/40 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-8 shadow-2xl space-y-6 max-h-[70vh] overflow-y-auto"
          variants={itemVariants}
        >
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-semibold text-teal-100 mb-3">
              Business Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="business@restaurant.com"
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 bg-emerald-700/50 border border-teal-500/50 rounded-lg text-white placeholder-teal-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-semibold text-teal-100 mb-3">
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 bg-emerald-700/50 border border-teal-500/50 rounded-lg text-white placeholder-teal-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
            />
          </motion.div>

          {/* Quick stats info */}
          <motion.div
            className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4"
            variants={itemVariants}
          >
            <p className="text-teal-200 text-sm font-medium mb-2">What you get:</p>
            <div className="space-y-1 text-xs text-teal-300">
              <p>✓ Real-time order management</p>
              <p>✓ Analytics & insights</p>
              <p>✓ Menu customization</p>
            </div>
          </motion.div>

          {/* Reset password link */}
          <motion.div
            className="flex justify-end text-sm"
            variants={itemVariants}
          >
            <a href="#" className="text-teal-300 hover:text-teal-200 font-medium">
              Reset password
            </a>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:from-teal-700 disabled:to-emerald-800 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Accessing dashboard...
              </>
            ) : (
              <>
                <span>Partner Sign In</span>
                <span>→</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Signup Link */}
        <motion.div
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="text-teal-200">
            New partner?{' '}
            <Link
              to="/food/register"
              className="text-purple-400 hover:text-teal-200 font-bold transition"
            >
              Register your restaurant
            </Link>
          </p>
          
        </motion.div>
      </motion.div>
      </div>
    </div>
    </>
  );
};

export default FoodPartnerLogin;