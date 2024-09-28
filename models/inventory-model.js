const pool = require('../database/')

async function getClassifications() {
    const { rows } = await pool.query('SELECT classification_id id, classification_name name FROM public.classification ORDER BY classification_name')
    return rows
}

async function getInventoryByClassificationId(classification_id) {
    try {
        const { rows } = await pool.query(
            `SELECT inv_id id, inv_make make, inv_model model, inv_thumbnail thumbnail, inv_price price, classification_name FROM public.inventory i JOIN public.classification c ON i.classification_id = c.classification_id WHERE i.classification_id = $1`,
            [classification_id]
        )

        return rows
    } catch (error) {
        console.error(`getclassificationsbyid error ${error}`)
    }
}

async function getInventoryItemById(item_id) {
    try {
        const { rows } = await pool.query(
            `SELECT inv_make make, inv_model model, inv_year AS year, inv_description description, inv_image image, inv_price price, inv_miles miles, inv_color color FROM public.inventory WHERE inv_id = $1`,
            [item_id]
        )

        return rows
    } catch (error) {
        console.error(`getitembyid error ${error}`)
    }
}

async function addClassification(classification_name) {
    try {
        const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"

        return await pool.query(sql, [classification_name])
    } catch (error) {
        return error.message
    }
}

async function checkExistingClassification(classification_name) {
    try {
        const sql = "SELECT * FROM public.classification WHERE classification_name = $1"
        const { rowCount } = await pool.query(sql, [classification_name])

        return rowCount
    } catch (error) {
        return error.message
    }
}

async function addVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
    try {
        const sql = "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"

        return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getClassifications,
    getInventoryByClassificationId,
    getInventoryItemById,
    addClassification,
    checkExistingClassification,
    addVehicle
}