const express = require('express')
const router = new express.Router()

const invController = require('../controllers/invController')
const { classificationRules, checkClassData, vehicleRules, checkVehicleData, updateRules, checkUpdateData, deleteRules, checkDeleteData, confirmRules, checkConfirmData, deleteClassRules, confirmClassRules, checkDelClassData, checkConfClassData } = require('../utilities/inventory-validation')

const { checkCredentials, checkAdmin, handleErrors } = require('../utilities/')

router.get('/', checkCredentials, handleErrors(invController.buildManagementView))
router.get('/panel', checkAdmin, handleErrors(invController.buildAdminPanelView))
router.get('/add-classification', checkCredentials, handleErrors(invController.addClassificationView))
router.get('/add-vehicle', checkCredentials, handleErrors(invController.addInventoryView))

router.get('/edit/:itemId', checkCredentials, handleErrors(invController.editInventoryView))
router.get('/delete/:itemId', checkCredentials, handleErrors(invController.confirmDeletionView))
router.get('/review/:itemId', checkAdmin, handleErrors(invController.reviewInventoryView))
router.get('/review/type/:classificationId', checkAdmin, handleErrors(invController.reviewClassificationView))

router.get('/type/:classificationId', handleErrors(invController.buildByClassificationId))
router.get('/detail/:itemId', handleErrors(invController.buildByItemId))

router.get('/getInventory/:classificationId', checkCredentials, handleErrors(invController.getInventoryJSON))

router.post('/add-classification', classificationRules(), checkClassData, checkCredentials, handleErrors(invController.addClassification))
router.post('/add-vehicle', vehicleRules(), checkVehicleData, checkCredentials, handleErrors(invController.addVehicle))
router.post("/update", updateRules(), checkUpdateData, checkCredentials, handleErrors(invController.updateInventory))
router.post("/delete", deleteRules(), checkDeleteData, checkCredentials, handleErrors(invController.deleteVehicle))
router.post("/confirm", confirmRules(), checkConfirmData, checkAdmin, handleErrors(invController.confirmInventory))
router.post('/type/delete', deleteClassRules(), checkDelClassData, checkAdmin, handleErrors(invController.deleteClassification))
router.post('/type/confirm', confirmClassRules(), checkConfClassData, checkAdmin, handleErrors(invController.confirmClassification))

module.exports = router