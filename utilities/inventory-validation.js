const { body, validationResult } = require("express-validator")

const { getNav, buildClassificationList } = require(".")
const { checkExistingClassification } = require("../models/inventory-model")

/*  **********************************
  *  Classification Data Validation Rules
  * ********************************* */

function classificationRules() {
    return ([
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Please provide a valid classification name.")
            .custom(async (classification_name) => {
                const classificationExists = await checkExistingClassification(classification_name)
                if (classificationExists) {
                    throw new Error("Classification exists. Please add a different classification.")
                }
            })
    ])
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
async function checkClassData(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const nav = await getNav()

        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav
        })

        return
    }

    next()
}

/*  **********************************
  *  Vehicle Data Validation Rules
  * ********************************* */

function vehicleRules() {
    return ([
        body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            .isInt({
                gt: 0
            })
            .withMessage("Please select a vehicle classiffication."),

        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Please provide a maker."),

        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Please provide a model."),

        body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a description."),

        body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 15 })
            .withMessage("Please provide a valid path."),

        body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 15 })
            .withMessage("Please provide a valid path."),

        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isFloat({
                gt: 0,
                locale: 'en-US'
            })
            .withMessage("Please provide a price."),

        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isInt({
                min: 1900,
                max: new Date().getFullYear(),
            })
            .withMessage("Please provide a year."),

        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isInt({
                gt: 0,
                allow_leading_zeroes: false
            })
            .withMessage("Please provide miles quantity."),

        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Please provide a color.")
    ])
}

/* ******************************
 * Check data and return errors or continue to register vehicle
 * ***************************** */
async function checkVehicleData(req, res, next) {
    const { classification_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const nav = await getNav()

        const classificationList = await buildClassificationList(classification_id)

        res.render("inventory/add-vehicle", {
            errors,
            title: "Add Vehicle",
            nav,
            classificationList,
            inv_make,
            inv_model,
            inv_description,
            inv_price,
            inv_year,
            inv_miles,
            inv_color
        })

        return
    }

    next()
}

module.exports = { classificationRules, checkClassData, vehicleRules, checkVehicleData }