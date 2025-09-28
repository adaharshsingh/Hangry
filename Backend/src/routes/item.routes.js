const express= require('express');
const router= express.Router();
const itemController= require('../controllers/item.controller');
const authMiddleware= require('../middleware/auth.middleware');
const multer= require('multer');
const upload= multer({
    storage: multer.memoryStorage()
})

router.post('/',authMiddleware.authFoodMiddleware,upload.single("video"),itemController.createItem);
router.get("/",authMiddleware.authUserMiddleware,itemController.getItems);
router.post("/like",authMiddleware.authUserMiddleware,itemController.likeItem);
router.post('/save',authMiddleware.authUserMiddleware,itemController.getSavedItems);
router.get('/save', authMiddleware.authUserMiddleware, itemController.getSavedfoodItems);
module.exports= router;