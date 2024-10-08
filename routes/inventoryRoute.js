const express = require('express')
const router = new express.Router()

const invController = require('../controllers/invController')
const { classificationRules, checkClassData, vehicleRules, checkVehicleData } = require('../utilities/inventory-validation')

const { handleErrors } = require('../utilities/')

router.get('/', handleErrors(invController.buildManagementView))
router.get('/add-classification', handleErrors(invController.addClassificationView))
router.get('/add-vehicle', handleErrors(invController.addInventoryView))

router.get('/edit/:itemId', handleErrors(invController.editInventoryView))

router.get('/type/:classificationId', handleErrors(invController.buildByClassificationId))
router.get('/detail/:itemId', handleErrors(invController.buildByItemId))

router.get('/getInventory/:classificationId', handleErrors(invController.getInventoryJSON))

router.post('/add-classification', classificationRules(), checkClassData, handleErrors(invController.addClassification))
router.post('/add-vehicle', vehicleRules(), checkVehicleData, handleErrors(invController.addVehicle))

module.exports = router