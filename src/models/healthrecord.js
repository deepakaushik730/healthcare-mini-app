const mongoose = require("mongoose")

const levels = ["low", "medium", "high"]

const healthrecordschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true
  },
  sleep: { type: Number, min: 1, max: 5, required: true },
  stress: { type: Number, min: 1, max: 5, required: true },
  appetite: { type: String, enum: levels, required: true },
  activity: { type: String, enum: levels, required: true },
  tiredness: { type: Number, min: 1, max: 5, required: true },
  score: Number,
  recommendation: String,
  createdat: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("healthrecord", healthrecordschema)
