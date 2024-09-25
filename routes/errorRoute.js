const { Router } = require('express')
const router = new Router()

const { handleServerErrors } = require('../utilities/')
const { serverError } = require('../controllers/errorController')

router.get('/sunny/day', handleServerErrors(serverError))

module.exports = router