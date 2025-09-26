const express= require('express');
const router= express.Router();
const itemController= require('../controllers/item.controller');
const authMiddleware= require('../middleware/auth.middleware');

router.post('/',authMiddleware.authFoodMiddleware,itemController.createItem);
module.exports= router;