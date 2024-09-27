const { getNav } = require("../utilities/")

const baseController = {}

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

baseController.buildHome = async (req, res) => {
    const nav = await getNav()

    res.render("index", {
        ...index, nav,
        errors: null
    })
}

module.exports = baseController