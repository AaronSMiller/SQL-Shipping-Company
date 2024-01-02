// db.js
const mysql = require('mysql2');

// Create a connection pool.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'SQL_Shipping_Company',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// For Promises API
const promisePool = pool.promise();

module.exports = promisePool;
