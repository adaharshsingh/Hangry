import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';

const UserLogin = () => {
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
        `${import.meta.env.VITE_API}/api/auth/user/login`,
        { email, password },
        { withCredentials: true }
      );

      // Always remember user - store preference
      localStorage.setItem('rememberMe', 'true');

      // Update auth context with remember me always true
      login(response.data.user, 'user', true);

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="fixed top-0 left-0 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="fixed bottom-0 right-0 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
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
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 mb-3 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">🍔</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-1">Welcome Back!</h1>
          <p className="text-slate-300 text-sm">Sign in to explore amazing meals</p>
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
          className="bg-slate-800/40 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8 shadow-2xl space-y-6 max-h-[70vh] overflow-y-auto"
          variants={itemVariants}
        >
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-3">
              Email Address
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-3">
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </motion.div>

          {/* Forgot password */}
          <motion.div
            className="flex justify-end text-sm"
            variants={itemVariants}
          >
            <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
              Forgot password?
            </a>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg"
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
                Signing in...
              </>
            ) : (
              <>
                <span>Sign In</span>
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
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/user/register"
              className="text-orange-500 hover:text-orange-400 font-bold transition"
            >
              Create one
            </Link>
          </p>
          
        </motion.div>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;