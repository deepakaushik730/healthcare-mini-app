const express = require("express")
const path = require("path")
const cookieparser = require("cookie-parser")
require("dotenv").config()

if (!process.env.jwt_secret || !process.env.mongodb_uri) {
  console.log("missing required env vars: jwt_secret and mongodb_uri must be set")
  process.exit(1)
}

const connectdb = require("./config/db")
const authroutes = require("./routes/authroutes")
const healthroutes = require("./routes/healthroutes")

const app = express()
const isproduction = process.env.NODE_ENV === "production"

connectdb()

app.disable("x-powered-by")
// Hosts like Render terminate TLS at a proxy; needed for correct req.ip in rate limiting.
if (isproduction) app.set("trust proxy", 1)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))

app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "same-origin",
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join("; ")
  })
  if (isproduction) {
    res.set("Strict-Transport-Security", "max-age=15552000; includeSubDomains")
  }
  next()
})

// Flat parsing keeps every field a string, so `email[$ne]=x` can't become a query object.
app.use(express.urlencoded({ extended: false, limit: "10kb" }))
app.use(express.json({ limit: "10kb" }))
app.use(cookieparser())

app.use(express.static(path.join(__dirname, "../public")))

app.use(authroutes)
app.use(healthroutes)

app.get("/", (req, res) => {
  res.redirect("/login")
})

app.use((req, res) => {
  res.status(404).send("page not found")
})

app.use((err, req, res, next) => {
  console.log(err)
  if (res.headersSent) return next(err)
  const status = err.status || err.statusCode || 500
  res.status(status >= 400 && status < 600 ? status : 500).send(status < 500 ? "bad request" : "something went wrong")
})

const port = process.env.PORT || process.env.port || 3000
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
