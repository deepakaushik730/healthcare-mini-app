const express = require("express")
const path = require("path")
const cookieparser = require("cookie-parser")
require("dotenv").config()

const connectdb = require("./config/db")
const authroutes = require("./routes/authroutes")
const healthroutes = require("./routes/healthroutes")

const app = express()

connectdb()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieparser())

app.use(express.static(path.join(__dirname, "../public")))

app.use(authroutes)
app.use(healthroutes)

app.get("/", (req, res) => {
  res.redirect("/login")
})

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
