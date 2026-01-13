import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      await axios.post(
        `${import.meta.env.VITE_API}/api/auth/user/register`,
        {
          fullName: `${firstName} ${lastName}`,
          email,
          password,
        },
        { withCredentials: true }
      );

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="fixed top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="fixed bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
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
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 mb-4 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl">👨‍🍳</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900">Join the Food Feast</h1>
          <p className="text-gray-600 text-lg">Create your account and start discovering</p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            className="mb-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 space-y-6 max-h-[70vh] overflow-y-auto"
          variants={itemVariants}
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                First Name
              </label>
              <motion.input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300/50 transition"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                Last Name
              </label>
              <motion.input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300/50 transition"
              />
            </motion.div>
          </div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300/50 transition"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300/50 transition"
            />
            <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
          </motion.div>

          {/* Terms checkbox */}
          <motion.label
            className="flex items-start gap-3 cursor-pointer"
            variants={itemVariants}
          >
            <input
              type="checkbox"
              required
              className="w-5 h-5 accent-orange-500 bg-orange-50 border-orange-300 rounded mt-0.5"
            />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-orange-600 font-bold hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-600 font-bold hover:underline">
                Privacy Policy
              </a>
            </span>
          </motion.label>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg"
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
                Creating account...
              </>
            ) : (
              <>
                <span>Create Account</span>
                <span>✨</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Login Link */}
        <motion.div
          className="text-center mt-4"
          variants={itemVariants}
        >
          <p className="text-slate-700 text-sm">
            Already have an account?{' '}
            <Link
              to="/user/login"
              className="text-slate-400 hover:text-white font-bold transition"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;