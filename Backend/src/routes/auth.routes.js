const express = require('express')
const router= express.Router();
const authController= require('../controllers/auth.controller')

router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.post('/user/logout',authController.logoutUser)
router.get('/user/me',authController.getUserProfile)

router.post('/food/register',authController.registerFood)
router.post('/food/login',authController.loginFood)
router.post('/food/logout',authController.logoutFood)
router.get('/food-partner/me',authController.getFoodPartnerProfile)

// Generic logout endpoint (works for both users and food partners)
router.post('/logout',authController.logoutUser)

module.exports= router;