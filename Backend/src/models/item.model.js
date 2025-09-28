const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    video: {type: String,required: true},
    description: {type: String},
    food: {type: mongoose.Schema.Types.ObjectId, ref: 'food'},
    likeCount: {type: Number, default: 0},
    savesCount: {type: Number, default: 0}

})

const itemModel= mongoose.model('item',itemSchema);
module.exports= itemModel;