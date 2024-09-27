// const bcrypt = require("bcryptjs")

const accountModel = require("../models/account-model")
const { getNav } = require("../utilities/")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    const nav = await getNav()

    res.render("account/login", {
        title: "Login",
        nav,
        errors: null
    })
}

// /* ****************************************
// *  Deliver registration view
// * *************************************** */
// async function buildRegister(req, res, next) {
//     const nav = await getNav()

//     res.render("account/registration", {
//         title: "Registration",
//         nav,
//         errors: null
//     })
// }

// /* ****************************************
// *  Process Registration
// * *************************************** */
// async function registerAccount(req, res) {
//     const nav = await getNav()
//     const { account_firstname, account_lastname, account_email, account_password } = req.body

//     let hashedPassword

//     try {
//         hashedPassword = await bcrypt.hash(account_password, 10)
//     } catch (error) {
//         req.flash("notice", 'Sorry, there was an error processing the registration.')

//         res.status(500).render("account/registration", {
//             title: "Registration",
//             nav,
//             errors: null,
//         })
//     }

//     const regResult = await accountModel.registerAccount(account_firstname, account_lastname, account_email, hashedPassword)

//     if (regResult) {
//         req.flash(
//             "notice",
//             `Congratulations, you\'re registered ${account_firstname}. Please log in.`
//         )

//         res.status(201).render("account/login", {
//             title: "Login",
//             nav,
//             errors: null
//         })
//     } else {
//         req.flash("notice", "Sorry, the registration failed.")

//         res.status(501).render("account/registration", {
//             title: "Registration",
//             nav,
//             errors: null
//         })
//     }
// }

module.exports = {
    buildLogin,
    // buildRegister, 
    // registerAccount 
}