const db = require('../../db/database');

const getTotalRevenue = async () => {
  try {
    const revenueQuery = 'SELECT SUM(annual_revenue) AS totalRevenue FROM customer';
    const [rows] = await db.query(revenueQuery);
    return rows[0].totalRevenue;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTotalRevenue,
};