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

exports.getCustomerShipmentDetails = async (req, res) => {
  const { customerId } = req.params;

  try {
    // Query to get the total number of shipments and the average weight
    const shipmentStatsQuery = `
      SELECT
        COUNT(ship_id) AS totalShipments,
        ROUND(AVG(weight), 2) AS averageWeight
      FROM shipment
      WHERE cust_id = ?
    `;

    // Query to get the distinct cities and states
    const deliveryLocationsQuery = `
    SELECT
      DISTINCT city.city_name,
      city.state
    FROM shipment
    INNER JOIN city ON shipment.city_id = city.city_id
    WHERE shipment.cust_id = ?
    `;

    // Execute the queries
    const [shipmentStats] = await db.query(shipmentStatsQuery, [customerId]);
    const [deliveryLocations] = await db.query(deliveryLocationsQuery, [customerId]);

    // Check if we have the shipment stats, if not, it means there's no shipment data for the customer
    if (shipmentStats.length === 0) {
      return res.status(404).json({ message: 'No shipment data found for this customer.' });
    }

    // Prepare the response data
    const responseData = {
      totalShipments: shipmentStats[0].totalShipments,
      averageWeight: shipmentStats[0].averageWeight,
     deliveryLocations: deliveryLocations.map(loc => {
      const city = loc.city_name;
      const state = loc.state;
      return `${city}, ${state}`;
    }),
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer shipment details:', error);
    res.status(500).send('Server error');
  }
};

exports.getTrucksForCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    // SQL query to get all unique trucks for a specific customer's shipments
    const query = `
    SELECT
    t.truck_id,
    t.make,
    t.model_year,
    COUNT(s.ship_id) AS shipment_count
  FROM
    truck AS t
  INNER JOIN
    shipment AS s ON t.truck_id = s.truck_id
  WHERE
    s.cust_id = ?
  GROUP BY
    t.truck_id
  ORDER BY
    shipment_count DESC
  LIMIT 1;
    `;

    const [trucks] = await db.query(query, [customerId]);
    if (trucks.length > 0) {
      res.json(trucks);
    } else {
      res.status(404).json({ message: 'No trucks found for this customer' });
    }
  } catch (error) {
    console.error('Error fetching trucks for customer:', error);
    res.status(500).send('Server error');
  }
};







