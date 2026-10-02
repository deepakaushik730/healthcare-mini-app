const user = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existinguser = await user.findOne({ email })
    if (existinguser) {
      return res.render("register", { error: "email already exists" })
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    await user.create({
      name,
      email,
      password: hashedpassword
    })

    res.redirect("/login")
  } catch (error) {
    res.render("register", { error: "something went wrong" })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const founduser = await user.findOne({ email })
    if (!founduser) {
      return res.render("login", { error: "invalid credentials" })
    }

    const match = await bcrypt.compare(password, founduser.password)
    if (!match) {
      return res.render("login", { error: "invalid credentials" })
    }

    const token = jwt.sign(
      { id: founduser._id },
      process.env.jwt_secret || process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.redirect("/dashboard")
  } catch (error) {
  console.log(error)
  res.render("register", { error: "something went wrong" })
}

}

module.exports = { register, login }
