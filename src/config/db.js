const mongoose = require("mongoose")

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri)
    console.log("mongodb connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectdb
