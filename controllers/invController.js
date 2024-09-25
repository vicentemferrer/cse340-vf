const { getInventoryByClassificationId, getInventoryItemById, addClassification, addVehicle } = require('../models/inventory-model')
const utilities = require('../utilities')

const invCont = {}

invCont.buildByClassificationId = async (req, res, next) => {
    const classification_id = req.params.classificationId
    const data = await getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)

    const nav = await utilities.getNav()

    const className = data[0].classification_name

    res.render("inventory/classification", {
        title: `${className} vehicles`,
        nav,
        grid
    })
}

invCont.buildByItemId = async (req, res, next) => {
    const item_id = req.params.itemId
    const data = await getInventoryItemById(item_id)
    const content = await utilities.buildVehicleDetailedView(data)

    const nav = await utilities.getNav()

    const { make, model, year } = data[0]

    res.render("inventory/detail", {
        title: `${year} ${make} ${model}`,
        nav,
        content,
        errAnchor: 'some/sunny/day',
        errors: null
    })
}

// invCont.buildManagement = async (req, res) => {
//     const nav = await utilities.getNav()

//     res.render("inventory/management", {
//         title: 'Vehicle Management',
//         nav,
//         errors: null
//     })
// }

// invCont.buildAddClassification = async (req, res) => {
//     const nav = await utilities.getNav()

//     res.render("inventory/add-classification", {
//         title: 'Add Classification',
//         nav,
//         errors: null
//     })
// }

// invCont.addClassification = async (req, res) => {
//     const { classification_name } = req.body

//     const classResult = await addClassification(classification_name)
//     const nav = await utilities.getNav()

//     if (classResult) {
//         req.flash(
//             "notice",
//             `${classification_name} was added successfully!`
//         )

//         res.status(201).render("inventory/management", {
//             title: "Vehicle Management",
//             nav,
//             errors: null
//         })
//     } else {
//         req.flash("notice", "Sorry, classification addition process was aborted.")

//         res.status(501).render("inventory/add-classification", {
//             title: "Add Classification",
//             nav,
//             errors: null
//         })
//     }
// }

// invCont.buildAddVehicle = async (req, res) => {
//     const nav = await utilities.getNav()

//     const classificationList = await utilities.buildClassificationList()

//     res.render("inventory/add-vehicle", {
//         title: 'Add Vehicle',
//         nav,
//         classificationList,
//         inv_image: '/images/vehicles/no-image.png',
//         inv_thumbnail: '/images/vehicles/no-image-tn.png',
//         errors: null
//     })
// }

// invCont.addVehicle = async (req, res) => {
//     const nav = await utilities.getNav()
//     const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

//     const vehicleResult = await addVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

//     const makeModel = `${inv_make} ${inv_model}`

//     if (vehicleResult) {
//         req.flash(
//             "notice",
//             `Congratulations! ${makeModel} was added successfully!`
//         )

//         res.status(201).render("inventory/management", {
//             title: "Vehicle Management",
//             nav,
//             errors: null
//         })
//     } else {
//         req.flash("notice", "Sorry, vehicle creation failed.")

//         res.status(501).render("inventory/add-vehicle", {
//             title: "Add Vehicle",
//             nav,
//             errors: null
//         })
//     }
// }

module.exports = invCont