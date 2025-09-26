const userModel= require("../models/user.model")
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken')
const foodModel= require("../models/food.model")

async function registerUser(req, res) {
        const { fullName, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user= await userModel.create({
            fullName,
            email,
            password: hashPassword
        });

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token)
        res.status(201).json({
            message:" User Registered SuccessFully",
            user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })
    }
async function loginUser(req, res) {
    const { email, password } = req.body;
    const user= await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"User does not exist"})
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(200).json({
        message:"Login SuccessFull",
        user:{
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}
async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"Logout SuccessFull"})
}

async function registerFood(req,res){
    const { name, email, password } = req.body;

    const isFoodAlreadyExist = await foodModel.findOne({ email });  
    if (isFoodAlreadyExist) {
        return res.status(400).json({ message: "Shop already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const food = await foodModel.create({
        name,
        email,
        password: hashPassword
    });
    const token = jwt.sign({
        id:food._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:" Shopkeeper Registered SuccessFully",
        food:{
            id: food._id,
            name: food.name,
            email: food.email
        }
    })
}
async function loginFood(req, res) {
    const { email, password } = req.body;
    const food= await foodModel.findOne({email});
    if(!food){
        return res.status(400).json({message:"Shop does not exist"})
    }
    const isPasswordValid= await bcrypt.compare(password,food.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const token = jwt.sign({
        id:food._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({
        message:"Login SuccessFull",
        food:{
            id: food._id,
            name: food.name,
            email: food.email
        }
    })
}
async function logoutFood(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"Logout SuccessFull"})
}
module.exports = {
    registerUser,loginUser,logoutUser,
    registerFood,loginFood,logoutFood
}