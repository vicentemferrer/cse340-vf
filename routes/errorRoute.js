const { Router } = require('express')
const router = new Router()

const { serverError } = require('../controllers/errorController')

const { handleServerErrors } = require('../utilities/')

router.get('/sunny/day', handleServerErrors(serverError))

module.exports = router