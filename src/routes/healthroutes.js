const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")

const {
  gethealthform,
  submithealth,
  gethistory,
  getdashboard
} = require("../controllers/healthcontroller")

router.get("/dashboard", authmiddleware, getdashboard)
router.get("/health", authmiddleware, gethealthform)
router.post("/health", authmiddleware, submithealth)
router.get("/history", authmiddleware, gethistory)

module.exports = router
