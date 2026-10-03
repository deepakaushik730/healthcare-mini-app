const express = require("express")
const router = express.Router()
const { register, login, logout, logoutlocal } = require("../controllers/authcontroller")
const ratelimit = require("../middleware/ratelimit")

const loginlimiter = ratelimit({
  windowms: 15 * 60 * 1000,
  max: 10,
  view: "login",
  message: "too many login attempts, please try again later"
})

const registerlimiter = ratelimit({
  windowms: 60 * 60 * 1000,
  max: 10,
  view: "register",
  message: "too many accounts created, please try again later"
})

router.get("/register", (req, res) => {
  res.render("register", { error: null })
})

router.post("/register", registerlimiter, register)

router.get("/login", (req, res) => {
  res.render("login", { error: null })
})

router.post("/login", loginlimiter, login)

router.post("/logout", logout)
router.get("/logout", logoutlocal)

module.exports = router
