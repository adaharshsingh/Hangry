const userModel= require("../models/user.model")
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken')
const foodModel= require("../models/food.model")

// Helper function to get cookie options based on environment
function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: true, // Always secure for HTTPS
        sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-domain (production), 'Lax' for localhost
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
}

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

        res.cookie("token",token, getCookieOptions())
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

    res.cookie("token",token, getCookieOptions())
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
    res.clearCookie("token", getCookieOptions());
    res.status(200).json({message:"Logout SuccessFull"})
}

async function registerFood(req,res){
    const { name, email, password,phone,address,contactName } = req.body;

    const isFoodAlreadyExist = await foodModel.findOne({ email });  
    if (isFoodAlreadyExist) {
        return res.status(400).json({ message: "Shop already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const food = await foodModel.create({
        name,
        email,
        password: hashPassword,
            phone,
            address,
            contactName
    });
    const token = jwt.sign({
        id:food._id
    },process.env.JWT_SECRET)
    res.cookie("token",token, getCookieOptions())
    res.status(201).json({
        message:" Shopkeeper Registered SuccessFully",
        food:{
            id: food._id,
            name: food.name,
            email: food.email,
            address: food.address,
            phone: food.phone,
            contactName: food.contactName
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
    res.cookie("token",token, getCookieOptions())
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
    res.clearCookie("token", getCookieOptions());
    res.status(200).json({message:"Logout SuccessFull"})
}

async function getUserProfile(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ user });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

async function getFoodPartnerProfile(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodModel.findById(decoded.id).select('-password');
        
        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }
        
        res.status(200).json({ foodPartner });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    registerUser,loginUser,logoutUser,getUserProfile,
    registerFood,loginFood,logoutFood,getFoodPartnerProfile
}