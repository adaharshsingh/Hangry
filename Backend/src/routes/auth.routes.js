const express = require('express')
const router= express.Router();
const authController= require('../controllers/auth.controller')

router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.post('/user/logout',authController.logoutUser)
router.post('/food/register',authController.registerFood)
router.post('/food/login',authController.loginFood)
router.post('/food/logout',authController.logoutFood)
module.exports= router;