const jwt = require("jsonwebtoken")

const authmiddleware = (req, res, next) => {
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
