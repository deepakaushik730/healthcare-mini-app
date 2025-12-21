const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")

router.get("/dashboard", authmiddleware, (req, res) => {
  res.render("dashboard")
})

module.exports = router
