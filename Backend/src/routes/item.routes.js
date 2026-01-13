const express= require('express');
const router= express.Router();
const itemController= require('../controllers/item.controller');
const authMiddleware= require('../middleware/auth.middleware');
const multer= require('multer');
const upload= multer({
    storage: multer.memoryStorage()
})

// POST and GET for creating/listing items
router.post('/',authMiddleware.authFoodMiddleware,upload.single("video"),itemController.createItem);
router.get("/",authMiddleware.authUserMiddleware,itemController.getItems);

// Specific routes BEFORE parameterized routes
router.post("/like",authMiddleware.authUserMiddleware,itemController.likeItem);
router.post('/save',authMiddleware.authUserMiddleware,itemController.getSavedItems);
router.get('/save', authMiddleware.authUserMiddleware, itemController.getSavedfoodItems);

// Parameterized routes AFTER specific routes
router.get("/:id",authMiddleware.authUserMiddleware,itemController.getItemById);
router.put("/:id",authMiddleware.authFoodMiddleware,upload.single("video"),itemController.updateItem);
router.delete("/:id",authMiddleware.authFoodMiddleware,itemController.deleteItem);

module.exports= router;