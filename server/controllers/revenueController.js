const db = require('../../db/database');

exports.getTotalRevenue = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT SUM(annual_revenue) AS totalRevenue FROM customer');
    res.json({ totalRevenue: rows[0].totalRevenue });
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).send('Server error');
  }
};
