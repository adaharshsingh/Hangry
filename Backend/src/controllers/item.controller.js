const itemModel=require('../models/item.model');
const storageService= require('../services/storage.service');
const {v4:uuid}= require('uuid');

async function createItem(req,res){
     console.log("Request file:", req.body);
     console.log("Request food:", req.food);
     console.log("Request file buffer:", req.file);
    const fileUploadResult = await storageService.uploadImage(req.file.buffer,uuid());
    console.log("File upload result:", fileUploadResult);
    const foodItem= await itemModel.create({
        name:req.body.name,
        description:req.body.description,
        food:req.food._id,
        video:fileUploadResult.url
    })
    res.status(201).json({
        message:"Item created successfully",
        foodItem
    })

}

async function getItems(req,res){
    const items= await itemModel.find({});
    res.status(200).json({
        message:"Items fetched successfully",
        items
    })
}

module.exports={createItem,getItems};