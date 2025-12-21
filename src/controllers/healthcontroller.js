const healthrecord = require("../models/healthrecord")

const gethealthform = (req, res) => {
  res.render("healthform")
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

const submithealth = async (req, res) => {
  const { sleep, stress, appetite, activity, tiredness } = req.body

  const result = calculatehealth({
    sleep: Number(sleep),
    stress: Number(stress),
    appetite,
    activity,
    tiredness: Number(tiredness)
  })

  await healthrecord.create({
    user: req.userid,
    sleep,
    stress,
    appetite,
    activity,
    tiredness,
    score: result.score,
    recommendation: result.recommendation
  })

  res.redirect("/dashboard")
}


const gethistory = async (req, res) => {
  const records = await healthrecord
    .find({ user: req.userid })
    .sort({ createdat: -1 })

  res.render("history", { records })
}

const getdashboard = async (req, res) => {
  const records = await healthrecord
    .find({ user: req.userid })
    .sort({ createdat: 1 })

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

