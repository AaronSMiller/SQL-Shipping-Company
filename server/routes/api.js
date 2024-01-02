// server/routes/api.js
const express = require('express');
const router = express.Router();
const {getAllCustomers, getCustomerById} = require('../controllers/customersController');
const shipmentController = require('../controllers/shipmentController');
const revenueController = require('../controllers/revenueController')


//Customer Routes
router.get('/customers', getAllCustomers);
router.get('/customers/:cust_id', getCustomerById);


//Shipment Routes
router.get('/shipments/customer/:cust_id', shipmentController.getShipmentsByCustomerId);
router.get('/shipments/total', shipmentController.getTotalShipments);

//Revenue Routes
router.get('/revenue/total', revenueController.getTotalRevenue);

module.exports = router;
