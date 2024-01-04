// shipmentController.js
const db = require('../../db/database');
const shipmentModel = require('../models/shipmentModels')

exports.getShipmentsByCustomerId = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const shipments = await shipmentModel.getShipmentsByCustomerId(cust_id);

    if (shipments.length > 0) {
      res.json(shipments);
    } else {
      res.status(404).json({ message: 'No shipments found for this customer.' });
    }
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).send(error.message);
  }
};

exports.getTotalShipments = async (req, res) => {
  try {
    const totalShipments = await shipmentModel.getTotalShipments();
    res.json({ totalShipments });
  } catch (error) {
    console.error('Error fetching total number of shipments:', error);
    res.status(500).send('Server error');
  }
};