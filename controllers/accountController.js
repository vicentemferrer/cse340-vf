const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const accountModel = require("../models/account-model")
const { getNav } = require("../utilities/")

/* ****************************************
*  Deliver account management view
* *************************************** */
async function buildManagement(req, res, next) {
    const nav = await getNav()

    return res.render("account/management", {
        title: "Account Management",
        nav,
        errors: null
    })
}

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    const nav = await getNav()

    return res.render("account/login", {
        title: "Login",
        nav,
        errors: null
    })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    const nav = await getNav()

    return res.render("account/registration", {
        title: "Registration",
        nav,
        errors: null
    })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    const nav = await getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    let hashedPassword

    try {
        hashedPassword = await bcrypt.hash(account_password, 10)
    } catch (error) {
        req.flash("notice", 'Sorry, there was an error processing the registration.')

        return res.status(500).render("account/registration", {
            title: "Registration",
            nav,
            errors: null,
        })
    }

    const regResult = await accountModel.registerAccount(account_firstname, account_lastname, account_email, hashedPassword)

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
        )

        return res.status(201).render("account/login", {
            title: "Login",
            nav,
            errors: null
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")

        return res.status(501).render("account/registration", {
            title: "Registration",
            nav,
            errors: null
        })
    }
}

/* ****************************************
*  Process Login
* *************************************** */
async function accountLogin(req, res) {
    const nav = await getNav()
    const { account_email, account_password } = req.body

    const [accountData] = await accountModel.getAccountByEmail(account_email)

    if (!accountData) {
        req.flash("notice", "Please check your credentials and try again.")
        return res.status(400).render("account/login", {
            title: "Login",
            nav,
            errors: null,
            account_email
        })
    }

    try {
        console.error(await bcrypt.compare(account_password, accountData.account_password))
        if (await bcrypt.compare(account_password, accountData.account_password)) {
            delete accountData.account_password

            const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })

            const cookieOptions = { httpOnly: true, maxAge: 3600 * 1000 }

            if (process.env.NODE_ENV !== 'development') cookieOptions.secure = true

            res.cookie("jwt", accessToken, cookieOptions)

            return res.redirect("/account/")
        }
    } catch (error) {
        return new Error('Access Forbidden')
    }
}

module.exports = {
    buildManagement,
    buildLogin,
    buildRegister,
    registerAccount,
    accountLogin
}