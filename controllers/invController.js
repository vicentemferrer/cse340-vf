const { getInventoryByClassificationId, getInventoryItemById, addClassification, addVehicle, updateInventory, deleteVehicle } = require('../models/inventory-model')
const utilities = require('../utilities')

const invCont = {}

invCont.buildByClassificationId = async (req, res) => {
    const classification_id = req.params.classificationId
    const data = await getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)

    const nav = await utilities.getNav()

    const className = data[0].classification_name

    return res.render("inventory/classification", {
        title: `${className} vehicles`,
        nav,
        grid,
        errors: null
    })
}

invCont.buildByItemId = async (req, res) => {
    const item_id = req.params.itemId
    const data = await getInventoryItemById(item_id)
    const content = await utilities.buildVehicleDetailedView(data)

    const nav = await utilities.getNav()

    const { make, model, year } = data[0]

    return res.render("inventory/detail", {
        title: `${year} ${make} ${model}`,
        nav,
        content,
        errors: null
    })
}

invCont.buildManagementView = async (req, res) => {
    const nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()

    return res.render("inventory/management", {
        title: 'Vehicle Management',
        nav,
        classificationList,
        errors: null
    })
}

invCont.addClassificationView = async (req, res) => {
    const nav = await utilities.getNav()

    return res.render("inventory/add-classification", {
        title: 'Add Classification',
        nav,
        errors: null
    })
}

invCont.addClassification = async (req, res) => {
    const nav = await utilities.getNav()
    const { classification_name } = req.body

    const classResult = await addClassification(classification_name)

    if (classResult) {
        req.flash(
            "notice",
            `${classification_name} was added successfully!`
        )

        return res.status(201).redirect('/inv')
    } else {
        req.flash("notice", "Sorry, classification addition process was aborted.")

        return res.status(501).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: null
        })
    }
}

invCont.addInventoryView = async (req, res) => {
    const nav = await utilities.getNav()

    const classificationList = await utilities.buildClassificationList()

    return res.render("inventory/add-vehicle", {
        title: 'Add Vehicle',
        nav,
        classificationList,
        errors: null
    })
}

invCont.addVehicle = async (req, res) => {
    const nav = await utilities.getNav()
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

    const vehicleResult = await addVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

    const makeModel = `${inv_make} ${inv_model}`

    if (vehicleResult) {
        req.flash(
            "notice",
            `Congratulations! ${makeModel} was added successfully!`
        )

        return res.status(201).redirect('/inv')
    } else {
        const classificationList = await utilities.buildClassificationList(classification_id)

        req.flash("notice", "Sorry, vehicle creation failed.")

        return res.status(501).render("inventory/add-vehicle", {
            title: "Add Vehicle",
            nav,
            classificationList,
            errors: null
        })
    }
}

invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classificationId)
    const invData = await getInventoryByClassificationId(classification_id)

    if (invData[0]?.id) {
        return res.json(invData)
    } else {
        next(new Error("No data returned"))
    }
}

invCont.editInventoryView = async (req, res) => {
    const inv_id = parseInt(req.params.itemId)

    const nav = await utilities.getNav()
    const [itemData] = await getInventoryItemById(inv_id)
    const classificationList = await utilities.buildClassificationList(itemData.classid)

    const itemName = `${itemData.make} ${itemData.model}`

    return res.render("inventory/edit-vehicle", {
        title: `Edit ${itemName}`,
        nav,
        classificationList,
        inv_id: itemData.id,
        inv_make: itemData.make,
        inv_model: itemData.model,
        inv_year: itemData.year,
        inv_description: itemData.description,
        inv_image: itemData.image,
        inv_thumbnail: itemData.thumbnail,
        inv_price: itemData.price,
        inv_miles: itemData.miles,
        inv_color: itemData.color,
        errors: null
    })
}

invCont.updateInventory = async (req, res) => {
    const nav = await utilities.getNav()
    const { inv_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id } = req.body

    const [updateResult] = await updateInventory(
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    )

    if (updateResult) {
        const itemName = `${updateResult.inv_make} ${updateResult.inv_model}`

        req.flash("notice", `The ${itemName} was successfully updated.`)

        return res.redirect("/inv")
    } else {
        const classificationList = await utilities.buildClassificationList(classification_id)
        const itemName = `${inv_make} ${inv_model}`

        req.flash("notice", "Sorry, update failed.")

        return res.status(501).render("inventory/edit-inventory", {
            title: `Edit ${itemName}`,
            nav,
            classificationList,
            errors: null,
            inv_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color
        })
    }
}

invCont.confirmDeletionView = async (req, res) => {
    const inv_id = parseInt(req.params.itemId)

    const nav = await utilities.getNav()
    const [{ id, make, model, year, price }] = await getInventoryItemById(inv_id)

    return res.render("inventory/delete-confirm", {
        title: `Confirm Deletion`,
        nav,
        inv_id: id,
        inv_make: make,
        inv_model: model,
        inv_year: year,
        inv_price: price,
        errors: null
    })
}

invCont.deleteVehicle = async (req, res) => {
    const nav = await utilities.getNav()
    const { inv_id, inv_make, inv_model, inv_price, inv_year } = req.body

    const deleteResult = await deleteVehicle(inv_id)

    const itemName = `${inv_make} ${inv_model}`

    if (deleteResult) {
        req.flash("notice", `The ${itemName} was successfully deleted.`)

        return res.redirect("/inv")
    } else {

        req.flash("notice", "Sorry, deletion failed.")

        return res.status(501).render("inventory/delete-confirm", {
            title: `Confirm Deletion`,
            nav,
            errors: null,
            inv_id,
            inv_make,
            inv_model,
            inv_year,
            inv_price
        })
    }
}

module.exports = invCont