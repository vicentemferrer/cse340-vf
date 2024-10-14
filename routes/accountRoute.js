const { Router } = require("express")
const router = new Router()

const accountController = require("../controllers/accountController")
const { registrationRules, checkRegData, loginRules, checkLogData } = require("../utilities/account-validation")

const { checkLogin, handleErrors } = require("../utilities/")

router.get("/", checkLogin, handleErrors(accountController.buildManagement))
router.get("/login", handleErrors(accountController.buildLogin))
router.get("/registration", handleErrors(accountController.buildRegister))

router.post("/login", loginRules(), checkLogData, handleErrors(accountController.accountLogin))
router.post("/registration", registrationRules(), checkRegData, handleErrors(accountController.registerAccount))

module.exports = router