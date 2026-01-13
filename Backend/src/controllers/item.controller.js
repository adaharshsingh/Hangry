const itemModel = require('../models/item.model');
const likeModel = require('../models/like.model');
const saveModel = require('../models/save.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createItem(req, res) {
  try {
    console.log("Request body:", req.body);
    console.log("Request food:", req.food);
    console.log("Request file:", req.file);

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!req.food || !req.food._id) {
      return res.status(400).json({ message: "Missing food context" });
    }

    const fileUploadResult = await storageService.uploadImage(req.file.buffer, uuid());
    console.log("File upload result:", fileUploadResult);

    const foodItem = await itemModel.create({
      name: req.body.name,
      description: req.body.description,
      food: req.food._id,
      video: fileUploadResult.url,
    });

    return res.status(201).json({ message: "Item created successfully", foodItem });
  } catch (err) {
    console.error("Error in createItem:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getItems(req, res) {
  try {
    const items = await itemModel.find().populate('food');
    return res.status(200).json({ message: "Items fetched successfully", items });
  } catch (err) {
    console.error("Error in getItems:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function likeItem(req, res) {
  try {
    const { itemId } = req.body;
    const user = req.user;

    if (!itemId) return res.status(400).json({ message: "Missing itemId" });
    if (!user || !user._id) return res.status(401).json({ message: "Unauthorized" });

    const isLiked = await likeModel.findOne({ user: user._id, item: itemId });
    if (isLiked) {
      await likeModel.deleteOne({ user: user._id, item: itemId });
      await itemModel.findByIdAndUpdate(itemId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ message: "Item unliked", like: false });
    }

    await likeModel.create({ user: user._id, item: itemId });
    await itemModel.findByIdAndUpdate(itemId, { $inc: { likeCount: 1 } });
    return res.status(200).json({ message: "Item liked", like: true });
  } catch (err) {
    console.error("Error in likeItem:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function getSavedItems(req, res) {
  try {
    const { itemId } = req.body;
    const user = req.user;

    if (!itemId) return res.status(400).json({ message: "Missing itemId" });
    if (!user || !user._id) return res.status(401).json({ message: "Unauthorized" });

    const isSaved = await saveModel.findOne({ user: user._id, item: itemId });
    if (isSaved) {
      await saveModel.deleteOne({ user: user._id, item: itemId });
      // update the actual item document's savesCount (not the saveModel)
      await itemModel.findByIdAndUpdate(itemId, { $inc: { savesCount: -1 } });
      return res.status(200).json({ message: "Item unsaved", save: false });
    }

    await saveModel.create({ user: user._id, item: itemId });
    await itemModel.findByIdAndUpdate(itemId, { $inc: { savesCount: 1 } });
    return res.status(200).json({ message: "Item saved", save: true });
  } catch (err) {
    console.error("Error in getSavedItems:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getSavedfoodItems(req, res) {
    const user= req.user;
    const savedFoods= await saveModel.find({user: user._id}).populate('item');
    if(!savedFoods)
    {
        return res.status(404).json({message:"No saved foods found"});
    }
    res.status(200).json({message:"Saved foods fetched successfully",savedFoods});
}

async function getItemById(req, res) {
  try {
    const { id } = req.params;
    const item = await itemModel.findById(id).populate('food');
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ message: "Item fetched successfully", item });
  } catch (err) {
    console.error("Error in getItemById:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const food = req.food;

    if (!food || !food._id) {
      return res.status(400).json({ message: "Missing food context" });
    }

    const item = await itemModel.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if food partner owns this item
    if (item.food.toString() !== food._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this item" });
    }

    const updateData = {
      name: req.body.name || item.name,
      description: req.body.description || item.description,
    };

    // If a new video file is uploaded
    if (req.file && req.file.buffer) {
      const fileUploadResult = await storageService.uploadImage(req.file.buffer, uuid());
      updateData.video = fileUploadResult.url;
    }

    const updatedItem = await itemModel.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (err) {
    console.error("Error in updateItem:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const food = req.food;

    if (!food || !food._id) {
      return res.status(400).json({ message: "Missing food context" });
    }

    const item = await itemModel.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if food partner owns this item
    if (item.food.toString() !== food._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this item" });
    }

    await itemModel.findByIdAndDelete(id);
    
    // Also delete associated likes and saves
    await likeModel.deleteMany({ item: id });
    await saveModel.deleteMany({ item: id });

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error in deleteItem:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createItem, getItems, likeItem, getSavedItems, getSavedfoodItems, getItemById, updateItem, deleteItem };
