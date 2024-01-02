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


