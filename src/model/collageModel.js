const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'College name should be present'],
        unique: true,
        lowercase: true
    },

    fullName: {
        type: String,
        required: [true, 'Please enter full name of college'],
        unique: true,
        lowercase: true
    },

    logoLink: {
        type: String,
        url: String,
        require: true,
        trim: true

    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true }


);

module.exports = mongoose.model("college", collegeSchema);