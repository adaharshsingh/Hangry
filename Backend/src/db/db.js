const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config();


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection Error", err);
    })

}


module.exports=connectDB;