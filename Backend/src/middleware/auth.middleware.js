const foodModel = require("../models/food.model");
const jwt= require('jsonwebtoken')

async function authFoodMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const food= await foodModel.findById(decoded.id);
    req.food= food;
    next();
}
catch (err)
{
    return res.status(401).json({message:"Unauthorized token"})
}
}

module.exports={authFoodMiddleware}