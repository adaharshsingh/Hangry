const mongoose= require('mongoose');

const likeSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true 
    }
},{timestamps: true});

const likeModel= mongoose.model('like',likeSchema);
module.exports= likeModel;