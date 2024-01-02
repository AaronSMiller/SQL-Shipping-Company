// shipmentController.js
const db = require('../../db/database');

exports.getShipmentsByCustomerId = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const [shipments] = await db.query('SELECT * FROM shipment WHERE cust_id = ?', [cust_id]);
    res.json(shipments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTotalShipments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS totalShipments FROM shipment');
    res.json(rows[0].totalShipments);
  } catch (error) {
    console.error('Error fetching total number of shipments:', error);
    res.status(500).send('Server error');
  }
};