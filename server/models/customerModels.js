const db = require('../../db/database')

const getAllCustomers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM customer ORDER BY cust_name');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCustomerById = async (cust_id) => {
  try {
    const [rows] = await db.query('SELECT * FROM customer WHERE cust_id = ?', [cust_id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const getCustomerWithHighestRevenue = async () => {
  try {
    const [rows] = await db.query(`
      SELECT cust_id, cust_name, MAX(annual_revenue) AS highestRevenue
      FROM customer
      GROUP BY cust_id
      ORDER BY highestRevenue DESC
      LIMIT 1
    `);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

const getCustomerWithMostShipments = async () => {
  try {
    const [rows] = await db.query(`
      SELECT c.cust_id, c.cust_name, COUNT(s.ship_id) AS shipmentCount
      FROM customer c
      JOIN shipment s ON c.cust_id = s.cust_id
      GROUP BY c.cust_id
      ORDER BY shipmentCount DESC
      LIMIT 1
    `);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

const getCustomerShipmentStats = async (customerId) => {
  try {
    const shipmentStatsQuery = `
      SELECT
        COUNT(ship_id) AS totalShipments,
        ROUND(AVG(weight), 2) AS averageWeight
      FROM shipment
      WHERE cust_id = ?
    `;
    const [shipmentStats] = await db.query(shipmentStatsQuery, [customerId]);
    return shipmentStats[0];
  } catch (error) {
    throw error;
  }
};

const getCustomerDeliveryLocations = async (customerId) => {
  try {
    const deliveryLocationsQuery = `
      SELECT DISTINCT city.city_name, city.state
      FROM shipment
      INNER JOIN city ON shipment.city_id = city.city_id
      WHERE shipment.cust_id = ?
    `;
    const [deliveryLocations] = await db.query(deliveryLocationsQuery, [customerId]);
    return deliveryLocations;
  } catch (error) {
    throw error;
  }
};

const getTrucksForCustomer = async (customerId) => {
  try {
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
    return trucks;
  } catch (error) {
    throw error;
  }
};

const getMostUsedDriverForCustomer = async (customerId) => {
  try {
    const query = `
      SELECT
        d.driver_id,
        d.first_name,
        d.last_name,
        COUNT(s.ship_id) AS shipment_count
      FROM
        driver AS d
      INNER JOIN
        shipment AS s ON d.driver_id = s.driver_id
      WHERE
        s.cust_id = ?
      GROUP BY
        d.driver_id
      ORDER BY
        shipment_count DESC
      LIMIT 1;
    `;

    const [drivers] = await db.query(query, [customerId]);
    return drivers.length > 0 ? drivers[0] : null;
  } catch (error) {
    throw error;
  }
};

const checkDuplicateCustomerName = async (cust_name) => {
  const duplicateNameCheckSql = 'SELECT cust_id FROM customer WHERE cust_name = ? LIMIT 1';
  const [existingCustomer] = await db.query(duplicateNameCheckSql, [cust_name]);
  return existingCustomer.length > 0;
};

const createCustomer = async (customerData) => {
  const { cust_name, cust_type, address, city, state, zip, phone, annual_revenue } = customerData;
  const insertSql = `
    INSERT INTO customer (cust_name, cust_type, address, city, state, zip, phone, annual_revenue)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const [result] = await db.query(insertSql, [cust_name, cust_type, address, city, state, zip, phone, annual_revenue || 0]);
  return result.insertId;
};

const deleteCustomer = async (cust_id) => {
  const deleteSql = 'DELETE FROM customer WHERE cust_id = ?';
  const [result] = await db.query(deleteSql, [cust_id]);
  return result.affectedRows;
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  getCustomerWithHighestRevenue,
  getCustomerWithMostShipments,
  getCustomerShipmentStats,
  getCustomerDeliveryLocations,
  getTrucksForCustomer,
  getMostUsedDriverForCustomer,
  checkDuplicateCustomerName,
  createCustomer,
  deleteCustomer,
};