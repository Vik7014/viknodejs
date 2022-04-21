const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const userSchema = new mongoose.Schema({
    // Write the schema content
    name: String,
    balance: {
        type: Number,
        default: 100,
    },
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isFreeAppUser: {
        type: Boolean,
        default: false
    }



}, { timestamps: true });

module.exports = mongoose.model('nmUser', userSchema) //users
// name: "Sabiha Khan",
// 	balance:100, // Default balance at user registration is 100
// 	address:"New delhi",
// 	age: 90,
//  	gender: “female” // Allowed values are - “male”, “female”, “other”
// 	isFreeAppUser: false // Default false value.