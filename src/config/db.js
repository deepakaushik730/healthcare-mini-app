const mongoose = require("mongoose")

const getMongoUri = () =>
  process.env.mongodb_uri ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI

const connectdb = async () => {
  const uri = getMongoUri()
  if (!uri) {
    throw new Error(
      "mongodb connection string is not set (set mongodb_uri or MONGODB_URI on Render)"
    )
  }

  try {
    await mongoose.connect(uri)
    console.log("mongodb connected")
  } catch (error) {
    if (error.code === "ENOTFOUND" && error.syscall === "querySrv") {
      console.error(
        "MongoDB SRV DNS lookup failed. The cluster hostname in your connection string is invalid or the Atlas cluster was removed. In Atlas: Database → Connect → copy a new connection string, then update mongodb_uri in Render Environment."
      )
    }
    throw error
  }
}

module.exports = connectdb
