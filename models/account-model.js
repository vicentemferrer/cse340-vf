const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
    try {
        const sql = "INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"

        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
        return error.message
    }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
    try {
        const sql = "SELECT * FROM public.account WHERE account_email = $1"
        const { rowCount } = await pool.query(sql, [account_email])

        return rowCount
    } catch (error) {
        return error.message
    }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail(account_email) {
    try {
        const sql = "SELECT * FROM public.account WHERE account_email = $1"
        const { rows } = await pool.query(sql, [account_email])

        return rows
    } catch (error) {
        return new Error("No matching email found")
    }
}

/* *****************************
* Return account data using id
* ***************************** */
async function getAccountById(account_id) {
    try {
        const sql = "SELECT * FROM public.account WHERE account_id = $1"
        const { rows } = await pool.query(sql, [account_id])

        return rows
    } catch (error) {
        return new Error("No matching account found")
    }
}

/* *****************************
* Update account data 
* ***************************** */
async function updateAccount(account_id, account_firstname, account_lastname, account_email) {
    try {
        const sql = "UPDATE public.account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
        const { rows } = await pool.query(sql, [account_firstname, account_lastname, account_email, account_id])
        return rows
    } catch (error) {
        console.error("model error: " + error)
    }
}

/* *****************************
* Change account password 
* ***************************** */
async function changePassword(account_id, account_password) {
    try {
        const sql = "UPDATE public.account SET account_password = $1 WHERE account_id = $2 RETURNING *"
        const { rowCount } = await pool.query(sql, [account_password, account_id])
        return rowCount
    } catch (error) {
        console.error("model error: " + error)
    }
}

module.exports = {
    registerAccount,
    checkExistingEmail,
    getAccountByEmail,
    getAccountById,
    updateAccount,
    changePassword
}