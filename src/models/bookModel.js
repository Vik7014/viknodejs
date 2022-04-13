const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String, 
    authorName: String, 
    tags: [String],
    pages : Number,
    stockAvailable : Boolean,
    year: String,
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    // sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book2', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
