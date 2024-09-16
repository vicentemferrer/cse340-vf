/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

const static = require("./routes/static")

// Index content
const VEHICLE = "DMC DeLorean"

const index = {
  title: "Home",
  hero: {
    content: {
      title: VEHICLE,
      features: ["3 Cup holders", "Superman doors", "Fuzzy dice!"]
    },
    img: {
      alt: VEHICLE,
      src: "delorean"
    }
  },
  reviews: {
    title: VEHICLE,
    list: [
      {
        content: "So fast it's almost like traveling in time.",
        rate: 4
      },
      {
        content: "Coolest ride on the road.",
        rate: 4
      },
      {
        content: "I\'m feeling McFly!",
        rate: 5
      },
      {
        content: "The most futuristic ride of our way.",
        rate: 4.5
      },
      {
        content: "80's livin and I love it!",
        rate: 5
      }
    ]
  },
  upgrades: {
    title: VEHICLE,
    list: [
      {
        src: "flux-cap.png",
        alt: "Flux Capacitor"
      },
      {
        src: "flame.jpg",
        alt: "Flame Decals"
      },
      {
        src: "bumper_sticker.jpg",
        alt: "Bumper Stickers"
      },
      {
        src: "hub-cap.jpg",
        alt: "Hub Caps"
      }
    ]
  }
}

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
app.get("/", (req, res) => {
  res.render("index", { ...index })
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
