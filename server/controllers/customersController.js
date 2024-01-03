// customersController.js
const db = require('../../db/database');

exports.getAllCustomers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customer ORDER BY cust_name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Server error');
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const [rows] = await db.query('SELECT * FROM customer WHERE cust_id = ?', [cust_id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).send('Server error');
  }
};

exports.getCustomerWithHighestRevenue = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT cust_id, cust_name, MAX(annual_revenue) AS highestRevenue
      FROM customer
      GROUP BY cust_id
      ORDER BY highestRevenue DESC
      LIMIT 1
    `);
    // Assuming there is at least one customer, send the first one
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'No customers found' });
    }
  } catch (error) {
    console.error('Error fetching the customer with the highest revenue:', error);
    res.status(500).send('Server error');
  }
};

exports.getCustomerWithMostShipments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.cust_id, c.cust_name, COUNT(s.ship_id) AS shipmentCount
      FROM customer c
      JOIN shipment s ON c.cust_id = s.cust_id
      GROUP BY c.cust_id
      ORDER BY shipmentCount DESC
      LIMIT 1
    `);
    // Assuming there is at least one customer, send the first one
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'No customers found' });
    }
  } catch (error) {
    console.error('Error fetching the customer with the most shipments:', error);
    res.status(500).send('Server error');
  }
};




