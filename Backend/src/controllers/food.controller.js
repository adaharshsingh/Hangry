const foodModel= require('../models/food.model');
const itemModel= require('../models/item.model');
async function getFoodById(req,res)
{
    const foodId= req.params.id;
    const food= await foodModel.findById(foodId);
    const itemByFood= await itemModel.find({food: foodId});
    if(!food)
    {
        return res.status(404).json({message:"Food not found"});
    }
    res.status(200).json({
        message:"Food fetched successfully",
        food:{
            ...food.toObject(),
            items: itemByFood
        }});
}

module.exports={getFoodById};