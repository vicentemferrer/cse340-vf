const express = require('express')
const router = new express.Router()

const invController = require('../controllers/invController')
const { classificationRules, checkClassData, vehicleRules, checkVehicleData, updateRules, checkUpdateData, deleteRules, checkDeleteData } = require('../utilities/inventory-validation')

const { checkCredentials, handleErrors } = require('../utilities/')

router.get('/', checkCredentials, handleErrors(invController.buildManagementView))
router.get('/add-classification', checkCredentials, handleErrors(invController.addClassificationView))
router.get('/add-vehicle', checkCredentials, handleErrors(invController.addInventoryView))

router.get('/edit/:itemId', checkCredentials, handleErrors(invController.editInventoryView))
router.get('/delete/:itemId', checkCredentials, handleErrors(invController.confirmDeletionView))

router.get('/type/:classificationId', handleErrors(invController.buildByClassificationId))
router.get('/detail/:itemId', handleErrors(invController.buildByItemId))

router.get('/getInventory/:classificationId', checkCredentials, handleErrors(invController.getInventoryJSON))

router.post('/add-classification', classificationRules(), checkClassData, checkCredentials, handleErrors(invController.addClassification))
router.post('/add-vehicle', vehicleRules(), checkVehicleData, checkCredentials, handleErrors(invController.addVehicle))
router.post("/update", updateRules(), checkUpdateData, checkCredentials, handleErrors(invController.updateInventory))
router.post("/delete", deleteRules(), checkDeleteData, checkCredentials, handleErrors(invController.deleteVehicle))

module.exports = router