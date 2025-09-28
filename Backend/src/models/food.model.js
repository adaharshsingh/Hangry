const mongoose = require('mongoose');
const foodSchema =new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    contactName: {type: String, required: true},
    phone:{type: String, required: true},
    address: {type: String, required: true},
})


const food= mongoose.model('food',foodSchema);
module.exports= food;