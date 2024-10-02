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

module.exports = {
    registerAccount,
    checkExistingEmail,
    getAccountByEmail
}