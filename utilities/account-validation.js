const { body, validationResult } = require("express-validator")

const { getNav } = require(".")
const { checkExistingEmail } = require("../models/account-model")

const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.registrationRules = () => ([
    body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."),

    body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."),

    body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
            const emailExists = await checkExistingEmail(account_email)
            if (emailExists) {
                throw new Error("Email exists. Please log in or use different email")
            }
        }),

    body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Password does not meet requirements.")
])

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const nav = await getNav()

        return res.render("account/registration", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
    }

    next()
}

/*  **********************************
  *  Login Data Validation Rules
  * ********************************* */
validate.loginRules = () => ([
    body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("Use valid email is required.")
        .custom(async (account_email) => {
            const emailExists = await checkExistingEmail(account_email)
            if (!emailExists) {
                throw new Error("Email does not exists. Please sign up or use different email")
            }
        }),

    body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Password does not meet requirements.")
])

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkLogData = async (req, res, next) => {
    const { account_email } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const nav = await getNav()

        return res.render("account/login", {
            errors,
            title: "Login",
            nav,
            account_email
        })
    }

    next()
}

/*  **********************************
  *  Account Data Validation Rules
  * ********************************* */
validate.accountRules = () => ([
    body("account_id")
        .trim()
        .escape()
        .notEmpty()
        .isInt({
            gt: 0
        })
        .withMessage("Please choose a registered account."),

    body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."),

    body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."),

    body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required.")
])

/* ******************************
 * Check data and return errors or continue to update
 * ***************************** */
validate.checkAccountData = async (req, res, next) => {
    const { account_id, account_firstname, account_lastname, account_email } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const nav = await getNav()

        return res.render("account/edit-account", {
            errors,
            title: "Update Account",
            nav,
            account_id,
            account_firstname,
            account_lastname,
            account_email
        })
    }

    next()
}

/*  **********************************
  *  Password Validation Rules
  * ********************************* */
validate.passwordRules = () => ([
    body("account_id")
        .trim()
        .escape()
        .notEmpty()
        .isInt({
            gt: 0
        })
        .withMessage("Please choose a registered account."),

    body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Password does not meet requirements.")
])

/* ******************************
 * Check data and return errors or continue to change password
 * ***************************** */
validate.checkPasswordData = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const nav = await getNav()

        return res.render("account/edit-account", {
            errors,
            title: "Update Account",
            nav
        })
    }

    next()
}

module.exports = validate