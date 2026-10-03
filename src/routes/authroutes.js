const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/authcontroller")

router.get("/register", (req, res) => {
  res.render("register", { error: null })
})

router.post("/register", register)

router.get("/login", (req, res) => {
  res.render("login", { error: null })
})

router.post("/login", login)

const logout = (req, res) => {
  res.clearCookie("token")
  res.set("Cache-Control", "no-store")
  res.redirect(303, "/login")
}

router.post("/logout", logout)
router.get("/logout", logout)

module.exports = router
