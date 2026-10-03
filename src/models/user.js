const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 254
  },
  password: {
    type: String,
    required: true
  },
  // Bumped on logout so previously issued JWTs stop working.
  tokenversion: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model("user", userschema)
