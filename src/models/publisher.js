const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const publisherSChema = new mongoose.Schema({
    // _id: 
    // {type: ObjectId,
    
    // },
    name: String,
    headQuarter: String
},{timsestamp : true})

module.exports = mongoose.model("publisher", publisherSChema)