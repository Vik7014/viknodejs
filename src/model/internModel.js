const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, "please enter your full name "],
      trim: true
  },

  email:{
    type:String,
    required: [true, "email should be present"],
    lowercase:true,
    unique:true,
    match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  mobile: {
      type: Number,
      required: true,
      unique: true,
      match: [ /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,'Please fill a valid mobile number']
  },

  collegeId: {
      type: ObjectId,
      required: true,
      ref: "college",
  },

  isDeleted: {
      type: Boolean,
      default: false,
  },

}, { timestamps: true });

module.exports = mongoose.model("intern", internSchema);