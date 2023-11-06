const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    _id : {type:mongoose.Schema(),required: true},
    title : {type:String},
    author: {type:String},
    summary : {type:String},
    genre: {type:String},
    publicationDate: {type:Number},
    price: {type:Number},
    coverImageUrl: {type:String},
    publisher: {type:String},
    language: {type:String},
},
    {
        timestamps: true,
        versionKey : false
    }
);

module.exports = mongoose.model("Book", bookSchema);