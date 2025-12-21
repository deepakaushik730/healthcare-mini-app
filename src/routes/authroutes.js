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

router.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.redirect("/login")
})

module.exports = router
