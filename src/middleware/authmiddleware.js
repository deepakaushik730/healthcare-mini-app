const user = require("../models/user")
const { verifytoken, cleartokencookie } = require("../utils/token")

const authmiddleware = async (req, res, next) => {
  // Prevents the Back button from showing protected pages after logout.
  res.set("Cache-Control", "no-store")

  const decoded = verifytoken(req.cookies?.token)

  if (!decoded) {
    cleartokencookie(res)
    return res.redirect("/login")
  }

  try {
    // Rejects tokens of deleted accounts and tokens revoked by logout.
    const founduser = await user.findById(decoded.id).select("tokenversion").lean()
    if (!founduser || (founduser.tokenversion || 0) !== (decoded.tv || 0)) {
      cleartokencookie(res)
      return res.redirect("/login")
    }

    req.userid = founduser._id
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authmiddleware
