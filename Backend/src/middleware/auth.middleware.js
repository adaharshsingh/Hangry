const foodModel = require("../models/food.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodMiddleware(req, res, next) {
  const token = req.cookies?.token; // safer optional chaining
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: LogIn first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const food = await foodModel.findById(decoded.id);
    req.food = food;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: LogIn first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = { authFoodMiddleware ,authUserMiddleware};
