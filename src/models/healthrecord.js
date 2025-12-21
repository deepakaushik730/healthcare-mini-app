const mongoose = require("mongoose")

const healthrecordschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  sleep: Number,
  stress: Number,
  appetite: String,
  activity: String,
  tiredness: Number,
  score: Number,
  recommendation: String,
  createdat: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("healthrecord", healthrecordschema)
