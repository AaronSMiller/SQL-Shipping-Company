const db = require('../../db/database');
const revenueModel = require('../models/revenueModels')

exports.getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await revenueModel.getTotalRevenue();

    if (totalRevenue !== null) {
      res.json({ totalRevenue });
    } else {
      res.status(404).json({ message: 'Total revenue data not found.' });
    }
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).send('Server error');
  }
};
