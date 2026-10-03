const healthrecord = require("../models/healthrecord")

const levels = ["low", "medium", "high"]

const gethealthform = (req, res) => {
  res.render("healthform", { error: null })
}

const calculatehealth = (data) => {
  let score = 0

  score += data.sleep * 10
  score += (6 - data.stress) * 10
  score += (6 - data.tiredness) * 10

  if (data.appetite === "high") score += 10
  if (data.appetite === "medium") score += 5

  if (data.activity === "high") score += 10
  if (data.activity === "medium") score += 5

  let recommendation = "maintain your routine"

  if (score < 50) recommendation = "improve sleep and reduce stress"
  else if (score < 70) recommendation = "add more physical activity"

  return { score, recommendation }
}

// Accepts only whole numbers 1-5 sent as plain strings; anything else returns null.
const parserating = (value) => {
  if (typeof value !== "string" || !/^[1-5]$/.test(value.trim())) return null
  return Number(value.trim())
}

const parselevel = (value) =>
  typeof value === "string" && levels.includes(value) ? value : null

const submithealth = async (req, res) => {
  const data = {
    sleep: parserating(req.body.sleep),
    stress: parserating(req.body.stress),
    tiredness: parserating(req.body.tiredness),
    appetite: parselevel(req.body.appetite),
    activity: parselevel(req.body.activity)
  }

  if (Object.values(data).some((v) => v === null)) {
    return res.status(400).render("healthform", {
      error: "please enter ratings from 1 to 5 and choose valid options"
    })
  }

  const result = calculatehealth(data)

  await healthrecord.create({
    user: req.userid,
    ...data,
    score: result.score,
    recommendation: result.recommendation
  })

  res.redirect(303, "/dashboard")
}


const gethistory = async (req, res) => {
  const records = await healthrecord
    .find({ user: req.userid })
    .select("score recommendation createdat -_id")
    .sort({ createdat: -1 })
    .lean()

  res.render("history", { records })
}

const getdashboard = async (req, res) => {
  const records = await healthrecord
    .find({ user: req.userid })
    .select("score recommendation createdat -_id")
    .sort({ createdat: 1 })
    .lean()

  if (records.length === 0) {
    return res.render("dashboard", {
      score: null,
      recommendation: null,
      chartdata: []
    })
  }

  const latest = records[records.length - 1]

  res.render("dashboard", {
    score: latest.score,
    recommendation: latest.recommendation,
    chartdata: records.map(r => ({
      date: r.createdat.toDateString(),
      score: r.score
    }))
  })
}

module.exports = {
  gethealthform,
  submithealth,
  gethistory,
  getdashboard
}
