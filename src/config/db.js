const mongoose = require("mongoose")

const connectdb = async () => {
  try {
    const uri =
      process.env.mongodb_uri ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URI
    if (!uri) {
      throw new Error("mongodb connection string is not set")
    }
    await mongoose.connect(uri)
    console.log("mongodb connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectdb
