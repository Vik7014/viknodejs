const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    //_id:{
       // type:ObjectId,
    
   // },
    name: String,
    author: {
        type: ObjectId,
        ref: "Author",
        required:true
    },
    ratings: Number,
    publisher:{
        type:ObjectId,
        ref:"publisher",
        required:true
    },
    isHardCover:{
        type: Boolean,
        default: false
    }
    


}, { timestamps: true });


module.exports = mongoose.model('LibraryBook', bookSchema)