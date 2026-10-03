const jwt = require("jsonwebtoken")

const maxage = 24 * 60 * 60 * 1000

const cookieoptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/"
}

const signtoken = (founduser) =>
  jwt.sign(
    { id: founduser._id.toString(), tv: founduser.tokenversion || 0 },
    process.env.jwt_secret,
    { algorithm: "HS256", expiresIn: "1d" }
  )

// Returns the decoded payload, or null for missing/invalid/expired tokens.
const verifytoken = (token) => {
  if (typeof token !== "string" || token.length === 0) return null
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret, { algorithms: ["HS256"] })
    if (!decoded || typeof decoded.id !== "string") return null
    return decoded
  } catch (error) {
    return null
  }
}

const settokencookie = (res, token) => {
  res.cookie("token", token, { ...cookieoptions, maxAge: maxage })
}

const cleartokencookie = (res) => {
  res.clearCookie("token", cookieoptions)
}

module.exports = { signtoken, verifytoken, settokencookie, cleartokencookie }
