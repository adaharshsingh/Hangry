const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    video: {type: String, },
    description: {type: String},
    food: {type: mongoose.Schema.Types.ObjectId, ref: 'food'},

})

const itemModel= mongoose.model('item',itemSchema);
module.exports= itemModel;