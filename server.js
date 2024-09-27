/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")

const { getNav, handleErrors } = require("./utilities/")
const pool = require("./database/")

require("dotenv").config()

const app = express()

const baseController = require("./controllers/baseController")

const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const serverErrorRoute = require("./routes/errorRoute")

/* ***********************
 * Middleware
 *************************/

app.use(session({
  store: new (require("connect-pg-simple")(session))({
    createTableIfMissing: true,
    pool
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId'
}))

// Express Messages Middleware

app.use(require("connect-flash")())
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res)
  next()
})

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", handleErrors(baseController.buildHome))

app.use('/inv', inventoryRoute)
app.use('/account', accountRoute)
app.use('/some', serverErrorRoute)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  const nav = await getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.status ? err.message : 'Oh no! There was a crash. Maybe try a different route?',
    nav,
    errors: null
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on http://${host}:${port}`)
})
