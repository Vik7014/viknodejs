const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const productSchema = new mongoose.Schema({


    name: String,
    category : String,
    price: {
        type: Number,
        require: true
    }
},{timestamps:true})

module.exports = mongoose.model('product',productSchema) 


// name:"Catcher in the Rye",
// 	category:"book",
// 	price:70 //mandatory property