// server/routes/api.js
const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');
const shipmentController = require('../controllers/shipmentController');
const revenueController = require('../controllers/revenueController')


//Customer Specific Routes//

//Get
router.get('/customers', customersController.getAllCustomers);
router.post('/customers', customersController.createCustomer);
router.get('/customers/getHighestRevenue', customersController.getCustomerWithHighestRevenue);
router.get('/customers/most-shipments', customersController.getCustomerWithMostShipments);
router.get('/customers/:cust_id', customersController.getCustomerById);
router.delete('/customers/:cust_id', customersController.deleteCustomer);
router.get('/customers/:customerId/shipments', customersController.getCustomerShipmentDetails);
router.get('/customers/:customerId/trucks', customersController.getTrucksForCustomer);
router.get('/customers/:customerId/drivers', customersController.getDriversForCustomer);



//Shipment Routes
router.get('/shipments/customer/:cust_id', shipmentController.getShipmentsByCustomerId);
router.get('/shipments/total', shipmentController.getTotalShipments);


//Revenue Routes
router.get('/revenue/total', revenueController.getTotalRevenue);


module.exports = router;
