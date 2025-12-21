const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")
const { gethealthform, submithealth } = require("../controllers/healthcontroller")

router.get("/dashboard", authmiddleware, (req, res) => {
  res.render("dashboard", { score: null, recommendation: null })
})

router.get("/health", authmiddleware, gethealthform)
router.post("/health", authmiddleware, submithealth)

module.exports = router
