const express = require("express")
const path = require("path")
require("dotenv").config()
const cookieparser = require("cookie-parser")

const authroutes = require("./routes/authroutes")
const healthroutes = require("./routes/healthroutes")

const connectdb = require("./config/db")



connectdb()
const app = express()


app.use(authroutes)
app.use(healthroutes)

app.use(cookieparser())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
  res.redirect("/login")
})

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
