const express= require('express');
const router= express.Router();
const itemController= require('../controllers/item.controller');
const authMiddleware= require('../middleware/auth.middleware');
const multer= require('multer');
const upload= multer({
    storage: multer.memoryStorage()
})

router.post('/',authMiddleware.authFoodMiddleware,upload.single("video"),itemController.createItem);
router.get('/',authMiddleware.authUserMiddleware,itemController.getItems);
module.exports= router;