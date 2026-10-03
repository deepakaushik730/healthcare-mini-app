const mongoose = require("mongoose")

// Wraps any `$`-prefixed keys in query filters with $eq, blocking NoSQL operator injection.
mongoose.set("sanitizeFilter", true)

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
