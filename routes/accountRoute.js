const { Router } = require("express")
const router = new Router()

const accountController = require("../controllers/accountController")
// const { registrationRules, checkRegData, loginRules, checkLogData } = require("../utilities/account-validation")

const { handleErrors } = require("../utilities/")

router.get("/login", handleErrors(accountController.buildLogin))
router.get("/registration", handleErrors(accountController.buildRegister))

// router.post("/login", loginRules(), checkLogData, (req, res) => { res.status(200).send("login process") })
router.post("/registration", handleErrors(accountController.registerAccount))

module.exports = router