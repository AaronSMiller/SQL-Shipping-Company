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

