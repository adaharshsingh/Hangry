import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate all fields
    if (!formData.businessName.trim() || !formData.contactName.trim() || !formData.phone.trim() || 
        !formData.address.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const data = {
        name: formData.businessName,
        contactName: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        address: formData.address,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/auth/food/register`,
        data,
        { withCredentials: true }
      );

      if (response.data) {
        navigate('/food/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 p-4 relative overflow-y-auto">
        {/* Animated background elements */}
        <motion.div
          className="fixed top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="fixed bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        />

        <div className="relative z-10 flex items-center justify-center min-h-screen py-8">
          <motion.div
            className="w-full max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div className="text-center mb-6" variants={itemVariants}>
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 mb-3 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-1">Grow Your Business</h1>
              <p className="text-purple-200 text-sm">Register your restaurant</p>
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
            <motion.div
              className="bg-purple-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl"
              variants={itemVariants}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Business Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="businessName" className="block text-xs font-bold text-purple-200 mb-1">
                    Restaurant Name *
                  </label>
                  <motion.input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Tasty Bites"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-3 py-2 bg-purple-800/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                  />
                </motion.div>

                {/* Contact Name & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="contactName" className="block text-xs font-bold text-purple-200 mb-1">
                      Your Name *
                    </label>
                    <motion.input
                      type="text"
                      id="contactName"
                      name="contactName"
                      placeholder="Jane Doe"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-3 py-2 bg-purple-800/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="block text-xs font-bold text-purple-200 mb-1">
                      Phone *
                    </label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-3 py-2 bg-purple-800/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                    />
                  </motion.div>
                </div>

                {/* Address */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="address" className="block text-xs font-bold text-purple-200 mb-1">
                    Address *
                  </label>
                  <motion.input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="123 Main St, City, State"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-3 py-2 bg-purple-800/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-xs font-bold text-purple-200 mb-1">
                    Business Email *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="business@restaurant.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-3 py-2 bg-purple-800/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                  />
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-xs font-bold text-purple-200 mb-1">
                    Password *
                  </label>
                  <motion.input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-3 py-2 bg-purple-800/50 border border-purple-500/50 rounded-lg text-white text-sm placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                  />
                  <p className="text-xs text-purple-300 mt-1">Must be at least 8 characters</p>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-purple-700 disabled:to-purple-800 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg mt-6 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <span>🎉</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Links */}
            <motion.div className="text-center mt-4" variants={itemVariants}>
              <p className="text-teal-400 text-sm">
                Already registered?{' '}
                <Link to="/food/login" className="text-teal-200 hover:text-white font-bold transition">
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

export default FoodPartnerRegister;