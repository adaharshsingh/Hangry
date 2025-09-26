const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    video: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    food: {type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true},

})

const itemModel= mongoose.model('item',itemSchema);
module.exports= itemModel;