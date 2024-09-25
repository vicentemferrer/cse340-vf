const express = require('express')
const router = new express.Router()

const { handleErrors } = require('../utilities/')
// const { classificationRules, checkClassData, vehicleRules, checkVehicleData } = require('../utilities/inventory-validation')

const invController = require('../controllers/invController')

// router.get('/', handleErrors(invController.buildManagement))
// router.get('/add-classification', handleErrors(invController.buildAddClassification))
// router.get('/add-vehicle', handleErrors(invController.buildAddVehicle))

router.get('/type/:classificationId', handleErrors(invController.buildByClassificationId))
router.get('/detail/:itemId', handleErrors(invController.buildByItemId))

// router.post('/add-classification', classificationRules(), checkClassData, handleErrors(invController.addClassification))
// router.post('/add-vehicle', vehicleRules(), checkVehicleData, handleErrors(invController.addVehicle))

module.exports = router