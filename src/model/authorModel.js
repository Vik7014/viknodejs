const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    enum: ["Mr", "Mrs", "Miss"]
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })


module.exports = mongoose.model('AuthorPro', authorSchema)