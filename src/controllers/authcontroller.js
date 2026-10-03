const user = require("../models/user")
const bcrypt = require("bcrypt")
const { signtoken, verifytoken, settokencookie, cleartokencookie } = require("../utils/token")

const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Used when the email doesn't exist so response timing doesn't reveal registered accounts.
const dummyhash = bcrypt.hashSync("dummy-password-for-timing", 10)

const asstring = (value) => (typeof value === "string" ? value : "")

const register = async (req, res) => {
  try {
    const name = asstring(req.body.name).trim()
    const email = asstring(req.body.email).trim().toLowerCase()
    const password = asstring(req.body.password)

    if (!name || name.length > 100) {
      return res.status(400).render("register", { error: "please enter a valid name" })
    }
    if (!emailpattern.test(email) || email.length > 254) {
      return res.status(400).render("register", { error: "please enter a valid email" })
    }
    // bcrypt silently ignores bytes beyond 72.
    if (password.length < 8 || Buffer.byteLength(password) > 72) {
      return res.status(400).render("register", { error: "password must be 8 to 72 characters" })
    }

    const existinguser = await user.exists({ email })
    if (existinguser) {
      return res.status(409).render("register", { error: "email already exists" })
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    await user.create({
      name,
      email,
      password: hashedpassword
    })

    res.redirect("/login")
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).render("register", { error: "email already exists" })
    }
    console.log(error)
    res.status(500).render("register", { error: "something went wrong" })
  }
}

const login = async (req, res) => {
  try {
    const rawemail = asstring(req.body.email).trim()
    const password = asstring(req.body.password)

    if (!rawemail || !password) {
      return res.status(401).render("login", { error: "invalid credentials" })
    }

    const email = rawemail.toLowerCase()
    // Accounts created before emails were normalised may be stored with original casing.
    const founduser =
      (await user.findOne({ email })) ||
      (email !== rawemail ? await user.findOne({ email: rawemail }) : null)

    const match = await bcrypt.compare(password, founduser ? founduser.password : dummyhash)
    if (!founduser || !match) {
      return res.status(401).render("login", { error: "invalid credentials" })
    }

    settokencookie(res, signtoken(founduser))
    res.redirect("/dashboard")
  } catch (error) {
    console.log(error)
    res.status(500).render("login", { error: "something went wrong" })
  }
}

const logout = async (req, res) => {
  const decoded = verifytoken(req.cookies?.token)
  if (decoded) {
    try {
      await user.updateOne({ _id: decoded.id }, { $inc: { tokenversion: 1 } })
    } catch (error) {
      console.log(error)
    }
  }
  cleartokencookie(res)
  res.set("Cache-Control", "no-store")
  res.redirect(303, "/login")
}

// GET can be triggered cross-site (e.g. <img src="/logout">), so it only clears this browser's cookie.
const logoutlocal = (req, res) => {
  cleartokencookie(res)
  res.set("Cache-Control", "no-store")
  res.redirect(303, "/login")
}

module.exports = { register, login, logout, logoutlocal }
