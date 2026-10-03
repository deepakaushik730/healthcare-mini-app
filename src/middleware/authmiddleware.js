const jwt = require("jsonwebtoken")

const authmiddleware = (req, res, next) => {
  // Prevents the Back button from showing protected pages after logout.
  res.set("Cache-Control", "no-store")

  const token = req.cookies?.token

  if (!token) {
    return res.redirect("/login")
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret)
    req.userid = decoded.id
    next()
  } catch (error) {
    res.redirect("/login")
  }
}

module.exports = authmiddleware
