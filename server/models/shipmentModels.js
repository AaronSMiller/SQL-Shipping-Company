const db = require('../../db/database');

const getShipmentsByCustomerId = async (cust_id) => {
  try {
    const query = 'SELECT * FROM shipment WHERE cust_id = ?';
    const [shipments] = await db.query(query, [cust_id]);
    return shipments;
  } catch (error) {
    throw error;
  }
};

const getTotalShipments = async () => {
  try {
    const query = 'SELECT COUNT(*) AS totalShipments FROM shipment';
    const [rows] = await db.query(query);
    return rows[0].totalShipments;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getShipmentsByCustomerId,
  getTotalShipments
};