const itemModel=require('../models/item.model');
const storageService= require('../services/storage.service');
const {v4:uuid}= require('uuid');

async function createItem(req,res){
     console.log("Request file:", req.body);
     console.log("Request file buffer:", req.file);
    const fileUploadResult = await storageService.uploadImage(req.file.buffer,uuid());
    const foodItem= await itemModel.create({
        name:req.body.name,
        description:req.body.description,
        foodId:req.food._id,
        videoUrl:fileUploadResult.url
    })
    res.status(201).json({
        message:"Item created successfully",
        foodItem
    })

}

module.exports={createItem}