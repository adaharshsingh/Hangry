const express= require('express');
const router= express.Router();
const foodController= require('../controllers/food.controller');
const authMiddleware= require('../middleware/auth.middleware');
router.get("/:id",authMiddleware.authUserMiddleware,foodController.getFoodById);
module.exports= router;